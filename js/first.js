/**
 * loading后展现的第一屏的所有效果
 * Created by Administrator on 2016/6/4.
 */
window.onload = function (){
    console.log('****又来看我的控制台啦？！！还不赶紧打电话邀约!****');
    console.log('**********代码风骚,不怕BUG**************');
    console.log('********************姓名：陈方旭*******************');
    console.log('*********邮箱：chenfangxu_qixin.163.com************');
    console.log('******************电话：13522216755****************');
    var oneTimer = null;
    var w = window.innerWidth;
    var h = window.innerHeight;
    var loading = document.getElementById('loading');
    var start= document.getElementById('start');
    // var straBox = document.getElementById('galaxyBox');
    // var change = document.getElementById('change');
    // var btn = change.children[0];
    // var bs = btn.children;
    var cover = document.getElementById('cover');
    var text = document.getElementById('content');
    var aBtn = text.getElementsByClassName('aBtn')[0];
    //loading页面结束
        loading.style.opacity = 0;
        loading.style.animation = '';
        loading.timer = setTimeout(function (){
            loading.style.display = 'none';
            clearTimeout(loading.timer);
        },1000);
    //判断浏览器是不是IE，如果是IE取消星空转动效果
    /* var user = window.navigator.userAgent.toLowerCase();
    if(user.indexOf('trident') != -1 ){
        straBox.style.display = "none";
        change.style.display = "none";
        text.style.display = "block";
    }else {
        //星空转动
        var deg = -90;
        var starWind = document.getElementById('galaxy');
        starWindRound(0.2,-30);

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
            starWindRound(0.5,deg+3);
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
    } */
    text.style.display = "block";

    //点击出现流星，流星划过后，背景图渐隐，首页出现
    aBtn.addEventListener('click',function(){
        var comet = document.getElementById('comet');
        var main = document.getElementById('main');
        var header = document.getElementById('header');
        text.style.display = "none";
        var obj1 = {
            element: comet,
            time: 1500,
            target: {"left": w+400,"top": 300},
            type: "linear"
        };
        var startObj = {
            element: start,
            time: 500,
            target: {opacity: 0},
            type: "linear",
            callBack: function (){
                text.style.display = 'none';
                start.style.display = "none";
                main.style.display = "block";
                header.style.display = "block";
                clearTimeout(start.timer);
                pageOneCavans();
                pageOneText();
            }
        };
        cTween(obj1);
        start.timer = setTimeout(function (){
            cTween(startObj);
        },1000);
    },false);
    //pageOne文字上浮效果函数
    function pageOneText(){
        var name = document.getElementsByClassName('name')[0];
        var personText = document.getElementsByClassName('personText')[0];
        var objText = {
            element: personText,
            time: 500,
            target: {"top": 300,"opacity": 100},
            type: "linear"
        };
        var objName = {
            element: name,
            time: 500,
            target: {"top": 250,"opacity": 100},
            type: "linear",
            callBack: function (){
                cTween(objText);
            }
        };
        cTween(objName);
    }


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

//画布运动
function pageOneCavans(){
    var width, height, canvas, ctx, points, target, animateOff = true;
    init();
    initAnimate();
    addListener();

    //初始化函数
    function init(){
        width = window.innerWidth;
        height = window.innerHeight;
        target = {
            x: width/2,
            y: height/2
        };
        canvas = document.getElementById('oneCanvas');
        canvas.width = width;
        canvas.height = height;
        ctx = canvas.getContext('2d');
        points = [];
        for(var x = 0; x < width; x += width/20){
            for(var y = 0; y < height; y += height/20){
                var px = x + Math.ceil(Math.random()*width/20);
                var py = y + Math.ceil(Math.random()*height/20);
                points.push({x: px, originX: px, y: py, originY: py})
            }
        }
        for(var i = 0; i < points.length; i++){
            var closest = [];
            var p1 = points[i];
            for(var j = 0; j < points.length;j++){
                var p2 = points[j];
                if(p1 != p2){
                    var off = false;
                    //找到5个点，放到closest数组中
                    for(var k = 0; k < 5; k++){
                        if(!off){
                            if(!closest[k]){
                                closest[k] = p2;
                                off = true;
                            }
                        }
                    }
                    //再遍历剩下的各个点，如果有比之前5个近的，就把原来的替换掉
                    for(var k = 0; k < 5; k++){
                        if(!off){
                            if(getDistance(p1,p2) < getDistance(p1,closest[k])){
                                closest[k] = p2;
                                off = true;
                            }
                        }
                    }
                }
            }
            p1.closest = closest;
        }
        for(var i in points){
            var c = new Circle(points[i],2*Math.random()*2);
            points[i].Circle = c;
        }
    }

    //运动有关
    //加入缓动的运动函数
    function initAnimate(){
        //animate();
        clearInterval(oneTimer);
        oneTimer = setInterval(animate,150);
        for(var i in points){
            changePoint(points[i]);
        }
    }
    //运动的函数
    function animate(){
        if(animateOff){
            ctx.clearRect(0,0,width,height);
            for(var i in points){
                if(Math.abs(getDistance(points[i],target)) < 4000){
                    points[i].active = 0.3;
                    points[i].Circle.active = 0.6;
                }else  if(Math.abs(getDistance(points[i],target)) < 20000) {
                    points[i].active = 0.1;
                    points[i].Circle.active = 0.3;
                }else  if(Math.abs(getDistance(points[i],target)) < 40000) {
                    points[i].active = 0.02;
                    points[i].Circle.active = 0.1;
                }else {
                    points[i].active = 0;
                    points[i].Circle.active = 0;
                }
                drawLine(points[i]);
                points[i].Circle.draw();
            }
        }
        //requestAnimationFrame(animate);
    }

    //缓动函数，实现动画
    function changePoint(p){
        TweenLite.to(p,1+1*Math.random(), {x:p.originX-50+Math.random()*100,
            y: p.originY-50+Math.random()*100, ease:Tween.easeInOut,
            onComplete: function() {
                changePoint(p);
            }})
    }

    //事件有关
    //添加事件
    function addListener(){
        pageOne.addEventListener('mousemove',move);
        addWheel(main,function (down){
            scrollCheck();
        });
        window.addEventListener('resize',resize);
    }
    //鼠标移动，重新获取中心点
    function move(e){
        var curx = cury = 0;
        if(e.pageX){
            curx = e.pageX;
            cury = e.pageY;
        }else if(e.clientX){
            curx = e.clientX;
            cury = e.clientY;
        }
        target.x = curx;
        target.y = cury;
    }
    //滚动检查
    function scrollCheck(){
        if(nub != 0){
            animateOff = false;
        }else {
            animateOff = true;
        }
    }
    //浏览器窗口改变时的函数
    function resize(){
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;
    }

    //画布有关
    //drawLine函数
    function drawLine(p){
        if(!p.active) return;
        ctx.beginPath();
        for(var i in p.closest){
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p.closest[i].x, p.closest[i].y);
            ctx.strokeStyle = 'rgba(226,252,236,'+ p.active+')';
            ctx.stroke();
        }
    }

    //构造一个Circle函数
    function Circle(position,radius){
        this.position = position || 0;
        this.radius = radius || 0;
        this.draw = function (){
            if(!this.active) return;
            ctx.beginPath();
            ctx.arc(this.position.x,this.position.y,this.radius,0,2*Math.PI,false);
            ctx.fillStyle = 'rgba(226,252,236,'+ this.active+')';
            ctx.fill();
        };
    }


    //找最近点函数
    function getDistance(p1,p2){
        return Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y,2);
    }
}
