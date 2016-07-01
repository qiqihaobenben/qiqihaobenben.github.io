/**
 * Created by Administrator on 2016/7/1.
 */

//图片懒加载
window.onload = window.onscroll = function (){
    imgLoad();
};
$(function (){
    listHover();
    btnChange();
    $('#wrap').click(function (){
        alert('链接无效，正在开发中');
    })
});

function listHover(){
    var timer = null;
    $('.bannerList li').mouseover(function (){
        $('.bannerList').find('ul').css('display','none');
        clearTimeout(timer);
        $(this).find('ul').css({
            'display': 'block'
        })
    });
    $('.bannerList li').mouseout(function(){(function (that){
        timer = setTimeout(function(){$(that).find('ul').css({
            'display': 'none'
        })},200)
    })(this)
    })

}
function imgLoad(){
    var $main = $('#main');
    $main.find('img').each(function (index,ele){
        if($(ele).offset().top <= window.innerHeight + window.pageYOffset){
            setTimeout(function(){
                if(ele.getAttribute('_src')){
                    $(ele).attr('src',$(ele).attr('_src')).css('opacity',1);
                    $(ele).removeAttr('_src');
                }
            },500);
        }
    })
}

function btnChange(){
    $('.searchType').children().click(function (){
        $('.searchType').children().removeClass('btnColor');
        $(this).addClass('btnColor');

        if($(this).text() == '宝贝'){
            console.log( $('.searchBox:first-child')[0])
            $('.searchBox').find('input').attr('placeholder','那些适合夏天背的帆布包');
        }else {
            $('.searchBox').find('input').attr('placeholder','');
        }
    })
}