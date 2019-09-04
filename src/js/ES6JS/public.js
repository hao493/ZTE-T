$('.right-navbar li:nth-child(1)').click(function(){
	location.href='../html/login.html';
})
$('.right-navbar li:nth-child(2)').click(function(){
	location.href='../html/register.html';
})
$('.home').click(function(){
	location.href="../html/index.html";
})
$('.shop-cart').click(function(){
	location.href="../html/cart.html";
})
//没有添加购物车时显示
$('.shop-cart').hover(function(){
	$('.shopcart-null').slideDown(300);
	$('.shopcart-null').css("display","block");
},function(){
	$('.shopcart-null').css("display","none");
})
//购物车的商品数量

//list-classify中的axonm系列的二级菜单
$('.li-axonm').hover(function(){
	$('#second').slideDown(500);
	$('#second').css("display","block");
},function(){
	$('#second').css("display","none");
})
//list-classify中的blade系列的二级菜单
$('.li-blade').hover(function(){
	$('#third').slideDown(500);
	$('#third').css("display","block");
},function(){
	$('#third').css("display","none");
})