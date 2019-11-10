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

//删除选项
function deletechoose(element){
	//删除选项
	var forDivId = element.getAttribute("forDivId");
	$("#"+forDivId).remove();
	//删除正确答案
	$("#right"+forDivId).remove();
	/*
	 * 重新赋值ABCD下标
	 * 1、选项div——id="chooseA"
	 * 2、表单前的下标<div class="input-group-addon">A</div>
	 * 3、input的name
	 * 4、删除选项图标的forDivId="chooseA"
	 * 5、改变正确答案<label id="rightchooseB">
	 */
	$("div[id^=choose]").each(function(index){
		var chooseIndex = String.fromCharCode(65+index);
		/*——————1——————*/
		$(this).attr("id","choose"+chooseIndex);
		/*——————2——————*/
		$(this).find(".input-group-addon").text(chooseIndex);
		/*——————3——————*/
		$(this).find("input[type=text]").attr("name",chooseIndex);
		/*——————4——————*/
		$(this).find("img").attr("forDivId","choose"+chooseIndex);
	});
	/*——————5——————*/
	$("#rightChoose").find("div label").each(function(index){
		var chooseIndex = String.fromCharCode(65+index);
		//改变label的id
		$(this).attr("id","rightchoose"+chooseIndex);
		//改变label下input的value
		$(this).html("<input type='checkbox' name='rightChoose' value='"+chooseIndex+"'> "+chooseIndex);
	});
}

//添加选项
function addChoose(element){
	//1、获得添加的选项的小标
	var ChooseSize = $("div[id^=choose]").length;
	var ChooseIndex = String.fromCharCode(65+ChooseSize);
	//2、添加选项
	$("form[name=QuestionStep]").append("<div class='form-group' id='choose"+ChooseIndex+"'>"
											+"<div class='col-sm-8'>"
												+"<div class='input-group'>"
													+"<div class='input-group-addon'>"+ChooseIndex+"</div>"
													+"<input type='text' class='form-control' placeholder='题目选项' name='"+ChooseIndex+"' value='测试数据'>"
												+"</div>"
											+"</div>"
											+"<img src='../img/delete_1.png' onmouseover='deleteChooseImgOver(this)' onmouseout='deleteChooseImgOut(this)' onclick='deletechoose(this)' forDivId='choose"+ChooseIndex+"' data-toggle='tooltip' data-placement='top' title='删除该选项' style='width: 34px;'/>"
										+"</div>");
	//3、添加正确答案
	$("#rightChoose div").append("<label class='checkbox-inline' id='rightchoose"+ChooseIndex+"'>"
								  	+"<input type='checkbox' name='rightChoose' value='"+ChooseIndex+"'> "+ChooseIndex
								+"</label>");
	
}
