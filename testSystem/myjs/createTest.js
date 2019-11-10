$(function(){
	/*
	 * 由于后添加的元素有事件不能触发的bug
	 * 所以注释jquery代码，使用在标签里写事件的方式
	 */
	/*//更换悬浮样式——编辑题目按钮——删除、添加选项
	$(".editQuestion").mouseover(function(){
		this.style.color = "blue";
		var imgElement = $(this).children("img");
		var imgSrc = imgElement.attr("src");
		var subSrc = imgSrc.split("1")[0];
		imgElement.attr("src",subSrc+"2"+".png");
	});
	$(".editQuestion").mouseout(function(){
		this.style.color = "black";
		var imgElement = $(this).children("img");
		var imgSrc = imgElement.attr("src");
		var subSrc = imgSrc.split("2")[0];
		imgElement.attr("src",subSrc+"1"+".png");
	});
	
	//更换悬浮样式——删除选项
	$(".checkItem img").mouseover(function(){
		var subSrc = $(this).attr("src").split("1")[0];
		$(this).attr("src",subSrc+"2"+".png");
	});
	$(".checkItem img").mouseout(function(){
		var subSrc = $(this).attr("src").split("2")[0];
		$(this).attr("src",subSrc+"1"+".png");
	});
	
	
	
	//题目操作——单选多选
	//删除题目
	$("[edit=deleteQuestionDiv]").on("click",function(){
		var indexTarget = this.getAttribute("indexTarget");
		$("[index="+indexTarget+"]").remove();
	});
	
	//
	// 删除题目选项
	// 按钮：edit="deletechoose" chooseTarget="1chooseDivD"
	// 选项Div:id="1chooseDivD"
	// 对应的正确选项Div:id="1rightChooseDivA"
	$("[index]").on("click","[edit=deletechoose]",function(){
		var chooseTarget = this.getAttribute("chooseTarget");
		var index = chooseTarget.split("")[0];
		var choose = chooseTarget.split("")[1];
		$("#"+index+"chooseDiv"+choose).remove();
		$("#"+index+"rightChooseDiv"+choose).remove();
	});
	
	//添加题目选项
	// 按钮：edit="addChoose" indexTarget="1"
	// 选项添加到的div:questionContent="1"
	// 正确答案Div:AnswerDiv="1"
	$("[edit=addChoose]").click(function(){
		var indexTarget = this.getAttribute("indexTarget");
		//获取选项个数——获取radio的个数
		var chooseSize = $("[name="+indexTarget+"rightChoose]").length;
		//alert(chooseSize)
		//得到添加选项的脚标——A、B、C...
		var chooseIndex = String.fromCharCode(65+chooseSize);
		//添加选项
		$("[questionContent="+indexTarget+"]").append("<div class='form-group checkItem' id='"+indexTarget+"chooseDiv"+chooseIndex+"'>"
										    +"<div class='col-sm-7'>"
										    	+"<input type='text' class='form-control' placeholder='选项"+chooseIndex+"' name='"+indexTarget+"choose"+chooseIndex+"'>"
										    +"</div>"
											+"<img src='img/delete_1.png' data-toggle='tooltip' data-placement='top' title='删除该选项' style='width: 34px;' edit='deletechoose' chooseTarget='"+indexTarget+chooseIndex+"'  onclick='deletechoose(this)' onmouseover='checkItemImgOver(this)' onmouseout='checkItemImgOut(this)'/>"
										+"</div>");
		//添加正确答案选项
		$("[AnswerDiv="+indexTarget+"]").append("<div class='radio' id='"+indexTarget+"rightChooseDiv"+chooseIndex+"'>"
												  +"<label>"
												    +"<input type='radio' name='"+indexTarget+"rightChoose' value='"+chooseIndex+"' checked='checked'>"
												   +chooseIndex
												  +"</label>"
												+"</div>");
	});
	
	//提示框——删除选项
	//$('[data-toggle="tooltip"]').tooltip();*/
	
	//更换悬浮样式——添加题目按钮——单选、多选。。。。
	$(".questionType").mouseover(function(){
		this.style.color = "blue";
		var imgElement = $(this).children("img");
		var imgSrc = imgElement.attr("src");
		var subSrc = imgSrc.split("1")[0];
		imgElement.attr("src",subSrc+"2"+".png");
	});
	$(".questionType").mouseout(function(){
		this.style.color = "black";
		var imgElement = $(this).children("img");
		var imgSrc = imgElement.attr("src");
		var subSrc = imgSrc.split("2")[0];
		imgElement.attr("src",subSrc+"1"+".png");
	});
	
	//分值设置——单选、多选、填空、判断分值设置空间是否可用
	setInterval(function(){
		//单选
		if($("div[questionType=radio]").length == 0){
			$("#radioScore").attr("disabled","disabled");
		} else{
			$("#radioScore").removeAttr("disabled");
		}
		//多选
		if($("div[questionType=multipleChoice]").length == 0){
			$("#multipleChoiceScore").attr("disabled","disabled");
		} else{
			$("#multipleChoiceScore").removeAttr("disabled");
		}
		//判断
		if($("div[questionType=judge]").length == 0){
			$("#judgeScore").attr("disabled","disabled");
		} else{
			$("#judgeScore").removeAttr("disabled");
		}
		//填空
		if($("div[questionType=gapFilling]").length == 0){
			$("#gapFillingScore").attr("disabled","disabled");
		} else{
			$("#gapFillingScore").removeAttr("disabled");
		}
	},500);
	
	//动态修改textarea的rows
	textareaHeight1 = 29;
	textareaHeight2 = 20;
	$("textarea")[0].setAttribute("rows","1");
	textareaHeight1 = $("textarea")[0].scrollHeight;
	$("textarea")[0].setAttribute("rows","2");
	textareaHeight2 =$("textarea")[0].scrollHeight - textareaHeight1;
	
	textareaHeight1 -= textareaHeight2;
	
	
	$("textarea").each(function(index){
		var leng = Math.ceil((this.scrollHeight - textareaHeight1)/textareaHeight2);
		this.setAttribute("rows",leng);
	});
	
});


