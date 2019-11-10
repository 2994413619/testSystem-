/*试卷显示类型:列表、大图标*/
function changeToblock(element){
	/*element.style.content = "url(img/list1.png)";
	document.getElementById("img2").style.content = "url(img/list22.png)";*/
	element.src = "img/list1.png";
	document.getElementById("img2").src = "img/list22.png";
	document.getElementById("list").style.display = "none";
	//document.getElementById("block").style.display = "block";
	$("#block").fadeIn(1000);
	document.getElementById("createTestByList").style.display = "none";
}
function changeToList(element){
	/*element.style.content = "url(img/list2.png)";
	document.getElementById("img1").style.content = "url(img/list11.png)";*/
	element.setAttribute("src","img/list2.png");
	document.getElementById("img1").setAttribute("src","img/list11.png");
	document.getElementById("block").style.display = "none";
	//document.getElementById("list").style.display = "block";
	$("#list").fadeIn(1000);
	$("#createTestByList").fadeIn(1000);
	//document.getElementById("createTestByList").style.display = "block"
}