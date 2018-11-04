// 判断用户登录情况
function judgeLogin(){
    $.ajax({
        url:'/user/queryUserMessage',
        type:'get',
        // 此处为防止加载剩余页面,应改为同步请求
        async:false,
        success:function(res){
            // console.log(res);
            if(res.error && res.error == 400){
                location.href = 'login.html';
                return;
            }
            if(!res.error){
                userInfo = res;
                // console.log(userInfo);
                
            }
            
        }
    })
}


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