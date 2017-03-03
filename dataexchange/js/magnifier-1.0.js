/**
 * Created by cfangxu on 2017/2/22.
 * 商城商品详情页放大镜的插件
 * 依赖jquery >=1.7
 * @multiple 可放大的倍数，默认是2倍
 * @bgColor 暂时只能设置rgba的颜色
 * @canShow 如果因为加载等原因不想鼠标移入还有效果，可以通过给当前元素增加data-show的属性，
 * 当属性值为false时，移入效果终止，知道data-show属性更改为非false等其他值。也可以一开始就设置false来禁止鼠标移入效果
 * @time 设置延迟时间，避免误触发，提高用户体验
 */

;(function ($,window,document,undefined){
    function blowUp(ele,opt){
        this.$element = ele;
        this.defaults = {
            multiple : 2,
            bgColor : 'rgba(0,0,0,0.3)',
            shadeName: 'shade',
            bigImgName: 'bigName',
            index: 0,
            time: 200
        };
        this.options = $.extend({},this.defaults,opt);
        this.canShow = this.$element.children('img').attr('data-show');
        this.imgUrl = this.$element.children('img').attr('src');
        this.prependSting = '<div class="'+this.options.shadeName+'"></div>';
        this.appendSting = '<div class="'+this.options.bigImgName+'"><img src="'+this.imgUrl+'" alt="" style="position:absolute;"></div>';
        this.height = this.$element.innerHeight();
        this.width = this.$element.innerWidth();
        this.offsetLeft = this.$element.offset().left;
        this.offsetTop = this.$element.offset().top;
    }
    blowUp.prototype.init = function (){
        this.$element.css('position','relative')
            .prepend(this.prependSting)
            .append(this.appendSting)
            .find('.'+ this.options.shadeName).css({
            display : 'none',
            'background-color': this.options.bgColor,
            position: 'absolute',
            height: this.height/this.options.multiple + 'px',
            width : this.width/this.options.multiple + 'px',
            cursor: 'move'
        }).end()
            .find('.'+this.options.bigImgName).css({
            display : 'none',
            overflow: 'hidden',
            position: 'absolute',
            left : + this.width + 20 + 'px',
            top : 0,
            height: this.height + 'px',
            width : this.width + 'px'
        });
        this.$shadeEle = $('.'+ this.options.shadeName);
        this.$bigImgEle = $('.'+this.options.bigImgName);
        this.$bigImgEle.children('img').css({
            width: this.width * this.options.multiple + 'px',
            height: this.height * this.options.multiple + 'px'
        });
        this.show();
    };
    blowUp.prototype.show = function (){
        var _this = this;
        this.$element.on('mouseenter',function (){
            _this.canShow = $(this).children('img').attr('data-show');
            if(_this.canShow != "false"){
                _this.options.index = setTimeout(function (){
                    _this.imgUrl = _this.$element.children('img').attr('src');
                    _this.$bigImgEle.children('img').attr('src',_this.imgUrl);
                    _this.$shadeEle.css('display','block');
                    _this.$bigImgEle.css('display','block');
                },_this.options.time);
            }
        });
        this.$element.on('mouseleave',function (){
            clearTimeout(_this.options.index);
            _this.$shadeEle.css('display','none');
            _this.$bigImgEle.css('display','none');
        });
        this.$element.on('mousemove',function (event){
            var positionLeft = 0,
                positionTop = 0;
            positionLeft = event.pageX - _this.offsetLeft - _this.width/(_this.options.multiple * 2);
            positionTop = event.pageY - _this.offsetTop - _this.height/(_this.options.multiple * 2);
            if(positionLeft <= 0){
                positionLeft = 0;
            }else if(positionLeft >= _this.width - _this.width/(_this.options.multiple)){
                positionLeft = _this.width - _this.width/(_this.options.multiple);
            }
            if(positionTop <= 0){
                positionTop = 0;
            }else if(positionTop >= _this.height - _this.height/(_this.options.multiple)){
                positionTop = _this.height - _this.height/(_this.options.multiple);
            }
            _this.$shadeEle.css({
                left: positionLeft,
                top: positionTop
            });
            _this.$bigImgEle.find('img').css({
                left: - positionLeft * _this.options.multiple,
                top: - positionTop * _this.options.multiple
            })
        });
        this.$bigImgEle.on('mouseover',function (){
            _this.$element.trigger('mouseleave');
        });
    };
    $.fn.magnifier = function (options){
        var oneMagnifier = new blowUp(this,options);
        oneMagnifier.init();
        return this;
    }
})(jQuery,window,document)
    


