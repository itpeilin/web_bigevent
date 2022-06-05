//每次调用 $.ajax() 或者 $.post都会优先调用ajaxPrefilter这个函数
//在这个函数中可以拿到我们给ajax 提供的配置对象
$.ajaxPrefilter(function(options) {

    options.url = 'http://www.liulongbin.top:3007' + options.url
        //console.log(options.url);
})