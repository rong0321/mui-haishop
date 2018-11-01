$(function () {

    $('.register').on('click', function () {

        var username = $('[name = username]').val().trim();
        var password = $('[name = password]').val().trim();
        var confirmPass = $('[name = confirmPass]').val().trim();
        var vCode = $('[name = vCode]').val().trim();
        var mobile = $('[name = mobile]').val().trim();

        if(!username){
            mui.alert('请输入用户名');
            return;
        }
        if(!password){
            mui.alert('请输入密码');
            return;
        }
        if(password != confirmPass){
            mui.alert('两次输入密码不一致');
            return;
        }
        if(mobile.length != 11){
            mui.alert('请输入正确的手机号');
            return;
        }
        if(!vCode){
            mui.alert('请输入验证码');
            return;
        }



        // 将获取到的数据传给接口
        $.ajax({
            url:'/user/register',
            type:'post',
            data:{
                username:username,
                password:password,
                mobile:mobile,
                vCode:vCode
            },
            success:function(res){
                // console.log(res);
                if(res.success){
                    mui.toast('恭喜,注册成功');
                    setTimeout(() => {
                        location.href = 'login.html';
                    }, 2000);
                }
                
            }





        })




    })


    // 获取验证码
    $('.vcode').on('click',function(){

        $.ajax({
            url:'/user/vCode',
            type:'get',
            success:function(res){
                console.log(res.vCode);
                mui.toast('验证码为'+res.vCode);
            }
        })





    })










})