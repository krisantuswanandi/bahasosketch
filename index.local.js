$(function () {
    var DEFAULT_THEME = 'RANDOM';
    var DEFAULT_THEME_ID = '20170612';
    var TODAY_THEME_ID = getThemeID();

    var galleryLogin = $('#login-gallery');
    var galleryToday = $('#today-gallery');
    var galleryHome = $('#home-gallery');

    var objectURLHandler = '';
    var newPost = {
        name: 'krisantus@bahaso.com',
        url: 'image.jpg'
    };

    var el = $('#todays-theme');
    el.data('id', DEFAULT_THEME_ID);
    el.text('#' + DEFAULT_THEME);
    signOut();

    $('.container').on('click', '#btn-login', function () {
        var user = $('#login-email').val();
        var pass = $('#login-password').val();

        if(user !== '' && pass !== '' && pass.length >= 6) {
            signIn();
        } else {
            console.log('data tidak lengkap');
        }
    });

    $('.container').on('click', '#btn-login-google', function () {
        signIn();
    });
    
    $('.container').on('click', '#btn-logout', function () {
        signOut();
    });

    $('.container').on('click', '#upload-ok-button', function () {
        var imageEl = document.getElementById('upload-file-input');
        if(!imageEl.files[0]) {
            return true;
        }

        $('#upload-file-input').val('').trigger('change');
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
        galleryLogin.html('');
        galleryToday.html('');
        galleryHome.html('');
        $('#login-container').hide();
        $('#home-container').show();

        loadHomeGallery();
        loadTodayGallery();
    }

    function signOut() {
        galleryLogin.html('');
        galleryToday.html('');
        galleryHome.html('');
        $('#login-container').show();
        $('#home-container').hide();

        loadLoginGallery();
    }

    function loadLoginGallery() {
        for(i = 0; i < 10; i++) {
            var photo = newPost;
            var item = '<div class="gallery-item"><div class="gallery-image" style="background-image: url(\'' + photo.url + '\')"></div></div>';
            
            galleryLogin.prepend(item);
        }
    }

    function loadTodayGallery() {
        var upload = '<label class="upload-file-button" for="upload-file-input"><button id="upload-ok-button" class="btn btn-primary">Upload</button><button id="upload-cancel-button" class="btn btn-primary">Cancel</button></label>';
        galleryToday.append(upload);

        for(i = 0; i < 10; i++) {
            var photo = newPost;
            var item = '<div class="gallery-item"><div class="gallery-image" style="background-image: url(\'' + photo.url + '\')"></div><div class="gallery-detail"><div class="gallery-user">' + photo.name + '</div></div></div>';
            
            galleryToday.append(item);
        }
    }

    function loadHomeGallery() {
        for(i = 1; i < 10; i++) {
            var items_start = '<div class="gallery"><div class="gallery-day">DAY' + i + '</div><div class="gallery-theme">#' + DEFAULT_THEME + '</div><div class="gallery-items">';
            var items_end = '</div></div>';
            var items = '';

            for(j = 0; j < 10; j++) {
                var photo = newPost;
                var item = '<div class="gallery-item"><div class="gallery-image" style="background-image: url(\'' + photo.url + '\')"></div><div class="gallery-detail"><div class="gallery-user">' + photo.name + '</div></div></div>';
                items = item + items;
            }

            galleryHome.prepend(items_start + items + items_end);
        }
    }
});