//动态修改textarea的rows
function changeRows(element){
	var leng = Math.ceil((element.scrollHeight - textareaHeight1)/textareaHeight2);
	element.setAttribute("rows",leng);
}



//分值控制——0<value<1000
function controlScore(element){
	var elementVal = $(element).val();
	var score = Number.parseFloat(elementVal);
	if(score<=0){
		$(element).val(1);
	} else if(score>1000){
		$(element).val(1000);
	}
}

//控制考试时长——0<value<1440（一天）
function ControltimeSet(element){
	var elementVal = $(element).val();
	var time = Number.parseInt(elementVal);
	if(time < 0){
		$(element).val(30);
	} else if(time > 1440) {
		$(element).val(1440);
	} else {
		$(element).val(time);
	}
}





//更换悬浮样式——编辑题目按钮——删除、添加选项
function editQuestionOver(element){
	element.style.color = "blue";
	var imgElement = $(element).children("img");
	var imgSrc = imgElement.attr("src");
	var subSrc = imgSrc.split("1")[0];
	imgElement.attr("src",subSrc+"2"+".png");
}
function editQuestionOut(element){
	element.style.color = "black";
	var imgElement = $(element).children("img");
	var imgSrc = imgElement.attr("src");
	var subSrc = imgSrc.split("2")[0];
	imgElement.attr("src",subSrc+"1"+".png");
}

//更换悬浮样式——删除选项
function checkItemImgOver(element){
	var subSrc = $(element).attr("src").split("1")[0];
	$(element).attr("src",subSrc+"2"+".png");
	$(element).tooltip();//boostrap工具提示——删除选项
}
function checkItemImgOut(element){
	var subSrc = $(element).attr("src").split("2")[0];
	$(element).attr("src",subSrc+"1"+".png");
	$(element).tooltip();//boostrap工具提示
}





//删除题目
function deleteQuestionDiv(element){
	var indexTarget = element.getAttribute("indexTarget");
	
	//删除主观题分值设置——重新设置
	var questionType = $("[index="+indexTarget+"]").attr("questionType");
	if(questionType=="subjective"){
		$("#"+indexTarget+"ScoreDiv").remove();
	}
	
	//删除题目
	$("[index="+indexTarget+"]").remove();
	
	//重新设置题目标号——仅仅是前端
	$("div[index]").children("label").each(function(index){
		$(this).text(index+1+"、");
	});
	
	//重新设置分值标号——1234
	$("div[index]").each(function(elementIndex){
		var questionType = this.getAttribute("questionType");
		if(questionType == "subjective"){
			var index = this.getAttribute("index");
			var oldQuestionHtmlIndex = $(this).children("label").text().split("、")[0];
			var QuestionHtmlIndex = Number.parseInt(oldQuestionHtmlIndex);
			$("#"+index+"ScoreDiv").children("label").text(QuestionHtmlIndex+"题");
		}
	});
}



