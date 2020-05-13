/*=======================================================================================================================*/
/*================================================================CLOCK==================================================*/
const CLOCK_CONTENT = document.querySelector(".ygm-clock"),
      CLOCK_TXT = CLOCK_CONTENT.querySelector(".ygm-clock-txt");

// 시간 가져오는 함수
function getTime () { 
    const DATE = new Date(),
          HOURS = DATE.getHours(),
          MINUTES = DATE.getMinutes(),
          SECONDS = DATE.getSeconds();
    CLOCK_TXT.innerText = `${HOURS < 10 ? `0${HOURS}` : HOURS} : ${MINUTES < 10 ? `0${MINUTES}` : MINUTES} : ${SECONDS < 10 ? `0${SECONDS}` : SECONDS}`;
}


/*==========================================================================================================================*/
/*==================================================================GRETTING================================================*/
const FORM = document.querySelector(".ygm-form"),
      FORM_INPUT = FORM.querySelector("input"),
      GRETTING = document.querySelector(".ygm-grettings");

const USER_LS = "currentUser",
      SHOWING_CN = "showing";
      NOTICE_CN = "notice";

// 사용자 입력 이름 로컬스토리지에 저장 함수
function saveName (text) {
    localStorage.setItem(USER_LS,text);
}

// name input enter시 처리하는 함수
function handleSubmit (event) {
    event.preventDefault();
    const CURRENT_VALUE = FORM_INPUT.value;
    if (CURRENT_VALUE) { // 입력 value 값이 있는경우
        painGretting(CURRENT_VALUE);
        saveName(CURRENT_VALUE);
    } else {
        alert("이름을 입력해 주세요!")        
        FORM_INPUT.classList.add(NOTICE_CN);
    }
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
// 로드 했을 때 함수 
function loadName () {
    const CURRENT_USER = localStorage.getItem(USER_LS);
    // 사용자 입력 이름 유무에 따른 조건문
    if(CURRENT_USER === null) { // CURRENT_USER 없는 경우 
        askForName();
    } else { // CURRENT_USER 있는 경우
        painGretting(CURRENT_USER); 
    }
}


/*==========================================================================================================================*/
/*====================================================================TODO==================================================*/
const TODO_FORM = document.querySelector(".ygm-toDoForm"),
      TODO_INPUT = TODO_FORM.querySelector("input"),
      TODO_LIST = document.querySelector(".ygm-toDoList");

const TODOS_LS = "toDos";

let TODOS = [];

// todo li 지우는 함수
function deleteToDo (event) {
    // console.dir(event.target);
    const BTN = event.target;
    const LI = BTN.parentNode;
    // 해당 버튼의 li 마크업 삭제
    TODO_LIST.removeChild(LI);
    // 해당 li를 제외한 리스트만 리턴 
    const CLEAN_TODOS = TODOS.filter(function(toDo){
        return toDo.id !== parseInt(LI.id);
    });
    // 해당 선택 li를 제외한 todo리스트 TODOS 변수에 재 대입
    TODOS = CLEAN_TODOS 
    saveToDos(); // 로컬 스토리지에 저장
} 

// TODOS를 가져와 로컬에 저장하는 함수
function saveToDos () {
    localStorage.setItem(TODOS_LS, JSON.stringify(TODOS));
}

// 입력 todo 리스트 화면에 출력하는 함수 
function paintToDo (text) {
    const LI = document.createElement("li"),
          DEL_BTN = document.createElement("button"),
          SPAN = document.createElement("span"),
          NEW_ID = TODOS.length +1;
    DEL_BTN.innerText = "X";
    DEL_BTN.addEventListener("click", deleteToDo)
    SPAN.innerText = text;
    LI.appendChild(SPAN);
    LI.appendChild(DEL_BTN);
    LI.id = NEW_ID;
    TODO_LIST.appendChild(LI);

    const TODO_OBJ = { text: text, id: NEW_ID }
    TODOS.push(TODO_OBJ)
    saveToDos();
}

// todo input enter시 처리하는 함수
function toDoHandleSubmit (event) {
    event.preventDefault();
    const CURRENT_VALUE = TODO_INPUT.value;
    if(CURRENT_VALUE)  { // 입력 value 값이 있는경우
        paintToDo(CURRENT_VALUE);
        TODO_INPUT.classList.remove(NOTICE_CN);
    }else {
        alert("할 일 목록을 입력해 주세요!")        
        TODO_INPUT.classList.add(NOTICE_CN);
    }
    TODO_INPUT.value = "";
}

// todo 로드 했을 때 함수 
function loadToDos () {
    const LOAD_TODOS = localStorage.getItem(TODOS_LS);
    // 로컬스토리지에 todo 리스트가 있을경우 조건문
    if (LOAD_TODOS !== null) {
        const PARSED_TODOS = JSON.parse(LOAD_TODOS);
        PARSED_TODOS.forEach(function (toDo){
            paintToDo(toDo.text);
        })
    } 
}

/*==========================================================================================================================*/
/*==================================================================BACKGROUND================================================*/
const BODY = document.querySelector("body");

const IMG_NUMBER = 3;

// 이미지 화면 출력 함수
function paintImage (imgNumber) {
    const IMAGE = new Image();
    IMAGE.src = `./images/img_background_${imgNumber + 1}.jpg`;
    IMAGE.classList.add("bgImage");
    BODY.appendChild(IMAGE);
}

// 랜덤 숫자 리턴 함수
function genRandom () {
    const NUMBER = Math.floor(Math.random() * IMG_NUMBER);
    return NUMBER;
}

/*==========================================================================================================================*/
/*====================================================================WEATHER==================================================*/
const WEATHER = document.querySelector(".ygm-weather");
const API_KEY = "55ddba8446ad0a6043821820412b6a33";
const COORDS = "coords";

// 날씨 정보 가져오는 함수 
function getWeather (lat, lng) {
    fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`
    ).then(function(response){ // 앞에 데이터를 가져온 후 실행 (than)
        return response.json();
    }).then(function(json){
        const TEMPERATURE = json.main.temp; // 현재온도
        const PLACE = json.name; // 현재위치 
        WEATHER.innerText = `${TEMPERATURE}º 
                             ${PLACE}`;

    })
}
// 위도 경도 로컬스토리지 저장 함수
function saveCoords (coordsObj) {
    localStorage.setItem(COORDS, JSON.stringify(coordsObj)) // 저장값이 string 이어야 한다.
}
// 좌표 가져오는데 실패했을때 처리하는 함수
function handleGeoError () {
    console.log("Cant access geo location");
}
// 좌표 가져오는데 성공했을때 처리하는 함수
function handleGeoSucces(position) {
    const LATITUDE = position.coords.latitude, // 위도
          LONGITUDE = position.coords.longitude; // 경도
    const COORD_OBJ = {
        latitude : LATITUDE, // 위도
        longitude : LONGITUDE // 경도
    };
    saveCoords (COORD_OBJ); // 위도 경도 로컬스토리지 저장 함수
    getWeather (LATITUDE, LONGITUDE)
}
// 좌표 요청 함수
function askForCoords() {
    navigator.geolocation.getCurrentPosition(handleGeoSucces, handleGeoError);
}
// weather 로드 했을 때 함수 
function loadCoords () {
    const LOADED_COORDS = localStorage.getItem(COORDS);
    // 좌표값이 없을 경우
    if(LOADED_COORDS === null) {
        askForCoords(); // 좌표 요청 함수
    // 좌표값을 이미 있을 경우
    } else { 
        const PARSE_COORDS = JSON.parse(LOADED_COORDS);
        getWeather(PARSE_COORDS.latitude, PARSE_COORDS.longitude);
    }

}

/*==========================================================================================================================*/
/*====================================================================RESET==================================================*/
const BTN_RESET = document.querySelector(".btn-reset");

// 초기화 함수
function allReset () {
    if(confirm("초기화 하시겠습까?")) {
        localStorage.clear();
        location.reload();
    }
}
// 리셋 버튼 클릭시 초기화 함수 실행 
BTN_RESET.addEventListener("click",allReset);

/*==========================================================================================================================*/
/*====================================================================INIT==================================================*/
function init () {
    getTime(); // 시간 가져오는 함수
    setInterval (getTime , 1000); // 시계 초 단위로 반복 실행
    loadName(); // name 로드 했을 때 함수 
    loadToDos(); // todo 로드 했을 때 함수 
    TODO_FORM.addEventListener("submit", toDoHandleSubmit); // todo input enter 시 실행 
    /*background*/
    const RANDOM_NUMBER = genRandom();
    paintImage(RANDOM_NUMBER);
    /*weather*/
    loadCoords();

}

init();