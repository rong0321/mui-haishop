$(function () {
    localStorage.setItem('returnUrl',location.href);

    var id = parseInt(getParamsByUrl(location.href, 'id'));
    // console.log(id);

    // 渲染数据
    $.ajax({
        url: '/product/queryProductDetail',
        type: 'get',
        data: {
            id: id
        },
        success: function (res) {

            console.log(res);
            if (!res.error) {

                var size = res.size.split('-');
                var start = parseInt(size[0]);
                var end = parseInt(size[1]);

                res.size = [];
                for (var i = start; i <= end; i++) {
                    res.size.push(i);
                }

                var html = template('detailTpl', res);
                $('.mui-content').html(html);


            }


        }




    })

    //dom结构渲染完毕后,初始化轮播图和numbox功能
    setTimeout(function () {
        mui('.mui-numbox').numbox();

        var gallery = mui('.mui-slider');
        gallery.slider({
            interval: 0//自动轮播周期，若为0则不自动播放，默认为0；
        });
    }, 200)


    //选择尺寸
    $('.mui-content').on('click', '.sizeBtn', function () {
        // alert(123);
        $(this).addClass('active').siblings().removeClass('active')

    })


    var flag = false;
    //添加购物车
    $('.mui-content').on('click','#addCart',function(){
        $.ajax({
            url:'/user/queryUserMessage',
            type:'get',
            // 此处为防止加载剩余页面,应改为同步请求
            async:false,
            success:function(res){
                // console.log(res);
                if(res.error && res.error == 400){
                    flag = true;
                    location.href = 'login.html';
                    return;
                }
                if(!res.error){
                    userInfo = res;
                    // console.log(userInfo);
                    
                }
                
            }
        })
        if(flag) return;
        var sizenum = $('.active').html();
        // console.log(sizenum);
        var number = $('.mui-numbox-input').val();
        var id = $(this).data('id')
        console.log(id);
        console.log(number);
        if(!sizenum){
            mui.alert('请选择尺码');
            return;
        }

        $.ajax({
            url:'/cart/addCart',
            type:'post',
            data:{
                productId:id,
                num:number,
                size:sizenum
            },
            success:function(res){
                if(res.success){
                    mui.confirm('添加成功,去购物车看看?',function(message){
                        if(message.index == 1){
                            location.href = 'cart.html'
                        }
                    })
                }
            }


        })





    })

















})