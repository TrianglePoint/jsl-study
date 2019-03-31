let history = ""; // 입력했던 계산식 표시.

let result = null; // 계산 결과, 화면에 표시되지 않음.
let number = null; // 입력 중인 숫자, 계산 결과 표시.
let operator = ""; // 입력됐지만 result에 반영되지 않은 연산자.

let last_number = null; // 마지막 연산을 또 하고 싶을 때를 위해.
let last_operator = "";
let last_who = ""; // 마지막 입력이 숫자인지 연산자인지.

/*
 * 입력한 숫자에 수학함수(제곱, sin 등)를 적용시킬때, 이전 연산을 취소하고
 * 수학함수를 적용후 다시 이전 연산에 대입해야한다. 그때 사용.
 */
let archived_number = null;
let archived_operator = "";

let showDot = false; // 소수점 입력시 다음 숫자를 받기 전까지 사용.
let dotPlace = 0; // 소수점 자리를 계속 추가시 사용.
const MAXDOTPLACE = 6; // 숫자가 너무 작으면 값이 비정상이기에 소수점 입력의 한계 지정.

let digit = 0;
const MAXDIGIT = 16; // 숫자가 너무 크면 값이 비정상이기에 숫자 입력의 한계 지정.

// disabled 속성은 name에서 불러오면 에러난다.
function changeDeepMathButtonsDisabled(state){
	var sin = document.getElementById("btn_sin");
	var cos = document.getElementById("btn_cos");
	var tan = document.getElementById("btn_tan");
	sin.disabled = state;
	cos.disabled = state;
	tan.disabled = state;
}

function insertNumber(inserted_number){ // 숫자를 입력받는다.
	setLastOperator(""); // 이제 지난 연산자는 필요없다.
	if(number < 0){
		// 음수 전환.
		inserted_number = -inserted_number;
	}
	if(showDot){ // 첫번째 소수점 자리 입력.
		showDot = false;
		dotPlace++;
	}
	if(digit >= MAXDIGIT){
		return;
	}
	last_who = "number";
	changeDeepMathButtonsDisabled(false);
	if(dotPlace <= MAXDOTPLACE && dotPlace > 0){ // 소수점 자리 입력.
		inserted_number *= getDecimalPointNumber(dotPlace);
		number += inserted_number;
		
		// 입력한 소수점 아래의 숫자는 제거.
		number = cutDecimalPointNumber(number, dotPlace++);
	}else if(dotPlace == 0){
		// 일반 입력.
		number = number * 10 + inserted_number;
	}
	digit++;
	updateScreen();
}

// 소수점이 있는 숫자를 요청.
function getDecimalPointNumber(inserted_count){
	var decimalPointNumber = 1;
	for(var i = 0; i < inserted_count; i++){
		decimalPointNumber *= 0.1;
	}
	return decimalPointNumber;
}

// 소수점 index번째까지 남기고 뒤는 자른다.
function cutDecimalPointNumber(inserted_number, index){
	var str = inserted_number + "";
	var num = str.substr(0 , str.indexOf(".")+index+1) *1;
	
	return num;
}
function insertOperator(inserted_operator){
	changeDeepMathButtonsDisabled(true);
	if(number != null || history == ""){
		if(inserted_operator == "sin" || 
				inserted_operator == "cos" || 
				inserted_operator == "tan"){
			// 즉시 계산하여 넣는다.
			history += operator + " " + inserted_operator + "(" + 
			addNumberToHistory() + ")";
			number = deepCalculate(inserted_operator, number);
			updateScreen();
			updateHistoryScreen();
			last_who = "number";
			return;
		}
		
		if(number == null){
			if(result == null){
				number = 0; // 첫 입력으로 연산자 입력시.
			}else{
				number = result; // = 입력 후 바로 연산자 입력시.
			}
			if(inserted_operator != "="){ // "="은 history가 없어야 한다.
				history += addNumberToHistory();
			}
		}else if(history == ""){
				history += addNumberToHistory(); // 첫 숫자 + 연산자 입력시.
		}else{
			// 그냥 숫자 + 연산자 입력시.
			history += " " + operator + " " + addNumberToHistory();
			setArchivedNumber(number);
			setArchivedOperator(operator);
		}
		if(digit != 0 || dotPlace != 0 || history != ""){ // 값을 입력했는가?
			calculateNumber(operator, number);
			readyReceiveNumber(true);
		}
	}
	if(inserted_operator != "="){
		last_who = "operator";
	}else{
		if(last_who == "operator"){
			// 연산자를 마지막으로 식이 종료됨. 그러기에 재실행 방지를 위해.
			setLastNumber(null);
			setLastOperator("");
		}
		
		// result는 값이 남아있다.
		if(last_number != null && last_operator != ""){
			// 마지막 연산을 재실행하기 위해.
			number = last_number;
			operator = last_operator;
			calculateNumber(operator, number);
			readyReceiveNumber(false);
		}
		clearHistoryScreen();
		resetDigit();
		resetDot();
		return;
	}
	operator = inserted_operator; // 받은 연산자를 대기열에 올림.
	updateHistoryScreen();
}

