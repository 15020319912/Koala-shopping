
var country = [
	'../images/list/global/global_mg.png', '../images/list/global/global_rb.png',
	'../images/list/global/global_hg.png', '../images/list/global/global_oz.png'
];

var hots = product.filter(function(item){
	return item.cid === 7;
});

var coss = product.filter(function(item){
	return item.cid === 8;
});

var pres = product.filter(function(item){
	return item.cid === 9;
});

var imgGroupItem = document.querySelector('ul.img-group-item');
for(var i = 0; i < country.length; i++) {
	//动态创建li
	li = document.createElement('li');
	//动态创建a
	a = document.createElement('a');
	//动态创建img
	img = document.createElement('img');
	img.src = country[i];
	a.appendChild(img);
	//将a放入li
	li.appendChild(a);
	//将li放入ul
	imgGroupItem.appendChild(li);
};

function ct(country) {
	li = document.createElement('li');
	//动态创建a
	a = document.createElement('a');
	a.href = '../detail/detail.html?id=' + country[i].id;
	//动态创建img
	img = document.createElement('img');
	img.src = country[i].img;
	a.appendChild(img);
	//动态创建h3
	h3 = document.createElement('h3');
	h3.innerText = country[i].h3;
	a.appendChild(h3);
	//动态创建p
	p = document.createElement('p');
	p.innerText = country[i].introduce;
	a.appendChild(p);
	//动态创建span
	span = document.createElement('span');
	span.innerText = '¥' + country[i].price;
	span.className="price";
	a.appendChild(span);
	
	span = document.createElement('span');
	span.innerText = '¥' + country[i].discount;
	span.className="discount";
	a.appendChild(span);
	
	span = document.createElement('span');
	span.innerText = country[i].cart;
	span.className="cart";
	a.appendChild(span);
	
	//将a放入li
	li.appendChild(a);
}

var li, a, h3, p, span, img;

var rbw = document.querySelector('ul.rb-com');

for(var i = 0; i < hots.length; i++) {
	ct(hots);
	rbw.appendChild(li);
}

var hgw = document.querySelector('ul.hg-com');
for(var i = 0; i < coss.length; i++) {
	ct(coss);
	hgw.appendChild(li);
}

var mgw = document.querySelector('ul.mg-com');
for(var i = 0; i < pres.length; i++) {
	ct(pres);
	mgw.appendChild(li);
}


var id = location.search.slice(location.search.lastIndexOf('=') + 1);
id = id ? parseInt(id) : 1;

//通过id找出当前看的商品和选定的数量，加入购物车
var pro = product.find(function(item) { return item.id === id; });
//pro动态展示

//根据用户当前看的商品，加入购物车
document.querySelector('img.cart').onclick = function() {
	// 1.判断当前用户有没有登陆，没有就跳转到登录页面，如果登录了，获取器用户名
	var uName = Cookies.get('uName');
	if(!uName) {
		Cookies.set('target', window.location.href);		//将当前页面的url藏在cookie中，便于登录成功后跳回当前页
		window.location.href = '../home/index.html';		//跳转到主页
	} else {
		var cart = JSON.parse(Cookies.get('cart'));    	//从cookie中拿取所有的购物信息
		var temp = cart.find(function(item) { return item.uName = uName && item.pid === id; });
		if(item) {
			temp.count += parseInt(document.querySelector('input.count').value);
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
	
	}
}