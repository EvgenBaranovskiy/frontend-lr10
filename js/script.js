
const stickers =
{
    0: {
        name: "apple",
        path: "./img/apple.png",
    },
    1: {
        name: "banana",
        path: "./img/banana.png",
    },
    2: {
        name: "cherry",
        path: "./img/cherry.png",
    },
    3: {
        name: "limon",
        path: "./img/limon.png",
    },
    4: {
        name: "strawberry",
        path: "./img/strawberry.png",
    },
    length: 5,
}

//Гравець 
let player = {
    name: 'player',
}

//Ініціалізація колонок стікерами
let leftCol = {
    stickers: [],
};

let middleCol = {
    stickers: [],
};

let rightCol = {
    stickers: [],
};

for (let i = 0; i < stickers.length; i++) {
    leftCol.stickers.push(stickers[i]);
    middleCol.stickers.push(stickers[i]);
    rightCol.stickers.push(stickers[i]);
}
moveStickers(middleCol);
moveStickers(rightCol);
moveStickers(rightCol);

let IsButtonEnabled = true;
let currentStep = 0;

document.addEventListener("DOMContentLoaded", () => {
    player.name = prompt("Введіть ім'я: ");
    if (player.name == null || !isValidName(player.name)) {
        alert("Розмір ім'я повинен бути від 1 до 18 символів!");
        window.location.reload();
    }
    else {
        document.getElementById('player-name').innerText = player.name;
    }

    updateCells();

    //Обробка події кліку на кнопку 
    document.getElementById("generate-btn").addEventListener("click", () => {
        if (IsButtonEnabled) {
            disableButton();
            hideWin();
            updateStatus();
            generate();
        }
    });

    //Обробка завершення генерації ячейок
    document.addEventListener('cellsGenerated', () => {
        enableButton();
        if (isWin()) {
            disableButton();
            showWin();
            document.getElementById("current-stage").innerText = "ПЕРЕМОГА!";
            currentStep = 0;
            setTimeout(() => { enableButton(); }, 3000);
        } else if (currentStep == 3) {
            document.getElementById("current-stage").innerText = "Програш!";
        }
    });

    function generate() {
        const offset1 = Math.floor(Math.random() * 3) + 5;
        const offset2 = Math.floor(Math.random() * 3) + 5;
        const offset3 = Math.floor(Math.random() * 3) + 5;

        let biggerOffset = offset1 > offset2 ? offset1 : offset2;
        biggerOffset = biggerOffset > offset3 ? biggerOffset : offset3;

        for (let i = 1; i < biggerOffset; i++) {
            setTimeout(() => {
                if (i < offset1) {
                    moveStickers(leftCol);
                }

                if (i < offset2) {
                    moveStickers(middleCol);
                }

                if (i < offset3) {
                    moveStickers(rightCol);
                }
                updateCells();

                if (i == biggerOffset - 1) {
                    document.dispatchEvent(new Event('cellsGenerated'));//Подія коли генерація для всіх ячейок завершенна
                }
            }, i * 100);
        }
    }

    function showWin() {
        document.getElementById("slots").style.background = "linear-gradient(0deg, rgba(0,0,0,1) 0%, rgba(255,0,245,1) 50%, rgba(0,0,0,1) 100%)";
        //    box-shadow: #49ff41 -7px 5px 20px, #44ff41 7px -5px 20px;
        let col1 = document.getElementById("slots").getElementsByClassName("slot-col")[0];
        col1.getElementsByClassName("cell")[1].style.boxShadow = '#49ff41 -7px 5px 20px, #44ff41 7px -5px 20px';
        let col2 = document.getElementById("slots").getElementsByClassName("slot-col")[1];
        col2.getElementsByClassName("cell")[1].style.boxShadow = '#49ff41 -7px 5px 20px, #44ff41 7px -5px 20px';
        let col3 = document.getElementById("slots").getElementsByClassName("slot-col")[2];
        col3.getElementsByClassName("cell")[1].style.boxShadow = '#49ff41 -7px 5px 20px, #44ff41 7px -5px 20px';
    }

    function hideWin() {
        document.getElementById("slots").style.background = "linear-gradient(0deg, rgba(0,0,0,1) 0%, rgba(255,255,255,1) 50%, rgba(0,0,0,1) 100%)";
        let col1 = document.getElementById("slots").getElementsByClassName("slot-col")[0];
        col1.getElementsByClassName("cell")[1].style.boxShadow = '';
        let col2 = document.getElementById("slots").getElementsByClassName("slot-col")[1];
        col2.getElementsByClassName("cell")[1].style.boxShadow = '';
        let col3 = document.getElementById("slots").getElementsByClassName("slot-col")[2];
        col3.getElementsByClassName("cell")[1].style.boxShadow = '';
    }

    //Відобразити поточі ячейки відповідно позицій на автоматі
    function updateCells() {
        //col1
        let col1 = document.getElementById("slots").getElementsByClassName("slot-col")[0];
        col1.getElementsByClassName("cell")[0].style.backgroundImage = 'url(' + leftCol.stickers[0].path + ')';
        col1.getElementsByClassName("cell")[1].style.backgroundImage = 'url(' + leftCol.stickers[1].path + ')';
        col1.getElementsByClassName("cell")[2].style.backgroundImage = 'url(' + leftCol.stickers[2].path + ')';
        //col2
        let col2 = document.getElementById("slots").getElementsByClassName("slot-col")[1];
        col2.getElementsByClassName("cell")[0].style.backgroundImage = 'url(' + middleCol.stickers[0].path + ')';
        col2.getElementsByClassName("cell")[1].style.backgroundImage = 'url(' + middleCol.stickers[1].path + ')';
        col2.getElementsByClassName("cell")[2].style.backgroundImage = 'url(' + middleCol.stickers[2].path + ')';
        //col3
        let col3 = document.getElementById("slots").getElementsByClassName("slot-col")[2];
        col3.getElementsByClassName("cell")[0].style.backgroundImage = 'url(' + rightCol.stickers[0].path + ')';
        col3.getElementsByClassName("cell")[1].style.backgroundImage = 'url(' + rightCol.stickers[1].path + ')';
        col3.getElementsByClassName("cell")[2].style.backgroundImage = 'url(' + rightCol.stickers[2].path + ')';
    }

    function disableButton() {
        console.log(1);
        document.getElementById("generate-btn").style.background = "darkgreen";
        document.getElementById("generate-btn").style.boxShadow = "inset 0 0 10px black";
        document.getElementById("generate-btn").style.color = "black";
        IsButtonEnabled = false;

    }

    function enableButton() {
        document.getElementById("generate-btn").style.background = "linear-gradient(0deg, rgba(34,195,88,1) 0%, rgba(87,253,45,1) 100%)";
        document.getElementById("generate-btn").style.boxShadow = "3px 3px 10px black";
        IsButtonEnabled = true;
    }

    //Перевірка на перемогу - три однакові стікера
    function isWin() {
        return (leftCol.stickers[1].name == middleCol.stickers[1].name && leftCol.stickers[1].name == rightCol.stickers[1].name);
    }

    function updateStatus() {

        currentStep++;

        if (currentStep > 3)
            currentStep = 1;

        switch (currentStep) {
            case 1:
                document.getElementById("current-stage").innerText = "Спроба 1 з 3";
                break;
            case 2:
                document.getElementById("current-stage").innerText = "Спроба 2 з 3";
                break;
            case 3:
                document.getElementById("current-stage").innerText = "Спроба 3 з 3";
                break;
            default:
                document.getElementById("current-stage").innerText = "Почніть гру!";
        }
    }
});


//Функція яка зміщує на 1 масив стікерів у колонці
function moveStickers(col) {
    let output = [];
    output[0] = col.stickers[stickers.length - 1];
    for (let i = 1; i < stickers.length; i++) {
        output[i] = col.stickers[i - 1];
    }
    col.stickers = output;
}

function isValidName(name) {
    const trimmedName = name.trim();
    return trimmedName.length > 0 && trimmedName.length <= 18;
}