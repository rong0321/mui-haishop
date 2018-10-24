$(function () {

    // 给搜索按钮注册事件
    $('.searchBtn').on('click', function () {
        // 获取关键字
        var keyword = $('.searchText').val();

        if (!keyword || keyword.trim() == '') {

            alert('请输入搜索内容');
            return;
        }

        if(localStorage.getItem('keywords')){
            var keyarr = JSON.parse(localStorage.getItem('keywords'));
            keyarr.unshift(keyword);
            localStorage.setItem('keywords',JSON.stringify(keyarr));
        }else{
            localStorage.setItem('keywords',JSON.stringify([keyword]));
        }

        location.href = 'searchResult.html?keyword='+keyword;
        // 让搜索框清空,提升用户体验.
        $('.searchText').val('');
    })

    // 渲染搜索历史
    if(localStorage.getItem('keywords')){
        var html = template('historyTPL',{data:JSON.parse(localStorage.getItem('keywords'))});
        $('.mui-table-view').html(html);
    }

    // 清空历史记录
    $('.delete').on('tap',function(){
        localStorage.removeItem('keywords');
        $('.mui-table-view').html('');
    })








})