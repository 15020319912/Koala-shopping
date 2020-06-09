var aaa = parseInt(location.search.slice(location.search.indexOf('=') + 1));
var rbs = product.filter(function(item){
	return item.id === aaa;
});

var rbsBanner = rbs[0].banner;

var right = document.querySelector('.right');
var countryRb = document.querySelector('.country-rb');
var rightH3 = document.querySelector('.right-h3');
var rightP = document.querySelector('.right-p');
var wrapPrice = document.querySelector('.wrap-price');

//右侧
var a, li, img;
function datail(item) {
	document.querySelector('img.img-logo').src = item[0].logo;
	document.querySelector('span.brand').innerText = item[0].brand;
	document.querySelector('.right-h3>h3').innerText = item[0].h2;
	document.querySelector('p.subTit').innerText = item[0].p;
	document.querySelector('span.pr1').innerText = '¥' + item[0].pr1;
	document.querySelector('span.pr2').innerText = item[0].pr2;
	document.querySelector('span.pr3').innerText = '参考价：¥' + item[0].pr3;
}

for(var i = 0; i < rbs.length; i++) {
	datail(rbs);
}

var index = 0;
var number = 4;

function bigBanner(item) {
	li = document.createElement('li')
	img = document.createElement('img');
	img.src = item[i];
	// li.className = 'active';
	li.appendChild(img);
	
}



var bigImg = document.querySelector('ul.big-img');
for(var i = 0; i < rbsBanner.length; i++) {
	bigBanner(rbsBanner);
	bigImg.appendChild(li);
}
var smallImg = document.querySelector('ul.wrap-small');
for(var i = 0; i < rbsBanner.length; i++) {
	bigBanner(rbsBanner);
	smallImg.appendChild(li);
}

var index = 0;
var number = 4;

//
document.querySelector('.small-left').disabled = true;
document.querySelector('.small-right').disabled = rbsBanner.length <= number;

//前一个
document.querySelector('.small-left').onclick = function() {
	document.querySelector('.small-right').disabled = false;
	index = index - 1;
	document.querySelector('ul.wrap-small').style.marginLeft = '-' + index * (100 / number) + '%';
	document.querySelector('.small-left').disabled = index === 0;
};
//后一个
document.querySelector('.small-right').onclick = function() {
	document.querySelector('.small-left').disabled = false;
	index = index + 1;
	document.querySelector('ul.wrap-small').style.marginLeft = '-' + index * (100 / number) + '%';
	document.querySelector('.small-right').disabled = rbsBanner.length === number + index ;
	
};

// //找到所有li绑定鼠标滑过事件
// var liImgs = document.querySelectorAll('ul.wrap-small>li');
// for(var i = 0; i < liImgs.length; i++) {
// 	liImgs[i].onmousemove = function() {
// 		//1. 当前我没有active，有的话不用往后面执行了，直接return；
// 		if(this.className === 'active') return;
// 		//2. 让当前激活的兄弟取消激活
// 		this.parentNode.querySelector('li.active').className = '';
// 		//3. 让自己激活
// 		this.className = 'active';
// 		//4. 让img.big-image显示相应的大图片
// 		// var src = this.querySelector('img').src.replace('small', 'big');
// 		// document.querySelector('img.big-image').src = src;
// 	};
// }
// 
// 
// //二级联动
// var liColors = document.querySelectorAll('ul.color>li');
// for(var i = 0;i < liColors.length; i++) {
// 	liColors[i].index = i;
// 	liColors[i].onclick = function() {
// 		//判断当前有没有激活，如果有直接·return不往后执行了
// 		if(this.className === 'active') return;
// 		//一级颜色选中效果切换
// 		this.parentNode.querySelector('li.active').className = 'clearfix';
// 		 var target = document.querySelectorAll('.color-imgs-list>ul.active')[this.index];
// 		 target.className = 'clearfix active';
// 		 document.querySelector('img.big-image').src = target.querySelector('li.active>img').src.replace('small', 'big')
// 	}
// }



function countChange(count) {
	//3. 更新increase和decrease的disable状态 对 + - 按钮的操作
	document.querySelector('.count-wrapper>input.decrease').disabled = count === 1;
	document.querySelector('.count-wrapper>input.increase').disabled = count === 10;
}

//控制文本框内容数量的加减
var decreaseEl = document.querySelector('.count-wrapper>input.decrease');
decreaseEl.onclick = function() {
	var countEl = document.querySelector('.count-wrapper>input.count');
	//读取他的value值，并计算出新的值
	//从表单元素中获取的所有信息都是字符串
	var count = parseInt(countEl.value) - 1;
	
	countEl.value = count;
	
	countChange(count);
};
var increaseEl = document.querySelector('.count-wrapper>input.increase');
increaseEl.onclick = function() {
	var countEl = document.querySelector('.count-wrapper>input.count');
	
	var count = parseInt(countEl.value) + 1;
	
	countEl.value = count;
	countChange(count);
};



//用户手动输入数量处理
document.querySelector('input.count').onblur = function() {
	var countEl = document.querySelector('.count-wrapper>input.count');
	var count = parseInt(this.value);
	
	// count值的有效性判断
	if(count < 1) count = 1;
	if(count > 66) count = 66;
	
	countEl.value = count;
}

// 从url中获取要看的商品id

var id = location.search.slice(location.search.lastIndexOf('=') + 1);
id = id ? parseInt(id) : 1;

//通过id找出当前看的商品和选定的数量，加入购物车
var pro = product.find(function(item) { return item.id === id; });
//pro动态展示
//根据用户当前看的商品，加入购物车
document.querySelector('.buy2').onclick = function() {
	// 1.判断当前用户有没有登陆，没有就跳转到登录页面，如果登录了，获取器用户名
	var uName = Cookies.get('uName');
	if(!uName) {
		Cookies.set('target', window.location.href);		//将当前页面的url藏在cookie中，便于登录成功后跳回当前页
		window.location.href = '../login/index.html';		//跳转到主页
	} else {
		var cart = JSON.parse(Cookies.get('cart'));    	//从cookie中拿取所有的购物信息
		var temp = cart.find(function(item) { return item.uName === uName && item.pid === id; });
		if(temp) {
			var count = temp.count + parseInt(document.querySelector('input.count').value);
			if(count > 10) {
				alert('还能买' + (10 - temp.count) + '个');
				return;
			} else {
				temp.count = count;
			}
			
		} else {
			var count = parseInt(document.querySelector('input.count').value);
			if(count > 10) {
				alert('最多买10个');
				return;
			} else {
				cart.push({
					id: cart[cart.length - 1].id + 1,
					uName: uName,
					pid: id,
					count: count,
				});
			}
		}
		Cookies.set('cart', JSON.stringify(cart));		//把最新的cart数组放回cookie个更新cart对应的值
		console.log(JSON.parse(Cookies.get('cart')));
	}
}
//选项卡样式

var titles = document.querySelectorAll('ul.tab-titles>li');
for(var i = 0; i < titles.length; i++) {
	titles[i].index = i;
	titles[i].onclick = function() {
		var contents = document.querySelectorAll('ul.tab-contents>li');
		for(var j = 0; j < contents.length; j++) {
			contents[j].style.display = 'none';
		}
		
		contents[this.index].style.display = 'block';
		
	
	}
	
}








