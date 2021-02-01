$.ajaxPrefilter(function(options) {
    alert(1)
    options = 'http://ajax.frontend.itheima.net' + options.url
})