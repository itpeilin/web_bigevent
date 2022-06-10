$(function() {

    var layer = layui.layer
    var form = layui.form
    initArtCateList()

    function initArtCateList() {
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success: function(res) {
                var htmlStr = template('tpl-table', res)
                $('tbody').html(htmlStr)
            }
        })
    }

    //为添加类别按钮绑定点击事件
    var indexAdd = null
    $('#btnAddCate').on('click', function() {
        indexAdd = layer.open({
            type: 1,
            title: '添加文章类别',
            area: ['500px', '250px'],
            content: $('#dialog-add').html()
        });

    })

    // 通过代理的形式，为 form-add 表单绑定 submit 事件
    $('body').on('submit', '#form-add', function(e) {
            e.preventDefault()
            $.ajax({
                method: 'POST',
                url: '/my/article/addcates',
                //使用serialize()这个方法需注意表单中的name要与提交的参数一致
                data: $(this).serialize(),
                success: function(res) {
                    if (res.status !== 0) {
                        return layer.msg('新增分类失败！')
                    }
                    initArtCateList()
                    layer.msg('新增分类成功！')
                        // 根据索引，关闭对应的弹出层
                    layer.close(indexAdd)
                }
            })
        })
        // 通过代理的形式，为 btn-edit 表单绑定 submit 事件
    var indexEdit = null
    $('tbody').on('click', '.btn-edit', function() {
        indexEdit = layer.open({
            type: 1,
            title: '添加文章类别',
            area: ['500px', '250px'],
            content: $('#dialog-edit').html()
        })

        var id = $(this).attr('data-id')
            // 发起请求获取对应分类的数据
        $.ajax({
            method: 'GET',
            url: '/my/article/cates/' + id,
            success: function(res) {
                //layui中将的res.data得到的内容在form表单中进行显示
                form.val('form-edit', res.data)
            }
        })
    })

    // 通过代理的形式，为 form-edit 表单绑定 submit 事件    
    $('body').on('submit', '#form-edit', function(e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/my/article/updatecate',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('分类修改失败！')
                }
                layer.msg('分类修改成功！')
                initArtCateList()
                layer.close(indexEdit)
            }
        })
    })

    // 通过代理的形式，为 btn-delete 表单绑定 submit 事件
    $('tbody').on('click', '.btn-delete', function() {
        var id = $(this).attr('data-id')
        layer.confirm('确定删除这个分类?', { icon: 3, title: '提示' }, function(index) {
            //do something
            $.ajax({
                method: 'GET',
                url: '/my/article/deletecate/' + id,
                success: function(res) {
                    if (res.status !== 0) {
                        return layer.msg('分类删除失败！')
                    }
                    layer.msg('分类删除成功！')
                        // 关闭 confirm 询问框
                    layer.close(index)
                    initArtCateList()
                }
            })

        })
    })
})