/* 
 * 单选
 * 删除题目选项
 * 按钮：edit="deletechoose" chooseTarget="1chooseDivD"
 * 删除的选项Div:id="1chooseDivD"
 * 对应的正确答案Div:id="1rightChooseDivA"
 */
function deletechoose(element){
	var chooseTarget = element.getAttribute("chooseTarget");
	var index = chooseTarget.split("_")[0];
	var choose = chooseTarget.split("_")[1];
	$("#"+index+"chooseDiv"+choose).remove();
	$("#"+index+"rightChooseDiv"+choose).remove();
	
	//修改选项内容下标 ABCD。。。（name,placeholder）
	$("[name^="+index+"choose]").each(function(elementIndex){
		var chooseIndex = String.fromCharCode(65+elementIndex);
		this.setAttribute("name",index+"choose"+chooseIndex);
		this.setAttribute("placeholder","选项"+chooseIndex);
	});
	
	//修改选项父类div id——id="1chooseDivB"
	$("[id^="+index+"chooseDiv]").each(function(elementIndex){
		var chooseIndex = String.fromCharCode(65+elementIndex);
		this.setAttribute("id",index+"chooseDiv"+chooseIndex);
		//修改img目标
		$(this).children("img").attr("chooseTarget",index+"_"+chooseIndex);
	});
	
	//修改正确答案下标ABCD。。。(value)
	$("[AnswerDiv="+index+"] label").each(function(elementIndex){
		var chooseIndex = String.fromCharCode(65+elementIndex);
		if(elementIndex==0)
			$(this).html("<input type='radio' name='"+index+"rightChoose' value='"+chooseIndex+"' checked='checked'>"+chooseIndex);
		else
			$(this).html("<input type='radio' name='"+index+"rightChoose' value='"+chooseIndex+"'>"+chooseIndex);
	});
	
	//修改正确答案div id—— id="1rightChooseDivC"
	$("[id^="+index+"rightChooseDiv]").each(function(elementIndex){
		var chooseIndex = String.fromCharCode(65+elementIndex);
		this.setAttribute("id",index+"rightChooseDiv"+chooseIndex);
	});
}

/*
 * 单选
 * 添加题目选项
 * 按钮：edit="addChoose" indexTarget="1"
 * 选项添加到的div:questionContent="1"
 * 正确答案Div:AnswerDiv="1"
 */
function addChoose(element){
	var indexTarget = element.getAttribute("indexTarget");
	//获取选项个数——获取radio的个数
	var chooseSize = $("[name="+indexTarget+"rightChoose]").length;
	//alert(chooseSize)
	//得到添加选项的脚标——A、B、C...
	var chooseIndex = String.fromCharCode(65+chooseSize);
	//添加选项
	$("[questionContent="+indexTarget+"]").append("<div class='form-group checkItem' id='"+indexTarget+"chooseDiv"+chooseIndex+"'>"
									    +"<div class='col-sm-7'>"
									    	+"<input type='text' class='form-control' placeholder='选项"+chooseIndex+"' name='"+indexTarget+"choose"+chooseIndex+"'>"
									    +"</div>"
										+"<img src='img/delete_1.png' data-toggle='tooltip' data-placement='top' title='删除该选项' style='width: 34px;' edit='deletechoose' chooseTarget='"+indexTarget+"_"+chooseIndex+"'  onclick='deletechoose(this)' onmouseover='checkItemImgOver(this)' onmouseout='checkItemImgOut(this)'/>"
									+"</div>");
	//添加正确答案选项
	$("[AnswerDiv="+indexTarget+"]").append("<div class='radio' id='"+indexTarget+"rightChooseDiv"+chooseIndex+"'>"
											  +"<label>"
											    +"<input type='radio' name='"+indexTarget+"rightChoose' value='"+chooseIndex+"'>"
											   +chooseIndex
											  +"</label>"
											+"</div>");
}

/*
 * 单选
 * 添加题目
 */
