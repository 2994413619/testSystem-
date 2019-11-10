//改变悬浮样式——添加选项
function addChooseImgOver(element){
	element.style.color = "blue";
	var imgElement = $(element).children("img");
	var imgSrc = imgElement.attr("src");
	var subSrc = imgSrc.split("1")[0];
	imgElement.attr("src",subSrc+"2"+".png");
}
function addChooseImgOut(element){
	element.style.color = "black";
	var imgElement = $(element).children("img");
	var imgSrc = imgElement.attr("src");
	var subSrc = imgSrc.split("2")[0];
	imgElement.attr("src",subSrc+"1"+".png");
}

//更改悬浮样式——删除选项
function deleteChooseImgOver(element){
	
	var subSrc = $(element).attr("src").split("1")[0];
	$(element).attr("src",subSrc+"2"+".png");
	$(element).tooltip();//boostrap工具提示——删除选项
}
function deleteChooseImgOut(element){
	var subSrc = $(element).attr("src").split("2")[0];
	$(element).attr("src",subSrc+"1"+".png");
	$(element).tooltip();//boostrap工具提示
}

/*
 * 删除选项
 * 点击按钮——<img forDivId="choose2"/>
 * 1、删除选项父类div——<div id="choose2">
 * 2、删除正确选项——<div id="rightchoose2">
 * 3、重新赋值父类div的id
 * 4、该父类下的<div class="input-group-addon">2</div>
 * 5、修改该父类下的img图标的forDivId
 * 6、该父类下的textarea——<textarea name="questionStep2"
 * 7、重新赋值正确选项div的id
 * 8、修改正确答案input的——<div class="input-group-addon">1</div>
 * 9、修改正确答案input的name——<input name="1">
 */
function deletechoose(element){
	//获得forDivId
	var forDivId = element.getAttribute("forDivId");
	/*————1————*/
	$("#"+forDivId).remove();
	/*————2————*/
	$("#right"+forDivId).remove();
	//获得选项个数——<img forDivId="choose2"/>个数
	var chooseSize = $("img[forDivId]").length;
	//修改选项
	$("div[id^=choose]").each(function(index){
		//获得下标——1、2、3。。。
		var chooseIndex = index + 1;
		/*————3————*/
		this.setAttribute("id","choose"+chooseIndex);
		/*————4————*/
		$(this).find("div[class=input-group-addon]").text(chooseIndex);
		/*————5————*/
		$(this).children("img").attr("forDivId","choose"+chooseIndex);
		/*————6————*/
		$(this).children("textarea").attr("name","questionStep"+chooseIndex);
	});
	//修改正确答案
	$("div[id^=rightchoose]").each(function(index){
		//获得下标——1、2、3。。。
		var chooseIndex = index + 1;
		/*————7————*/
		this.setAttribute("id","rightchoose"+chooseIndex);
		/*————8————*/
		$(this).find("div[class=input-group-addon]").text(chooseIndex);
		/*————9————*/
		$(this).find("input").attr("name",chooseIndex);
	});
}

/*
 * 添加选项
 * 1、添加选项
 * 2、添加正确答案
 */
function addChoose(element){
	//获得添加选项的下标
	var chooseIndex = $("div[id^=rightchoose]").length + 1;
	//添加选项——父元素：<form name="QuestionStep">
	$("form[name=QuestionStep]").append("<div class='form-group' id='choose"+chooseIndex+"'>"
											+"<div class='col-sm-8'>"
												+"<div class='input-group'>"
													+"<div class='input-group-addon'>"+chooseIndex+"</div>"
													+"<input type='text' class='form-control' placeholder='题目选项' value='正确答案' disabled='disabled'>"
												+"</div>"
											+"</div>"
											+"<img src='img/delete_1.png' onmouseover='deleteChooseImgOver(this)' onmouseout='deleteChooseImgOut(this)' onclick='deletechoose(this)' forDivId='choose"+chooseIndex+"' data-toggle='tooltip' data-placement='top' title='删除该选项' style='width: 34px;'/>"
											+"<textarea class='form-control' name='questionStep"+chooseIndex+"' placeholder='题干' style='margin-top: 20px;' oninput='changeRows(this)'></textarea>"
										+"</div>");
	//添加正确选项
	$("#rightChoose>div").append("<div class='form-group' id='rightchoose"+chooseIndex+"'>"
									+"<div class='col-sm-8'>"
										+"<div class='input-group'>"
											+"<div class='input-group-addon'>"+chooseIndex+"</div>"
											+"<input type='text' class='form-control' placeholder='题目选项' name='"+chooseIndex+"' value='测试数据'>"
										+"</div>"
									+"</div>"
								+"</div>");
}
