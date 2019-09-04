//引入头尾部
$('#head').load("header.html");
//引入尾部
$('#foot').load("footer.html");
//banner图
$ul = $('.img-list');
$ul2 = $('.btn-list');
$ul_li = $('.img-list li');
$ul2_li = $('.btn-list li');
hover

$ul[0].appendChild($ul_li[0].cloneNode(true));
let liWidth = $ul_li[0].offsetWidth;
//简易运动
function sport(obj,target){
	clearInterval(obj.timer);
	obj.timer = setInterval(function(){
		let cur = obj.offsetLeft;
		let speed = target > cur ? 100 : -100;
		$ul[0].style.left = (speed + cur) + 'px';
		if(Math.abs(target - cur) <= Math.abs(speed) ){//最后一步时不够步长直接到达
			clearInterval(obj.timer);
			obj.style.left = target + 'px';
		}
	},20)block
}
//大图计时滚动;
let timer = null;
let key = 0; //控制播放的数量
let circle = 0;
let olLis = document.querySelectorAll('#ol li');
timer = setInterval(autoPlay,2000);
function autoPlay(){
	key ++;
	if(key > $ul_li.length - 1){
		$ul[0].style.left = 0;
		key = 1;
	}
	sport($ul[0],-key * liWidth);
	
	circle ++;
	if(circle > $ul2_li.length - 1){
		circle = 0;
	}
	for(let i = 0,len = $ul2_li.length;i < len;i ++){
		$ul2_li[i].className = '';
		
	}
	$ul2_li[circle].className = 'current';
}
//二级菜单
$rBlock = $('#rBlock');
$left1 = $('.left-one');
$oneL = $('.one-line');
$left1.hover(function(){
	$oneL.css("display","block");
	$rBlock.css("display","block");
	$left1.css("background","#fff");

},function(){
	$rBlock.css("display","none");
	$left1.css("background","transparent");
	$oneL.css("display","none");
}) 
//二级菜单第二行
$left2 = $('.left-two')
$twoL = $('.two-line');
$left2.hover(function(){
	$twoL.css("display","block");
	$rBlock.css("display","block");
	$left2.css("background","#fff");
},function(){
	$twoL.css("display","none");
	$rBlock.css("display","none");
	$left2.css("background","transparent");
})
//二级菜单第三行
$left3 = $('.left-three');
$threeL = $('.three-line');
$left3.hover(function(){
	$threeL.css("display","block");
	$rBlock.css("display","block");
	$left3.css("background","#fff");
},function(){
	$threeL.css("display","none");
	$rBlock.css("display","none");
	$left3.css("background","transparent");
})
//二级菜单第四行
$left4 = $('.left-four');
$fourL = $('.four-line');
$left4.hover(function(){
	$fourL.css("display","block");
	$rBlock.css("display","block");
	$left4.css("background","#fff");
},function(){
	$fourL.css("display","none");
	$rBlock.css("display","none");
	$left4.css("background","transparent");
})
//二级菜单第五行
$left5 = $('.left-five');
$fiveL = $('.five-line');
$left5.hover(function(){
	$fiveL.css("display","block");
	$rBlock.css("display","block");
	$left5.css("background","#fff");
},function(){
	$fiveL.css("display","none");
	$rBlock.css("display","none");
	$left5.css("background","transparent");
})
//二级菜单第六行
$left6 = $('.left-six');
$sixL = $('.six-line');
$left6.hover(function(){
	$sixL.css("display","block");
	$rBlock.css("display","block");
	$left6.css("background","#fff");
},function(){
	$sixL.css("display","none");
	$rBlock.css("display","none");
	$left6.css("background","transparent");
})
//二级菜单第七行
$left7 = $('.left-seven');
$sevenL = $('.seven-line');
$left7.hover(function(){
	$sevenL.css("display","block");
	$rBlock.css("display","block");
	$left7.css("background","#fff");
},function(){
	$sevenL.css("display","none");
	$rBlock.css("display","none");
	$left7.css("background","transparent");
})
//今日抢购，动态对tML和tMR添加img
$lImg = $('#tML a');
$rImg = $('#tMR a');
$(function(){
	$.getJSON('../json/index.json',function(obj){
		
		$lImg.css("background",'url(' + obj.tML[0] + ')');
	})
	$.getJSON('../json/index.json',function(obj){
		
		$rImg.css("background",'url(' + obj.tMR[0] + ')');
	})
	
})
//设置手机专区的左广告图片
$mobileAdv = $('#mobileAdv');
$(function(){
	$.getJSON('../json/index.json',function(obj){
		$mobileAdv.css("background","url(" + obj.adv[0] + ') no-repeat');
	})
})
//配件专区添加ul
$oUl2 = $('.accMain-ul');
$titR1 = $('.titR1');
$titR2 = $('.titR2');
$titR3 = $('.titR3');
//分页第一页
$titR1.hover(function(){
	$oUl2[0].innerHTML = '';
	ajax('../json/accMain1.json',function(data){
		let arr = JSON.parse(data);
		for(let j = 0,len = arr.length;j < len;j ++){
			//创建li
			let li = document.createElement('li');
			li.innerHTML = `<a href="#">
					<span><img src="${arr[j].img}"></span>
					<span>${arr[j].tit}</span>
					<span>${arr[j].money}</span>
				</a>`;
			$oUl2[0].appendChild(li);
		}
	})
	$titR2.css({"border":"none","color":"#000"});
	$titR3.css({"border":"none","color":"#000"});
	$titR1.css({"border-bottom":"3px solid orangered","color":"orangered"});
},function(){})
//分页第二页
$titR2.hover(function(){
	$oUl2[0].innerHTML = '';
	ajax('../json/accMain2.json',function(data){
		let arr = JSON.parse(data);
		for(let j = 0,len = arr.length;j < len;j ++){
			//创建li
			let li = document.createElement('li');
			li.innerHTML = `<a href="#">
					<span><img src="${arr[j].img}"></span>
					<span>${arr[j].tit}</span>
					<span>${arr[j].money}</span>
				</a>`;
			$oUl2[0].appendChild(li);
		}
	})
	$titR1.css({"border":"none","color":"#000"});
	$titR3.css({"border":"none","color":"#000"});
	$titR2.css({"border-bottom":"3px solid orangered","color":"orangered"});
},function(){})	
//分页第三页
$titR3.hover(function(){
	$oUl2[0].innerHTML = '';
	ajax('../json/accMain3.json',function(data){
		let arr = JSON.parse(data);
		for(let j = 0,len = arr.length;j < len;j ++){
			//创建li
			let li = document.createElement('li');
			li.innerHTML = `<a href="#">
					<span><img src="${arr[j].img}"></span>
					<span>${arr[j].tit}</span>
					<span>${arr[j].money}</span>
				</a>`;
			$oUl2[0].appendChild(li);
		}
	})
	$titR2.css({"border":"none","color":"#000"});
	$titR1.css({"border":"none","color":"#000"});
	$titR3.css({"border-bottom":"3px solid orangered","color":"orangered"});
},function(){})	
//设置手机专区每个li里面的内容
$oUl = $(".mobile-ul");
$(function(){
	//$.getJSON('../json/mobile.json',function(obj){
	//$oUl[0].innerHTML = '';
	ajax('../json/mobile.json',function(data){
		let arr = JSON.parse(data);
		console.log(arr.length)
		for(let j = 0,len = arr.length;j < len;j ++){
							//创建li
			
			let li = document.createElement('li');
			li.innerHTML = `
				<a href="#">
					<span><img src="${arr[j].img}"></span>
					<span>${arr[j].tit}</span>
					<span>${arr[j].des}</span>
					<span>${arr[j].money}</span>
				</a>`;
			
			$oUl[0].appendChild(li);
		}
	});
});

