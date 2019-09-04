//面向过程
//面向过程就是分析出解决问题所需要的步骤，然后用函数把这些步骤一步一步实现，使用的时候一个一个依次调用就可以了；
function ajax(url,fnWin,fnFaild){
	//1 买手机---------创建XMLHttpRequest对象
	var xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
	//2. 拨号-------与服务器建立连接
	xhr.open('GET',url,true);
	//3. 说话 ----- 发送请求
	xhr.send();
	//4. 听并等待接收 --- 利用监听事件，将请求的数据通过回调函数返回
	xhr.onreadystatechange = function(){
		if(xhr.readyState === 4){//.readState属性,请求状态
			if(xhr.status === 200){//.status属性，请求结果
				if(typeof fnWin === 'function'){
					fnWin(xhr.responseText);//如需获得来自服务器的响应，(XMLHttpRequest 对象的 responseText或responseXML 属性)responseText	获得字符串形式的响应数据;responseXML获得 XML 形式的响应数据
				}
			}else{
				if(typeof fnFaild === 'function'){
					fnFaild();
				}
			}
		}
	}
}





