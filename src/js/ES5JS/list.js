//引入头部
$("#head").load("../../src/html/header.html"); //引入尾部

$('#foot').load("../../src/html/footer.html"); //动态添加列表中的每一个商品

$listUl = $('#list-ul');
ajax("../json/list.json", function (data) {
  var arr = JSON.parse(data);
  var $arr = $(arr);
  $arr.each(function () {
    $listUl.append("\n\t\t<li>\n\t\t\t<a href=\"#\">\n\t\t\t\t<span><img src=\"".concat(this.img, "\"/></span>\n\t\t\t\t<span>").concat(this.tit, "</span>\n\t\t\t\t<span>").concat(this.des, "</span>\n\t\t\t\t<span>\n\t\t\t\t\t<p>").concat(this.money, "</p>\n\t\t\t\t\t<p class=\"nowBuy\">\u7ACB\u5373\u8D2D\u4E70</p>\n\t\t\t\t</span>\n\t\t\t</a>\n\t\t</li>\n\t\t"));
  }); //鼠标滑过购买按钮

  $nowbuy = $('.nowBuy');
  $nowbuy.each(function () {
    $(this).hover(function () {
      $(this).css({
        "background": "orangered",
        "color": "#fff"
      });
    }, function () {
      $(this).css({
        "background": "#fff",
        "color": "orangered"
      });
    });
  });
});