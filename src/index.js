const TIMER_MODES = {
    manual: "manual",
    auto: "auto"
};
const USER_ROLES = {
    po: {
        id: "po",
        color: "background-image: linear-gradient(to right, rgba(202, 197, 49, 0.3), rgba(243, 249, 167, 0.3));"
    },
    qa: {
        id: "qa",
        color: "background-image: linear-gradient(to right, rgba(17, 153, 142, 0.3), rgba(56, 239, 125, 0.3));"
    },
    devops: {
        id: "devops",
        color: "background-image: linear-gradient(to right, rgba(195, 20, 50, 0.3), rgba(36, 11, 54, 0.3));"
    },
    be: {
        id: "be",
        color: "background-image: linear-gradient(to right, rgba(252, 74, 26, 0.3), rgba(247, 183, 51, 0.3));"
    },
    fe: {
        id: "fe",
        color: "background-image: linear-gradient(to right, rgba(127, 127, 213, 0.3), rgba(134, 168, 231, 0.3), rgba(145, 234, 228, 0.3));"
    }
};

const audio = new Audio('./assets/sound-default.mp3');
audio.volume = 0.1;

//--You can control the variables in this area
const USER_TIME = 35; // In Seconds, set how long can one person speak
const TIMER_MODE = TIMER_MODES.manual;
// Set how many people there are
const CRITICAL_TIME = 10; // When should bubble start pulsating
const poList = [
    {
        name: "Marius L",
        src: "https://ca.slack-edge.com/T3V50P6MN-U01JM1WK7CL-fe9d4e25a0b9-512",
        role: USER_ROLES.po.id
    }, {
        name: "Egle G",
        src: "https://ca.slack-edge.com/T3V50P6MN-U04EQHA42A1-81572d1ed831-512",
        role: USER_ROLES.po.id
    }, {
        name: "Kateryna S",
        src: "https://ca.slack-edge.com/T3V50P6MN-U02L7J93J31-2ac80b461a65-512",
        role: USER_ROLES.po.id
    },
    {
        name: "Anastassia K",
        src: "https://ca.slack-edge.com/T3V50P6MN-U04ELTH7E5U-277d5adf4f59-512",
        role: USER_ROLES.po.id
    }
]
const qaList = [
    {
        name: "Eglė K",
        src: "https://ca.slack-edge.com/T3V50P6MN-U030J8TJ804-89ee2a84179d-512",
        role: USER_ROLES.qa.id
    }, {
        name: "Ieva M",
        src: "https://ca.slack-edge.com/T3V50P6MN-U03HKLJ77M5-f59b45a6ea0f-512",
        role: USER_ROLES.qa.id
    }, {
        name: "Dainius U",
        src: "https://ca.slack-edge.com/T3V50P6MN-U04ER7T7B8T-5561babf3ae3-512",
        role: USER_ROLES.qa.id
    }
]
const devopsList = [
    {
        name: "Evaldas M",
        src: "https://ca.slack-edge.com/T3V50P6MN-U04DBD1FTC7-3610e75d0a00-512",
        role: USER_ROLES.devops.id
    }
]
const beList = [
    {
        name: "Sandra K",
        src: "https://ca.slack-edge.com/T3V50P6MN-U03521389MM-ga30b025d858-512",
        role: USER_ROLES.be.id
    },
    {
        name: "Marius M",
        src: "https://ca.slack-edge.com/T3V50P6MN-U047UEB9DPA-f08a3538e3af-512",
        role: USER_ROLES.be.id
    },
    {
        name: "Antanas K",
        src: "https://ca.slack-edge.com/T3V50P6MN-U02C15PCVEF-4253f19273d1-512",
        role: USER_ROLES.be.id
    },
    {
        name: "Gintaras A",
        src: "https://ca.slack-edge.com/T3V50P6MN-U03E2LQBZJM-357ba2a6e29d-512",
        role: USER_ROLES.be.id
    },
    {
        name: "Matas D",
        special: true,
        src: "https://ca.slack-edge.com/T3V50P6MN-U02B75EKXPY-bb3291c1df7b-512",
        role: USER_ROLES.be.id
    },
    {
        name: "Tautvydas K",
        src: "https://ca.slack-edge.com/T3V50P6MN-U03DH29FN4E-b37acca90c5e-512",
        role: USER_ROLES.be.id
    },
    {
        name: "Vitas M",
        src: "https://ca.slack-edge.com/T3V50P6MN-U03DEUZ4JCQ-6fbd63f42e9a-512",
        role: USER_ROLES.be.id
    },
    {
        name: "Vytenis G",
        src: "https://ca.slack-edge.com/T3V50P6MN-U01M3R1EK6J-be3057d7eb98-512",
        role: USER_ROLES.be.id
    }
]
const feList = [
    {
        name: "Andrius S",
        src: "https://ca.slack-edge.com/T3V50P6MN-U024V4GJLP8-15d3677005f8-512",
        role: USER_ROLES.fe.id
    },
    {
        name: "Edmundas R",
        src: "https://ca.slack-edge.com/T3V50P6MN-UL0T363S4-1a3f3ec2baea-512",
        role: USER_ROLES.fe.id
    },
    {
        name: "Karolis K",
        src: "https://ca.slack-edge.com/T3V50P6MN-U019KV9PSTG-1218550f2afe-512",
        role: USER_ROLES.fe.id
    },
    {
        name: "Lukas L",
        src: "https://ca.slack-edge.com/T3V50P6MN-U01U95116HM-7b84859101f5-512",
        role: USER_ROLES.fe.id
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
const userCardElement = document.getElementById("userCard");

const soundInputElement = document.getElementById("soundInput");
const colorsInputElement = document.getElementById("colorsInput");
const imagesInputElement = document.getElementById("images");

const ALERT_CLASS_NAME = "blob-red";
const ALERT_CLASS_NAME_SUPER = "blob-red-super";

const imageValues = {
    cats: 'cats',
    cats2: 'cats2',
    corgis: 'corgis',
    animals: 'animals',
    bears: 'bears',
    random: 'random',
}

let timeTracker = USER_TIME;
let inputedTime = USER_TIME;
let selectedPerson = peopleList[0];
let hasBeenStarted = false;
let soundPlayed = false;
let isSoundEnabled = soundInputElement.checked;
let areColorsEnabled = colorsInputElement.checked;
let imagesOption = imagesInputElement.value;

soundInputElement.addEventListener('change', function () {
    isSoundEnabled = this.checked
});
colorsInputElement.addEventListener('change', function () {
    areColorsEnabled = this.checked
});
imagesInputElement.addEventListener('change', function () {
    imagesOption = this.value
});


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
    } else if (selectedPerson.special) {
        timerWrapperElement.classList.add(ALERT_CLASS_NAME_SUPER);
    } else {
        timerWrapperElement.classList.add(ALERT_CLASS_NAME);
    }
};

