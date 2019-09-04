	//引入尾部
	$('#foot').load("../../src/html/footer.html");
$(function(){
	$message = $('#message');
	$getMessage = $('#getMessage');
	//name框失焦事件
	$('#name').blur(function(e){
		//获取当前输入框中输入值字符串$(this).val()
		//正则设置字符长度10，且以1开头
		var reName = /^1\d{10}$/;
		if(reName.test($(this).val())){
			$("#nameSpan").css("display","none");
		}else{
			$("#nameSpan").css("display","block");
		}
	})
	//密码框失焦事件
	$('#password').blur(function(){
		//获取当前输入框中输入值字符串$password.val();
		//密码是数字字母大小写，且6-8位
		var reName = /^([a-zA-Z0-9]){6,8}$/;
		if(reName.test($('#password').val())){
			$('#passSpan1').css("display","none");
		}else{
			$("#passSpan1").css("display","block");
		}
	})
	//再次确认密码框失焦事件	
	$('#againPass').blur(function(){
		//判断密码是否相同
		if($('#password').val() === $('#againPass').val()){
			$('#passSpan2').css("display","none");
		}else{
			$('#passSpan2').css("display","block");
		}
	}) 
//	//判断四位验证码是否正确
//	$('#code').blur(function(){
//		
//	})
//	//更换验证码的点击事件
//	$('#changeCode').click(function(){
//		
//	})
	//注册按钮点击事件(表单提交验证)
	$('#registerNow').click(function(){
		console.log($('#name').val())
		console.log($('#password').val())
		//获取cookie中字符串
		var formStr = $.cookie("form") ? $.cookie("form") : "";
		//获取当前name可输入框中的值，手机号
		var formPhone = $('#name').val();
		//获取当前密码框中的值
		var formPass = $('#password').val();
		//将cookie字符串转成对象
		var formObj = convertStrToObj(formStr);
		//判断cookie中手机号是否注册过，即是否已经存在
		if(formPhone in formObj){
			$("#nameSpan")[0].innerHTML ='账号已注册';
			$("#nameSpan").css({"display":"block","color":"tomato"})
		}
		else{
			//如果输入的手机号和密码符合，手机号未被注册过，则添加cookie
			var display1 = $('#nameSpan').css("display");
			var display2 = $('#passSpan1').css("display");
			var display3 = $('#passSpan2').css("display");
			var value1 = $('#name').val();
			var value2 = $('#password').val();
			var value3 = $('#againPass').val();
			//判断错误提示框不存在，且内容框的值不为空
			if(display1,display2,display3 == "none" && value1,value2,value3 !== ""){
				
				//存入信息
				formObj[formPhone] = {
					name : formPhone,
					pass : formPass
				};
				//存入cookie
				formStr = convertObjToStr(formObj);
				$.cookie("form",formStr,{expires : 10,path : "/"});
				
				//注册成功后跳转到登录页面，提示可以登录
				location.href="../html/login.html";
			}
		}	
	})
	//立即登录点击事件
	$('#login').click(function(){
		location.href = "../html/login.html";
	})
});	
	
function convertStrToObj(formStr){
	//如果传入的是空字符串，即返回空对象
	if(!formStr){
		return {};
	}
	//根据id不同进行分割
	var goods = formStr.split(":");
	//空对象存分割后字符串用
	var obj = {};
	for(var i = 0; i < goods.length; i ++){
		var data = goods[i].split(",");
		//以商品的id为健，商品的其他信息为值，这个值也设计为一个对象
		obj[data[0]] = {
			name : data[0],
			pass : data[1]
		}
	}
	return obj;
}
function convertObjToStr(obj){
	var formStr = "";
	//遍历对象
	for(var id in obj){
		if(formStr){
			formStr += ":";
		}
		//name和id其实相同
		formStr += obj[id].name + "," + obj[id].pass ;
	}
	return formStr;
}

