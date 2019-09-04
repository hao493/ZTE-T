//引入尾部
$('#foot').load("../../src/html/footer.html");

//默认是表单1，点击用户密码登录，显示表单2
$('.login1').click(function(){
	$('.signup-form1').css("display","none");
	$('.signup-form2').css("display","block");
})
//点击手机验证码登录，显示表单1
$('.login2').click(function(){
	$('.signup-form2').css("display","none");
	$('.signup-form1').css("display","block");
})
//立即注册按钮点击事件
$('#register1').click(function(){
	location.href="register.html";
});
$('#register2').click(function(){
	location.href="register.html";
});
//表单1部分
//name失焦事件
$('#name1').blur(function(){
	//获取输入的用户手机号
	var formPhone = $('#name1').val();
	//获取cookie
	var formStr = $.cookie("form") ? $.cookie("form") : '';
	var formObj = convertStrToObj(formStr);
	//判断手机号是否在cookie中
	if(formPhone in formObj){
		//账号正确
		$("#nameSpan1").css("display","none");
	}else{
		//输入账号错误
		$("#nameSpan1").css({"display":"block","color":"tomato"});
	}
})
//点击登录按钮
$('#registerNow1').click(function(){
	//如果正确跳转到主页,这里根据#nameSpan是否存在进行判断
	var display1 = $('#nameSpan').css("display");
	if(display1 == "none"){
		location.href="index.html";
	}
})
//表单2部分
//name2失焦事件
$('#name2').blur(function(){
	var formPhone = $('#name2').val();
	var formStr = $.cookie('form') ? $.cookie('form') : '';
	var formObj = convertStrToObj(formStr);
	if(formPhone in formObj){
		$('#nameSpan2').css("display","none");
	}else{
		$('#nameSpan2').css({"display":"block","color":"tomato"});
	}
})
//密码框失焦事件
$('#pass').blur(function(){
	var formPass = $('#pass').val();
	var formPhone = $('#name2').val();
	var formStr = $.cookie('form') ? $.cookie('form') : '';
	var formObj = convertStrToObj(formStr);
	//如果账号正确再进行密码判断
	if(formPhone in formObj){
		if(formObj[formPhone].pass == formPass){
			//密码正确
			$('#passSpan').css("display","none");
		}else{
			//密码错误
			$('#passSpan').css({"display":"block","color":"tomato"});
		}
	}
})
//点击登录按钮
$('#registerNow2').click(function(){
	var formBlock1 = $('#nameSpan2').css("display");
	var formBlock2 = $('#passSpan').css('display');
	//提示错误框不在，判断可以登录
	if(formBlock1,formBlock2 == "none"){
		location.href = "index.html";
	}
})
function convertStrToObj(formStr){
	if(!formStr){
		return {};
	}
	var goods = formStr.split(":");
	var obj = {};
	for(var i = 0; i < goods.length; i ++){
		var data = goods[i].split(",");
		//以商品的id为健，商品的其他信息为值，这个值也设计为一个对象
		obj[data[0]] = {
			phone : data[0],
			pass : data[1],
		}
	}
	return obj;
}
