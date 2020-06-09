Cookies.set('user', JSON.stringify(user)); //传递用户数据
Cookies.set('address', JSON.stringify(address));//传递地址数据
Cookies.set('cart', JSON.stringify(cart)); //传递购物车数据
Cookies.set('order', JSON.stringify(order)); //传递购物车数据
Cookies.set('orderDetail', JSON.stringify(orderDetail)); //传递购物车数据
Cookies.set('init', 'true');

//banner轮播图区域
//1.找到所有的indicators绑定点击事件
var indicators = document.querySelectorAll('ul.banner-indicators>li');
for(var i = 0; i < indicators.length; i++){
	indicators[i].index = i;
	indicators[i].onclick = function(){
		//判断是不是已经处于激活
		if(this.className.indexOf('active') !== -1) return;
		//调用bannerToggle绑定第几个激活
		bannerToggle(this.index);
	};
}
//为prev和next绑定点击事件
document.querySelector('.banner-btn-prev').onclick = function() {
	//控制indicators切换
	//1.1当前谁是激活的他的序号是多少，
	var index = document.querySelector('ul.banner-indicators>li.active').index;
	//根据当前激活的算出下一个激活的序号是多少
	index = index === 0 ? indicators.length - 1 : index - 1;
	bannerToggle(index);
}
//为next绑定点击事件
document.querySelector('.banner-btn-next').onclick = function() {
	//控制indicators切换
	//1.1当前谁是激活的他的序号是多少，
	var index = document.querySelector('ul.banner-indicators>li.active').index;
	//根据当前激活的算出下一个激活的序号是多少
	index = index === indicators.length - 1 ? 0 :index + 1;
	//1.2让档期那处于激活的不激活
	bannerToggle(index);
};	
function bannerToggle(index) {
	document.querySelector('ul.banner-indicators>li.active').className = '';
		//1.3让该激活的激活
	indicators[index].className = 'active';
		// 2,控制slide滑动
	document.querySelector('ul.banner-slide').style.marginLeft = '-' + index + '00%';
}
/*自动播放*/
var timer = null;
function autoPlay() {
	timer = setInterval(function(){
		var index = document.querySelector('ul.banner-indicators>li.active').index;
		//根据当前激活的算出下一个激活的序号是多少
		index = index === indicators.length - 1 ? 0 :index + 1;
		//1.2让档期那处于激活的不激活
		bannerToggle(index);
	},6000);
}
//给整个banner绑定鼠标滑入和滑出事件
document.querySelector('.banner').onmouseover = function(){
	clearInterval(timer);
};
document.querySelector('.banner').onmouseout = function(){
	autoPlay();
};
autoPlay();
//左边定位/右边定位
var indexLeft = document.querySelector('.m-indexleft-wrapper').offsetTop;
var indexRight = document.querySelector('.rightBarfix-wrapper').offsetTop;
window.onscroll = function(){
	var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
	var target = document.querySelector('.m-indexleft-wrapper');
	var targetRight = document.querySelector('.rightBarfix-wrapper');
	if(scrollTop >= indexLeft ){
		target.className = 'm-indexleft-wrapper fix';
		target.style.left = target.offsetLeft;
	}else{
		target.className = 'm-indexleft-wrapper';
	}
	if(scrollTop >= indexRight ){
		targetRight.className = 'rightBarfix-wrapper fix';
		targetRight.style.left = targetRight.offsetLeft;
	}else{
		targetRight.className = 'rightBarfix-wrapper';
	}
};

