$(function () {
    var config = {
        apiKey: "AIzaSyBd-we3DS2sZBhExI-VdJrNyKypR_qFAEI",
        authDomain: "bahaso-sketch.firebaseapp.com",
        databaseURL: "https://bahaso-sketch.firebaseio.com",
        projectId: "bahaso-sketch",
        storageBucket: "bahaso-sketch.appspot.com",
        messagingSenderId: "267090960672"
    };

    firebase.initializeApp(config);

    var auth = firebase.auth();
    var database = firebase.database();
    var storage = firebase.storage();

    var DEFAULT_THEME = 'RANDOM';
    var DEFAULT_THEME_ID = '20170000';
    var TODAY_THEME_ID = getThemeID();

    var galleryLogin = $('#login-gallery');
    var galleryToday = $('#today-gallery');
    var galleryHome = $('#home-gallery');

    var objectURLHandler = '';

    auth.onAuthStateChanged(function (user) {
        galleryLogin.html('');
        galleryToday.html('');
        galleryHome.html('');

        if (user) {
            signIn();
        } else {
            signOut();
        }
    });

    var todaysTheme = database.ref('/themes/' + TODAY_THEME_ID);
    todaysTheme.once('value').then(function (data) {
        var id = DEFAULT_THEME_ID;
        var theme = DEFAULT_THEME;
        var el = $('#todays-theme');

        if(data.exists()) {
            id = data.key;
            theme = data.val();
        }
        
        el.data('id', id);
        el.text('#' + theme);
    });

    $('.container').on('click', '#btn-login', function () {
        var user = $('#login-email').val();
        var pass = $('#login-password').val();

        if(user !== '' && pass !== '' && pass.length >= 6) {
            auth.signInWithEmailAndPassword(user, pass).catch(function (error) {
                if(error.code === 'auth/user-not-found') {
                    auth.createUserWithEmailAndPassword(user, pass).catch(function (error) {
                        alert('Connection error!');
                    });
                } else {
                    alert('Connection error!');
                }
            });
        } else {
            alert('Wrong data!');
        }
    });

    $('.container').on('click', '#btn-login-google', function () {
        var provider = new firebase.auth.GoogleAuthProvider();

        auth.signInWithPopup(provider).catch(function (error) {
            alert('Connection error!');
        });
    });
    
    $('.container').on('click', '#btn-logout', function () {
        auth.signOut();
    });

    $('.container').on('click', '#upload-ok-button', function () {
        var imageEl = document.getElementById('upload-file-input');
        if(!imageEl.files[0]) {
            return true;
        }

        $('#upload-ok-button').prop('disabled', true);
        $('#upload-cancel-button').prop('disabled', true);

        var image = imageEl.files[0];
        var fileRef = storage.ref('images/' + getDate() + getTime() + image.name);
        fileRef.put(image).then(function (data) {
            var newPostKey = database.ref('/photos').push().key;
            var newPost = {
                name: auth.currentUser.email,
                url: data.metadata.downloadURLs[0],
                path: data.metadata.fullPath
            };
            var updates = {};
            updates['/photos/' + newPostKey] = newPost;
            updates['/themes_photos/' + TODAY_THEME_ID + '/' + newPostKey] = newPost;
            return database.ref().update(updates);
        }).then(function () {
            $('#upload-file-input').val('').trigger('change');
            $('#upload-ok-button').prop('disabled', false);
            $('#upload-cancel-button').prop('disabled', false);
        }).catch(function (error) {
            alert('Connection error!');
            $('#upload-file-input').val('').trigger('change');
            $('#upload-ok-button').prop('disabled', false);
            $('#upload-cancel-button').prop('disabled', false);
        });
    });

    $('.container').on('click', '#upload-cancel-button', function () {
        $('#upload-file-input').val('').trigger('change');
    });

    $('.container').on('change', '#upload-file-input', function () {
        var imageEl = document.getElementById('upload-file-input');
        if(imageEl.files[0]) {
            objectURLHandler = URL.createObjectURL(imageEl.files[0]);
            $('.upload-file-button').css('background-image', 'url(' + objectURLHandler + ')');
            $('.upload-button-container').addClass('active');
        } else {
            URL.revokeObjectURL(objectURLHandler);
            $('.upload-file-button').css('background-image', '');
            $('.upload-button-container').removeClass('active');
        }
    });

    function getDate(date) {
        var date = date || new Date();
        var year = date.getFullYear();
        var month = ('0' + (date.getMonth() + 1)).slice(-2);
        var day = ('0' + date.getDate()).slice(-2);

        return year + '' + month + '' + day;
    }

    function getTime(time) {
        var time = time || new Date();
        var hour = ('0' + time.getHours()).slice(-2);
        var minute = ('0' + time.getMinutes()).slice(-2);
        var second = ('0' + time.getSeconds()).slice(-2);

        return hour + '' + minute + '' + second;
    }

    function getThemeID() {
        return getDate(new Date());
    }

    function signIn() {
        $('#login-container').hide();
        $('#home-container').show();

        loadHomeGallery();
        loadTodayGallery();
    }

    function signOut() {
        $('#login-container').show();
        $('#home-container').hide();

        loadLoginGallery();
    }

    function loadLoginGallery() {
        var dbRef = database.ref('/photos').limitToLast(18);
        dbRef.off();
        dbRef.on('child_added', function (data) {
            var photo = data.val();
            var item = '<div class="gallery-item"><div class="gallery-image" style="background-image: url(\'' + photo.url + '\')"></div></div>';
            
            galleryLogin.prepend(item);
        });
    }

    function loadTodayGallery() {
        var upload = $('#upload-button-template').text();
        galleryToday.html(upload);

        var dbRef = database.ref('/themes_photos/' + TODAY_THEME_ID);
        dbRef.off();
        dbRef.on('child_added', function (data) {
            var photo = data.val();
            var item = '<a target="_blank" href="' + photo.url + '" class="gallery-item"><div class="gallery-image" style="background-image: url(\'' + photo.url + '\')"></div></a>';
            
            galleryToday.prepend(item);
        });
    }

    function loadHomeGallery() {
        var day = 1;
        var dbRef = database.ref('/themes_photos');
        dbRef.off();
        dbRef.on('child_added', function (data) {
            if(data.key != TODAY_THEME_ID) {
                var photos = data.val();
                var themeRef = database.ref('/themes/' + data.key);
                themeRef.once('value').then(function (data) {
                    var theme = data.val();
                    var items_start = '<div class="gallery"><div class="gallery-day">' + ((theme === DEFAULT_THEME) ? 'DAY 0' : ('DAY ' + day++)) + '</div><div class="gallery-theme">#' + theme + '</div><div class="gallery-items">';
                    var items_end = '</div></div>';
                    var items = '';

                    $.each(photos, function (key, photo) {
                        var imageUrl = photo.url;
                        var user = photo.name;
                        var item = '<a target="_blank" href="' + photo.url + '" class="gallery-item"><div class="gallery-image" style="background-image: url(\'' + imageUrl + '\')"></div></a>';
                        items = item + items;
                    });

                    galleryHome.prepend(items_start + items + items_end);
                });
            }
        });
    }
});