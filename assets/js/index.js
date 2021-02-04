$(function () {
    var layer = layui.layer
    $('#btnLogout').on('click', function (e) {
        e.stopPropagation();
        layer.confirm('确定退出吗?', {
            icon: 3,
            title: '提示'
        }, function (index) {
            // 清除本地存储的数据
            localStorage.removeItem('token');
            // 返回登录界面    
            location.href = '/login.html';
            layer.close(index);
        });
    })
    // 封装获取用户数据
    getUserInfo();
})

function getUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        // headers: {
        //     Authorization: localStorage.getItem('token')
        // },
        success(res) {
            if (res.status == 0) {
                renderAvatar(res.data)
            }
        },

    })
}


// 封装渲染用户头像和用户名函数
function renderAvatar(user) {
    var name = user.nickname || user.username;
    if (user.user_pic) {
        $('.layui-nav-img').prop('src', user.user_pic).show()
        $('.text-avatar').hide();
    } else {
        $('.layui-nav-img').hide();
        var first = name[0].toUpperCase();
        $('.text-avatar').html(first).show();
    }
    $('#welcome').html('Welcome&nbsp;&nbsp;' + name)
}