
function openFeatures() {
    var allElem = document.querySelectorAll(".elem")
    var back = document.querySelectorAll(".fullElem .back")
    var fullElem = document.querySelectorAll(".fullElem")

    allElem.forEach(function (elem) {
        elem.addEventListener("click", function () {
            // console.log(elem.id);
            fullElem[elem.id].style.display = "block";
        })
    })

    back.forEach(function (backbtn) {
        backbtn.addEventListener('click', function () {
            fullElem[backbtn.id].style.display = "none";
        })
    })
}

openFeatures()

function todoList() {

    let form = document.querySelector(".addtask form")
    let formInput = document.querySelector(".addtask form #task-input")
    let formDetails = document.querySelector(".addtask form textarea")
    let checkBox = document.querySelector(".addtask form #check")

    let curruntTask = []

    if (localStorage.getItem("currentTask")) {
        curruntTask = JSON.parse(localStorage.getItem("currentTask"))
    } else {
        console.log("Task list is empaty");
    }

    function renderTask() {

        let allTask = document.querySelector('.alltask')
        let sum = ''
        curruntTask.forEach(function (elem, idx) {

            sum += `<div class="task">
                            <div class="task-details">
                            <h4>${elem.task} <span class =${elem.imp}> imp</span></h4>
                            <h6>${elem.details}</h6>
                            </div>
                            <button id =${idx} >Mark as completed</button>
                        </div>`
        })

        allTask.innerHTML = sum
        localStorage.setItem("currentTask", JSON.stringify(curruntTask))

        document.querySelectorAll('.task button').forEach(function (btn) {
            btn.addEventListener('click', function () {
                curruntTask.splice(btn.id, 1)
                renderTask()
            })
        })

    }

    renderTask()

    form.addEventListener('submit', function (event) {
        event.preventDefault()
        if(formInput.value == "" && formDetails.value == ""){
            alert("Please Add the task")
        }else{
        curruntTask.push(
            {
                task: formInput.value,
                details: formDetails.value,
                imp: checkBox.checked,
            }
        )
        renderTask()

        formInput.value = "";
        formDetails.value = "";
        checkBox.checked = false;
    }
    })


}

todoList()


function dailaypanner() {

    var dailyplanner = document.querySelector('.daily-planner')

    var dayPlanData = JSON.parse(localStorage.getItem("dayplandata")) || {}

    var hours = Array.from({ length: 18 }, (elem, idx) => {
        return `${6 + idx}:00 - ${7 + idx}:00`

    })

    var wholedaysum = ""
    hours.forEach(function (elem, idx) {
        var savedData = dayPlanData[idx] || "";
        wholedaysum += `<div class="daily-planner-time" >
                    <p>${elem}</p>
                    <input id=${idx} type="text" placeholder="..." name="" value= ${savedData}>
                </div>`
    })


    dailyplanner.innerHTML = wholedaysum

    var dayPlanInput = document.querySelectorAll('.daily-planner input')

    dayPlanInput.forEach(function (elem) {
        elem.addEventListener("input", function () {
            dayPlanData[elem.id] = elem.value
            localStorage.setItem("dayplandata", JSON.stringify(dayPlanData))
        })
    })
}

dailaypanner()

function motivation() {
    let quote = document.querySelector(".motive2 h1")
    let author = document.querySelector(".motive3 h2")

    async function fetchQuote() {
        let response = await fetch("https://dummyjson.com/quotes/random")
        let data = await response.json()
        quote.innerHTML = data.quote
        author.innerHTML = "-" + data.author
    }
    fetchQuote();
}
motivation()



function pomodoro() {

    let timer = document.querySelector('.pomo-timer h1')
    let session = document.querySelector('.Promodoro-fullpage h2')
    let startbtn = document.querySelector('.start')
    let stopbtn = document.querySelector('.pause')
    let resetbtn = document.querySelector('.reset')
    let counter;

    var totalsec = 1500;
    let lasttime = totalsec
    let isWorkSession = true;

    function updateTime() {
        let minutes = Math.floor(totalsec / 60)
        let sec = totalsec % 60
        timer.innerHTML = `${minutes.toString().padStart(2, "0")}:${sec.toString().padStart(2, "0")}`
    }
    function startTimer() {
        clearInterval(counter)
        counter = setInterval(() => {
            if (totalsec > 0) {
                totalsec--
                updateTime()
            } else {
                clearInterval(counter)
                if (isWorkSession) {
                    // Work session finished, start break
                    isWorkSession = false
                    session.innerHTML = "Take Break"
                    session.style.backgroundColor = 'var(--blue)'
                    totalsec = 300 // 5 minutes break
                    updateTime()
                } else {
                    // Break finished, reset to work session
                    isWorkSession = true
                    session.innerHTML = "Work session"
                    totalsec = lasttime
                    updateTime()
                }
            }

        }, 1000)
    }

    startbtn.addEventListener('click', startTimer)

    stopbtn.addEventListener('click', () => {
        clearInterval(counter)
    })
    resetbtn.addEventListener('click', () => {
        clearInterval(counter)
        totalsec = lasttime
        updateTime()
    })

}

