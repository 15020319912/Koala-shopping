var titles = document.querySelectorAll('ul.right-titles>li');
for(var i = 0; i < titles.length; i++) {
	titles[i].index = i;
	titles[i].onclick = function() {
		var contents = document.querySelectorAll('ul.right-contents>li');
		for(var j = 0; j < contents.length; j++) {
			contents[j].style.display = 'none';
		}
		
		contents[this.index].style.display = 'block';
		
	
	}
	
}


document.querySelector('button.phone-login').onclick = function() {
	// 1.手机用户输入的用户名密码
	var name = document.querySelector('input.phone-name').value;
	var pwd = document.querySelector('input.phone-pass').value;
	// 2.从Cookie中拿取所有的用户
	var user = JSON.parse(Cookies.get('user'));
	var loginUser = user.find(function(item) { return item.name === name && item.pwd === pwd; }); 
	// 3.判断是否登录成功
	if(loginUser) {
		Cookies.set('uName', name);					//让cookie记录登录用户的用户表
		var target = Cookies.get('target');			// 从cookie中获取我需要挑到的页面
		// window.location.href = target || '';
		window.location.replace(target || '../index.html');		//replace方式页面的跳转 是后退不回来的
	} else {
		alert('用户名或密码错误..');
	}
	
};












