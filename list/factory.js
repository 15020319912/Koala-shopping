
var country = [
	'../images/list/factory/factory_001.png', '../images/list/factory/factory_002.png',
	'../images/list/factory/factory_003.png', '../images/list/factory/factory_004.png', 
	'../images/list/factory/factory_005.png', '../images/list/factory/factory_006.png', 
	'../images/list/factory/factory_007.png', '../images/list/factory/factory_008.png',
];

var rbs = product.filter(function(item){
	return item.cid === 10;
});

var hgs = product.filter(function(item){
	return item.cid === 11;
});

var mgs = product.filter(function(item){
	return item.cid === 12;
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

for(var i = 0; i < rbs.length; i++) {
	ct(rbs);
	rbw.appendChild(li);
}

var hgw = document.querySelector('ul.hg-com');
for(var i = 0; i < hgs.length; i++) {
	ct(hgs);
	hgw.appendChild(li);
}

var mgw = document.querySelector('ul.mg-com');
for(var i = 0; i < mgs.length; i++) {
	ct(mgs);
	mgw.appendChild(li);
}

var navOffsetTop = document.querySelector('.nav').offsetTop
// 
// window.onscroll = function() {
// 	// 1.获取当前滚动的距离
// 	var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
// 	// 2.判断滚动的距离有没有超过临界值，大于就显示top按钮，小于就隐藏
// 	document.querySelector('input.top').style.display = scrollTop >= 200 ? 'block' : 'none';	
// 
// };

//返回顶部
// document.querySelector('input.top').onclick = function() {
// 	window.scrollTo(0, 0);
// }


// 从url中获取要看的商品id

var id = location.search.slice(location.search.lastIndexOf('=') + 1);
id = id ? parseInt(id) : 1;

//通过id找出当前看的商品和选定的数量，加入购物车
var pro = product.find(function(item) { return item.id === id; });
//pro动态展示

