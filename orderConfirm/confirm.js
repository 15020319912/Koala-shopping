// 先判断去过主页吗？没去过就跳到主页
if(!Cookies.get('init')) window.location.replace('../index.html');

if (document.referrer.indexOf('/cart/cart.html') === -1) window.location.replace('../cart/cart.html');
// 从cookie中取出所有的相关数组
var cart = JSON.parse(Cookies.get('cart'));
var order = JSON.parse(Cookies.get('order'));
var orderDetail = JSON.parse(Cookies.get('orderDetail'));
var address = JSON.parse(Cookies.get('address'));

// 获取下单的购物车记录的id的数组
var index = window.location.href.lastIndexOf('=');
var ids = JSON.parse(window.location.href.slice(index + 1));
// 根据id找出具体的购物记录
var buyList = [],
	buyListItem = null;
// 找出当前要下单的对应的购物记录
cart.forEach(function(item) {
	if(ids.indexOf(item.id) !== -1) buyList.push(item);
});

//动态展示购物记录
var tbodyEl = document.querySelector('.order-message tbody');
var tr = null;
var	account = 0;
buyList.forEach(function(item) {
	var temp = product.find(function(item2) { return item2.id === item.pid; });
	tr = document.createElement('tr');
	tr.innerHTML += `
		<td><img src="${temp.banner[0]}" /></td>
		<td>${temp.h2}</td>
		<td>暂无信息</td>
		<td class="price">${temp.pr1}.00</td>
		<td class="count">${item.count}</td>
		<td class="trElprice">0</td>
	`;
	tbodyEl.appendChild(tr);
	account += temp.pr1 * item.count;
});
document.querySelector('.coupon-count>p>span.all-count1').innerText = account;
document.querySelector('.coupon-count>p>span.all-count2').innerText = account;
	//不同商品价格
var trs = document.querySelectorAll('tbody>tr');
trs.forEach(function(item) {
	var unitPrice = item.querySelector('td.price').innerText;
	var counts = item.querySelector('.count').innerText;
	var trElprice = item.querySelector('td.trElprice');
	trElprice.innerText = parseInt(unitPrice * counts);
}); 


