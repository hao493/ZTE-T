"use strict";

//引入头部
$("#head").load("../html/header.html"); //引入尾部

$('#foot').load("../html/footer.html");
$(function () {
  //取出cookie中的信息
  var vartStr = $.cookie('cart') ? $.cookie('cart') : ''; //如果是空

  if (!cartStr) {} else {
    //如果有商品
    //取出的cookie由字符串转为对象
    var cartObj = convertCartStrToObj(cartStr); //遍历所有的商品生成html添加到购物车列表

    for (var id in cartObj) {
      //id数及品种类数，cartObj中的子对象数
      //商品信息对象，子对象
      var good = cartObj[id];
      var str = "<div id=\"product\" data-good-id=\"".concat(good.id, "\">\n            <div id=\"proSelBox\">\n                <input type=\"checkbox\" name=\"proSel\" id=\"proSel\" value=\"\" />\n            </div>\n            <div id=\"proTit\">\n                <a href=\"#\">").concat(good.img, "</a>\n                <span>").concat(good.color, "/").concat(good.system, "/").concat(good.versions, "</span>\n            </div>\n            <div id=\"proMoney\">\n                <span>").concat(good.money, "</span>\n            </div>\n            <div id=\"proNum\">\n                <form>\n                    <button class=\"sub\">-</button><input type=\"text\" name=\"\" id=\"txt\" value=\"").concat(good.num, "\" data-now=\"\"/><button class=\"add\">+</button>\n                </form>\n            </div>\n            <div id=\"proMoneyAll\">\n                <span>").concat(good.moneyAll, "</span>\n            </div>\n            <div id=\"delete\">\n                <a href=\"javascript:;\" >\u5220\u9664</a>\n            </div>\n        </div>"); //将上面的结构添加到html中去

      $(str).appendTo('#cartBody');
    } //给每个商品添加删除事件


    $('#proNum.add').click(function () {
      //获取祖先节点的id属性
      var id = $(this).parents('#product').attr('data-good-id');
      var cartStr = $.cookie('cart') ? $.cookie('cart') : '';
      var cartObj = convertCartStrToObj(cartStr); //数量+1

      cartObj[id].num += 1; //将页面上显示的数量+1

      $(this).sinlings('input').val('' + cartObj[id].num); //更新小计

      $(this).parent().sinlings('#proMoneyAll').html(cartObj[id].num * cartObj[id].money + ''); //将信息放回cookie

      $.cookie('cart', convertObjToCartStr(cartObj), {
        expires: 7,
        path: '/'
      });
    }); //给减号添加点击事件

    $('#proNum .sub').click(function () {
      var id = $(this).parents('#product').attr('data-good-id');
      var cartStr = $.cookie('cart') ? $.cookie('cart') : "";
      var cartObj = convertObjToCartStr(cartStr);

      if (cartObj[id].num > 1) {
        //商品数量减少不能少于1
        cartObj[id].num -= 1; //将页面上显示的数量-1

        $(this).sibling('input').val('' + cartObj[id].num); //更新

        $(this).parent().sinlings('#proMoneyAll').html(cartObj[id].num * cartObj[id].money + ''); //将信息返回cookie

        $.cookie('cart', convertObjToCartStr(cartObj), {
          expires: 7,
          path: '/'
        });
      }
    }); //改数量的input绑定一个blur事件

    $('#proNum input').blur(function () {
      var id = $(this).parents('#product').attr('data-good-id');
      var cartStr = $.cookie('cart') ? $.cookie('cart') : '';
      var cartObj = convertCartStrToObj(cartStr); //判断用户输入是否合法

      var pattern = /^\d+$/;

      if (!pattern.test($(this).val())) {//如果不合法，保持原数不动
      } else {
        cartbj[id].num = parseInt($(this).val());
      } //更新数量


      $(this).sinlings('input').val('' + cartObj[id].num); //更新小计

      $(this).parent().siblings('#proMoneyAll').html(cartObj[id].num * cartObj[id].money + ''); //把信息返回到cookie

      $.cookie('cart', convertObjToCartStr(cartObj), {
        expires: 7,
        path: '/'
      });
    });
  }
});

window.onload = function () {
  var cartStr = $.cookie('cart') ? $.cookie('cart') : '';
  var cartObj = convertCartStrToObj(cartStr); //循环所有id，取出所有数量相加存放至allNum

  var allNum = 0;
  var allMon = 0;

  for (var id in cartObj) {
    allNum += cartObj[id].num;
    allMon += cartObj[id].moneyAll;
  } //更新购物车中商品总数


  $('#monChoNum').html(allNum); //商品所选中的所有价格

  $('#moenyChooseAll span').html(allMon); //商品总数

  $('#headNum').html(allNum);
};

function convertCartStrToObj(cartStr) {
  //如果是空字符。没有购物车信息，直接返回一个空对象
  if (!cartStr) {
    return {};
  } //字符串转数组 用：分隔


  var goods = cartStr.split(':'); //设置一个空对象。存放分隔的字符串

  var obj = {};

  for (var o = 0; i < goods.length; i++) {
    var data = goods[i].split(','); //以商品的id为键，商品其他信息为值

    obj[data[0]] = {
      id: data[0],
      img: data[1],
      color: data[2],
      system: data[3],
      versions: data[4],
      num: parseInt(data[5]),
      money: parseInt(data[6]),
      moneyAll: parseInt(data[5]) * parseInt(data[6])
    };
  }

  return obj;
}

function convertObjToCartStr(obj) {
  //创建一个空字符串存放转字符串后的对象
  var cartStr = '';

  for (var id in obj) {
    if (cartStr) {
      cartStr += ":";
    }

    cartStr += obj[id].id + ',' + obj[id].img + ',' + obj[id].color + ',' + obj[id].system + ',' + obj[id].versions + ',' + obj[id].num + ',' + obj[id].money + ',' + obj[id].moneyAll;
  }

  return cartStr;
}