$(function () {

    $('#login-btn').on('click', function () {


        var username = $('[name = username]').val().trim();
        var password = $('[name = password]').val().trim();

        if (!username) {
            mui.alert('请输入用户名');
            return;
        }
        if (!password) {
            mui.alert('请输入密码');
            return;
        }

        $.ajax({
            url: '/user/login',
            type: 'post',
            data: {
                username: username,
                password: password
            },
            beforeSend: function () {

                $('#login-btn').html('正在登录...');

            },
            success: function (res) {

                if (res.success) {

                    mui.toast('登陆成功');

                    setTimeout(() => {
                        $('#login-btn').html('登录');
                        if(localStorage.getItem('returnUrl')){
                            location.href = localStorage.getItem('returnUrl')
                            localStorage.removeItem('returnUrl')
                        }else{
                            location.href = 'user.html';
                        }
                    }, 1000);

                } else {
                    mui.toast(res.message);
                    setTimeout(() => {
                        $('#login-btn').html('登录');
                    }, 1000);
                }


            }








        })








    })


















})