const controlSound = (secLeft) => {
    if (secLeft === 0) {
        if (isSoundEnabled && !soundPlayed) {
            audio.play();
            soundPlayed = true;
        }
    }
}

const startTimer = () => {
    inputedTime = Number.parseInt(document.getElementById("timeInput").value);
    selectPerson(0);
    setTimer()
    if (!hasBeenStarted) {
        hasBeenStarted = true;
        countdown = setInterval(() => {
            const newTime = getTime(timeTracker);
            timerElement.innerHTML = newTime;
            timeTracker = newTime;
            checkAlert();
            controlSound(newTime)
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

const getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const getRandomString = () => (Math.random() + 1).toString(36).substring(7);

const selectPerson = (personId) => {
    selectedPerson = peopleList[personId];
    const items = document.querySelectorAll("li");
    items.forEach((listItem) => {
        listItem.classList.remove("active");
    });
    items[personId].classList.add("active");
    userNameElement.innerHTML = selectedPerson.name;
    setTimer();
    if (imagesOption === imageValues.cats) {
        timerWrapperElement.style.backgroundImage = `url(https://loremflickr.com/${getRandomInt(150,180)}/${getRandomInt(150,180)}?${getRandomString()})`;
    }
    if (imagesOption === imageValues.cats2) {
        timerWrapperElement.style.backgroundImage = `url(http://placekitten.com/${getRandomInt(150,180)}/${getRandomInt(150,180)}?${getRandomString()})`;
    }
    if (imagesOption === imageValues.animals) {
        timerWrapperElement.style.backgroundImage = `url(http://placeimg.com/${getRandomInt(150,180)}/${getRandomInt(150,180)}/animals?${getRandomString()})`;
    }
    if (imagesOption === imageValues.corgis) {
        timerWrapperElement.style.backgroundImage = `url(http://placedog.net/${getRandomInt(150,180)}/${getRandomInt(150,180)}?${getRandomString()})`;
    }
    if (imagesOption === imageValues.bears) {
        timerWrapperElement.style.backgroundImage = `url(https://placebear.com/${getRandomInt(150,180)}/${getRandomInt(150,180)}?${getRandomString()})`;
    }
    if (imagesOption === imageValues.random) {
        timerWrapperElement.style.backgroundImage = `url(https://picsum.photos/${getRandomInt(150,180)}/${getRandomInt(150,180)}?${getRandomString()})`;
    }
    if(!imagesOption) {
        if (selectedPerson.src) {
            timerWrapperElement.style.backgroundImage = `url(${selectedPerson.src})`;
        } else {
            timerWrapperElement.style.backgroundImage = "";
        }
    }

    manageColors();
};

const scrollToElement = (liId) => {
    const element = peopleListElement.getElementsByTagName('li')[liId]
    element.scrollIntoView({behavior: 'auto' /*or smooth*/, block: 'center'});
}

const manageColors = () => {
    if (areColorsEnabled && USER_ROLES[selectedPerson.role] && USER_ROLES[selectedPerson.role].color) {
        userCardElement.style = USER_ROLES[selectedPerson.role].color
    } else {
        userCardElement.style = '';
    }
}

const selectNextPerson = () => {
    const idOfCurrent = peopleList
        .map((i) => i.name)
        .indexOf(selectedPerson.name);
    const idOfNext = idOfCurrent === peopleList.length - 1 ? 0 : idOfCurrent + 1;
    selectPerson(idOfNext);
    scrollToElement(idOfNext);

    manageColors();
    soundPlayed = false;
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