//cont右边区域part1部分
var partyIndicators = document.querySelectorAll('ul.party-indicators>li');
for( var i = 0; i < partyIndicators.length; i++){
	partyIndicators[i].index = i;
	partyIndicators[i].onclick = function(){
		if(this.className.indexOf('active') !== -1) return;
		partyToggle(this.index);	
	};
}
function partyToggle(index){
	document.querySelector('ul.party-indicators>li.active').className = '';
	//让该激活的激活
	partyIndicators[index].className = 'active';
	//2.0控制slide滑动
	document.querySelector('ul.party-slide').style.marginLeft = '-' + index + '00%';
}
function autoPlay2() {
	timer = setInterval(function(){
		var index = document.querySelector('ul.party-indicators>li.active').index;
		//根据当前激活的算出下一个激活的序号是多少
		index = index === partyIndicators.length - 1 ? 0 : index + 1;
		partyToggle(index);
	},5000);
}
document.querySelector('.party').onmouseover = function(){
	clearInterval(timer);
};
document.querySelector('.party').onmouseout = function(){
	autoPlay2();
};
autoPlay2();

//cont右边区域part2部分
var party2Indicators = document.querySelectorAll('ul.party2-indicators>li');
for( var i = 0; i < party2Indicators.length; i++){
	party2Indicators[i].index = i;
	party2Indicators[i].onclick = function(){
		if(this.className.indexOf('active') !== -1) return;
		party2Toggle(this.index);	
	};
}
function party2Toggle(index){
	document.querySelector('ul.party2-indicators>li.active').className = '';
	//让该激活的激活
	party2Indicators[index].className = 'active';
	//2.0控制slide滑动
	document.querySelector('ul.party2-slide').style.marginLeft = '-' + index + '00%';
}
function autoPlay3() {
	timer = setInterval(function(){
		var index = document.querySelector('ul.party2-indicators>li.active').index;
		//根据当前激活的算出下一个激活的序号是多少
		index = index === party2Indicators.length - 1 ? 0 : index + 1;
		party2Toggle(index);
	},5000);
}
document.querySelector('.party2').onmouseover = function(){
	clearInterval(timer);
};
document.querySelector('.party2').onmouseout = function(){
	autoPlay3();
};
autoPlay3();
//cont右边区域part3部分
var party3Indicators = document.querySelectorAll('ul.party3-indicators>li');
for( var i = 0; i < party3Indicators.length; i++){
	party3Indicators[i].index = i;
	party3Indicators[i].onclick = function(){
		if(this.className.indexOf('active') !== -1) return;
		party3Toggle(this.index);	
	};
}
function party3Toggle(index){
	document.querySelector('ul.party3-indicators>li.active').className = '';
	//让该激活的激活
	party3Indicators[index].className = 'active';
	//2.0控制slide滑动
	document.querySelector('ul.party3-slide').style.marginLeft = '-' + index + '00%';
}
function autoPlay4() {
	timer = setInterval(function(){
		var index = document.querySelector('ul.party3-indicators>li.active').index;
		//根据当前激活的算出下一个激活的序号是多少
		index = index === party3Indicators.length - 1 ? 0 : index + 1;
		party3Toggle(index);
	},5000);
}
document.querySelector('.party3').onmouseover = function(){
	clearInterval(timer);
};
document.querySelector('.party3').onmouseout = function(){
	autoPlay4();
};
autoPlay4();
//cont右边区域part4部分
var party4Indicators = document.querySelectorAll('ul.party4-indicators>li');
for( var i = 0; i < party4Indicators.length; i++){
	party4Indicators[i].index = i;
	party4Indicators[i].onclick = function(){
		if(this.className.indexOf('active') !== -1) return;
		party4Toggle(this.index);	
	};
}
function party4Toggle(index){
	document.querySelector('ul.party4-indicators>li.active').className = '';
	//让该激活的激活
	party4Indicators[index].className = 'active';
	//2.0控制slide滑动
	document.querySelector('ul.party4-slide').style.marginLeft = '-' + index + '00%';
}
function autoPlay5() {
	timer = setInterval(function(){
		var index = document.querySelector('ul.party4-indicators>li.active').index;
		//根据当前激活的算出下一个激活的序号是多少
		index = index === party4Indicators.length - 1 ? 0 : index + 1;
		party4Toggle(index);
	},5000);
}
document.querySelector('.party4').onmouseover = function(){
	clearInterval(timer);
};
document.querySelector('.party4').onmouseout = function(){
	autoPlay5();
};
autoPlay5();


