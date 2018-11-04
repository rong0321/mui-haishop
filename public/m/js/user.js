// 用户如果登录,因为是同步请求,所以需要保存返回的信息,
var userInfo;
// 判断用户登录情况
$.ajax({
    url:'/user/queryUserMessage',
    type:'get',
    // 此处为防止加载剩余页面,应改为同步请求
    async:false,
    success:function(res){
        // console.log(res);
        if(res.error && res.error == 400){
            location.href = 'login.html';
        }
        if(!res.error){
            userInfo = res;
            // console.log(userInfo);
            
        }
        
    }
})





$(function(){
    FastClick.attach(document.body);
    // 退出登录
    $('.logout').on('click',function(){

        mui.confirm('确认退出登录吗',function(message){
            if(message.index == 0){
                return;
            }else{
                $.ajax({
                    url:'/user/logout',
                    type:'get',
                    success:function(res){
        
                        if(res.success){
                            
                            mui.toast('退出成功');
                            localStorage.removeItem('returnUrl');
        
                            setTimeout(() => {
                                location.href = 'index.html';
                            }, 2000);
        
                        }
        
                    }
                })
            }
        })  

        



    })


    // 渲染用户信息
    var html = template('userInfoTpl',userInfo);
    $('#userInfo').html(html);

    






})