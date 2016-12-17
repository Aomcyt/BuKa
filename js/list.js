$(function(){
	isClick=true;
	$("#showmore").on("touchend",function(){
		console.log(111)
		if(isClick=true){
			$(".description_intro").addClass("show");
			isClick=false;
		}else if(isClick=false){
			$(".description_intro").removeClass("show");
			isClick=true;
		}
	})
	//加载数据
			var str1="";
			var str2="";
			var str3="";
			var newData=window.location.search;
			console.log(newData);
			var aNewData=newData.split("?")[1].split("&")[1].split("=")[1];
			console.log(aNewData);
			str3+=`<img src="${aNewData}">`
			$(".list-picture-img").html(str3)
			var url="http://japi.juhe.cn/comic/chapter";
			var key="skip=&finish=&key=a2d047469c2bbf5400fe152f8e23d40e";
			getData(url,newData);
			function getData(url,newData){
				var cors=url+newData+"&"+key;
				console.log(cors)
				$.ajax({
					type:"GET",
					url:"ajax.php",
					dataType:"json",
					data:{data:cors},
				}).done(function(data){
					console.log(data)
					var title=data.result.comicName;
					str1+=`<p class="list-text-name">${title}</p>`
					$(".list-text").html(str1);
					var _data=data.result.chapterList;
					for(var i=0;i<_data.length;i++){
						str2+=`<a href="detail.html?comicName=${title}&id=${_data[i].id}" class="btn-default chapter-link">
						${_data[i].name}
					</a>`
					}
					$(".chapter-center").html(str2)
				})
			}
	
	//分享
	$("#share-btn").on("touchend",function(){
		$(".buka-modal").show();
	})
	$(".icon-chacha").on("touchend",function(){
		$(".buka-modal").hide();
	})
})
