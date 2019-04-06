
// 페이지 로드시 호출.
$(document).ready(function(){
	let lastMonth = 12; // 1년은 12월까지.
	
	for(let i = 1; i <= lastMonth; i++){
		let month = $("<option>"); // 12월까지 추가하고.
		month.val(i);
		month.html(i);
		$("#select_month").append(month);
	}
	
	setMaxDay(1); // 1월이 기본값이니 1월의 날들을 추가하는 함수 호출.
});

// 현재 선택된 달을 확인.
function checkMonth(){
	let month = $("#select_month").val();
	if(month == 2){
		setMaxDay(month); // 2월이면 윤년인지 확인해야함.
	}
}

// 이달의 day들을 설정함.
function setMaxDay(month){

	let select_day = $("#select_day");
	
	let previousDay = select_day.val(); // 사용자가 기존에 날짜를 선택했을 경우를 대비해 날짜 저장.

	removeDay(); // day들을 지움
	
	let maxDay = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]; // 달마다의 마지막 날짜.
	
	if(month == 2){ // 윤년 계산해야함.
		if(isLeapYear( $("#input_year").val() )){
			// 윤년이다.
			maxDay[1] = 29;
		}
	}

	for(let i = 1; i <= maxDay[month-1]; i++){
		let day = $("<option>"); // Day 추가.
		day.val(i);
		day.html(i);
		select_day.append(day);
	}
	
	// 사용자가 선택한 이전 day가 있는가?
	if(previousDay != null){
		if(previousDay <= maxDay[month-1]){
			select_day.val(previousDay); // 사용자가 선택한 이전 day로 복구.  
		}else{
			select_day.val(maxDay[month-1]); // 예) 이전 day가 31일인데, 1월일 경우 30일로 설정.
		}
	} 
}

// day 지움.
function removeDay(){
	$("#select_day").empty();
}

// 윤년인가?
function isLeapYear(year){
	if(year%400 == 0 && year%100 == 0 && year%4 == 0){ // 윤년이다.
		return true;
	}
	if(year%100 == 0 && year%4 == 0){ // 평년이다.
		return false;
	}
	if(year%4 == 0){ // 윤년이다.
		return true;
	}
	
	return false; // 평년이다.
}

// submit 발생시 호출.
function validate(){
	if(!( validateId() )){ // 아이디.
		return false;
	}
	if(!( validatePwd() )){ // 비밀번호.
		return false;
	}
	if(!( validateMail() )){ // 메일.
		return false;
	}
	if(!( validateName() )){ // 이름.
		return false;
	}
	if(!( validateJoomin() )){ // 주민번호.
		return false;
	}
	
	window.alert("완료!");
	
	return true; // 검사가 끝나면 다음으로 진행.
}

// 아이디 검사.
function validateId(){
	let input_id = $("#input_id");
	let regExp = /^[A-Za-z0-9]{4,12}$/; // 4~12자의 영문,숫자인가?
	let result = regExp.test(input_id.val());
	
	if(!(result)){
		window.alert("아이디: 4~12자의 영문 대소문자와 숫자로만 입력해야합니다");
		input_id.val("");
		input_id.focus();
		return false;
	}
	
	return true;
}

// 비밀번호 검사.
function validatePwd(){
	let input_id = $("#input_id");
	let input_pwd = $("#input_pwd");
	
	if(input_id.val() == input_pwd.val()){ // 아이디, 비밀번호는 달라야한다.
		window.alert("아이디와 비밀번호는 달라야합니다");
		input_pwd.val("");
		input_pwd.focus();
		return false;
	}
	
	let regExp = /^[A-Za-z0-9]{4,12}$/; // 4~12자의 영문, 숫자인가?
	let result = regExp.test(input_pwd.val());
	
	if(!(result)){
		window.alert("비밀번호: 4~12자의 영문 대소문자와 숫자로만 입력해야합니다");
		input_pwd.val("");
		input_pwd.focus();
		return false;
	}
	
	let input_pwdConfirm = $("#input_pwdConfirm");
	
	if(input_pwd.val() != input_pwdConfirm.val()){ // 비밀번호 확인란은 비밀번호랑 같아야한다.
		window.alert("비밀번호 확인: 비밀번호 확인란을 비밀번호란과 똑같이 입력해야합니다");
		input_pwdConfirm.val("");
		input_pwdConfirm.focus();
		return false;
	}
	
	return true;
}

// 메일주소 검사.
function validateMail(){
	let input_mail = $("#input_mail");
	let regExp = /^\w{1,}\@\w{1,}\.(com|net|co\...|org|go\...|ac\...)$/; // asd@asd.com, co.kr 같은 양식이여야한다.
	let result = regExp.test(input_mail.val());
	
	if(!(result)){
		window.alert("메일주소: 양식에 맞춰야합니다");
		input_mail.val("");
		input_mail.focus();
		return false;
	}
	
	return true;
}

// 이름 검사.
function validateName(){
	let input_name = $("#input_name");
	let regExp = /^\S{1,}$/; // 공백은 안됨.
	let result = regExp.test(input_name.val());
	if(!(result)){
		window.alert("이름: 공백없이 이름을 쓰세요");
		input_name.val("");
		input_name.focus();
		return false;
	}
	
	return true;
}

// 주민번호칸에 입력시 호출.
function checkJoomin(joomin){
	if(joomin.length != 13){
		return;
	}
	let regExp = /^\d{13}$/; // 주민번호는 13자리의 숫자다.
	let result = regExp.exec(joomin);
	if(result == null){
		return;
	}
	let year = (""+result).substring(0, 2); // 생년월일의 생년.
	let todayYear = ""+(new Date()).getFullYear(); // 올해.

	if(year > todayYear.substring(2, 4)){ // 생년이 올해의 뒷 2자리보다 큰가?
		setInput_year((todayYear.substring(0, 2)-1) + year); // 예) 올해가 2019년이면 19(생년).
	}else{
		setInput_year(todayYear.substring(0, 2) + year); // 20(생년).
	}
	checkMonth(); // 윤년 체크를 하기위한 시작.
}

// 생년월일의 생년을 설정.
function setInput_year(year){
	$("#input_year").val(year);
}

// 주민번호 검사.
function validateJoomin(){
	let input_joomin = $("#input_joomin");
	let regExp = /^\d{13}$/; // 주민번호는 13자리의 숫자다.
	let joomin = input_joomin.val();
	let result = regExp.test(joomin);
	
	if(!(result)){
		window.alert("주민번호: 13자리이여야합니다");
		input_joomin.val("");
		input_joomin.focus();
		return false;
	}
	
	// 주민번호는 규칙에 맞춰 만들기에 그 규칙을 이용하여 검사.
	let array = [2, 3, 4, 5, 6, 7, 8, 9, 2, 3, 4, 5];
	let sum = 0;
	for(let i = 0; i < array.length; i++){
		array[i] *= joomin[i];
		sum += array[i];
	}
	
	// 계산을 거친 결과가 주민번호 맨 뒷자리와 동일해야한다.
	if((11 - (sum%11))%10 != joomin[joomin.length-1]){
		window.alert("주민번호: 정상적인 주민번호를 입력해야합니다");
		input_joomin.val("");
		input_joomin.focus();
		return false;
	}
	
	return true;
}
