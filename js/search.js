//var oInput = $("#keyword");
//		 	oInput.keyup(function(){
//		 		$.ajax({
//		 			url:"https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su?wd="+oInput.val()+"&json=1&p=3&t",
//		 			dataType: "jsonp",
//		 			jsonp: "cb",
//		 		}).done(function(data) {
//						var oUl = $(".search-lists");
//						oUl.html("");
//						$(".search-lists").css("display","block");
//					for(var i in data.g) {
//							var oLi = $("<a href='javascript:;' class='search-item'></a>");
//							oLi.html(data.g[i].q);
//							oUl.append(oLi);
//						}
//					})
//		 	})
//			oInput.blur(function (){
//				$(this).val("");
//				$(".search-lists").html("").css("display","none");
//			})
//搜索漫画
var str="";
$(".search-icon").on('touchend',function(){
	var url="http://japi.juhe.cn/comic/book";
	var key="key=a2d047469c2bbf5400fe152f8e23d40e";
	var data="name="+$("#keyword").val()+"&type=&skip=&finish=&"+key;
	getData(url,data);
})
	
function getData(url,data){
	var corsUrl=url+"?"+data;
	console.log(corsUrl);
	$.ajax({
		type:"GET",
		url:'ajax.php',
		async:true,
		dataType:"json",
		data:{data:corsUrl},
	}).done(function(data){
		console.log(data);
		var _data=data.result.bookList;
		console.log(_data)
		for(var i=0;i<_data.length;i++){
			str+=`<a href="list.html?comicName=${_data[i].name}" class="search-picture-item">
					<img src="${_data[i].coverImg}" />
					<p style="margin-bottom:10px;" class="ellipis">
						<span class="picture-item-name">
							<span class="picture-item-name_2">${_data[i].name}</span>
						</span>
					</p>
				</a>`
			}
		$(".search-picture").html(str);
	})
}