function addRadio(){
	//计算题目个数
	var len = $(".questionDiv").length + 1;
	//添加单选
	$("#newTestForm").append("<div class='row questionDiv' index='"+len+"' questionType='radio'>"
								+"<label class='col-lg-1 questionIndex'>"+len+"、</label>"
								+"<div class='col-lg-9' questionContent='"+len+"'>"
									+"<textarea class='form-control questionStem' autocomplete='off' placeholder='请输入题干' name='"+len+"questionStem' oninput='changeRows(this)'></textarea>"
									+"<div class='form-group checkItem' id='"+len+"chooseDivA'>"
									    +"<div class='col-sm-7'>"
									    	+"<input type='text' class='form-control' placeholder='选项A' name='"+len+"chooseA'>"
									   +"</div>"
									    +"<img src='img/delete_1.png' data-toggle='tooltip' data-placement='top' title='删除该选项' style='width: 34px;' edit='deletechoose' chooseTarget='"+len+"_A' onclick='deletechoose(this)' onmouseover='checkItemImgOver(this)' onmouseout='checkItemImgOut(this)'/>"
									+"</div>"
									+"<div class='form-group checkItem'  id='"+len+"chooseDivB'>"
									    +"<div class='col-sm-7'>"
									    	+"<input type='text' class='form-control' placeholder='选项B' name='"+len+"chooseB'>"
									    +"</div>"
										+"<img src='img/delete_1.png' data-toggle='tooltip' data-placement='top' title='删除该选项' style='width: 34px;' edit='deletechoose' chooseTarget='"+len+"_B' onclick='deletechoose(this)' onmouseover='checkItemImgOver(this)' onmouseout='checkItemImgOut(this)'/>"
									+"</div>"
									+"<div class='form-group checkItem' id='"+len+"chooseDivC'>"
									    +"<div class='col-sm-7'>"
									    	+"<input type='text' class='form-control' placeholder='选项C' name='"+len+"chooseC'>"
									    +"</div>"
										+"<img src='img/delete_1.png' data-toggle='tooltip' data-placement='top' title='删除该选项' style='width: 34px;' edit='deletechoose' chooseTarget='"+len+"_C' onclick='deletechoose(this)' onmouseover='checkItemImgOver(this)' onmouseout='checkItemImgOut(this)'/>"
									+"</div>"
									+"<div class='form-group checkItem' id='"+len+"chooseDivD'>"
									    +"<div class='col-sm-7'>"
									    	+"<input type='text' class='form-control' placeholder='选项D' name='"+len+"chooseD'>"
									    +"</div>"
										+"<img src='img/delete_1.png' data-toggle='tooltip' data-placement='top' title='删除该选项' style='width: 34px;' edit='deletechoose' chooseTarget='"+len+"_D' onclick='deletechoose(this)' onmouseover='checkItemImgOver(this)' onmouseout='checkItemImgOut(this)'/>"
									+"</div>"
								+"</div>"
								+"<div class='col-lg-2'>"
									+"<p class='editQuestion' edit='deleteQuestionDiv' indexTarget='"+len+"' onclick='deleteQuestionDiv(this)' onmouseover='editQuestionOver(this)' onmouseout='editQuestionOut(this)'>"
										+"<img src='img/delete1.png' />删除题目"
									+"</p>"
									+"<p class='editQuestion' edit='addChoose' indexTarget='"+len+"' onmouseover='editQuestionOver(this)' onmouseout='editQuestionOut(this)' onclick='addChoose(this)'>"
										+"<img src='img/add_small1.png' style='width: 24px;' />添加选项"
									+"</p>"
									+"<div class='rightDiv' AnswerDiv='"+len+"'>"
										+"<p>正确答案选择：</p>"
										+"<div class='radio' id='"+len+"rightChooseDivA'>"
										  +"<label>"
										    +"<input type='radio' name='"+len+"rightChoose' value='A' checked='checked'>"
										    +"A"
										  +"</label>"
										+"</div>"
										+"<div class='radio' id='"+len+"rightChooseDivB'>"
										 +"<label>"
										    +"<input type='radio' name='"+len+"rightChoose' value='B'>"
										    +"B"
										  +"</label>"
										+"</div>"
										+"<div class='radio' id='"+len+"rightChooseDivC'>"
										  +"<label>"
										    +"<input type='radio' name='"+len+"rightChoose' value='C'>"
										    +"C"
										  +"</label>"
										+"</div>"
										+"<div class='radio' id='"+len+"rightChooseDivD'>"
										  +"<label>"
										    +"<input type='radio' name='"+len+"rightChoose' value='D'>"
										    +"D"
										  +"</label>"
										+"</div>"
									+"</div>"
								+"</div>"
							+"</div>");
}



/*
 * 多选
 * 添加题目选项
 * 选项添加到的div:questionContent="2"
 * 正确答案Div:AnswerDiv="2"
 */
