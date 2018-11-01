$(function(){

    // 获取验证码
    $('.vcode').on('click',function(){

        $.ajax({
            url:'/user/vCodeForUpdatePassword',
            type:'get',
            success:function(res){
                console.log(res.vCode);
                mui.toast('验证码为'+res.vCode);
            }
        })
    })

    // 给修改按钮注册事件
    $('#modify-btn').on('tap',function(){
        
        var originPass = $('[name = originPass]').val().trim();
        var newPass = $('[name = newPass]').val().trim();
        var confirmNewPass = $('[name = confirmNewPass]').val().trim();
        var vCode = $('[name = vCode]').val().trim();

        if(!originPass){
            mui.alert('请输入用户名');
            return;
        }
        if(!newPass){
            mui.alert('请输入密码');
            return;
        }
        if(newPass != confirmNewPass){
            mui.alert('两次输入密码不一致');
            return;
        }
        if(!vCode){
            mui.alert('请输入验证码');
            return;
        }
        $.ajax({
            url:'/user/updatePassword',
            type:'post',
            data:{
                oldPassword:originPass,
                newPassword:newPass,
                vCode:vCode
            },
            success:function(res){
                
                if(res.success){

                    mui.toast('修改成功');

                    setTimeout(() => {
                        location.href = 'login.html';
                    }, 2000);

                }
                
            }




        })

        
    })









})