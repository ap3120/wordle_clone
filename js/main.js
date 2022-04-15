document.addEventListener("DOMContentLoaded", () =>{
    createSquares();
    
    let guessedWords = [[]];
    let availableSpace = 1;
    let word="hello";
    let guessedWordCount = 0;
    let canDeleteLetter = true;

    const keys = document.querySelectorAll(".keyboard-row button");

    function getCurrentWordArr() {
        const numberOfGuessedWords = guessedWords.length;
        return guessedWords[numberOfGuessedWords-1];
    }

    function updateGuessedWords(letter) {
        const currentWordArr = getCurrentWordArr();

        if(currentWordArr && currentWordArr.length<5){
            currentWordArr.push(letter);

            const availableSpaceEl = document.getElementById(String(availableSpace));
            availableSpace = availableSpace + 1;
            availableSpaceEl.textContent = letter;
        }
    }

    function getTileColor(letter, index) {
        const isCorrectLetter = word.includes(letter);
        if (isCorrectLetter){
            const letterInThatPosition = word.charAt(index);
            const IsCorrectPosition = letter === letterInThatPosition;
            if (IsCorrectPosition){
                return "rgb(83,141,78)";
            }
            return "rgb(181,159,59)";
        }
        
        return "rgb(58,58,60)";
    }


    function handleSubmitWord(){
        const currentWordArr=getCurrentWordArr();
        if (currentWordArr.length !==5){
            window.alert("Word must be 5 letters");
            return;
        }
        canDeleteLetter = false;
        const currentWord = currentWordArr.join("");
        const firstLetterId = guessedWordCount * 5 + 1;
        const interval = 200;
        currentWordArr.forEach((letter, index)=>{
            setTimeout(()=>{
                const tileColor=getTileColor(letter, index);
                const letterId = firstLetterId + index;
                const letterEl = document.getElementById(letterId);
                letterEl.classList.add("animate__flipInX");
                letterEl.style = `background-color:${tileColor};border-color:${tileColor}`;
            }, interval * index)
        });

        guessedWordCount+=1;

        if (currentWord === word){
            window.alert("Congratulation!");
        }
        guessedWords.push([]);

        if (guessedWords.length ===7){
            window.alert(`Sorry, you have no more guesses, the word is ${word}`);
        }
    }
    function handleDeleteLetter(){
        const currentWordArr=getCurrentWordArr();
        if(currentWordArr.length ===0){
            return;
        }
        const removedLetter = currentWordArr.pop();
        guessedWords[guessedWords.length-1] = currentWordArr;
        const lastLetterEl = document.getElementById(String(availableSpace-1));
        lastLetterEl.textContent='';
        availableSpace = availableSpace - 1; 
    }
    function createSquares(){
        const gameBoard = document.getElementById("board");
        for (let index=0;index<30;index++) {
            let square = document.createElement("div");
            square.classList.add("square");
            square.classList.add("animate__animated");
            square.setAttribute("id", index+1);
            gameBoard.appendChild(square);
        }
    }

    for (let i = 0;i<keys.length;i++) {
        keys[i].onclick = ({target})=>{
            const letter = target.getAttribute("data-key");
            if (letter === 'enter'){
                handleSubmitWord();
                console.log(guessedWords,canDeleteLetter);
                return;
            }
            if (letter ==='del'){
                if(canDeleteLetter === true){
                    handleDeleteLetter();
                }
                console.log(guessedWords, canDeleteLetter);
                return;
            }
            updateGuessedWords(letter);
            canDeleteLetter = true;
            console.log(guessedWords,canDeleteLetter);
        };
    }
});
