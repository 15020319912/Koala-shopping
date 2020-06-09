// 先判断去过主页吗？没去过就跳到主页
if(!Cookies.get('init')) window.location.replace('../home/index.html');

if (document.referrer.indexOf('/pay/pay.html') === -1) window.location.replace('../pay/pay.html');

var orders = JSON.parse(Cookies.get('orders'));
//总金额
var allAccount = JSON.parse(Cookies.get('allAccount'));
document.querySelector('.account').innerText = parseInt(allAccount);
//订单编号
var orderId = orders[0].id;
document.querySelector('.order-id').innerText = orderId;
//倒计时
var expireTime = parseInt(orders[0].expireTime);
var timer = null; //倒计时函数
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




//购买成功
document.querySelector('a.shows').onclick = function () { 
	var buysuccess = document.querySelector('.buysuccess-wrapper');
	buysuccess.style.display = 'block';
};
//确定
document.querySelector('input.ok').onclick = function() {
	document.querySelector('.form-wrapper>div>a').onclick = function() {
		window.location.replace('../personalCenter/personalCenter.html');
	};
};

