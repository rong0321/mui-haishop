$(function () {

    var address;
    // 渲染已存在的地址
    $.ajax({
        type: "get",
        url: "/address/queryAddress",
        success: function (res) {
            // console.log(res);
            address = res;
            var html = template('addressTpl', {
                data: res
            });

            $('#addressBox').html(html);

        }
    });


    // 删除按钮事件
    $('#addressBox').on('tap', '.deleteBtn', function () {

        var id = $(this).data('id');
        var li = $(this).parent().parent()[0];
        mui.confirm('确定删除吗?', function (message) {
            // console.log(message);
            
            // console.log(id);
            // console.log(li);
            if (message.index == 0) {
                // 让滑动出来的li回去
                mui.swipeoutClose(li);
                return;
            } else {

                $.ajax({
                    url: '/address/deleteAddress',
                    type: 'post',
                    data: {
                        id: id,
                    },
                    success: function (res) {

                        if (res.success) {

                            location.reload();

                        } else {

                            mui.toast('删除失败');
                            return;

                        }


                    }



                })


            }



        })


    })


    // 编辑按钮事件
    $('#addressBox').on('tap', '.editBtn', function (){
        var id = $(this).data('id');

        for(var i = 0;i<address.length;i++){
            if(address[i].id == id){
                localStorage.setItem('editAddress',JSON.stringify(address[i]));
            }
        }

        location.href = 'addAddress.html?isEdit=1';



    })










})