// 订单提交
document.querySelector('.submit-order').onclick = function() {
	// 向订单数组中加入新的订单相关数据
	var date = new Date();
	var orderId = 'kaola' + date.getTime(); // 订单的编号
	var uName = Cookies.get('uName');   // 订单相关用户的名字
	var addressId = parseInt(tbodyEl.querySelector('tr').dataset.id);   // 订单相关地址的编号
	var account = parseInt(document.querySelector('span.all-count2').innerText); // 订单总金额
	var isPay = false; // 订单是否付款
	var expireTime = date.getTime() + 60 * 60 * 1000; // 订单最后付款时间（毫秒数）
	var time =
		`${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;

	order.push({ // 更新order数组
		id: orderId,
		uName: uName,
		addressId: addressId,
		account: account,
		isPay: isPay,
		time: time,
		expireTime: expireTime
	});
	Cookies.set('order', JSON.stringify(order)); // 将更新后的order放回COOKIE中
	//向订单详情数组中加入新的订单相关数据
	buyList.forEach(function(item) {
	// 更新ordeDetail数组（向其中插入数据）
		orderDetail.push({ 
			id:orderDetail[orderDetail.length - 1].id + 1,
			orderId: orderId,
			productId: item.pid,
			count: item.count
		});
		// 更新cart数组（删除当前要下单的购物记录）
		var index = cart.findIndex(function(item2) { return item2.id === item.id; });
		cart.splice(index, 1);
	});
	Cookies.set('orderDetail', orderDetail);
	Cookies.set('cart', cart);
	Cookies.set('allAccount', account);
	
	//跳转至付款页面(传订单编号到下一个页面)
	window.location.replace(`../pay/pay.html?id=${orderId}`);
};




//收货地址=================================
var address = JSON.parse(Cookies.get('address'));
// 尝试从Cookie中获取用户的用户名，进而判断是否登录
var uName = Cookies.get('uName');
	// 从address数组中筛选顺当前登录用户相关的所有送货址userAddress
var userAddress = address.filter(function(item) { return item.uName === uName; });
	// 迭代userAddress动态拼接展示数据
userAddress.forEach(function(item) { generateTr(item); });
// 公共的辅助函数
function generateTr(item) {
	var tbodyEl = document.querySelector('.address-list>tbody');
	tbodyEl.innerHTML += `
		<tr data-id='${item.id}'>
			<td>${item.receiveName}</td>
			<td>${item.receiveRegion}</td>
			<td>${item.receiveAddress}</td>
			<td>${item.receiveTel}</td>
			<td>
				<input type='button' value='修改' class='btn-update' /> |
				<input type='button' value='删除' class='btn-remove' /> |
				
				<div class="eidit-delect">
					<div class='form-delect'>
						<div class="confirm-text">	
							<p>亲！确定要删掉这个收货地址吗？？</p>
						</div>
						<div>
							<input type="button" value='确定' class='ok' />
							<input type="button" value='取消' class='no' />
						</div>
					</div>
				</div>
				
				<input type='button' 
					value='${item.isDefault ? "默认地址" : "设为默认址"}' 
					class='btn-default ${item.isDefault? "default" : ""}' />
			</td>
		</tr>
	`;
}
// 找到toboy绑定点击事件
//删除
function removeHandler(e) {
	document.querySelector('.eidit-delect').style.display = 'block';
	//确定
	document.querySelector('input.ok').onclick = function() {
		
		// 先拿到地址编号
		var trEl = e.target.parentNode.parentNode;
		var id = parseInt(trEl.dataset.id);
		// 删除对应的tr
		trEl.parentNode.removeChild(trEl);
		
		document.querySelector('.eidit-delect').style.display = 'none';
		// 更新cookie中的address
		var index = address.findIndex(function(item) { return item.id === id; });
		address.splice(index, 1);
		Cookies.set('address', address);
		
		// 下单那地方  默认收货信息显示
		showAddress();
	};
	document.querySelector('input.no').onclick = function() {
		document.querySelector('.eidit-delect').style.display = 'none';
	};
	
}
function setDefaultHandler(e) {
	if(e.target.className === 'btn-default default') return;
	// 获取当前行
	var target = null, id = 0;
	var trEl = e.target.parentNode.parentNode;
	var defaultInputEl = trEl.parentNode.querySelector('input.btn-default.default');
	if(defaultInputEl) { // 当前存在默认地址
		defaultInputEl.className = 'btn-default';
		defaultInputEl.value = '设为默认地址';
		id = parseInt(defaultInputEl.parentNode.parentNode.dataset.id);
		target = address.find(function(item) { return item.id === id });
		target.isDefault = false;
	}
	e.target.className = 'btn-default default';
	e.target.value = '默认地址';
	id = parseInt(trEl.dataset.id);
	target = address.find(function(item) { return item.id ===id; });
	target.isDefault = true;
	Cookies.set('address', address);
}
document.querySelector('table.address-list>tbody').onclick = function(e) {
	if(e.target.className.indexOf('btn-remove') !== -1) {	//删除
		removeHandler(e);
	}
	if(e.target.className.indexOf('btn-update') !== -1) {  //修改
		updateHandler(e);
	}
	if(e.target.className.indexOf('btn-default') !== -1) {  //是否默认地址设置
		setDefaultHandler(e);
		
		//下单那地方  默认收货信息显示 
		showAddress();
	}
};



// 地址修改
var id = 0;					// 记录当前修改的地址对应的编号是多少
var isAdd = true;			// 标识当前是新增还是修改（真表示新增，假表示修改）
var trEl = null;			// 关联当前正处于修改状态的行对象
function updateHandler(e) {
	isAdd = false;
	trEl = e.target.parentNode.parentNode;
	id = parseInt(trEl.dataset.id);
	var target = address.find(function(item) { return item.id === id; });
	var addressEl = document.querySelector('.newadd-adress');
	addressEl.querySelector('.write-name').value = target.receiveName;
	addressEl.querySelector('.ad').value = target.receiveRegion;
	addressEl.querySelector('.details-adress').value = target.receiveAddress;
	addressEl.querySelector('.pho').value = target.receiveTel;
	document.querySelector('.adress-eject').style.display = 'block';
}
// 地址新增
document.querySelector('.btn-add-adress').onclick = function() {	
	isAdd = true;
	var addressEl = document.querySelector('.adress-eject');
	addressEl.querySelector('.write-name').value = '';
	addressEl.querySelector('.ad').value = '';
	addressEl.querySelector('.details-adress').value = '';
	addressEl.querySelector('.pho').value = '';
	document.querySelector('.adress-eject').style.display = 'block';
};

// 为保存按钮绑定点击事件
document.querySelector('.save-adress').onclick = function() {
	var addressEl = document.querySelector('.adress-eject');			// 先找表单
	var newAddress = {									// 搜集表单中的数据，整合成newAddress
		uName: uName,
		receiveName: addressEl.querySelector('.write-name').value,
		receiveRegion: addressEl.querySelector('.ad').value,
		receiveAddress: addressEl.querySelector('.details-adress').value,
		receiveTel: addressEl.querySelector('.pho').value
		
	};
	if(isAdd) {	// 新增
		newAddress.id = address[address.length - 1].id + 1;
		newAddress.isDefault = false;
		//数据的新增
		address.push(newAddress);
		//dom的更新
		generateTr(newAddress);
		//提示用户新地址添加成功
		alert('新地址添加成功!!');
	} else {	// 修改
		var index = address.findIndex(function(item) { return item.id === id; });
		newAddress.id = id;
		newAddress.isDefault = address[index].isDefault;
		//数据的更新（用newAddress替换掉修改前对应的地址）
		address.splice(index, 1, newAddress);
		//dom的更新
		trEl.cells[0].innerText = newAddress.receiveName;
		trEl.cells[1].innerText = newAddress.receiveRegion;
		trEl.cells[2].innerText = newAddress.receiveAddress;
		trEl.cells[3].innerText = newAddress.receiveTel;
		//提示用户新地址添加成功
		alert('地址修改成功!!');
	}
	Cookies.set('address', JSON.stringify(address));						// 将最新的地址数据更新到cookie中
	document.querySelector('.adress-eject').style.display = 'none';	// 关闭地址管理编辑弹窗
};
document.querySelector('.adress-cancel').onclick = function() {
	document.querySelector('.adress-eject').style.display = 'none';
};
//下单那地方  默认收货信息显示 
function showAddress() {
	var newAddress = [];
	var uName = Cookies.get('uName');
	address.forEach(function(item) {
		if(item.uName === uName && item.isDefault === true) {
			newAddress.push(item);
		}
	});
	if(newAddress.length > 0) {
		var name = newAddress[0].receiveName;
		var region = newAddress[0].receiveRegion;
		var tel = newAddress[0].receiveTel;
		document.querySelector('.useradress-data').innerText = `${name} ${region} ${tel}`;
	} else {
		document.querySelector('.useradress-data').innerText = '请选择默认收货地址!';
	}
}
showAddress();

// 鼠标滑入显示
document.querySelector('.kao').onmousemove = function() {
	document.querySelector('.kao-ch').style.display = 'block';
	document.querySelector('.kao').onmouseout = function() {
		document.querySelector('.kao-ch').style.display = 'none';
	};
};
document.querySelector('.me').onmousemove = function() {
	document.querySelector('.me-ch').style.display = 'block';
	document.querySelector('.me').onmouseout = function() {
		document.querySelector('.me-ch').style.display = 'none';
	};
};
// 隐藏部分滑入滑出
document.querySelector('.kao-ch').onmousemove = function() {
	document.querySelector('.kao-ch').style.display = 'block';
	document.querySelector('.kao-ch').onmouseout = function() {
		document.querySelector('.kao-ch').style.display = 'none';
	};
};
document.querySelector('.me-ch').onmousemove = function() {
	document.querySelector('.me-ch').style.display = 'block';
	document.querySelector('.me-ch').onmouseout = function() {
		document.querySelector('.me-ch').style.display = 'none';
	};
};


//普通文本框变地址
new Regions(document.querySelector('input.ad'));



// // 收货地址
// var userAddress = [];
// var uName = Cookies.get('uName');
// address.forEach(function(item) {
// 	if(item.uName === uName) {
// 		userAddress.push(item);
// 	}
// });
// var addressEl = document.querySelector('.useradress>ul');
// userAddress.forEach(function(item) {
// 	addressEl.innerHTML += `
// 		<li data-id="${item.id}">
// 			<a class="${item.isDefault ? 'select' : ''}">
// 				<div class="adress-name">
// 					<span class="adress-name-name">${item.receiveName}</span>
// 					<span>收</span>
// 					<span class="adress-default ${item.isDefault ? "default" : ""}">
// 						${item.isDefault ? "默认地址" : "设为默认址"}
// 					</span>
// 				</div>
// 				<div class="xian"></div>
// 				<div class="adress-concrete">
// 					<p class="receiveRegion">${item.receiveRegion}</p>
// 					<p class="receiveAddress">${item.receiveAddress}</p>
// 					<p class="receiveTel">${item.receiveTel}</p>
// 				</div>
// 				<div class="adress-operation">
// 					<input type="button" class="adress-modify" value="修改" />
// 					<input type="button" class="adress-delect" value="删除" />
// 				</div>
// 			</a>
// 		</li>
// 	`;
// });
// //显示默认地址
// document.querySelectorAll('.useradress>ul>li>a').forEach(function(item) {
// 	item.onclick = function() {
// 		if(this.className.indexOf('select') !== -1) return;
// 		this.parentNode.parentNode.querySelector('a.select').className = '';
// 		this.className = 'select';
// 	};
// });




// // 绑定点击事件
// //删除
// function removeHandler(e) {
// 	if(!confirm('是否删除?')) return;
// 	// 先拿到地址编号
// 	var liEl = e.target.parentNode.parentNode.parentNode;
// 	var id = parseInt(liEl.dataset.id);
// 	// 删除对应的tr
// 	liEl.parentNode.removeChild(liEl);
// 	// 更新cookie中的address
// 	var index = address.findIndex(function(item) { return item.id === id; });
// 	address.splice(index, 1);
// 	Cookies.set('address', address);
// 	// 提示示用户删除成功
// 	alert('删除成功!!');
// }
 

// //默认地址
// function setDefaultHandler(e) {
// 	if(e.target.className === 'adress-default default') return;
// 	// 获取当前行
// 	var target = null, id = 0;
// 	var liEl = e.target.parentNode.parentNode.parentNode;
// 	var defaultInputEl = liEl.parentNode.querySelector('.adress-default.default');
// 	if(defaultInputEl) { // 当前存在默认地址
// 		defaultInputEl.className = 'adress-default';
// 		defaultInputEl.value = '设为默认地址';
// 		id = parseInt(defaultInputEl.parentNode.parentNode.parentNode.dataset.id);
// 		target = address.find(function(item) { return item.id === id });
// 		target.isDefault = false;
// 	}
// 	e.target.className = 'adress-default default';
// 	e.target.value = '默认地址';
// 	id = parseInt(liEl.dataset.id);
// 	target = address.find(function(item) { return item.id ===id; });
// 	target.isDefault = true;
// 	Cookies.set('address', address);
// }
// document.querySelector('.useradress>ul').onclick = function(e) {
// 	//删除
// 	if(e.target.className.indexOf('adress-delect') !== -1) {
// 		removeHandler(e);
// 	}
// 	// 地址修改
// 	if(e.target.className.indexOf('adress-modify') !== -1) {
// 		updateHandler(e);
// 	}
// 	//默认
// 	if(e.target.className.indexOf('adress-default') !== -1) {
// 		setDefaultHandler(e);
// 	}
// };


// // 地址修改
// var id = 0;					// 记录当前修改的地址对应的编号是多少
// var isAdd = true;			// 标识当前是新增还是修改（真表示新增，假表示修改）
// var liEl = null;			// 关联当前正处于修改状态的行对象
// function updateHandler(e) {
// 	isAdd = false;
// 	liEl = e.target.parentNode.parentNode.parentNode;
// 	id = parseInt(liEl.dataset.id);
// 	var target = address.find(function(item) { return item.id === id; });
// 	var adressEl = document.querySelector('.adress-eject');
// 	adressEl.querySelector('.write-name').value = target.receiveName;
// 	adressEl.querySelector('.ad').value = target.receiveRegion;
// 	adressEl.querySelector('.details-adress').value = target.receiveAddress;
// 	adressEl.querySelector('.pho').value = target.receiveTel;
	
// 	document.querySelector('.adress-eject').style.display = 'block';
// }

// // 地址新增
// document.querySelector('.btn-add-adress').onclick = function() {
// 	isAdd = true;
// 	var adressEl = document.querySelector('.adress-eject');
// 	adressEl.querySelector('.write-name').value = '';
// 	adressEl.querySelector('.ad').value = '';
// 	adressEl.querySelector('.details-adress').value = '';
// 	adressEl.querySelector('.pho').value = '';
	
// 	document.querySelector('.adress-eject').style.display = 'block';
// };


// // 为保存按钮绑定点击事件
// document.querySelector('.save-adress').onclick = function() {
// 	var adressEl = document.querySelector('.adress-eject');
// 	var newAddress = {									// 搜集表单中的数据，整合成newAddress
// 		uName: uName,
// 		receiveName: adressEl.querySelector('.write-name').value,
// 		receiveRegion: adressEl.querySelector('.ad').value,
// 		receiveAddress: adressEl.querySelector('.details-adress').value,
// 		receiveTel: adressEl.querySelector('.pho').value
// 	};
// 	if(isAdd) {	// 新增
// 		newAddress.id = address[address.length - 1].id + 1;
// 		newAddress.isDefault = false;
// 		// 1. 数据的新增(address中多了一个对象)
// 		address.push(newAddress);
// 		// 2. dom的更新
// 		// generateLi(newAddress);
// 		var addressEl = document.querySelector('.useradress>ul');
// 		userAddress.forEach(function(item) {
// 			addressEl.innerHTML += `
// 				<li data-id="${item.id}">
// 					<a class="${item.isDefault ? 'select' : ''}">
// 						<div class="adress-name">
// 							<span class="adress-name-name">${item.receiveName}</span>
// 							<span>收</span>
// 							<span class="adress-default ${item.isDefault ? "default" : ""}">
// 								${item.isDefault ? "默认地址" : "设为默认址"}
// 							</span>
// 						</div>
// 						<div class="xian"></div>
// 						<div class="adress-concrete">
// 							<p class="receiveRegion">${item.receiveRegion}</p>
// 							<p class="receiveAddress">${item.receiveAddress}</p>
// 							<p class="receiveTel">${item.receiveTel}</p>
// 						</div>
// 						<div class="adress-operation">
// 							<input type="button" class="adress-modify" value="修改" />
// 							<input type="button" class="adress-delect" value="删除" />
// 						</div>
// 					</a>
// 				</li>
// 			`;
// 		});
// 		// 3. 提示用户新地址添加成功
// 		alert('新地址添加成功');
// 	} else {	// 修改
// 		var index = address.findIndex(function(item) { return item.id === id; });
// 		newAddress.id = id;
// 		newAddress.isDefault = address[index].isDefault;
// 		// 1. 数据的更新（用newAddress替换掉修改前对应的地址）
// 		address.splice(index, 1, newAddress);
// 		// 2. dom的更新
// 		liEl.querySelector('.adress-name-name').innerText = newAddress.receiveName;
// 		liEl.querySelector('.receiveRegion').innerText = newAddress.receiveRegion;
// 		liEl.querySelector('.receiveAddress').innerText = newAddress.receiveAddress;
// 		liEl.querySelector('.receiveTel').innerText = newAddress.receiveTel;
// 		// 3. 提示用户新地址添加成功
// 		alert('地址修改成功');
// 	}
// 	Cookies.set('address', JSON.stringify(address));						// 将最新的地址数据更新到cookie中
// 	document.querySelector('.adress-eject').style.display = 'none';	// 关闭地址管理编辑弹窗
// };


// //公共的辅助函数
// function generateLi(item) {
// 	var addressEl = document.querySelector('.useradress>ul');
// 	addressEl.innerHTML += `
// 		<li data-id="${item.id}">
// 			<a class="${item.isDefault ? 'select' : ''}">
// 				<div class="adress-name">
// 					<span class="adress-name-name">${item.receiveName}</span>
// 					<span>收</span>
// 					<span class="adress-default ${item.isDefault? "default" : ""}">
// 						${item.isDefault ? "默认地址" : "设为默认址"}
// 					</span>
// 				</div>
// 				<div class="xian"></div>
// 				<div class="adress-concrete">
// 					<p>${item.receiveRegion}</p>
// 					<p>${item.receiveAddress}</p>
// 					<p>${item.receiveTel}</p>
// 				</div>
// 				<div class="adress-operation">
// 					<input type="button" class="adress-modify" value="修改" />
// 					<input type="button" class="adress-delect" value="删除" />
// 				</div>
// 			</a>
// 		</li>
// 	`;
// }