pomodoro()

function weather() {

    let apikry = '98987d69e81c4463bba131741252605'


    var place = document.querySelector('.header1 h3')
    var dayTime = document.querySelector(".header1 h1")
    var dateOfday = document.querySelector(".header1 h2")
    var temp = document.querySelector(".header2 h1")
    var condition = document.querySelector(".header2 h4")
    var heatIndex = document.querySelector(".header2 .heatIndex")
    var humidity = document.querySelector(".header2 .humidity")
    var wind = document.querySelector(".header2 .wind")


    let city = "Lucknow"
    async function getData() {
        const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=${apikry}&q=${city}&aqi=no`);
        const data = await response.json();
        place.innerHTML = `${data.location.name} (${data.location.region})`

        temp.innerHTML = `${data.current.temp_c}°C`
        condition.innerHTML = `${data.current.condition.text}`
        wind.innerHTML = `Wind: ${data.current.wind_kph} km/h`
        humidity.innerHTML = `Humidity: ${data.current.humidity}%`
        heatIndex.innerHTML = `Heat Index: ${data.current.heatindex_c}%`

    }

    getData();



    function dateTime() {
        let dayOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
        let date = new Date()
        let hours = date.getHours()
        let minutes = date.getMinutes()
        let seconds = date.getSeconds()
        if (hours > 12) {
            dayTime.innerHTML = `${dayOfWeek[date.getDay()]}, ${(hours - 12).toString().padStart(2, 0)}:${minutes.toString().padStart(2, 0)}:${seconds.toString().padStart(2, 0)} PM`
        } else {
            dayTime.innerHTML = `${dayOfWeek[date.getDay()]}, ${(hours).toString().padStart(2, 0)}:${minutes.toString().padStart(2, 0)}:${seconds.toString().padStart(2, 0)} AM`
        }
        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        let day = date.getDate()
        let month = months[date.getMonth()] // Months are zero-based in JavaScript
        let year = date.getFullYear()
        dateOfday.innerHTML = `${day.toString().padStart(2, 0)} ${month} ${year}`
    }

    setInterval(() => {
        dateTime()
    }, 1000);

}

weather()

function theme() {

    var theme = document.querySelector('.theme')
    let rootTheme = document.documentElement
    let flag = 0;
    theme.addEventListener('click', () => {


        if (flag == 0) {
            rootTheme.style.setProperty("--pri", "#DFD0B8")
            rootTheme.style.setProperty("--sec", "#222831")
            rootTheme.style.setProperty("--tri1", "#948979")
            rootTheme.style.setProperty("--tri2", "#06202B")
            flag = 1
        } else if (flag == 1) {
            rootTheme.style.setProperty("--pri", "#FFE1E0")
            rootTheme.style.setProperty("--sec", "#9B7EBD")
            rootTheme.style.setProperty("--tri1", "#F49BAB")
            rootTheme.style.setProperty("--tri2", "#7F55B1")
            flag = 2
        } else {
            rootTheme.style.setProperty("--pri", " #f8e5d1")
            rootTheme.style.setProperty("--sec", "#4d281e")
            rootTheme.style.setProperty("--tri1", "#bd8a00")
            rootTheme.style.setProperty("--tri2", "#be8568")
            flag = 0
        }
    })
}

theme()

function dailyGoals(){
    
}
const goalInput = document.getElementById('goalInput');
const goalList = document.getElementById('goalList');

let goals = JSON.parse(localStorage.getItem('dailyGoals')) || [];

function renderGoals() {
    goalList.innerHTML = '';
    goals.forEach((goal, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
          <span onclick="toggleGoal(${index})" class="${goal.done ? 'done' : ''}">
            ${goal.text}
          </span>
          <button onclick="deleteGoal(${index})">❌</button>
        `;
        goalList.appendChild(li);
    });
    localStorage.setItem('dailyGoals', JSON.stringify(goals));
}

function addGoal() {
    const text = goalInput.value.trim();
    if (text !== '') {
        goals.push({ text, done: false });
        goalInput.value = '';
        renderGoals();
    }
}

function toggleGoal(index) {
    goals[index].done = !goals[index].done;
    renderGoals();
}

function deleteGoal(index) {
    goals.splice(index, 1);
    renderGoals();
}

renderGoals();

