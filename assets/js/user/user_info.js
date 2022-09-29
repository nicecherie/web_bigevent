$(function () {
    let form = layui.form
    let layer = layui.layer
    form.verify({
        nickname: function (value) {
            if (value.length > 6) {
                return '昵称的长度必须在 1-6 个字符之间！'
            }
        }
    })

    initUserInfo()

    // 初始化用户信息
    function initUserInfo() {
        $.ajax({
            method: 'GET',
            url: '/my/userinfo',
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('获取用户信息失败！')
                }
                console.log(res)
                form.val('formUserInfo', res.data)
            }
        })
    }

    // 点击重置按钮重新获取用户信息
    $('#btnReset').on('click', function (e) {
        // 阻止重置按钮默认行为
        e.preventDefault()
        initUserInfo()
    })

    // 提交修改信息,监听表单提交事件
    $('.layui-form').on('submit', function (e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/my/userinfo',
            // 发送表单数据给服务器，使用 serialize() 使表单数据序列化
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('更新用户信息失败！')
                }
                layer.msg('更新用户信息成功！')
                // 调用父页面的方法渲染用户信息
                window.parent.getUserInfo()
            }
        })
    })

})