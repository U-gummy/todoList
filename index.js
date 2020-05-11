/*=======================================================================================================================*/
/*================================================================CLOCK==================================================*/
const CLOCK_CONTENT = document.querySelector(".ygm-clock"),
      CLOCK_TXT = CLOCK_CONTENT.querySelector(".ygm-clock-txt");

// 시간 가져오는 함수
function getTime () { 
    const DATE = new Date();
    const HOURS = DATE.getHours();
    const MINUTES = DATE.getMinutes();
    const SECONDS = DATE.getSeconds();
    CLOCK_TXT.innerText = `${HOURS < 10 ? `0${HOURS}` : HOURS} : ${MINUTES < 10 ? `0${MINUTES}` : MINUTES} : ${SECONDS < 10 ? `0${SECONDS}` : SECONDS}`;
}


/*==========================================================================================================================*/
/*==================================================================GRETTING================================================*/
const FORM = document.querySelector(".ygm-form"),
      FORM_INPUT = FORM.querySelector("input"),
      GRETTING = document.querySelector(".ygm-grettings");

const USER_LS = "currentUser",
      SHOWING_CN = "showing";
function saveName (text) {
    localStorage.setItem(USER_LS,text);
}
function handleSubmit (event) {
    event.preventDefault();
    const currentValue = FORM_INPUT.value;
    painGretting(currentValue);
    saveName(currentValue);
}

function askForName () {
    FORM.classList.add(SHOWING_CN);
    FORM.addEventListener("submit", handleSubmit); // input enter 눌렀을시 이벤트 
}

// 인사말 텍스트 리턴 함수
function painGretting (text) {
    FORM.classList.remove(SHOWING_CN);
    GRETTING.classList.add(SHOWING_CN);
    GRETTING.innerText = `Hello ${text}`;
} 
function loadName () {
    const currentUser = localStorage.getItem(USER_LS);
    if(currentUser === null) { // currentUser 없는 경우 
        askForName();
    } else { // currentUser 있는 경우
        painGretting(currentUser);
    }

}

/*==========================================================================================================================*/
/*====================================================================INIT==================================================*/
function init () {
    getTime(); // 시간 가져오는 함수
    setInterval (getTime , 1000);
    loadName();
}
init();