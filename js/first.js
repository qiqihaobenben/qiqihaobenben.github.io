/**
 * loading后展现的第一屏的所有效果
 * Created by Administrator on 2016/6/4.
 */
window.onload = function (){
    var w = window.innerWidth;
    var h = window.innerHeight;
    var start= document.getElementById('start');
    var straBox = document.getElementById('galaxyBox');
    var change = document.getElementById('change');
    var btn = change.children[0];
    var bs = btn.children;
    var cover = document.getElementById('cover');
    var text = document.getElementById('content');
    var aBtn = text.getElementsByTagName('a')[0];

    var user = window.navigator.userAgent.toLowerCase();
    if(user.indexOf('trident') != -1 ){
        straBox.style.display = "none";
        change.style.display = "none";
        text.style.display = "block";
    }else {
        //星空转动
        var deg = -90;
        var starWind = document.getElementById('galaxy');
        starWindRound(0.2,360);

        //鼠标移入,鼠标点击继续，显示背景图
        btn.addEventListener('mouseenter',function (){
            bs[0].style.height = 53+"px";
            bs[1].style.width = 201+"px";
            bs[2].style.height = 53+"px";
            bs[3].style.width = 201+"px";
        },false);
        btn.addEventListener('mouseleave',function (){
            bs[0].style.height = 0+"px";
            bs[1].style.width = 0+"px";
            bs[2].style.height = 0+"px";
            bs[3].style.width = 0+"px";
        },false);
        btn.addEventListener('click',function (){
            starWindRound(0.2,deg+1);
        },false);

        //星星闪烁
        var canvas = document.getElementById('canvas');
        canvas.width = w;
        canvas.height = h;
        var content = canvas.getContext('2d');
        var img = new Image();
        img.src = "images/star.png";//插入连续帧图片
        var index = 0;
        var arr = [];
        //timer每5s出现一次星星
        canvas.timer = setInterval(drawStar,5000);
    }

    //点击出现流星，流星划过后，背景图渐隐，首页出现
    aBtn.addEventListener('click',function(){
        var comet = document.getElementById('comet');
        text.style.display = "none";
        var obj = {
            element: comet,
            time: 1500,
            target: {"left": w+400,"top": 300},
            type: "linear"
        };
        var startObj = {
            element: start,
            time: 800,
            target: {opacity: 0},
            type: "linear",
            callBack: function (){
                start.style.display = "none";
                clearTimeout(start.timer);
                pageOneCanvas();
            }
        };
        cTween(obj);
        start.timer = setTimeout(function (){
            cTween(startObj);
        },1400);
    },false);


    //星空转动函数
    function starWindRound(num,preDeg){
        clearInterval(starWind.timer);
        starWind.timer = setInterval(function (){
            deg += num;
            starWind.style.transform = 'rotateY('+deg+'deg)';
            if(deg >= preDeg){
                clearInterval(canvas.timer);
                clearInterval(starWind.timer);
                clearInterval(canvas.timer);
                straBox.style.display = "none";
                change.style.display = "none";
                canvas.style.display = "none";
                cover.style.display = "block";
                text.style.display = "block";
                var obj = {
                    element: cover,
                    time: 400,
                    target: {"opacity": 0},
                    type: "linear",
                    callBack: function(){
                        cover.style.display = "none";
                    }
                };
                cTween(obj);
            }
        },50);
    }


    //画星星
    function drawStar(){
        arr.length = 0;
        var nub = Math.random()*2+1;//每次出现1-3颗星星
        for(var i = 0; i < nub; i++){
            var obj = {};       //每颗星星的位置随机生成，存到对象中
            obj.disX = Math.random()*w - 100;
            obj.disY = Math.random()*h - 100;
            arr.push(obj);      //把生成的对象放到数组中
        }
        canvas.timerStar = setInterval(function (){
            clearTimeout(canvas.timerClear);
            for(var i = 0; i < arr.length; i++){
                content.drawImage(img,index*40,0,40,40,arr[i].disX,arr[i].disY,40,40);
            }
            canvas.timerClear = setTimeout(function (){    //延迟80ms清空整个区域
                    content.clearRect(0,0,w,h);
                index++;
                if(index >= 7){     //连续帧走完后重置，关闭生成个清空星星的定时器
                    index = 0;
                    clearTimeout(canvas.timerClear);
                    clearInterval(canvas.timerStar);
                }},80)
        },90);
    }
};