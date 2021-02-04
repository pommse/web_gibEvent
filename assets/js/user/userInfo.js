$(function () {
    // 获取用户数据填充在表单中
    initUserInfo()
    var layer = layui.layer
    var form = layui.form

    function initUserInfo() {
        $.ajax({
            method: 'GET',
            url: '/my/userinfo',
            success(res) {
                console.log(res);
                if (res.status !== 0) {
                    return layer.msg('请求信息失败')
                }
                console.log(res);
                form.val('formUserInfo', res.data)
            }
        })
    }

    // 重置,复原原用户信息
    $('#btnReset').on('click', function (e) {
        e.preventDefault();
        initUserInfo()
    })

    // 修改后重新提交用户信息
    $('.layui-form').on('submit', function (e) {
        var data = $(this).serialize()
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: '/my/userinfo',
            data,
            success(res) {
                if (res.status !== 0) {
                    return layer.msg('提交信息失败')
                }
                layer.msg('提交信息成功')
                console.log(window.parent);
                window.parent.getUserInfo();
            }
        })

    })

})