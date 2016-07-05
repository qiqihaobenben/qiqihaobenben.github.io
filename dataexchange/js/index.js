/**
 * Created by Administrator on 2016/7/3.
 */
function baidu(data){
    var str = '';
    data.s.forEach(function (ele,i){
        str += '<li class="list-group-item">'+ele+'</li>';
    });
    $('#searchList').html(str);
    $('#sc').remove();

}
$(function (){
    $('#searchList').on('click',function (ev){
        if(ev.target.tagName == 'LI'){
            var hrefPath = 'https://www.baidu.com/s?ie=utf-8&f=8&rsv_bp=1&rsv_idx=2&tn=sitehao123_15&wd='+ev.target.innerHTML+'&rsv_pq=d71055970058730d&rsv_t=b9cawZ7fVJsTLWvbr%2BNh%2Bjj0oXn%2BWm47L3cKSs3TesDwFmTqXQcjw2yCljpezktPB%2Bjdow&rqlang=cn&rsv_enter=1&rsv_sug3=49&rsv_sug1=31&rsv_sug7=100&bs=%E8%A5%BF%E4%BA%8C%E6%97%97%E5%A4%96%E5%8C%85%E5%85%AC%E5%8F%B8';
        }
        $('#searchList').html('');
        window.open(hrefPath);
    });
    $('#text').on('keyup',function (){
        if($(this).val()){
            var $sc = $('<script></script>');
            var str = 'https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su?wd='+$(this).val()+'&json=1&p=3&sid=1434_18203_20515_18240_20536_17944_20538_20415_20455_19861_17001_15168_11815&req=2&bs=%E8%A5%BF%E4%BA%8C%E6%97%97%E5%A4%96%E5%8C%85%E5%85%AC%E5%8F%B8&pbs=%E8%A5%BF%E4%BA%8C%E6%97%97%E5%A4%96%E5%8C%85%E5%85%AC%E5%8F%B8&csor=1&cb=baidu';
            $sc.attr({'src':str,'id':'sc'});
            $('body').append($sc);
        }else {
            $('#searchList').html('');
        }
    });
});
window.onload = function (){
    var curTime = new Date().getTime*1000;
    $.ajax({
        url:'http://api.1-blog.com/biz/bizserver/news/list.do',
        dataType:'json',
        data:{
            max_behot_time: curTime,
            size: 20
        },
        success: function (data){
            console.log(data);
        }
    })
};

