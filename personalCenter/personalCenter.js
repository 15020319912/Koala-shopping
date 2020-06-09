// 先判断去过主页吗？没去过就跳到主页
if (!Cookies.get('init')) window.location.replace('../index.html');
var address = JSON.parse(Cookies.get('address'));
// 尝试从Cookie中获取用户的用户名，进而判断是否登录
var uName = Cookies.get('uName');
if (uName) { // 如果登录
	// 从address数组中筛选顺当前登录用户相关的所有送货址userAddress
	var userAddress = address.filter(function(item) {
		return item.uName === uName;
	});
	// 迭代userAddress动态拼接展示数据
	userAddress.forEach(function(item) {
		generateTr(item);
	});
} else { // 如果没登录
	Cookies.set('target', window.location.href);
	window.location.replace('../login/index.html');
}
// 公共的辅助函数
function generateTr(item) {
	var tbodyEl = document.querySelector('.address-wrapper tbody');
	tbodyEl.innerHTML +=
		`
		<tr data-id='${item.id}'>
			<td>${item.receiveName}</td>
			<td>${item.receiveRegion} - ${item.receiveAddress}</td>
			<td>${item.receiveTel}</td>
			<td>
				<input type='button' value='修改' class='btn-update' />
				<span> | </span>
				<input type='button' value='删除' class='btn-remove' />
			</td>
			<td>
				<input type='button' 
				value='${item.isDefault ? "默认地址" : "设为默认址"}' 
				class='btn-default ${item.isDefault? "default" : ""}' />
			</td>
		</tr>
	`;
}

function removeHandler(e) {
	//a链接的删除
	document.querySelector(".delete-wrapper").style.display = "block";
	document.querySelector(".delete-wrapper .ok").onclick = function() {
		// 先拿到地址编号
		var trEl = e.target.parentNode.parentNode;
		var id = parseInt(trEl.dataset.id);
		// 删除对应的tr
		trEl.parentNode.removeChild(trEl);
		// 更新cookie中的address
		var index = address.findIndex(function(item) { return item.id === id; });
		address.splice(index, 1);
		Cookies.set('address', address);
		// i的自减
		// document.querySelector(".address-wrapper i").innerText = newaddress.length;
		// 让弹层消失
		document.querySelector(".delete-wrapper").style.display = "none";
	};
	document.querySelector(".delete-wrapper .notok").onclick = function() {
		document.querySelector(".delete-wrapper").style.display = "none";
	};
};

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
		var formEl = document.forms['address'];
		formEl["nameone"].value = target.receiveName;
		formEl["phone1"].value = target.receiveTel;
		formEl["place"].value = target.receiveRegion;
		formEl["address"].value = target.receiveAddress;
};
// 地址新增

document.querySelector('.address-wrapper tbody').onclick = function(e) {
	if (e.target.className.indexOf('btn-remove') !== -1) {
		removeHandler(e);
	}
	if (e.target.className.indexOf('btn-update') !== -1) {
		updateHandler(e);
	}
	if (e.target.className.indexOf('btn-default') !== -1) {
		setDefaultHandler(e);
	}
};

//调用地址
new Regions(document.querySelector("input.address-place"));
//个人中心我的订单左侧
var perLeft = document.querySelectorAll(".per-center-left a");
for (i = 0; i < perLeft.length; i++) {
	perLeft[i].onclick = function() {
		document.querySelector(".per-center-left a.active").className = "";
		this.className = "active";
	};
}
//我的订单选项卡下边框滑动效果
var orderTab = document.querySelectorAll("ul.order-tab>li");
for (i = 0; i < orderTab.length; i++) {
	orderTab[i].index = i;
	orderTab[i].onmouseover = function() {
		document.querySelector(".order-tab-wrapper>span").style.marginLeft = 'calc(70%' + '/' + '5' + '*' + this.index +
			')';
	};
	orderTab[i].onclick = function() {
		document.querySelector("ul.order-tab>li.active").className = "";
		this.className = "active";
	};
	orderTab[i].onmouseout = function() {
		this.className === "active" ? document.querySelector(".order-tab-wrapper>span").style.marginLeft =
			'calc(70%' + '/' + '5' + '*' + this.index + ')' :
			document.querySelector(".order-tab-wrapper>span").style.marginLeft = "0";
	};
}
//----------------我的订单，对于时间，状态的控制
document.querySelector("ul.order-time>li:first-child").onclick = function() {
	var orderLi = document.querySelectorAll("ul.order-time>li");
	for (i = 0; i < orderLi.length; i++) {
		orderLi[i].style.display = "block";
	}
};

var orderLi = document.querySelectorAll("ul.order-time>li");
orderLi.onclick = function() {
	for (i = 0; i < orderLi.length; i++) {
		if (order[i] != 0) {
			order[i].style.display = "block";
		} else {
			display = "none";
		}
	}
};


document.querySelector("ul.state>li:first-child").onclick = function() {
	var orderLi = document.querySelectorAll("ul.state>li");
	for (i = 0; i < orderLi.length; i++) {
		orderLi[i].style.display = "block";
	}
};

// 我的地址管理table

// 为保存按钮绑定点击事件
document.querySelector('.deposit').onclick = function() {
	var formEl = document.forms['address'];				// 先找表单
	var newAddress = {									// 搜集表单中的数据，整合成newAddress
		uName: uName,
		receiveName: formEl["nameone"].value,
		receiveTel: formEl["phone1"].value,
		receiveRegion: formEl["place"].value,
		receiveAddress: formEl["address"].value
	};
	if(isAdd) {	// 新增
		newAddress.id = address[address.length - 1].id + 1;
		newAddress.isDefault = false;
		// 1. 数据的新增(address中多了一个对象)
		address.push(newAddress);
		// 2. dom的更新
		generateTr(newAddress);
		// 3. 提示用户新地址添加成功
		isAdd = true;
		document.querySelector(".cloth-wrapper").style.display = "block";
		setTimeout('document.querySelector(".cloth-wrapper").style.display = "none"', 2000)
	} else {	// 修改
		var index = address.findIndex(function(item) { return item.id === id; });
		newAddress.id = id;
		newAddress.isDefault = address[index].isDefault;
		// 1. 数据的更新（用newAddress替换掉修改前对应的地址）
		address.splice(index, 1, newAddress);
		// 2. dom的更新
		trEl.cells[0].innerText = newAddress.receiveName;
		trEl.cells[1].innerText = `${newAddress.receiveRegion} - ${newAddress.receiveAddress}`;
		trEl.cells[2].innerText = newAddress.receiveTel;
		// 3. 提示用户新地址添加成功
		alert('地址修改成功');
	}
	var formEl = document.forms['address'];
	formEl["nameone"].value = '';
	formEl["phone1"].value = '';
	formEl["place"].value = '';
	formEl["address"].value = '';
	Cookies.set('address', JSON.stringify(address));						// 将最新的地址数据更新到cookie中

};

//-------------------------右边三大板块显示区域
var publicDiv = document.querySelectorAll(".per-center-left li.public");
for (i = 0; i < publicDiv.length; i++) {
	publicDiv[i].index = i;
	publicDiv[i].onclick = function() {
		var str = null;
		str = document.querySelector(".per-center-left li.active").className;
		document.querySelector(".per-center-left li.active").className = str.replace(" active", "");
		publicDiv[this.index].className += " active";

		str = document.querySelector(".per-center-right>ul>li.active").className;
		document.querySelector(".per-center-right>ul>li.active").className = str.replace(" active", "");
		document.querySelectorAll(".per-center-right>ul>li")[this.index].className += " active";

	};
}
