//引入头部
$("#head").load("../../src/html/header.html");
//引入尾部
$('#foot').load("../../src/html/footer.html");
//动态添加列表中的每一个商品
$listUl = $('#list-ul');

ajax("../json/list.json",function(data){
	let arr = JSON.parse(data);
	var $arr = $(arr);
	$arr.each(function(){
		$listUl.append(`
		<li>
			<a href="#">
				<span><img src="${this.img}"/></span>
				<span>${this.tit}</span>
				<span>${this.des}</span>
				<span>
					<p>${this.money}</p>
					<p class="nowBuy">立即购买</p>
				</span>
			</a>
		</li>
		`);
	})

	//鼠标滑过购买按钮
	$nowbuy = $('.nowBuy');
	$nowbuy.each(function(){
    	$(this).hover(function(){
			$(this).css({"background":"orangered","color":"#fff"})
		},function(){
			$(this).css({"background":"#fff","color":"orangered"})
		}) 
	})
})	


