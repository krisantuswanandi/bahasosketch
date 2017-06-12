$(function () {
    var config = {
        apiKey: "AIzaSyBy6ff_NDaYxwRK5M6rlvojzmZnfBzGfCI",
        authDomain: "fir-bahaso.firebaseapp.com",
        databaseURL: "https://fir-bahaso.firebaseio.com",
        projectId: "fir-bahaso",
        storageBucket: "fir-bahaso.appspot.com",
        messagingSenderId: "134825814680"
    };

    firebase.initializeApp(config);

    var auth = firebase.auth();
    var database = firebase.database();
    var storage = firebase.storage();

    var DEFAULT_THEME = 'RANDOM';
    var DEFAULT_THEME_ID = '20170612';
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
                        console.log(error);
                    });
                } else {
                    console.log(error);
                }
            });
        } else {
            console.log('data tidak lengkap');
        }
    });

    $('.container').on('click', '#btn-login-google', function () {
        var provider = new firebase.auth.GoogleAuthProvider();

        auth.signInWithPopup(provider).catch(function (error) {
            console.log(error);
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
            console.log('sukses');
        }).catch(function (error) {
            console.log(error);
        });
    });

    $('.container').on('click', '#upload-cancel-button', function () {
        $('#upload-file-input').val('').trigger('change');
    });

    $('.container').on('change', '#upload-file-input', function () {
        var imageEl = document.getElementById('upload-file-input');
        if(imageEl.files[0]) {
            objectURLHandler = URL.createObjectURL(imageEl.files[0]);
            $('.upload-file-button').addClass('selected');
            $('.upload-file-button').css('background-image', 'url(' + objectURLHandler + ')');
        } else {
            URL.revokeObjectURL(objectURLHandler);
            $('.upload-file-button').removeClass('selected');
            $('.upload-file-button').css('background-image', '');
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
        var dbRef = database.ref('/themes_photos/' + TODAY_THEME_ID);
        dbRef.off();
        dbRef.on('child_added', function (data) {
            var photo = data.val();
            var upload = '<label class="upload-file-button" for="upload-file-input"><button id="upload-ok-button" class="btn btn-primary">Upload</button><button id="upload-cancel-button" class="btn btn-primary">Cancel</button></label>';
            var item = '<div class="gallery-item"><div class="gallery-image" style="background-image: url(\'' + photo.url + '\')"></div><div class="gallery-detail"><div class="gallery-user">' + photo.name + '</div></div></div>';
            
            $('.upload-file-button').remove();
            galleryToday.prepend(upload + item);
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
                    var items_start = '<div class="gallery"><div class="gallery-day">' + ((theme === 'RANDOM') ? '' : ('DAY ' + day++)) + '</div><div class="gallery-theme">#' + theme + '</div><div class="gallery-items">';
                    var items_end = '</div></div>';
                    var items = '';

                    $.each(photos, function (key, photo) {
                        var imageUrl = photo.url;
                        var user = photo.name;
                        var item = '<div class="gallery-item"><div class="gallery-image" style="background-image: url(\'' + imageUrl + '\')"></div><div class="gallery-detail"><div class="gallery-user">' + user + '</div></div></div>';
                        items = item + items;
                    });

                    galleryHome.prepend(items_start + items + items_end);
                });
            }
        });
    }
});