
// 입력한 내용을 옵션에 맞춰 처리하여 보여줌.
function process_data(){
	var text = document.getElementById("input_text").value;
	var p_show = document.getElementById("p_show");
	
	// 입력 값이 있을 때만 진행.
	if(text == ""){
		p_show.innerHTML = null;
		return;
	}
	
	p_show.innerHTML = text; // 텍스트 입력.
	
	// 색깔 설정.
	p_show.style.color = 
		document.getElementById("select_color").value;
	
	// 크기 설정.
	var fontSize = 
		document.getElementById("select_size").value*100;
	p_show.style.fontSize = fontSize + "%";
	
	// 다른 옵션 설정하는 함수 호출.
	process_textOption(p_show, fontSize);
}

// Tag의 속성들을 요청 옵션에 따라 설정. 
function process_textOption(p_show, fontSize){
	
	// 크게, 작게 옵션시 '%' 단위로 글자 크기 변경시 사용.
	const FONTSIZE_AMOUNT = 50;
	var textOption = document.getElementsByName("textOption");
	
	// Attribute를 초기화.
	p_show.style.textDecorationLine = null;
	p_show.style.fontWeight = null;
	p_show.style.fontStyle = null;
	p_show.style.textTransform = null;
	
	// 옵션에 맞춰 attribute 설정.
	for(var i = 0; i < textOption.length; i++){
		if(!(textOption[i].checked)){
			continue;
		}
		var option = textOption[i].value;
		switch(option){
		case "line-through":
			p_show.style.textDecorationLine = option;
			break;
		case "larger":
			fontSize += FONTSIZE_AMOUNT;
			p_show.style.fontSize = fontSize + "%"; 
			break;
		case "smaller":
			fontSize -= FONTSIZE_AMOUNT;
			p_show.style.fontSize = fontSize + "%"; 
			break;
		case "bold":
			p_show.style.fontWeight = option;
			break;
		case "italic":
			p_show.style.fontStyle = option;
			break;
		case "sup":
		case "sub":
			p_show.innerHTML = 
				"<" + option + ">" + p_show.innerHTML + 
				"</" + option + ">";
			break;
		case "lowercase":
			p_show.style.textTransform = option;
			break;
		case "uppercase":
			p_show.style.textTransform = option;
		}
	}
}