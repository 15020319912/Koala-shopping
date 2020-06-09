// 先判断去过主页吗？没去过就跳到主页
if(!Cookies.get('init')) window.location.replace('../index.html');
document.querySelector('.gologin').onclick = function() {
	Cookies.set('target', window.location.href);
	window.location.replace('../login/index.html');
};
//从cookies中获取用户名,判断是否登录
var uName = Cookies.get('uName');
if(uName) { //登录了
	var cart = JSON.parse(Cookies.get('cart'));
	var userCart = cart.filter(function(item) { return item.uName === uName;});
	if(userCart.length === 0) {
		document.querySelector('.cart-empty').style.display = 'block';
	} else {
		var tr = null;
		var tbody =document.querySelector('.table tbody');
		var temp = null;
		for(var i = 0; i < userCart.length; i++) {
			temp = product.find(function(item) { return item.id === userCart[i].pid;});
			tr = document.createElement('tr');
			tr.dataset.id = userCart[i].id;
			tr.innerHTML = `
				<td><i class="checkbox checked"></i></td>
				<td><img src="${temp.banner[0]}"></td>
				<td>${temp.h2}</td>
				<td class="price">${temp.pr1}</td>
				<td>
					<input type="button" value="-" class="btn-decrease${userCart[i].count === 1 ? ' disabled' : ''}">
					<input type="text" value="${userCart[i].count}" class="count">
					<input type="button" value="+" class="btn-increase${userCart[i].count === 10 ? ' disabled' : ''}">
				</td>
				<td class="trElprice"></td>
				<td>
					<a href="#" class="btn-remove">删除</a>
					
					<div class="eidit-delect">
						<div class='form-delect'>
							<div class="confirm-text">	
								<p>亲！确定要删掉这个商品吗？？</p>
							</div>
							<div>
								<input type="button" value='确定' class='ok' />
								<input type="button" value='取消' class='no' />
							</div>
						</div>
					</div>
					
					
					<p>
						<a href="#" />移入我的收藏</a>
					</p>
				</td>
			`;
			tbody.appendChild(tr);
			document.querySelector('.cart-entity').style.display = 'block';
			updateCountAndAccount();
		}
	}
} else { //没登录
	document.querySelector('.cart-unlogin').style.display = 'block';
}


//  2. 删除按钮绑定点击事件
var btnRemoves = document.querySelectorAll('.btn-remove');
for(var i = 0; i < btnRemoves.length; i++) {
	btnRemoves[i].onclick = function(e) {
		document.querySelector('.eidit-delect').style.display = 'block';
		document.querySelector('.ok').onclick = function() {
			//if(!confirm('确定要删除吗?~~亲!')) return;
			// 获取当前要删除的购物记录的id值
			var removeTr = e.target.parentNode.parentNode;
			var id = parseInt(removeTr.dataset.id);
			// 从cookie中拿出所有购物记录，删除要删除的，再更新cookie
			var cart = JSON.parse(Cookies.get('cart'));
			var index = cart.findIndex(function(item) { return item.id === id; });
			cart.splice(index, 1);
			Cookies.set('cart', JSON.stringify(cart));
			// 删除tr
			document.querySelector('.eidit-delect').style.display = 'none';
			removeTr.parentNode.removeChild(removeTr);
			// 更新总金额和总数量
			updateCountAndAccount();
			// 如果把所有的购物记录都删了，那么就显示cart-empty，让cart-list隐藏
			if(document.querySelectorAll('tbody tr').length === 0) {
				document.querySelector('.cart-entity').style.display = 'none';
				document.querySelector('.cart-empty').style.display = 'block';
			}
		};
		document.querySelector('.no').onclick = function() {
			document.querySelector('.eidit-delect').style.display = 'none';
		};
	};		
}

// 数量加减绑定点击事件
// 事件冒泡委托
document.querySelector('.cart-entity tbody').onclick = function(e) {
	if(e.target.className.indexOf('btn-increase') === -1 && e.target.className.indexOf('btn-decrease') === -1) return;

	if(e.target.className.indexOf('disabled') !== -1) return;
	var id = parseInt(e.target.parentNode.parentNode.dataset.id);			
	var cart = JSON.parse(Cookies.get('cart'));								
	var target = cart.find(function(item) { return item.id === id; });		
	var count = 0;
	if(e.target.className.indexOf('btn-increase') !== -1) {	
		e.target.parentNode.querySelector('.btn-decrease').className = 'btn-decrease'; 	
		count = target.count + 1;
		if(count === 10) e.target.className += ' disabled';								
	} else {												
		e.target.parentNode.querySelector('.btn-increase').className = 'btn-increase';	
		count = target.count - 1;
		if(count === 1) e.target.className += ' disabled';									
	}
	e.target.parentNode.querySelector('.count').value = count;		
	target.count = count;												
	Cookies.set('cart', JSON.stringify(cart));
	updateCountAndAccount();												
};



