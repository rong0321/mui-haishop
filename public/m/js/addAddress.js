$(function () {

    // 创建picker
    var picker = new mui.PopPicker({
        layer: 3
    });

    // 传入数据
    picker.setData(cityData);

    // 显示data
    $('#addressForm').on('tap','#selectCity',function () {

        picker.show(function (selectItem) {

            // console.log(selectItem);
            $('#selectCity').val(selectItem[0].text + selectItem[1].text + selectItem[2].text);
        })


    })

    // 获取isEdit参数
    var isEdit = parseInt(getParamsByUrl(location.href, 'isEdit'));

    // console.log(isEdit);
    if(isEdit){
        $('.title').html('编辑收货地址');
    }else{
        $('.title').html('添加收货地址');
    }

    // 渲染本地储存里的数据
    var editAddress = JSON.parse(localStorage.getItem('editAddress'));
    // console.log(editAddress);
    var id = isEdit ? editAddress.id : null;
    // console.log(id);
    
    // 如果是添加操作则让该数据变为空对象
    editAddress = isEdit ? editAddress : {};
    var html = template('editTpl',editAddress);

    $(html).insertBefore($('.mui-button-row'));
    






    // 给添加按钮绑定事件
    $('#addAddress').on('tap', function () {

        var recipients = $.trim($('[name = recipients]').val());
        var postcode = $.trim($('[name = postcode]').val());
        var address = $.trim($('[name = address]').val());
        var addressDetail = $.trim($('[name = addressDetail]').val());

        // console.log(postcode);


        if (!recipients) {
            mui.toast('请输入收货人');
            return;
        }
        if (!postcode) {
            mui.toast('请输入邮编');
            return;
        }
        if (!address) {
            mui.toast('请选择省市区');
            return;
        }
        if (!addressDetail) {
            mui.toast('请输入详细地址');
            return;
        }

        if (isEdit) {
            // 编辑操作,调编辑接口
            $.ajax({
                url:'/address/updateAddress',
                type:'post',
                data:{
                    id:id,
                    address:address,
                    recipients:recipients,
                    postcode:postcode,
                    addressDetail:addressDetail
                },
                success:function(res){
                    if(res.success){

                        mui.toast('编辑成功');
                        setTimeout(() => {
                            location.href = 'address.html';
                        }, 1500);

                    }else{
                        mui.toast(res.message);
                        return;
                    }

                }

            })


        } else {
            // 新增操作,调新增接口
            $.ajax({
                url: '/address/addAddress',
                type: 'post',
                data: {
                    address: address,
                    addressDetail: addressDetail,
                    postcode: postcode,
                    recipients: recipients
                },
                success: function (res) {

                    if (res.success) {

                        location.href = 'address.html';

                    } else {
                        mui.toast('添加失败');
                        return;
                    }



                }



            })
        }


    })


    









})