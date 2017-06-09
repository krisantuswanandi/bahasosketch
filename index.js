$(function () {
    $('#btn-login, #btn-login-google').click(function () {
        $('#login-container').hide();
        $('#home-container').show();
    });
    
    $('#btn-logout').click(function () {
        $('#login-container').show();
        $('#home-container').hide();
    });
});