//全选反选功能事件绑定
var allEl = document.querySelector('i.checkbox.all');
var allCheckboxEls = document.querySelectorAll('tbody i.checkbox');
// thead联动tbody 
allEl.onclick = function() {
	if(this.className.indexOf('checked') !== -1) {		// 从选中到没选中
		this.className = 'checkbox all';
		for(var i = 0; i < allCheckboxEls.length; i++) {
				allCheckboxEls[i].className = 'checkbox';
		}
	} else {											// 从没选中到选中
		this.className = 'checkbox all checked';
		for(var i = 0; i < allCheckboxEls.length; i++) {
			allCheckboxEls[i].className = 'checkbox checked';
		}
	}
	updateCountAndAccount();
};
// tbody联动thead
for(var i = 0; i < allCheckboxEls.length; i++) {
	allCheckboxEls[i].onclick = function() {
		if(this.className.indexOf('checked') !== -1) {	// 从选中到没选中
			this.className = 'checkbox';
			allEl.className = 'checkbox all';
		} else {										// 从没选中到选中
			this.className = 'checkbox checked';
			var checkedNumber = document.querySelectorAll('tbody i.checkbox.checked').length;
			if(allCheckboxEls.length === checkedNumber) {
				allEl.className = 'checkbox all checked';
			}
		}
		updateCountAndAccount();
	};
}



//下单按钮点击事件
document.querySelector('.btn-gobuy').onclick = function() {
	// 找到tbody中所有是checked状态的i
	var allCheckedEls = document.querySelectorAll('tbody i.checkbox.checked');
	if(allCheckedEls.length === 0) { 
		document.querySelector('.select-prompt').style.display = 'block';
		document.querySelector('input.know').onclick = function() {
			document.querySelector('.select-prompt').style.display = 'none';
		};
		return;
	}
	var ids = [];
	for(var i = 0; i < allCheckedEls.length; i++) {
		ids.push(parseInt(allCheckedEls[i].parentNode.parentNode.dataset.id));
	}
	window.location.href = `../orderConfirm/confirm.html?ids=${JSON.stringify(ids)}`;
};




//封装 更新商品的总数量和总金额
function updateCountAndAccount() {
	var total = 0, account = 0;
	var trEl = null, price = 0, count = 0;
	var checkedIEls = document.querySelectorAll('tbody i.checkbox.checked');
	for(var i = 0; i < checkedIEls.length; i++) {
		trEl = checkedIEls[i].parentNode.parentNode;
		price = parseInt(trEl.querySelectorAll('td')[3].innerText);
		count = parseInt(trEl.querySelectorAll('td')[4].querySelector('.count').value);
		total += count;
		account += price * count;
		
	}
	document.querySelector('.cart-buy-int p>span.select-counts').innerText = total;
	document.querySelector('.cart-buy-int span.account').innerText = account;
	document.querySelector('.cart-buy-int span.all-account').innerText = account;
	document.querySelector('.cart-account span.account').innerText = account;
	
	//单种商品价格和购物车总数量
	var trs = document.querySelectorAll('tbody>tr');
	var sumCounts = 0;
	for(var i = 0; i < trs.length; i++) {
		//不同商品价格
		var unitPrice = trs[i].querySelector('td.price').innerText;
		var counts = trs[i].querySelector('.count').value;
		var trElprice = trs[i].querySelector('.trElprice');
		trElprice.innerText = parseInt(unitPrice * counts);
		 //商品数量
		sumCounts = sumCounts + parseInt(counts);
	}
	document.querySelector('span.allCounts').innerText = sumCounts;
}

//普通文本框变地址
new Regions(document.querySelector('input.ad'));









