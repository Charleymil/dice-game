// Тоглоомын бүх газарт ашиглагдах глобаль хувьсагчдыг энд зарлая
// Тоглоом дууссан эсэхийг хадгалах төлөвийн увьсагч
var isNewGame;
// Аль тоглогч шоо шидэх вэ гэдгийг энд хадгална.
var activePlayer;

// Хоёр тоглогчийн цуглуулсан оноонууд
var scores;

//  Идэвхитэй тоглогчийн цуглуулж байгаа ээлжийн оноо.
var roundScore;

// Шооны зургыг үзүүлэх элементийг DOM-оос хайж олоод энд хадгалъя
var diceDom = document.querySelector(".dice");

//Тоглоомыг эхлүүлнэ.
initGame();

// Тоглоом шинээр эхлэхэд бэлтгэнэ.
function initGame() {
    // Тоглоом эхэллээ гэдэг төлөвт оруулна.
    isNewGame = true;
    // Тоглогчийн ээлжийг хадгалдах хувьсагч, нэгдүгээр тоглогчийг 0, хоёрдугаар тоглогчийг 1 гэж тэмдэглэе.
    activePlayer = 0;

    // Тоглолгчдын цуглуулсан оноог хадгалах хувьсагч
    scores = [0, 0];


    // Тоглогчийн ээлжиндээ цуглуулж байгаа оноог хадгалах хувьсагч 
    roundScore = 0;

    //Програм эхлэхэд бэлтгэе
    window.document.getElementById("score-0").textContent = "0";
    window.document.getElementById("score-1").textContent = "0";
    window.document.getElementById("current-0").textContent = "0";
    window.document.getElementById("current-1").textContent = "0";

    // Тоглогчдын нэрийг буцааж гаргах
    document.getElementById("name-0").textContent = "player 1";
    document.getElementById("name-1").textContent = "player 2";

    document.querySelector(".player-0-panel").classList.remove("winner");
    document.querySelector(".player-1-panel").classList.remove("winner");

    document.querySelector(".player-0-panel").classList.remove("winner");
    document.querySelector(".player-1-panel").classList.remove("winner");

    document.querySelector(".player-0-panel").classList.add("active");

    diceDom.style.display = "none";
}
// Шоог шидэх эвент листенер
document.querySelector(".btn-roll").addEventListener("click", function() {
    if(isNewGame) {
        // 1 - 6 доторх санамсаргүй нэг тоо гаргаж авна.
        var diceNumber = Math.floor(Math.random() * 6) + 1;

        // Шооны зургийг вэб дээр гараж ирнэ.
        diceDom.style.display = "block";

        // Буусан санамсаргүй тоонд харгалзах шооны зургийг вэб дээр гаргаж ирнэ.
        diceDom.src = "dice-" + diceNumber + ".png";

        // Буусан тоо нь 1 ээс ялгаатай бол идэвхитэй тоглогчийн ээлжийн оноог өөрчилнө. 
        if(diceNumber !== 1) {
            // 1-ээс ялгаатай тоо буулаа.  Буусан тоог тоглогчид нэмж өгнө.
            roundScore = roundScore + diceNumber;
            document.getElementById("current-" + activePlayer).textContent = roundScore;
        } else {
            // 1 буусан тул тологчийн ээлжийг энэ хэсэгт сольж өгнө.
            switchToNextPlayer();
        }
    } else {
        alert("Тоглоом дууссан байна. NEW GAME товчийг дарж шинээр эхлэнэ үү")
    }
});

// HOLD товчны эвент листенер
document.querySelector(".btn-hold").addEventListener("click", function() {
    if(isNewGame) {
        //Уг тоглогчийн цуглуулсан ээлжний оноог глобаль оноон дээр нь нэмж өгнө.
        scores[activePlayer] = scores[activePlayer] + roundScore;

        // Дэлгэц дээр оноог нь өөчилнө
        document.getElementById("score-" + activePlayer).textContent = scores[activePlayer];

        // Уг тоглогч хожсон эсэхийг (оноо нь 100-с их эсэх) шалгах
        if(scores[activePlayer] >= 100) {
            // Толоомыг дууссан төлөвт оруулна
            isNewGame = false;

            // Ялагч гасан техтийг нэрний оронд гаргана
            document.getElementById("name-" + activePlayer).textContent = "WINNER!!!";
            document.querySelector(".player-" + activePlayer + "-panel").classList.add("winner");
            document.querySelector(".player-" + activePlayer + "-panel").classList.remove("active");
        } else {
            // Тоглогчийн ээлжийг солино.
            switchToNextPlayer();
        }
    } else {
        alert("Тоглоом дууссан байна. NEW GAME товчийг дарж шинээр эхлэнэ үү")
    }
});

// Энэ функц нь тоглох ээлжийг дараачийн тоглогчруу шилжүүлнэ
    function switchToNextPlayer() {
        // Энэ тоглогчийн ээлжиндээ цуглуулсан оноог 0 болгоно.
        roundScore = 0;
        document.getElementById("current-" + activePlayer).textContent = 0;

        // Тоглогчийн ээлжийг нөгөө тоглогч руу шилжүүлнэ.
        activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);

        document.querySelector(".player-0-panel").classList.toggle("active");
        document.querySelector(".player-1-panel").classList.toggle("active");

        // Шоог түр алга болгоно.
        diceDom.style.display = "none";
    }


// New game буюу Шинэ тоглоом элүүлэх товчны эвент листенер
document.querySelector(".btn-new").addEventListener("click", initGame);
