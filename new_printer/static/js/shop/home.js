$(function (){

	var mark_btn = $('.list-mark-btn'),
		home_slider_l = $('.home-slider-l'),
		home_slider_r = $('.home-slider-r'),
		_li = $('.home-slider-box ul li'),
		home_banner = $('.home-banner ul li'),
		airm_banner = $('.airm-banner a'),
		h_b_l = $('.h-b-l'),
		h_b_r = $('.h-b-r'),
		_liW = _li.width()+56,
		_ulW = _liW*(_li.length-4)-56,
		_len = home_banner.length,
		_index = 0,
		timer;

	setImgSize();
	$('.home-banner ul img').eq(0).on('load',function (){
		setImgSize();
	});

	function setImgSize(){
		var _img = new Image();
		var _src = home_banner.find('img').attr('src'),
			_w = $(window).width(),
			_h;
	
		_img.src = _src;
		_h = (_w/_img.width)*_img.height;
		$('.home-banner ul').css('height',_h);
		$('.home-banner ul li').css('height',_h);
	}

	mark_btn.on('click',function (){
		var _this = $(this),
			_num = _this.attr('data-num');

		toMark(_num);

		// mark 的ajax方法
		function toMark(id){
			$.post('/shop/mark-goods',{ goods_id: id },function (e){
                var data = JSON.parse(e);
                if(data.state == 'SUCCESS'){
                	if(_this.hasClass('active')){
                		_this.removeClass('active');
                	}else {
                		_this.addClass('active');
                	}
                }else {
                	$('.login-page').fadeIn();
                }
            });
		}
	});

	home_slider_r.on('click',function (){
		var _sbox = $(this).parent().find('ul');
		var _left = parseInt(_sbox.css('left').split('px'));
		if(-_left >= 596){
			return false;
		}else {
			_sbox.animate({'left': _left-_liW});
		}
	});

	home_slider_l.on('click',function (){
		var _sbox = $(this).parent().find('ul');
		var _left = parseInt(_sbox.css('left').split('px'));
		if(_left >= 0){
			return false;
		}else {
			_sbox.animate({'left': _left+_liW});
		}
	});

	// 自动轮播
	function setSlider(){

		timer = setInterval(function () {
        	_index++;
	        if (_index >= _len) {
	        	_index = -1;
	        	_index++;
	        	airm_banner.removeClass('active');
	        	airm_banner.eq(_index).addClass('active');
	        	home_banner.eq(_index).fadeIn(1000).siblings().fadeOut(1000);
	        }else {
	        	airm_banner.removeClass('active');
	        	airm_banner.eq(_index).addClass('active');
	            home_banner.eq(_index).fadeIn(1000).siblings().fadeOut(1000);
	        }
	    },5000);
		
	}
	setSlider();

	$( window ).resize(function() {
		setImgSize();
	});

	// 点击左方键
	h_b_l.on('click',function (){
		clearInterval(timer);
		if(_index <= 0){
			_index = _len-1;
		}else {
			_index -= 1;
		}
		airm_banner.removeClass('active');
	    airm_banner.eq(_index).addClass('active');
		home_banner.eq(_index).fadeIn(1000).siblings().fadeOut(1000);
		setSlider();
	});

	// 点击右方键
	h_b_r.on('click',function (){
		clearInterval(timer);
		if(_index >= _len-1){
			_index = 0;
		}else {
			_index += 1;
		}
		airm_banner.removeClass('active');
	    airm_banner.eq(_index).addClass('active');
		home_banner.eq(_index).fadeIn(1000).siblings().fadeOut(1000);
		setSlider();
	});

	airm_banner.on('click',function (){
		clearInterval(timer);
		var _this = $(this);
		_index = _this.index();

		airm_banner.removeClass('active');
	    airm_banner.eq(_index).addClass('active');
		home_banner.eq(_index).fadeIn(1000).siblings().fadeOut(1000);
		setSlider();
	});

})
