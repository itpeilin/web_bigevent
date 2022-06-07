$(function() {
    //调用gitUserInfo获取用户的基本信息
    gitUserInfo()
    var layer = layui.layer
    $('#btnLogout').on('click', function() {
        //提示用户是否退出
        layer.confirm('确定退出登录吗？', { icon: 3, title: '提示' }, function(index) {
            //do something
            //清空本存储的 token
            localStorage.removeItem('token')
                //重新跳转登录页面
            location.href = 'login.html'
                //关闭confrom询问框
            layer.close(index);
        });
    })
})

function gitUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        //headers就是请求头配置对象
        // headers: {
        //     Authorization: localStorage.getItem('token') || ''
        // },
        success: function(res) {
                if (res.status !== 0) {
                    return layui.layer.msg('获取用户信息失败!')
                }
                //调用 renderAvatar 渲染用户的头像
                renderAvatar(res.data)
            }
            //不论成功还是失败都会调用 complete 回调函数
            // complete: function(res) {
            //     //console.log(res);
            //     //在 complete 函数中，可以使用 responseJSON 拿到这个数据
            //     if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
            //         //强制清空 token
            //         localStorage.removeItem('token')
            //             //强制跳转到登录页面
            //         location.href = 'login.html'
            //     }
            // }
    })
}


//渲染用户的头像
function renderAvatar(user) {
    //获取用户的名称
    var name = user.nickname || user.username
        //设置欢迎的文本
    $('#welcome').html('欢迎&nbsp; ' + name)

    //按需求渲染用户头像
    if (user.user_pic !== null) {
        //渲染图片头像
        $('.layui-nav-img').attr('src', user.user_pic).show()
    } else {
        //渲染文本头像
        $('.layui-nav-img').hide()
            //将获取到user.username第一个首字母以大写的形式展现出来
            //toUpperCase()利用这个方法
        var first = name[0].toUpperCase()
        $('.text-avatar').html(first).show()
    }
}