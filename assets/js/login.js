$(function () {
    // 点击去注册
    $('#link_reg').on('click', function () {
        $('.login-box').hide()
        $('.reg-box').show()
    })

    // 点击去登录
    $('#link_login').on('click', function () {
        $('.reg-box').hide()
        $('.login-box').show()
        // $('.login-box').
    })

    // 从 layui 中获取 form 对象
    let form = layui.form
    let layer = layui.layer
    // 通过 form.verify() 函数自定义校验规则
    form.verify({
        // 自定义了一个 pwd 校验规则
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        // 校验两次密码是否一致规则
        repwd: function (value) {
            // 形参拿到确认密码框中的内容
            // 拿到密码框中的内容
            // 两者进行等值判断
            // 如果失败，return提示两者密码不一致
            let pwd = $('.reg-box [name=password]').val()
            if (pwd !== value) {
                return '两次密码不一致！'
            }
        },
    })

    // 监听注册表单的提交事件
    $('#form_reg').on('submit', function (e) {
        // 1. 阻止默认的提交行为
        e.preventDefault()
        // 2. 发起 AJax 的post请求
        let data = { username: $('#form_reg [name=username]').val(), password: $('#form_reg [name=password]').val() }
        $.post('http://www.liulongbin.top:3007/api/reguser', data, function (res) {
            if (res.status !== 0) {
                // return console.log(res.message)
                return layer.msg(res.message)
            }
            // return console.log('注册成功！')
            layer.msg('注册成功, 请登录！')
            // 模拟点击事件，跳转至的登录页面
            $('#link_login').click()
        })
    })

    // 监听登录表单的提交事件
    $('#form_login').submit(function (e) {
        e.preventDefault()
        $.ajax({
            url: '/api/login',
            method: 'POST',
            // 快速获取表单中的数据
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg('登录成功！')
                // 将登录成功后的 token 存储到本地 localstorage 中
                localStorage.setItem('token', res.token)
                // 登录成功自动跳转至主页
                location.href = '/code/index.html'
            }
        })
    })

})