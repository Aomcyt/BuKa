<?php
	$data=$_GET["data"];
	header("Access-Control-Allow-Origin:*");
	header("Access-Control-Allow-Method:GET");
	//定义后台跨域的URL PHP用来拼接字符串
	$url=$data;//成为动态的地址
	$html=file_get_contents($url);
	echo $html;
?>