// 商品推荐
//
function pageChange(page) {
	document.querySelector('input.page').value = page;
	document.querySelector('input.left').disabled = page === 1;
	document.querySelector('input.right').disabled = page === 4;
}
var index = 0;
// 左
document.querySelector('input.left').onclick = function() {
	var page = parseInt(document.querySelector('input.page').value) - 1;
	pageChange(page);
	index = index - 1;
	document.querySelector('.recommend-img').style.marginLeft = '-' + index * 100 + '%';
};
// 右
document.querySelector('input.right').onclick = function() { 
	var page = parseInt(document.querySelector('input.page').value) + 1;
	pageChange(page);
	index = index + 1;
	document.querySelector('.recommend-img').style.marginLeft = '-' + index * 100 + '%';
};
//封装

var li = null, a = null;
function likeShops(shops) {
	li = document.createElement('li');
	a = document.createElement('a');
	a.innerHTML = `
		<img src="${shops.img}" >
		<p>${shops.h3}</p>
		<p>¥${shops.price}</p>
		<p>¥${shops.discount}</p>
	`;
	li.appendChild(a);
	ul.appendChild(li);
}
var removerShop = [
	{
		img: '../images/list/country_rb_004.jpg',
		h3: 'Freeplus 芙丽芳丝',
		introduce: '温和滋养 补水保湿',
		price: 195,
		discount: 240
	},
	{
		img: '../images/list/country_rb_005.jpg',
		h3: 'KISS ME 奇士美',
		introduce: '刷出浓密芭比睫毛',
		price: 62,
		discount: 109
	},
	{
		img: '../images/list/global/global_hot_005.jpg',
		h3: '【日本直邮】SUNSTAR ',
		introduce: '温和低刺激 防蛀固齿',
		price: 35,
		discount: 70
	},
	{
		img: '../images/list/country_hg_005.jpg',
		h3: '韩国进口奶瓶 防胀气',
		introduce: '真正的母乳实感奶瓶',
		price: 137,
		discount: 256
	},
	{
		img: '../images/list/country_mg_004.jpg',
		h3: '【多重研磨的“锁鲜”泥】',
		introduce: '百年品牌 优质婴幼儿辅食',
		price: 15,
		discount: 29
	},
	{
		img: '../images/list/country_mg_004.jpg',
		h3: '【多重研磨的“锁鲜”泥】',
		introduce: '百年品牌 优质婴幼儿辅食',
		price: 15,
		discount: 29
	},
	{
		img: '../images/list/global/global_hot_004.jpg',
		h3: '【多重研磨的“锁鲜”泥】',
		introduce: '百年品牌 优质婴幼儿辅食',
		price: 15,
		discount: 29
	},
	{
		img: '../images/list/country_mg_004.jpg',
		h3: '【多重研磨的“锁鲜”泥】',
		introduce: '百年品牌 优质婴幼儿辅食',
		price: 15,
		discount: 29
	},
	{
		img: '../images/list/country_mg_004.jpg',
		h3: '【多重研磨的“锁鲜”泥】',
		introduce: '百年品牌 优质婴幼儿辅食',
		price: 15,
		discount: 29
	},
	{
		img: '../images/list/country_mg_004.jpg',
		h3: '【多重研磨的“锁鲜”泥】',
		introduce: '百年品牌 优质婴幼儿辅食',
		price: 15,
		discount: 29
	},
	{
		img: '../images/list/country_rb_004.jpg',
		h3: 'Freeplus 芙丽芳丝',
		introduce: '温和滋养 补水保湿',
		price: 195,
		discount: 240
	},
	{
		img: '../images/list/country_rb_005.jpg',
		h3: 'KISS ME 奇士美',
		introduce: '刷出浓密芭比睫毛',
		price: 62,
		discount: 109
	},
	{
		img: '../images/list/country_mg_004.jpg',
		h3: '【多重研磨的“锁鲜”泥】',
		introduce: '百年品牌 优质婴幼儿辅食',
		price: '¥15',
		discount: 29
	},
	{
		img: '../images/list/country_mg_004.jpg',
		h3: '【多重研磨的“锁鲜”泥】',
		introduce: '百年品牌 优质婴幼儿辅食',
		price: 15,
		discount: 29
	},{
		img: '../images/list/country_mg_004.jpg',
		h3: '【多重研磨的“锁鲜”泥】',
		introduce: '百年品牌 优质婴幼儿辅食',
		price: 15,
		discount: 29
	},
	{
		img: '../images/list/country_mg_004.jpg',
		h3: '【多重研磨的“锁鲜”泥】',
		introduce: '百年品牌 优质婴幼儿辅食',
		price: 15,
		discount: 29
	},
	{
		img: '../images/list/country_rb_004.jpg',
		h3: 'Freeplus 芙丽芳丝',
		introduce: '温和滋养 补水保湿',
		price: 195,
		discount: 240
	},
	{
		img: '../images/list/country_rb_005.jpg',
		h3: 'KISS ME 奇士美',
		introduce: '刷出浓密芭比睫毛',
		price: 62,
		discount: 109
	},
	{
		img: '../images/list/country_rb_004.jpg',
		h3: 'Freeplus 芙丽芳丝',
		introduce: '温和滋养 补水保湿',
		price: 195,
		discount: 240
	},
	{
		img: '../images/list/country_rb_004.jpg',
		h3: 'Freeplus 芙丽芳丝',
		introduce: '温和滋养 补水保湿',
		price: 195,
		discount: 240
	}
];
var ul = document.querySelector('ul.recommend-img');
for(var i = 0; i < removerShop.length; i++) {
	likeShops(removerShop[i]);
}

