//引入头部
$("#head").load("../../src/html/header.html");
//引入尾部
$('#foot').load("../../src/html/footer.html");
//商品goodImg(大盒子)let oBigBox = $('#div1');
$goodImg = $('#goodImg');
//2. 获取小图所在的盒子$oSmallPic
$smallPic = $('.small_pic');
$smallImg = $('.small_pic img');
//3. 获取遮罩$oMark
$mark = $('.mark');
//4. 获取滑块oFloat
$float = $('.float_layer');
//5. 大图所在盒子oBigPic 
$bigPic = $('.big_pic');
//6. 大图
$bigImg = $('.big_pic img');
//给遮罩添加移入移出事件
$mark.mouseenter(function(){
	$float.css("display","block");
	$bigPic.css("display","block");
})
$mark.mouseleave(function(){
	$float.css("display","none");
	$bigPic.css("display","none");
})
//9. 给遮罩添加移动事件
$mark[0].onmousemove = function(evt){
	let e = evt || window.event;
	let left = e.pageX - $goodImg[0].offsetLeft - $smallPic[0].offsetLeft - $float[0].offsetWidth / 2;
	let top = e.pageY - $goodImg[0].offsetTop - $smallPic[0].offsetTop - $float[0].offsetHeight / 2;
	
	//边界
	if(left <= 0){
		left = 0;
	}else if(left >= this.offsetWidth - $float[0].offsetWidth){
		left = this.offsetWidth - $float[0].offsetWidth;
	}
	if(top <= 0){
		top = 0;
	}else if(top >= this.offsetHeight - $float[0].offsetHeight){
		top = this.offsetHeight - $float[0].offsetHeight;
	}
	$float[0].style.left = left + 'px';
	$float[0].style.top = top + 'px';
	
	//求滑块在小图上的移动比例
	let pX = left / (this.offsetWidth - $float[0].offsetWidth);
	let pY = top / (this.offsetHeight - $float[0].offsetHeight);
	//设置大图移动
	$bigImg[0].style.left = - pX * ($bigImg[0].offsetWidth - $bigPic[0].offsetWidth) + 'px';
	$bigImg[0].style.top = - pY * ($bigImg[0].offsetHeight - $bigPic[0].offsetHeight) + 'px';
}
//鼠标滑过列表小图片，更换详图和放大镜图片
$piclistImg = $('.piclist-img');	
$piclistImg.hover(function(){
	$smallImg[0].setAttribute("src",this.src)
	$bigImg[0].setAttribute("src",this.src)	
},function(){})
//设置对象存放信息
var proArr = {
	id : "1",
	img : "",
	color : "",
	system : "",
	versions : "",
	num : "",
	money : ""
}
//获取颜色
$color = $('#color a');
var nowColor = ($color.html()).split('`');//默认图片和颜色切割
proArr.img = nowColor[0];
proArr.color = nowColor[1];
//颜色选择点击事件
$color.click(function(){
	$color.each(function(){
		$(this).css({"border":"1px solid #999","color":"#999"})
	})
	$(this).css({"border":"1px solid #fc6628","color":"#fc6628"})
	nowColor = ($(this).html()).split('`');//切割分开图片和颜色
	proArr.img = nowColor[0];
	proArr.color = nowColor[1];
})
//获取制式
$system = $('#system a');
proArr.system = $system.html()//只有一个选项时，默认
//制式点击事件
$system.click(function(){
	$system.each(function(){
		$(this).css({"border":"1px solid #999","color":"#999"})
	})
	$(this).css({"border":"1px solid #fc6628","color":"#fc6628"})
	proArr.system = $(this).html()
})
//获取版本
$versions = $('#versions a');
proArr.versions = $versions.html()//默认选项是当前第一个
$titMoney = $('.titMoney');//价格
proArr.money = parseInt($titMoney.html())//默认套餐价格
//版本点击事件
$versions.click(function(){
	$versions.each(function(){
		$(this).css({"border":"1px solid #999","color":"#999"})
	})
	$(this).css({"border":"1px solid #fc6628","color":"#fc6628"})
	proArr.versions = $(this).html()	
	//根据版本判断价格
	if($(this)[0].className == "one"){
		proArr.money = 1499;
		$titMoney[0].innerHTML = 1499;
	}else{
		proArr.money = 1999;
		$titMoney[0].innerHTML = 1999;
	}
})
//加减数量
$numberTxt = $('#number #txt');
$sub = $('.sub');
$add = $('.add');
//获取默认数量
proArr.num = $numberTxt.val()
//输入数量，失焦时获取数量
$numberTxt.blur(function(){
	proArr.num = $(this).val();
})
//加减点击事件
$sub.click(function(){
	if($numberTxt.val() > 1){//当前值大于1才能减
		$numberTxt[0].value = $numberTxt[0].value - 1;
	}
	//获取数量
	proArr.num = parseInt($numberTxt.val());
})
$add.click(function(){
	$numberTxt[0].value = parseInt($numberTxt[0].value) + 1;
	//获取数量
	proArr.num = parseInt($numberTxt.val());
})
//购物车按钮
$inCart = $('#inCart a');
//立即购买按钮
$nowBuy = $('#nowBuy a');
//给加入购物出按钮添加移入移出事件
$inCart.hover(function(){
	$(this).css({"background":"#fc6628","color":"#fff"})
},function(){
	$(this).css({"background":"#ffeded","color":"#fc6628"})
})
//给立即购买按钮添加移入移出事件
$nowBuy.hover(function(){
	$(this).css({"background":"#fc6628","color":"#fff"})
},function(){
	$(this).css({"background":"#ffeded","color":"#fc6628"})
})
window.onload = function(){
	//更改页面上方购物车上的值
	//调用获取当前cookie中总商品数的函数，页面加载调用一次
	loadCart();
	function loadCart(){
		var $headNum = $('.headNum');
		var cartStr = $.cookie("cart") ? $.cookie("cart") : "";
		var cartObj = convertCartStrToObj(cartStr);
		var total = 0;
		for(var id in cartObj){
			total += cartObj[id].num;
		}
		$headNum.html(total);
	}
	//初始页面的商品数量设为1
	proArr.num == $numberTxt.val(1);
	//给加入购物车按钮添加点击事件
	$inCart.click(function(){
		//根据选择不同，得到不同id
		if(proArr.versions == "4GB+64GB"){
			if(proArr.color == "夜空黑"){
				proArr.id = 1;
			}else if(proArr.color == "经典蓝"){
				proArr.id = 2;
			}else if(proArr.color == "多彩蓝"){
				proArr.id = 3;
			}
		}else if(proArr.versions == "4GB+128GB"){
			if(proArr.color == "夜空黑"){
				proArr.id = 4;
			}else if(proArr.color == "经典蓝"){
				proArr.id = 5;
			}else if(proArr.color == "多彩蓝"){
				proArr.id = 6;
			}
		}
		//获取商品id
		var goodId = proArr.id;
		//获取cookie
		var cartStr = $.cookie("cart") ? $.cookie("cart") : "";
		//将字符串转成对象(获取的cookie一定为字符串)
		var cartObj = convertCartStrToObj(cartStr);
		//判断该商品是否已经在购物车中存在，(当前id如果已经存在，则直接加1)
		if(goodId in cartObj){
			//如果已存在，那么该商品的数量加上目前选择的num数量
			cartObj[goodId].num += parseInt(proArr.num);
		}else{//如果不存在，那么将新商品的信息存入
			cartObj[goodId] = {
				id : proArr.id,
				img : proArr.img,
				color : proArr.color,
				system : proArr.system,
				versions : proArr.versions,
				num : proArr.num,
				money : proArr.money
			};
		}
		//将对象转为字符串
		cartStr = convertObjToCartStr(cartObj);
		console.log(cartStr)//输出点击加入购物车后，当前的cookie
		//存入cookie//将新的购物车信息存回cookie
		$.cookie("cart",cartStr,{expires : 7,path:"/"});
		//点击后cookie中数量发生变化，再调用一次函数
		loadCart();
	})
}
//将获取的cookie字符串转对象
function convertCartStrToObj(cartStr){
	//如果是空字符串，即没有购物车cookie信息，那么购物车为空，直接返回一个空对象
	if(!cartStr){
		return {};
	}
//	console.log(cartStr)
	var goods = cartStr.split(":");//将字符串转换成数组，cookie中每个类别存成不同的id时，根据每个商品切割
	var obj = {};
	for(var i = 0; i < goods.length; i ++){
		var data = goods[i].split(",");//将每个商品信息的每一条分开：7条属性
		//以商品的id为健，商品的其他信息为值，这个值也设计为一个对象
		obj[data[0]] = {
			id : data[0],
			img : data[1],
			color : data[2],
			system : data[3],
			versions : data[4],
			num : parseInt(data[5]),
			money : data[6]
		}//作为一个对象（有id）存入cookie中
	}
	return obj;
}
function convertObjToCartStr(obj){
	var cartStr = "";
	//遍历对象
	//根据id不同cookie中存放多个id不同的对象，
	for(var id in obj){
		if(cartStr){
			cartStr += ":";
		}
		//每一条id对象设置成字符串 
		cartStr += obj[id].id + "," + obj[id].img + "," + obj[id].color + "," + obj[id].system + "," + obj[id].versions + "," + obj[id].num + "," + obj[id].money ;
	}
	return cartStr;
}