function addChooseCheckBox(element){
	var indexTarget = element.getAttribute("indexTarget");
	//获取选项个数——获取checkBox的个数
	var chooseSize = $("[name="+indexTarget+"rightChoose]").length;
	//得到添加选项的脚标——A、B、C...
	var chooseIndex = String.fromCharCode(65+chooseSize);
	//添加选项
	$("[questionContent="+indexTarget+"]").append("<div class='form-group checkItem' id='"+indexTarget+"chooseDiv"+chooseIndex+"'>"
									    +"<div class='col-sm-7'>"
									    	+"<input type='text' class='form-control' placeholder='选项"+chooseIndex+"' name='"+indexTarget+"choose"+chooseIndex+"'>"
									    +"</div>"
										+"<img src='img/delete_1.png' data-toggle='tooltip' data-placement='top' title='删除该选项' style='width: 34px;' edit='deletechoose' chooseTarget='"+indexTarget+"_"+chooseIndex+"'  onclick='deletechooseCheckBox(this)' onmouseover='checkItemImgOver(this)' onmouseout='checkItemImgOut(this)'/>"
									+"</div>");
	//添加正确答案选项
	$("[AnswerDiv="+indexTarget+"]").append("<div class='checkbox' id='"+indexTarget+"rightChooseDiv"+chooseIndex+"'>"
											  +"<label>"
											    +"<input type='checkbox' name='"+indexTarget+"rightChoose' value='"+chooseIndex+"'>"
											   +chooseIndex
											  +"</label>"
											+"</div>");
}

/*
 * 多选
 * 删除题目选项
 * 删除的选项Div:id="1chooseDivD"
 * 对应的正确答案Div:id="1rightChooseDivA"
 */
function deletechooseCheckBox(element){
	var chooseTarget = element.getAttribute("chooseTarget");
	var index = chooseTarget.split("_")[0];
	var choose = chooseTarget.split("_")[1];
	$("#"+index+"chooseDiv"+choose).remove();
	$("#"+index+"rightChooseDiv"+choose).remove();
	
	//修改选项内容下标 ABCD。。。（name,placeholder）
	$("[name^="+index+"choose]").each(function(elementIndex){
		var chooseIndex = String.fromCharCode(65+elementIndex);
		this.setAttribute("name",index+"choose"+chooseIndex);
		this.setAttribute("placeholder","选项"+chooseIndex)
	});
	
	//修改选项父类div id——id="2chooseDivB"
	$("[id^="+index+"chooseDiv]").each(function(elementIndex){
		var chooseIndex = String.fromCharCode(65+elementIndex);
		this.setAttribute("id",index+"chooseDiv"+chooseIndex);
		//修改img目标
		$(this).children("img").attr("chooseTarget",index+"_"+chooseIndex);
	});
	
	//修改正确答案下标ABCD。。。(value)
	$("[AnswerDiv="+index+"] label").each(function(elementIndex){
		var chooseIndex = String.fromCharCode(65+elementIndex);
		if(elementIndex==0)
			$(this).html("<input type='checkbox' name='"+index+"rightChoose' value='"+chooseIndex+"' checked='checked'>"+chooseIndex);
		else
			$(this).html("<input type='checkbox' name='"+index+"rightChoose' value='"+chooseIndex+"'>"+chooseIndex);
	});
	
	//修改正确答案div id—— id="2rightChooseDivC"
	$("[id^="+index+"rightChooseDiv]").each(function(elementIndex){
		var chooseIndex = String.fromCharCode(65+elementIndex);
		this.setAttribute("id",index+"rightChooseDiv"+chooseIndex);
	});
}

/*
 * 多选
 * 添加题目
 */
