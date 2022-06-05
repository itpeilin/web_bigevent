$(function() {
    //点击去组册账号的链接
    $('#link_reg').on('click', function() {
        $('.login-box').hide();
        $('.reg-box').show();
    });

    //点击去登录账号的链接
    $('#link_login').on('click', function() {
        $('.login-box').show();
        $('.reg-box').hide();
    })


    //从layui中获取 form 对象
    var form = layui.form
    var layer = layui.layer
        //通过form.verify 来自定义校验规则
    form.verify({
        //自定义了一个叫做pwd的校验规则
        pwd: [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ],
        //校验两次密码是否一致的规则
        repwd: function(value) {
            //通过形参拿到的是确认密码中的内容
            //还需要拿到密码框的内胎
            //如果判断失败return一个提示消息
            if ($('.reg-box [name=password]').val() !== value) {
                return '两次密码不一致';
            }
        }
    })

    //监听form表单的注册监听事件
    $('#form_reg').on('submit', function(e) {
        e.preventDefault()
        $.ajax({
            type: 'POST',
            url: '/api/reguser',
            data: {
                username: $('#form_reg [name=username]').val(),
                password: $('#form_reg [name=password]').val()
            },
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg(res.message);
                }
                layer.msg('注册成功');
                //模拟人的点击行为git
                $('#link_login').click();
                $('#form_reg [name=username]').val('')
                $('#form_reg [name=password]').val('')
                $('#form_reg [name=repassword]').val('')
            }
        })
    })

    //监听form表单的登录监听事件
    $('#form_login').on('submit', function(e) {
        e.preventDefault()
        $.ajax({
            type: 'POST',
            url: '/api/login',
            data: {
                username: $('#form_login [name=username]').val(),
                password: $('#form_login [name=password]').val()
            },
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg(res.message);
                }
                layer.msg('登录成功');
                //将登录成功的token字符串 保存到locakStorage
                localStorage.setItem('token', res.token)
                    //console.log(res.token);
                setTimeout(function() {
                    location.href = './index.html'
                }, 500)

            }
        })
    })
})