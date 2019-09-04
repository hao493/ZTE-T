//引入头部
$("#head").load("../../src/html/header.html"); //引入尾部

$('#foot').load("../../src/html/footer.html"); //商品goodImg(大盒子)let oBigBox = $('#div1');

$goodImg = $('#goodImg'); //2. 获取小图所在的盒子$oSmallPic

$smallPic = $('.small_pic');
$smallImg = $('.small_pic img'); //3. 获取遮罩$oMark

$mark = $('.mark'); //4. 获取滑块oFloat

$float = $('.float_layer'); //5. 大图所在盒子oBigPic 

$bigPic = $('.big_pic'); //6. 大图

$bigImg = $('.big_pic img'); //给遮罩添加移入移出事件

$mark.mouseenter(function () {
  $float.css("display", "block");
  $bigPic.css("display", "block");
});
$mark.mouseleave(function () {
  $float.css("display", "none");
  $bigPic.css("display", "none");
}); //9. 给遮罩添加移动事件

$mark[0].onmousemove = function (evt) {
  var e = evt || window.event;
  var left = e.pageX - $goodImg[0].offsetLeft - $smallPic[0].offsetLeft - $float[0].offsetWidth / 2;
  var top = e.pageY - $goodImg[0].offsetTop - $smallPic[0].offsetTop - $float[0].offsetHeight / 2; //边界

  if (left <= 0) {
    left = 0;
  } else if (left >= this.offsetWidth - $float[0].offsetWidth) {
    left = this.offsetWidth - $float[0].offsetWidth;
  }

  if (top <= 0) {
    top = 0;
  } else if (top >= this.offsetHeight - $float[0].offsetHeight) {
    top = this.offsetHeight - $float[0].offsetHeight;
  }

  $float[0].style.left = left + 'px';
  $float[0].style.top = top + 'px'; //求滑块在小图上的移动比例

  var pX = left / (this.offsetWidth - $float[0].offsetWidth);
  var pY = top / (this.offsetHeight - $float[0].offsetHeight); //设置大图移动

  $bigImg[0].style.left = -pX * ($bigImg[0].offsetWidth - $bigPic[0].offsetWidth) + 'px';
  $bigImg[0].style.top = -pY * ($bigImg[0].offsetHeight - $bigPic[0].offsetHeight) + 'px';
}; //鼠标滑过列表小图片，更换详图和放大镜图片


$piclistImg = $('.piclist-img');
$piclistImg.hover(function () {
  $smallImg[0].setAttribute("src", this.src);
  $bigImg[0].setAttribute("src", this.src);
}, function () {}); //设置对象存放信息

var proArr = {
  id: "1",
  img: "",
  color: "",
  system: "",
  versions: "",
  num: "",
  money: "" //获取颜色

};
$color = $('#color a');
var nowColor = $color.html().split('`'); //默认图片和颜色切割

proArr.img = nowColor[0];
proArr.color = nowColor[1]; //颜色选择点击事件

$color.click(function () {
  $color.each(function () {
    $(this).css({
      "border": "1px solid #999",
      "color": "#999"
    });
  });
  $(this).css({
    "border": "1px solid #fc6628",
    "color": "#fc6628"
  });
  nowColor = $(this).html().split('`'); //切割分开图片和颜色

  proArr.img = nowColor[0];
  proArr.color = nowColor[1];
}); //获取制式

$system = $('#system a');
proArr.system = $system.html(); //只有一个选项时，默认
//制式点击事件

$system.click(function () {
  $system.each(function () {
    $(this).css({
      "border": "1px solid #999",
      "color": "#999"
    });
  });
  $(this).css({
    "border": "1px solid #fc6628",
    "color": "#fc6628"
  });
  proArr.system = $(this).html();
}); //获取版本

$versions = $('#versions a');
proArr.versions = $versions.html(); //默认选项是当前第一个

$titMoney = $('.titMoney'); //价格

proArr.money = parseInt($titMoney.html()); //默认套餐价格
//版本点击事件

$versions.click(function () {
  $versions.each(function () {
    $(this).css({
      "border": "1px solid #999",
      "color": "#999"
    });
  });
  $(this).css({
    "border": "1px solid #fc6628",
    "color": "#fc6628"
  });
  
}); //加减数量

$numberTxt = $('#number #txt');
$sub = $('.sub');
$add = $('.add'); //获取默认数量

proArr.num = $numberTxt.val(); //输入数量，失焦时获取数量

$numberTxt.blur(function () {
  proArr.num = $(this).val();
}); //加减点击事件

$sub.click(function () {
  if ($numberTxt.val() > 1) {
    //当前值大于1才能减
    $numberTxt[0].value = $numberTxt[0].value - 1;
  } //获取数量


  proArr.num = parseInt($numberTxt.val());
});
$add.click(function () {
  $numberTxt[0].value = parseInt($numberTxt[0].value) + 1; //获取数量

  proArr.num = parseInt($numberTxt.val());
}); //购物车按钮

$inCart = $('#inCart a'); //立即购买按钮

$nowBuy = $('#nowBuy a'); //给加入购物出按钮添加移入移出事件

$inCart.hover(function () {
  $(this).css({
    "background": "#fc6628",
    "color": "#fff"
  });
}, function () {
  $(this).css({
    "background": "#ffeded",
    "color": "#fc6628"
  });
}); //给立即购买按钮添加移入移出事件

$nowBuy.hover(function () {
  $(this).css({
    "background": "#fc6628",
    "color": "#fff"
  });
}, function () {
  $(this).css({
    "background": "#ffeded",
    "color": "#fc6628"
  });
});