function addMultipleChoice(){
	//计算题目个数
	var len = $(".questionDiv").length + 1;
	//添加多选
	$("#newTestForm").append("<div class='row questionDiv' index='"+len+"' questionType='multipleChoice'>"
								+"<label class='col-lg-1 questionIndex'>"+len+"、</label>"
								+"<div class='col-lg-9' questionContent='"+len+"'>"
									+"<textarea class='form-control questionStem' autocomplete='off' placeholder='请输入题干' name='"+len+"questionStem' oninput='changeRows(this)'></textarea>"
									+"<div class='form-group checkItem' id='"+len+"chooseDivA'>"
									    +"<div class='col-sm-7'>"
									    	+"<input type='text' class='form-control' placeholder='选项A' name='"+len+"chooseA'>"
									   +"</div>"
									    +"<img src='img/delete_1.png' data-toggle='tooltip' data-placement='top' title='删除该选项' style='width: 34px;' edit='deletechoose' chooseTarget='"+len+"_A' onclick='deletechooseCheckBox(this)' onmouseover='checkItemImgOver(this)' onmouseout='checkItemImgOut(this)'/>"
									+"</div>"
									+"<div class='form-group checkItem'  id='"+len+"chooseDivB'>"
									    +"<div class='col-sm-7'>"
									    	+"<input type='text' class='form-control' placeholder='选项B' name='"+len+"chooseB'>"
									    +"</div>"
										+"<img src='img/delete_1.png' data-toggle='tooltip' data-placement='top' title='删除该选项' style='width: 34px;' edit='deletechoose' chooseTarget='"+len+"_B' onclick='deletechooseCheckBox(this)' onmouseover='checkItemImgOver(this)' onmouseout='checkItemImgOut(this)'/>"
									+"</div>"
									+"<div class='form-group checkItem' id='"+len+"chooseDivC'>"
									    +"<div class='col-sm-7'>"
									    	+"<input type='text' class='form-control' placeholder='选项C' name='"+len+"chooseC'>"
									    +"</div>"
										+"<img src='img/delete_1.png' data-toggle='tooltip' data-placement='top' title='删除该选项' style='width: 34px;' edit='deletechoose' chooseTarget='"+len+"_C' onclick='deletechooseCheckBox(this)' onmouseover='checkItemImgOver(this)' onmouseout='checkItemImgOut(this)'/>"
									+"</div>"
									+"<div class='form-group checkItem' id='"+len+"chooseDivD'>"
									    +"<div class='col-sm-7'>"
									    	+"<input type='text' class='form-control' placeholder='选项D' name='"+len+"chooseD'>"
									    +"</div>"
										+"<img src='img/delete_1.png' data-toggle='tooltip' data-placement='top' title='删除该选项' style='width: 34px;' edit='deletechoose' chooseTarget='"+len+"_D' onclick='deletechooseCheckBox(this)' onmouseover='checkItemImgOver(this)' onmouseout='checkItemImgOut(this)'/>"
									+"</div>"
								+"</div>"
								+"<div class='col-lg-2'>"
									+"<p class='editQuestion' edit='deleteQuestionDiv' indexTarget='"+len+"' onclick='deleteQuestionDiv(this)' onmouseover='editQuestionOver(this)' onmouseout='editQuestionOut(this)'>"
										+"<img src='img/delete1.png' />删除题目"
									+"</p>"
									+"<p class='editQuestion' edit='addChoose' indexTarget='"+len+"' onmouseover='editQuestionOver(this)' onmouseout='editQuestionOut(this)' onclick='addChooseCheckBox(this)'>"
										+"<img src='img/add_small1.png' style='width: 24px;' />添加选项"
									+"</p>"
									+"<div class='rightDiv' AnswerDiv='"+len+"'>"
										+"<p>正确答案选择：</p>"
										+"<div class='checkbox' id='"+len+"rightChooseDivA'>"
										  +"<label>"
										    +"<input type='checkbox' name='"+len+"rightChoose' value='A' checked='checked'>"
										    +"A"
										  +"</label>"
										+"</div>"
										+"<div class='checkbox' id='"+len+"rightChooseDivB'>"
										 +"<label>"
										    +"<input type='checkbox' name='"+len+"rightChoose' value='B'>"
										    +"B"
										  +"</label>"
										+"</div>"
										+"<div class='checkbox' id='"+len+"rightChooseDivC'>"
										  +"<label>"
										    +"<input type='checkbox' name='"+len+"rightChoose' value='C'>"
										    +"C"
										  +"</label>"
										+"</div>"
										+"<div class='checkbox' id='"+len+"rightChooseDivD'>"
										  +"<label>"
										    +"<input type='checkbox' name='"+len+"rightChoose' value='D'>"
										    +"D"
										  +"</label>"
										+"</div>"
									+"</div>"
								+"</div>"
							+"</div>");
}



/*
 * 判断
 * 添加题目
 */
