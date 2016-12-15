$(function(){
	var str1="";
	var str2="";
	var newData=window.location.search;
	console.log(newData);
	var url="http://japi.juhe.cn/comic/chapterContent";
	var key="key=a2d047469c2bbf5400fe152f8e23d40e";
	getData(url,newData)
	function getData(url,newData){
		var corsUrl=url+newData+"&"+key; 
		console.log(corsUrl);
		$.ajax({
			type:"GET",
			url:"ajax.php",
			dataType:"json",
			data:{data:corsUrl}
		}).done(function(data){
			console.log(data)
			var data1=data.result;
			str1+=`<div class="tip_left">
				<a href="javascript:history.back();">&lt;${data1.comicName}</a> - 第18话
			</div>
			<div class="tip_right">
				<a href="index.html" class="tip_right_btn">首页</a>
				<span class="tip_split">|</span>
				<a href="javascript:history.back();" class="tip_right_btn">目录</a>
			</div>`
			$(".topbar_tip").html(str1);
			var _data=data.result.imageList;
			console.log(_data);
			for(var i=0;i<_data.length;i++){
				str2+=`<div class="img_container ">
						<img class="lazy" src="${_data[i].imageUrl}">	
					</div>`
			}
			$(".detail-main").html(str2)
		})
	}

//吸顶
 var fixTop=$(".detail-main").offset().top;
 	$(window).scroll(function(){
 		var scrollTop=$(this).scrollTop();
 		if(scrollTop>=fixTop){
 			$("#topbar_tip").stop().fadeIn(500);
 		}else{
 			$("#topbar_tip").stop().fadeOut(500);
 		}
 	})
})