// 入口函数
$(function () {
    // 调用 getUserInfo 获取用户基本信息
    getUserInfo()

    let layer = layui.layer

    $('#btnLogout').click(function () {
        // console.log('ok')
        // 提示用户是否退出
        layer.confirm('确定退出登录？', { icon: 3, title: '提示' }, function (index) {
            //do something
            // 1. 清空本地存储的 token
            localStorage.removeItem('token')
            // 2. 重新跳转登录页
            location.href = '/code/login.html'
            // 关闭 confirm 弹出框
            layer.close(index);
        });
    })
})

// 获取用户的基本信息
function getUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        // headers: {
        //     Authorization: localStorage.getItem('token') || ''
        // },
        success: function (res) {
            if (res.status !== 0) {
                return layui.layer.msg('获取信息失败！')
            }
            // 调用renderAvatar 渲染用户头像
            renderAvatar(res.data)
        },
        // 不论成功还是失败，都会执行complete函数, 可以将 complete 函数挂载到 AjaxPrefilter 函数中options上
        // complete: function (res) {
        //     if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
        //         // 1. 强制清空token
        //         localStorage.removeItem('token')
        //         // 2. 跳转回登录页面
        //         location.href = '/code/login.html'
        //     }
        // }
    })
}

function renderAvatar(user) {
    // 1. 获取用户的昵称
    let name = user.nickname || user.username
    // 2. 设置欢迎的文本
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name)
    // 3. 按需渲染用户的头像
    if (user.user_pic !== null) {
        // 3.1 渲染图片头像
        $('.layui-nav-img')
            .attr('src', user.user_pic)
            .show()
        $('.text-avatar').hide()

    } else {
        // 3.2 渲染文字头像
        $('.layui-nav-img').hide()
        let first = name[0].toUpperCase()
        $('.text-avatar').html(first).show()
    }
}