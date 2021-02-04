$(function () {
    // 获取服务器数据
    var layer = layui.layer
    var form = layui.form

    function getCateList() {
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success(res) {
                console.log(res);
                var htmlStr = template('tpl-table', res)
                $('tbody').html(htmlStr)
            }
        })
    }
    getCateList()

    // 点击添加按钮展示弹出层
    $('#btnAddCate').on('click', function () {
        var index = layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '添加文章分类',
            content: $('#dialog-add').html()
        })
        //  通过代理的形式， 为 form - add 表单绑定 submit 事件
        $('body').on('submit', '#form-add', function (e) {
            e.preventDefault();
            $.ajax({
                method: 'POST',
                url: '/my/article/addcates',
                data: $(this).serialize(),
                success(res) {
                    if (res.status !== 0) {
                        return layer.msg('新增分类失败！')
                    }
                    getCateList()
                    layer.msg('新增分类成功！')
                    // 根据索引，关闭对应的弹出层
                    layer.close(index)
                }
            })
        })
    })
    var indexEdit = null
    $('tbody').on('click', '#btn-edit', function () {
        indexEdit = layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '添加文章分类',
            content: $('#dialog-edit').html()
        })
        var id = $(this).parent().attr('data-id')
        console.log(id);
        $.ajax({
            method: 'GET',
            url: '/my/article/cates/' + id,
            success: function (res) {
                console.log(res.data);
                form.val('form-edit', res.data)
            }
        })
    })

    // 提交修改后的数据渲染表格
    $('body').on('submit', '#form-edit', function (e) {
        e.preventDefault()
        console.log($(this).serialize());
        $.ajax({
            method: 'POST',
            url: '/my/article/updatecate',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('更新分类数据失败！')
                }
                layer.msg('更新分类数据成功！')
                layer.close(indexEdit)
                getCateList()
            }
        })
    })
    // 删除功能
    $('tbody').on('click', '.btn-delete', function () {
        var id = $(this).parent().attr('data-id')
        // 提示用户是否要删除
        var index = layer.confirm('确认删除?', {
                icon: 3,
                title: '提示'
            },
            function (index) {
                $.ajax({
                    method: 'GET',
                    url: '/my/article/deletecate/' + id,
                    success: function (res) {
                        if (res.status !== 0) {
                            return layer.msg('删除分类失败！')
                        }
                        layer.msg('删除分类成功！')
                        layer.close(index)
                        getCateList()
                    }
                })
            })
    })
})