// 계산한다.
function calculateNumber(op, num){
	switch(op){
	case "+":
		result += num;
		break;
	case "-":
		result -= num;
		break;
	case "*":
		result *= num;
		break;
	case "/":
		result /= num;
		break;
	case "^":
		// 이전 계산을 취소하고.
		undoCalculateNumber(archived_operator, last_number);
		// 이번 계산을 하고난다음 다시 이전 계산을 한다.
		calculateNumber(archived_operator, 
				squared(last_number, num));
		break;
	case "":
		result = num; // 첫 숫자 + 연산자 입력시.
	}
}

// sin, cos, tan 계산.
function deepCalculate(op, num){
	switch(op){
	case "sin":
		num = Math.sin(num);
		break;
	case "cos":
		num = Math.cos(num);
		break;
	case "tan":
		num = Math.tan(num);
	}
	return num;
}

// 마지막 계산을 취소.
function undoCalculateNumber(op ,num){
	switch(op){
	case "+":
		result -= num;
		break;
	case "-":
		result += num;
		break;
	case "*":
		result /= num;
		break;
	case "/":
		result *= num;
		break;
	}
}

// 다음 값을 받기 위한 준비.
function readyReceiveNumber(update_last_number){
	if(update_last_number){
		// 새로운 값을 입력하여 계산한다면 갱신한다.
		setLastNumber(number);
	}
	number = result; // 계산 결과를  화면에 보이기 위해.
	updateScreen();
	number = null; // 새로운 값을 받기 위해.
	resetDigit();
	resetDot();
}

// 제곱한다.
function squared(num, count){
	for(var i = 1, originNumber = num; i < count; i++){
		num *= originNumber;
	}
	return num;
}

// number가 음수일 경우 괄호를 씌우기 위해.
function addNumberToHistory(){
	if(number < 0){
		return "(" + number + ")";
	}
	return number;
}

// 부호 변경.
function changeSign(){
	number = -number;
	updateScreen();
}

// 소수점 찍기.
function addDot(){
	if(dotPlace > 0){
		return; // 소수점이 이미 있다.
	}
	if(number == null){
		number = 0; // 0. 을 보인다.
	}
	showDot = true;
	updateScreen();
}

function getDot(){
	// 소수점 1번째 자리의 수 입력을 대기중일때 .
	if(showDot){
		return ".";
	}
	return "";
}

function setLastNumber(num){
	last_number = num;
}
function setLastOperator(op){
	last_operator = op;
}
function setArchivedNumber(num){
	archived_number = num;
}

// 사칙 연산자만 보관.
function setArchivedOperator(op){
	if(op == "+" || op == "-" || op == "*" || op == "/"){
		archived_operator = op;
	}
}

// 입력했던 숫자의 자릿수 초기화.
function resetDigit(){
	digit = 0;
}

// 소수점 추가 버튼을 활성화.
function resetDot(){
	showDot = false;
	dotPlace = 0;
}

// screen을 갱신한다.
function updateScreen(){
	document.getElementById("p_screen").innerHTML = 
		number + getDot();
}

// historyScreen을 갱신한다.
function updateHistoryScreen(){
	document.getElementById("p_historyScreen").innerHTML =
		history + " " + operator;
}

function clearAllScreen(){
	clearScreen();
	clearHistoryScreen();
}

// screen을 비운다.
function clearScreen(){
	resetDigit();
	resetDot();
	result = null;
	number = 0;
	updateScreen();
	number = null;
}

// historyScreen을 비운다.
function clearHistoryScreen(){
	history = "";
	setLastOperator(operator);
	operator = "";
	updateHistoryScreen();
}