function addJudge(){
	//计算题目个数
	var len = $(".questionDiv").length + 1;
	//添加多选
	$("#newTestForm").append("<div class='row questionDiv' index='"+len+"' questionType='judge'>"
								+"<label class='col-lg-1 questionIndex' >"+len+"、</label>"
								+"<div class='col-lg-9' questionContent='"+len+"'>"
									+"<textarea class='form-control questionStem' autocomplete='off' placeholder='请输入题干' name='"+len+"questionStem' oninput='changeRows(this)'></textarea>"
								+"</div>"
								+"<div class='col-lg-2'>"
									+"<p class='editQuestion' edit='deleteQuestionDiv' indexTarget='"+len+"' onclick='deleteQuestionDiv(this)' onmouseover='editQuestionOver(this)' onmouseout='editQuestionOut(this)'>"
										+"<img src='img/delete1.png' />删除题目"
									+"</p>"
									+"<div class='rightDiv' AnswerDiv='"+len+"'>"
										+"<p>正确答案选择：</p>"
										+"<div class='radio' id='"+len+"rightChooseDivA'>"
										 +"<label>"
										    +"<input type='radio' name='"+len+"rightChoose' value='true' checked='checked'>"
										 	+"真确"
										  +"</label>"
										+"</div>"
										+"<div class='radio' id='"+len+"rightChooseDivB'>"
										  +"<label>"
										    +"<input type='radio' name='"+len+"rightChoose' value='false'>"
											+"错误"
										  +"</label>"
										+"</div>"
									+"</div>"
								+"</div>"
							+"</div>");
}



/*
 * 填空
 * 添加填空选项
 * 选项添加到的div:questionContent="4"
 * 正确答案Div:AnswerDiv="4"
 */
function addChooseGapFilling(element){
	//获取添加到的div的questionContent值
	var indexTarget = element.getAttribute("indexTarget");
	//获取选项个数
	var chooseSize = $("[name^="+indexTarget+"rightChoose]").length;
	//得到添加下一个空的序号——1、2、3。。。。
	var chooseIndex = 1 +chooseSize;
	//添加选项
	$("[questionContent="+indexTarget+"]").append("<div class='form-group checkItem' id='"+indexTarget+"chooseDiv"+chooseIndex+"'>"
												    +"<div class='col-sm-7'>"
												    	+"<input type='text' class='form-control' placeholder='空"+chooseIndex+"' name='"+indexTarget+"choose"+chooseIndex+"' disabled='disabled'>"
												    +"</div>"
												    +"<img src='img/delete_1.png' data-toggle='tooltip' data-placement='top' title='删除该选项' style='width: 34px;' edit='deletechooseGapFilling' chooseTarget='"+indexTarget+"_"+chooseIndex+"' onclick='deletechooseGapFilling(this)' onmouseover='checkItemImgOver(this)' onmouseout='checkItemImgOut(this)'/>"
												    +"<textarea class='form-control questionStem' autocomplete='off' placeholder='请输入题干' name='"+indexTarget+"questionStem"+chooseIndex+"' style='margin-top:20px;' oninput='changeRows(this)'></textarea>"
												+"</div>");
	//添加正确答案选项
	$("[AnswerDiv="+indexTarget+"]").append("<div class='form-group' id='"+indexTarget+"rightChooseDiv"+chooseIndex+"'>"
											    +"<input type='text' class='form-control' autocomplete='off' placeholder='空"+chooseIndex+"' name='"+indexTarget+"rightChoose"+chooseIndex+"'>"
											+"</div>");
}

/*
 * 填空
 * 删除填空选项
 * 删除的选项Div:id="4chooseDiv1"
 * 对应的正确答案Div:id="4rightChooseDiv1"
 */
function deletechooseGapFilling(element){
	var chooseTarget = element.getAttribute("chooseTarget");
	var index = chooseTarget.split("_")[0];
	var choose = chooseTarget.split("_")[1];
	$("#"+index+"chooseDiv"+choose).remove();
	$("#"+index+"rightChooseDiv"+choose).remove();
	
	//修改选项父类div及其子类所有下标1234.。。
	$("[id^="+index+"chooseDiv]").each(function(elementIndex){
		var chooseIndex = 1+elementIndex;
		//修改父类div的ID
		this.setAttribute("id",index+"chooseDiv"+chooseIndex);
		//修改input标签
		$(this).find("input[type=text]").attr("name",index+"choose"+chooseIndex)
		$(this).find("input[type=text]").attr("placeholder","空"+chooseIndex);
		//修改textarea标签——name="4questionStem1"
		$(this).children("textarea").attr("name",index+"questionStem"+chooseIndex);
		//修改img目标
		$(this).children("img").attr("chooseTarget",index+"_"+chooseIndex);
	});
	
	//修改正确答案下标1234。。。(value)
	$("[AnswerDiv="+index+"] input").each(function(elementIndex){
		var chooseIndex = 1+elementIndex;
		$(this).attr("name",index+"rightChoose"+chooseIndex);
		$(this).attr("placeholder","空"+chooseIndex);
	});
	
	//修改正确答案div id—— id="2rightChooseDivC"
	$("[id^="+index+"rightChooseDiv]").each(function(elementIndex){
		var chooseIndex = 1+elementIndex;
		this.setAttribute("id",index+"rightChooseDiv"+chooseIndex);
	});
}

