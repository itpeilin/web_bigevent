//每次调用 $.ajax() 或者 $.post都会优先调用ajaxPrefilter这个函数
//在这个函数中可以拿到我们给ajax 提供的配置对象
$.ajaxPrefilter(function(options) {

    options.url = 'http://www.liulongbin.top:3007' + options.url
        //console.log(options.url);

    //统一为有权限的接口设置 headers请求头
    if (options.url.indexOf('/my/') !== -1) {
        options.headers = {
            Authorization: localStorage.getItem('token') || ''
        }
    }

    //全局统一挂载 complete 回调函数
    options.complete = function(res) {
        //console.log(res);
        //在 complete 函数中，可以使用 responseJSON 拿到这个数据
        if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
            //强制清空 token
            localStorage.removeItem('token')
                //强制跳转到登录页面
            location.href = 'login.html'
        }
    }

})