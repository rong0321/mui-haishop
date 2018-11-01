// 获取keyword
var keyword = getParamsByUrl(location.href, 'keyword');
var page = 1;
var html = '';
var priceSort = 1;
var numSort = 1;
var This;
$(function () {

    // 启用fastclick
    FastClick.attach(document.body);


    mui.init({
        pullRefresh: {
            container: '#refreshContainer', //待刷新区域标识，querySelector能定位的css选择器均可，比如：id、.class等
            up: {
                height: 50, //可选.默认50.触发上拉加载拖动距离
                auto: true, //可选,默认false.自动上拉加载一次
                contentrefresh: "正在加载...", //可选，正在加载状态时，上拉加载控件上显示的标题内容
                contentnomore: '没有更多数据了', //可选，请求完毕若没有更多数据时显示的提醒内容；
                callback: getData //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
            }
        }
    });

    // 价格排序
    $('.price').on('click', function () {

        priceSort = priceSort == 1 ? 2 : 1;

        page = 1;
        html = '';


        mui('#refreshContainer').pullRefresh().refresh(true);

        getData();

    })

    // 销量排序
    $('.summary').on('click', function () {

        numSort = numSort == 1 ? 2 : 1;
        
        page = 1;
        html = '';


        mui('#refreshContainer').pullRefresh().refresh(true);

        getData();

    })





});


function getParamsByUrl(url, name) {

    var params = url.substr(url.indexOf('?') + 1);

    var paramArr = params.split('&');

    for (var i = 0; i < paramArr.length; i++) {

        var param = paramArr[i].split('=');

        if (param[0] == name) {
            return param[1];
        }

    }

    return null;

}

function getData() {
    if (!This) {
        This = this;
    }
    // 根据关键字渲染页面
    $.ajax({
        url: '/product/queryProduct',
        type: 'get',
        data: {
            page: page++,
            pageSize: 3,
            price: priceSort,
            num: numSort,
            proName: keyword
        },
        datatype: 'json',
        success: function (res) {

            if (res.data.length > 0) {
                // console.log(res);
                html += template('productTPL', res);

                $('.searchPro').html(html);

                // 告诉浏览器是否加载完成,没有数据了
                This.endPullupToRefresh(false);
            } else {
                This.endPullupToRefresh(true);
            }




        }


    })
}