/*
 * 填空
 * 添加题目
 */
function addGapFilling(){
	//计算题目个数
	var len = $(".questionDiv").length + 1;
	//添加题目
	$("#newTestForm").append("<div class='row questionDiv' index='"+len+"' questionType='gapFilling'>"
								+"<label class='col-lg-1 questionIndex' >"+len+"、</label>"
								+"<div class='col-lg-9' questionContent='"+len+"'>"
									+"<textarea class='form-control questionStem' autocomplete='off' placeholder='请输入题干' name='"+len+"questionStem' oninput='changeRows(this)'></textarea>"
									+"<div class='form-group checkItem' id='"+len+"chooseDiv1'>"
									    +"<div class='col-sm-7'>"
									    	+"<input type='text' class='form-control' placeholder='空1' name='"+len+"choose1' disabled='disabled'>"
									    +"</div>"
									    +"<img src='img/delete_1.png' data-toggle='tooltip' data-placement='top' title='删除该选项' style='width: 34px;' edit='deletechooseGapFilling' chooseTarget='"+len+"_1' onclick='deletechooseGapFilling(this)' onmouseover='checkItemImgOver(this)' onmouseout='checkItemImgOut(this)'/>"
									    +"<textarea class='form-control questionStem' autocomplete='off' placeholder='请输入题干' name='"+len+"questionStem1' style='margin-top:20px;'></textarea>"
									+"</div>"
								+"</div>"
								+"<div class='col-lg-2'>"
									+"<p class='editQuestion' edit='deleteQuestionDiv' indexTarget='"+len+"' onclick='deleteQuestionDiv(this)' onmouseover='editQuestionOver(this)' onmouseout='editQuestionOut(this)'>"
										+"<img src='img/delete1.png' />删除题目"
									+"</p>"
									+"<p class='editQuestion' edit='addChoose' indexTarget='"+len+"' onmouseover='editQuestionOver(this)' onmouseout='editQuestionOut(this)' onclick='addChooseGapFilling(this)'>"
										+"<img src='img/add_small1.png' style='width: 24px;' />添加选项"
									+"</p>"
									+"<div class='rightDiv' AnswerDiv='"+len+"'>"
										+"<p>正确答案：</p>"
										+"<div class='form-group' id='"+len+"rightChooseDiv1'>"
										    +"<input type='text' class='form-control' autocomplete='off' placeholder='空1' name='"+len+"rightChoose1'>"
										+"</div>"
									+"</div>"
								+"</div>"
							+"</div>");
}

/*
 * 主观
 * 添加题目
 */
function addSubjective(){
	//计算题目个数
	var len = $(".questionDiv").length + 1;
	//添加题目
	$("#newTestForm").append("<div class='row questionDiv' index='"+len+"' questionType='subjective'>"
								+"<label class='col-lg-1 questionIndex' >"+len+"、</label>"
								+"<div class='col-lg-9' questionContent='"+len+"'>"
									+"<textarea class='form-control questionStem' autocomplete='off' placeholder='请输入题干' name='"+len+"questionStem' oninput='changeRows(this)'></textarea>"
								+"</div>"
								+"<div class='col-lg-2'>"
									+"<p class='editQuestion' edit='deleteQuestionDiv' indexTarget='"+len+"' onclick='deleteQuestionDiv(this)' onmouseover='editQuestionOver(this)' onmouseout='editQuestionOut(this)'>"
										+"<img src='img/delete1.png' />删除题目"
									+"</p>"
								+"</div>"
							+"</div>");
	//添加分值设置
	$("#scoreSet").append("<div class='form-group' id='"+len+"ScoreDiv'>"
							    +"<label for='"+len+"Score' class='col-sm-3 control-label'>"+len+"题</label>"
							    +"<div class='col-sm-8'>"
							      	+"<input type='number' class='form-control' name='"+len+"Score' id='"+len+"Score' placeholder='分值' onchange='controlScore(this)'>"
							    +"</div>"
							+"</div>");
}
