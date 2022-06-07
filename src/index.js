const TIMER_MODES = {
    manual: "manual",
    auto: "auto"
};

//--You can control the variables in this area
const USER_TIME = 35; // In Seconds, set how long can one person speak
const TIMER_MODE = TIMER_MODES.manual;
// Set how many people there are
const CRITICAL_TIME = 10; // When should bubble start pulsating
const poList = [
    {
        name: "Marius Lesnickas",
        src: "https://ca.slack-edge.com/T3V50P6MN-U01JM1WK7CL-fe9d4e25a0b9-512"
    }, {
        name: "Tomas Pakulis",
        src: "https://ca.slack-edge.com/T3V50P6MN-U03APBR882K-05b07585b245-512"
    }, {
        name: "Kateryna Shevchenko",
        src: "https://ca.slack-edge.com/T3V50P6MN-U02L7J93J31-2ac80b461a65-512"
    },
]
const qaList = [
    {
        name: "Eglė Kasparaitytė",
        src: "https://ca.slack-edge.com/T3V50P6MN-U030J8TJ804-89ee2a84179d-512"
    }, {
        name: "Ieva Mašalaitė",
        src: "https://ca.slack-edge.com/T3V50P6MN-U03HKLJ77M5-f59b45a6ea0f-512"
    }, {
        name: "Agnė Gendrėnienė",
        src: "https://ca.slack-edge.com/T3V50P6MN-U01UJ5L0A4X-d72bbf455561-512"
    }
]
const devopsList = [
    {
        name: "Mindaugas Liutkauskas",
        src: "https://ca.slack-edge.com/T3V50P6MN-U032ZDV3D3J-6131bfeaa026-512"
    }
]
const beList = [
    {
        name: "Sandra Klezyte",
        src: "https://ca.slack-edge.com/T3V50P6MN-U03521389MM-ga30b025d858-512"
    },
    {
        name: "Antanas Kiselis",
        src: "https://ca.slack-edge.com/T3V50P6MN-U02C15PCVEF-4253f19273d1-512"
    },
    {
        name: "Justinas Garipovas",
        special: true,
        src: "https://media.discordapp.net/attachments/855740759064182815/982291449708179466/unknown.png?width=907&height=609"
    },
    {
        name: "Matas Dragūnas",
        src: "https://ca.slack-edge.com/T3V50P6MN-U02B75EKXPY-bb3291c1df7b-512"
    },
    {
        name: "Tautvydas Karvelis",
        src: "https://ca.slack-edge.com/T3V50P6MN-U03DH29FN4E-b37acca90c5e-512"
    },
    {
        name: "Vitas Micė",
        src: "https://ca.slack-edge.com/T3V50P6MN-U03DEUZ4JCQ-6fbd63f42e9a-512"
    },
    {
        name: "Vytenis Gelažius",
        src: "https://ca.slack-edge.com/T3V50P6MN-U01M3R1EK6J-be3057d7eb98-512"
    }
]
const feList = [
    {
        name: "Andrius Simanavičius",
        src: "https://ca.slack-edge.com/T3V50P6MN-U024V4GJLP8-15d3677005f8-512"
    },
    {
        name: "Edmundas Ravdo",
        src: "https://ca.slack-edge.com/T3V50P6MN-UL0T363S4-1a3f3ec2baea-512"
    },
    {
        name: "Karolis Kašys",
        src: "https://ca.slack-edge.com/T3V50P6MN-U019KV9PSTG-1218550f2afe-512"
    },
    {
        name: "Lukas Laurinavičius",
        src: "https://ca.slack-edge.com/T3V50P6MN-U01U95116HM-7b84859101f5-512"
    }
]
const peopleList = [
    ...poList,
    ...qaList,
    ...devopsList,
    ...beList,
    ...feList,
];
// ---------

const peopleListElement = document.getElementById("peopleList");
const timerElement = document.getElementById("timer");
const buttonNextElement = document.getElementById("buttonNext");
const buttonStartElement = document.getElementById("start");
const userNameElement = document.getElementById("userName");
const timerWrapperElement = document.getElementById("timerRounded");
const timeInputElement = document.getElementById("timeInput");

const ALERT_CLASS_NAME = "blob-red";
const ALERT_CLASS_NAME_SUPER = "blob-red-super";

let timeTracker = USER_TIME;
let inputedTime = USER_TIME;
let selectedPerson = peopleList[0];
let hasBeenStarted = false;

const getTime = (seconds) => {
    if (TIMER_MODE === TIMER_MODES.manual) {
        return seconds > 0 ? seconds - 1 : 0;
    }
};

const setTimer = () => {
    timeTracker = inputedTime;
    timerElement.innerHTML = inputedTime;
};

const checkAlert = () => {
    if (timeTracker > CRITICAL_TIME) {
        timerWrapperElement.classList.remove(ALERT_CLASS_NAME);
        timerWrapperElement.classList.remove(ALERT_CLASS_NAME_SUPER);
    } else if(selectedPerson.special ){
        timerWrapperElement.classList.add(ALERT_CLASS_NAME_SUPER);
    } else {
        timerWrapperElement.classList.add(ALERT_CLASS_NAME);
    }
};

const startTimer = () => {
    inputedTime = Number.parseInt(document.getElementById("timeInput").value);
    setTimer()
    if (!hasBeenStarted) {
        hasBeenStarted = true;
        countdown = setInterval(() => {
            const newTime = getTime(timeTracker);
            timerElement.innerHTML = newTime;
            timeTracker = newTime;
            checkAlert();
        }, 1000);
    } else {
        selectPerson(0);
    }
};

const assignEventListeners = () => {
    buttonNextElement.addEventListener("click", () => {
        selectNextPerson();
    });
    buttonStartElement.addEventListener("click", () => {
        startTimer();
    });
    // List element listeners
    let list = document.querySelectorAll("li");
    for (var i = 0; i < list.length; i++) {
        list[i].addEventListener("click", (e) => {
            selectPerson(e.target.id);
        });
    }
};

const generateList = () => {
    peopleList.forEach((person, i) => {
        const li = document.createElement("li");
        li.setAttribute("id", i);
        li.appendChild(document.createTextNode(person.name));
        peopleListElement.appendChild(li);
    });
};

const selectPerson = (personId) => {
    selectedPerson = peopleList[personId];
    const items = document.querySelectorAll("li");
    items.forEach((listItem) => {
        listItem.classList.remove("active");
    });
    items[personId].classList.add("active");
    userNameElement.innerHTML = selectedPerson.name;
    setTimer();
    if (selectedPerson.src) {
        timerWrapperElement.style.backgroundImage = `url(${selectedPerson.src})`;
    } else {
        timerWrapperElement.style.backgroundImage = "";
    }
};

const selectNextPerson = () => {
    const idOfCurrent = peopleList
        .map((i) => i.name)
        .indexOf(selectedPerson.name);
    const idOfNext = idOfCurrent === peopleList.length - 1 ? 0 : idOfCurrent + 1;
    selectPerson(idOfNext);
};

const setUpInputs = () => {
    timeInputElement.setAttribute("value", USER_TIME);
};

const init = () => {
    setUpInputs();
    generateList();
    selectPerson(0);
    assignEventListeners();
};

init();