var str="";
var url="http://japi.juhe.cn/comic/book";
var key="skip=&finish=&key=a2d047469c2bbf5400fe152f8e23d40e";
getData(url,key);
function getData(url,key){
	var cors=url+"?"+key;
	$.ajax({
		type:"GET",
		url:"ajax.php",
		dataType:"json",
		data:{data:cors},
		beforeSend:function(){
		 $(".loading").show();
		},
	}).done(function(data){
		var _data=data.result.bookList;
		console.log(_data)
			for(var i=0;i<_data.length;i++){
				str+=`
				<div class="manga-item">
				<a href="list.html?comicName=${_data[i].name}">
					<img src="${_data[i].coverImg}" />
					<p>
						<span class="manga-item-name">
							<span class="manga-item-name_2">
							<span>${i+1}</span>
							${_data[i].name}
							</span>
							<span class="manga-item-author">更新:${_data[i].lastUpdate}</span>
						</span>
					</p>
				</a>
			</div>`
			}
		$(".mangalist-main").html(str);
	})
}
