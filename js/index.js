$(function(){
	var mySwiper = new Swiper('.swiper-container',{
			autoplay: 5000,//可选选项，自动滑动
			pagination : '.swiper-pagination',
			paginationClickable :true,
			loop : true,
		})
		//加载
			var str1="";
			var str2="";
			var str3="";
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
					console.log(data)
					var _data=data.result.bookList;
					for(var i=0;i<6;i++){
						str1+=`
						<div class="manga-item">
						<a href="list.html?comicName=${_data[i].name}&imgUrl=${_data[i].coverImg}" "target=_blank">
							<img src="${_data[i].coverImg}" />
							<p>
								<span>${_data[i].name}</span>
							</p>
						</a>
					</div>`
					}
					$(".manga-bar-center1").html(str1);
					for(var i=6;i<12;i++){
						str2+=`
						<div class="manga-item">
						<a href="list.html?comicName=${_data[i].name}&imgUrl=${_data[i].coverImg}" "target=_blank">
							<img src="${_data[i].coverImg}" />
							<p>
								<span>${_data[i].name}</span>
							</p>
						</a>
					</div>`
					}
					$(".manga-bar-center2").html(str2);
					
					for(var i=12;i<20;i++){
						str3+=`
						<div class="manga-item">
						<a href="list.html?comicName=${_data[i].name}&imgUrl=${_data[i].coverImg}" "target=_blank">
							<img src="${_data[i].coverImg}" />
							<p>
								<span>${_data[i].name}</span>
							</p>
						</a>
					</div>`
					}
					$(".manga-bar-center3").html(str3);
				})
			}
})