// 喜欢商品1
var likeFloor1 = [
	{
		img: '../images/list/country_mg_004.jpg',
		h3: '【多重研磨的“锁鲜”泥】',
		introduce: '百年品牌 优质婴幼儿辅食',
		price: 15,
		discount: 29
	},
	{
		img: '../images/list/country_mg_004.jpg',
		h3: '【多重研磨的“锁鲜”泥】',
		introduce: '百年品牌 优质婴幼儿辅食',
		price: 15,
		discount: 29
	},
	{
		img: '../images/list/country_mg_004.jpg',
		h3: '【多重研磨的“锁鲜”泥】',
		introduce: '百年品牌 优质婴幼儿辅食',
		price: 15,
		discount: 29
	},
	{
		img: '../images/list/country_mg_004.jpg',
		h3: '【多重研磨的“锁鲜”泥】',
		introduce: '百年品牌 优质婴幼儿辅食',
		price: 15,
		discount: 29
	},
	{
		img: '../images/list/country_mg_004.jpg',
		h3: '【多重研磨的“锁鲜”泥】',
		introduce: '百年品牌 优质婴幼儿辅食',
		price: 15,
		discount: 29
	}
];
var ul = document.querySelector('.cart-likefloor1-img>ul');
for(var i = 0; i < likeFloor1.length; i++) {
	likeShops(likeFloor1[i]);
}

// 喜欢商品2
var likeFloor2 = [
	{
		img: '../images/list/factory/factory_goods_002.jpg',
		h3: ' LED光子焕颜嫩肤仪 ',
		introduce: '焕亮新肌，照亮你的美',
		price: 699,
		discount: 1699
	},
	{
		img: '../images/list/factory/factory_goods_002.jpg',
		h3: ' LED光子焕颜嫩肤仪 ',
		introduce: '焕亮新肌，照亮你的美',
		price: 699,
		discount: 1699
	},
	{
		img: '../images/list/factory/factory_goods_002.jpg',
		h3: ' LED光子焕颜嫩肤仪 ',
		introduce: '焕亮新肌，照亮你的美',
		price: 699,
		discount: 1699
	},
	{
		img: '../images/list/factory/factory_goods_002.jpg',
		h3: ' LED光子焕颜嫩肤仪 ',
		introduce: '焕亮新肌，照亮你的美',
		price: 699,
		discount: 1699
	},
	{
		img: '../images/list/factory/factory_goods_002.jpg',
		h3: ' LED光子焕颜嫩肤仪 ',
		introduce: '焕亮新肌，照亮你的美',
		price: 699,
		discount: 1699
	}
];
var ul = document.querySelector('.cart-likefloor2-img>ul');
for(var i = 0; i < likeFloor2.length; i++) {
	likeShops(likeFloor2[i]);
}


//回到顶部
window.onscroll = function() {
	//1.获取当前滚动的距离
	var scrollTop = document.documentElement.scrollTop || document.body.scrollTop; 
	//2.判断滚动的距离有没有超过临界值,大于就显示按钮
	document.querySelector('.cart-top>a').style.display = scrollTop >= 200 ? 'block' : 'none';
};
//返回顶部
document.querySelector('.cart-top>a').onclick = function() {
	window.scrollTo(0,0);  
};


