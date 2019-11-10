function copyUrl(){
	var myElement = document.getElementById("testUrl");
	myElement.select();
	document.execCommand("copy");
	alert("复制成功");
	myElement.blur();
}
