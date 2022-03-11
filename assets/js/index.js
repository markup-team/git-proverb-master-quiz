function app(){

	// 이전에 기억된  장치 모드
	// 0. scope variables
	var infoPopup = null;
	var btnInfo1 = null;
	var btnInfo2 = null;
	var popInfo1 = null;
	var popInfo2 = null;

	// 1. init
	function init(){
		findDomNodes();
		bindEvents();
	}
	// 2. findDomNodes
	function findDomNodes(){
		// 팝업
		infoPopup = document.querySelector('.info-popup');
		btnInfo1 = document.querySelector('.btn-info-1');
		btnInfo2 = document.querySelector('.btn-info-2');
		popInfo1 = document.querySelector('.infopop1');
		popInfo2 = document.querySelector('.infopop2');
		btnClose1 = document.querySelector('.infopop1 .btn-close');
		btnClose2 = document.querySelector('.infopop2 .btn-close');
	}
	// 3. bindEvents
	function bindEvents(){
		if (infoPopup) {
			btnInfo1.addEventListener('click', openPop1);
			btnInfo2.addEventListener('click', openPop2);
			btnClose1.addEventListener('click', closePop1);
			btnClose2.addEventListener('click', closePop2);
		}
	}


	// 4. handler
	function openPop1(){
		popInfo1.classList.add('on');
	}
	function openPop2(){
		popInfo1.classList.add('on');
	}
	function closePop1(){
		popInfo1.classList.remove('on');
	}
	function closePop2(){
		popInfo1.classList.remove('on');
	}
	// 5. intialization
	init();
};
// 앱 실행
app();
