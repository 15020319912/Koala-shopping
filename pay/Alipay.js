// 先判断去过主页吗？没去过就跳到主页
if(!Cookies.get('init')) window.location.replace('../home/index.html');

if (document.referrer.indexOf('/pay/pay.html') === -1) window.location.replace('../pay/pay.html');
var orders = JSON.parse(Cookies.get('orders'));
//订单编号
var orderId = orders[0].id;
document.querySelector('.order-id').innerText = orderId;
//倒计时
var expireTime = parseInt(orders[0].expireTime);
var timer = null; 
function countDown() {
	timer = setInterval(function() {
		var date = new Date( );
		var milliseSeconds = date.getTime();
		if (milliseSeconds > expireTime) {
			document.querySelector('.order-overdue').style.display = 'block';
			clearInterval(timer);
		} else {
			var diff = expireTime - milliseSeconds;

			var minutes = Math.floor(diff / (60 * 1000));
			document.querySelector('span.minute').innerText = minutes;
			
			var seconds = Math.floor(diff % (60 * 1000) / 1000);
			document.querySelector('span.second').innerText = seconds;
		}
	}, 1000);
}
countDown();



//金额
var allAccount = JSON.parse(Cookies.get('allAccount'));
document.querySelector('.account1').innerText = parseInt(allAccount);
document.querySelector('.account2').innerText = parseInt(allAccount);

//轮播
var timer = null;
var buttons = document.querySelectorAll('ul.kuang-button>li');

for(var i = 0; i < buttons.length; i++) {
	buttons[i].index = i;
	buttons[i].onclick = function() {
		var index = this.index;
		if(this.className.indexOf('active') !== -1) return;
		bannerToggle(this.index);
	}; 
}	

//多使用地方
function bannerToggle(index) {
	document.querySelector('ul.kuang-button>li.active').className = '';
	//1.3让该激活的激活
	buttons[index].className = 'active';
	//2.控制slide滑动
	document.querySelector('ul.kuang-img').style.marginLeft = '-' + index + '00%';
}

//自动播放
function autoPlay() {
	//开启一个计时器,持续播放
	timer = setInterval(function() {
		var index = document.querySelector('ul.kuang-button>li.active').index;
		index = index === buttons.length - 1 ? 0 : index + 1;
		bannerToggle(index);
	}, 3000);
}

document.querySelector('.kuang').onmouseover = function() {
	clearInterval(timer);  //停止轮播
};
document.querySelector('.kuang').onmouseout = function() {
	autoPlay();  
};
autoPlay();  

// 鼠标滑入和滑出事件
document.querySelector('.kuang').onmouseover = function() {
	clearInterval(timer);	// 停止自动播放
};
document.querySelector('.kuang').onmouseout = function() {
	autoPlay();				// 再次开启自动播放
};



// 点击向右
document.querySelector('.scan-alipay-rt>input').onclick = function() {
	document.querySelector('.scan-alipay').style.marginLeft = '-50%';
	document.querySelector('.scan-alipay').style.transition = 'all 1s';
};
// 点击向左
document.querySelector('.record-alipay-lt>input').onclick = function() {
	document.querySelector('.scan-alipay').style.marginLeft = '0';
	document.querySelector('.record-alipay').style.transition = 'all 1s';
};

//购买成功
document.querySelector('.qrcode01').onclick = function () { 
	var buysuccess = document.querySelector('.buysuccess-wrapper');
	buysuccess.style.display = 'block';
};
//确定
document.querySelector('input.ok').onclick = function() {
	document.querySelector('.form-wrapper>div>a').onclick = function() {
		window.location.replace('../personalCenter/personalCenter.html');
	};
};
