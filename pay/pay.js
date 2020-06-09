// 先判断去过主页吗？没去过就跳到主页
if(!Cookies.get('init')) window.location.replace('../home/index.html');

//获取订单编号
var orderid = JSON.parse(Cookies.get('orderDetail'));
var id = location.search.slice(location.search.indexOf('=') + 1);
document.querySelector('.order-id').innerText = id;

//收货地址
var address = JSON.parse(Cookies.get('address'));
var userAddress = [];
var uName = Cookies.get('uName');
address.forEach(function(item) {
	if(item.uName === uName && item.isDefault === true) {
		userAddress.push(item);
	}
});
var name = userAddress[0].receiveName;
var region = userAddress[0].receiveRegion;
var tel = userAddress[0].receiveTel;
document.querySelector('.useradress-data').innerText = `收货人:${name} -- 地址:${region} -- 手机号:${tel}`;

//金额
var allAccount = JSON.parse(Cookies.get('allAccount'));
document.querySelector('.all-account').innerText = parseInt(allAccount);


//倒计时
var order = JSON.parse(Cookies.get('order'));
var orders = [];
var uName = Cookies.get('uName');
order.forEach(function(item) {
	if(item.uName === uName && item.id === id) {
		orders.push(item);
	}
});
var expireTime = parseInt(orders[0].expireTime);
var timer = null; //倒计时函数

function countDown() {
	timer = setInterval(function() {
		var date = new Date( );
		var milliseSeconds = date.getTime();
		if (milliseSeconds > expireTime) {
			document.querySelector('span.overdue').style.opacity = '1';
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
Cookies.set('orders', JSON.stringify(orders));

//支付选择
document.querySelector('i.but-01').onclick = function() {
	this.style.color = 'red';
	document.querySelector('.pay-method-tp>a').style.border = '2px solid red';
	document.querySelector('.pay-method-tp>a').style.backgroundColor = '#FFFCED';
	document.querySelector('i.but-02').style.color = '';
	document.querySelector('.pay-method-bt>a').style.border = '2px solid white';
	document.querySelector('.pay-method-bt>a').style.backgroundColor = '';
	document.querySelector('.pay-method>p>a').onclick = function() {
		this.href = 'Alipay.html';
	};
};
document.querySelector('i.but-02').onclick = function() {
	this.style.color = 'red';
	document.querySelector('.pay-method-bt>a').style.border = '2px solid red';
	document.querySelector('.pay-method-bt>a').style.backgroundColor = '#FFFCED';
	document.querySelector('i.but-01').style.color = '';
	document.querySelector('.pay-method-tp>a').style.border = '2px solid white';
	document.querySelector('.pay-method-tp>a').style.backgroundColor = '';
	document.querySelector('.pay-method>p>a').onclick = function() {
		this.href = 'WeChat.html';
	};
};

