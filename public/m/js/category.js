$(function () {

    mui('.mui-scroll-wrapper').scroll({
        deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    });

    mui('.footer').on('tap','a',function(){
        window.top.location.href=this.href;
    });

    // 给一级分类绑定点击事件
    $('.category-first').on('tap', 'li', function () {
        $(this).addClass('active').siblings().removeClass('active');
        // 渲染二级分类
        var id = $(this).data('id');
        // console.log(id);

        $.ajax({
            url: '/category/querySecondCategory',
            type: 'get',
            datatype: 'json',
            data: {
                'id': id
            },
            success: function (res) {
                // console.log(res);
                if (res.rows.length != 0) {
                    var html = template('rightListTPL', res);
                    $('.category-second').html(html);
                } else {
                    // alert('asd');
                    var errorHtml = "<li><p>暂无数据</p></li>";
                    $('.category-second').html(errorHtml);
                }
            }

        })


    })



    // 获取一级分类;直接渲染
    $.ajax({
        url: '/category/queryTopCategory',
        type: 'get',
        datatype: 'json',
        success: function (res) {
            // console.log(res);
            var html = template('leftListTPL', res);

            $('.category-first').html(html);
            // 页面加载执行点击事件
            $('.category-first li:first-of-type').trigger('tap');
        }

    })



    // 搜索按钮跳转功能
    $('.mui-icon-search').on('tap',function(){
        location.href = 'search.html';
    })









})