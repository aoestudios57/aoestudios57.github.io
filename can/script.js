//intial references
const letterContainer =document.getElementById("letter-container");
const optionsContainer = document.getElementById("options-container");
const userinputSection = document.getElementById("user-input-section");
const newGameContainer = document.getElementById("new-game-container");
const newGameButton = document.getElementById("newgamebutton");
const canvas = document.getElementById("canvas");
const resultText = document.getElementById("result-text");

//Options values for buttons
let options = {
    fruits: [
        "Apple",
        "pineapple",
        "pomegranate",
        "watermelon",
    ],
    animals: ["Hedgehog", "Rhinoceros", "squirrel", "Panther", "Walrus", "Zebra"],
    countries: [
        "India",
        "Hunary",
        "Turkey",
        "Serbia",
        "Kyrgystan",
        "Zimbabwe",
        "Dominica",
    ],
};

//count
let winConut = 0;
let count = 0;

let chosenWord = "";

//Display option buttons
const displayOptions = () => {
    optionsContainer.innerHtml += '<h3>Please Select An option</h3>';
     let buttonCon = document.createElement("div");
     for (let value in options) {
        buttonCon.innerHTML += `<button class="options" onclick="generateWord('${value}')">${value}</button>`;
     }
     optionsContainer.appendChild(buttonCon);
    };

    //block all the Buttons
    const blocker = () => {
        let optionsButton = document.querySelectorAll(".options");
        let letterButton = document.querySelectorAll(".letters");
        //disable all options
        optionsButton.forEach((button) => {
            button.disabled = true;
        });

        //disable all letters
        letterButton.forEach((button) => {
        button.disabled = true;
 });

    //disable all letters
     letterButton.forEach((button) => {
      button.disabled.true;
   });
   newGameContainer.classList.remove("hide")
};

  //Word Generator
  const generateWord = (optionValue) => {
    let optionsButtons = document.querySelectorAll(".options");
    //if optionValur matches the button innerText then hightlight the button
    optionsButtons.forEach((button) => {
        if (button.innerText.toUpperCase() === optionValue) {
            button.classList.add("active");
        }
        button.disabled = true;
    });
       //initially hide letters, clear previous word
       letterContainer.classList.remove("hide");
       userinputSection.options[optionValue];
       //chosse random word
      chosenWord = optionArray[Math.floor(Math.random() * optionArray.length)];
       chosenWord =  chosenWord.toUpperCase();

       //replace every letter with span containing dash
       let displayitem = chosenWord.replace(/./g, `<span class="dashes">_</span>`);
       
       //Display each element as span
       userinputSection.innerHTML = displayitem
    };

    //initial Funkition (Called when page Loads/user presses new game)
    const initializer = () => {
        winConut = 0;
        count = 0;

        //Initially erase all content and hide letteres and new game button
        userinputSection.innerHTML = "";
        optionsContainer.innerHTML = "";
        letterContainer.classList.add("hide");
        newGameContainer.classList.add("hide");
        letterContainer.innerHTML = "";

        //For creating letter buttons
        for (let i = 65; i < 91; i ++) {}
        let button = document.createElement("button");
        button.classList.add("letters");
        //Number to ASCII[A-Z]
        button.innerText = String.fromCharCode(i);
        //character button click
        button.addEventListener( "click", () => {
            let charArray = chosenWord.split("");
            let dashes = document.getElementByIdClassName("dashes");
            //if array contains clicked value repalce the matched dash with letter else dram on canvas
            if (charArray.includes(button.innerText)) {
                charArray.forEach((char, index) => {
        //if character in array is same as clicked button
        if (char === button.innerText) {
            //replace dash with letter
            dashes[index].innerText = char;
            //increment counter
            winConut += 1;
            //if winCount equals word lenfth
            if (winConut == charArray.length) {
                resultText.innerHTML = `<h2 class='win msg'>You win!!</h2><p>The word was <span>${chosenWord}</span></p>`;
                //block all buttons 
                blocker();
               }  
            }
        });
    } else {
        //lose count
        count += 1;
        //for drawing man
        drawMan(count);
        //Count==6 because head,body,leftarm, right arm, left leg, right leg
        if(count== 6) {
         resultText.innerHTML = `<h2 class='lose-msg'> Game Over!!</h2><p>The word was <span>${chosenWord}</span></p>`;
            blocker();
        }
    }
    //disable clicked button
    button.disabled = true;
   });
    letterContainer.append(button);
    }
    displayOptions();
    //Call to canvas Crator (for claring previous canvas and creating initial canvas)
    let canvasCreatorObj = canvasCreator();
const drawMan :(count); => {
    let { head, body, leftArm, rightArm, leftLeg, rightLeg } = canvasCreatorObj;
    // ...
};

    
    //canvas
    const canvasCreator = () => {
        let context = canvas.getContext("2d");
        context.beginPath();
        context.strokeStyle = "#000";
        context.linewidth = 2;

        //For drawing Lines
        const drawLine = (fromX, fromY, tox, toy) => {
            context.moveTo( fromX, fromY);
            context.lineTo(tox, toy);
            context.stroke();
        };

     const head = () => {
        context.beginPath();
        context.arc(70, 30, 10, 0, Math.PI * 2, true);
        context.stroke();
    };

    const body = () => {
        drawLine(70, 40, 70, 80);
    };

    const leftArm = () => {
        drawLine(70, 50, 50, 70);
    };

    const rightArm = () => {
        drawLine(70, 50, 50, 70);
    };

    const leftLeg = () => {
        drawLine(70, 80, 50, 110);
    };

    const rightLeg = () => {
        drawLine(70, 80, 90, 110);
    };

    //initial frame 
    const initalDrawing= () => {
        //clear canvas
        context.clearRect(0, 0, context.canvas.width, context.canvas.height);
        //bottom Line
        drawLine(10, 130, 130, 130);
        //left Line
        drawLine(10, 10, 10, 131);
        //top Line
        drawLine(10, 10, 70, 10);
        //small top Line
        drawLine(70, 10, 70, 20);
    };

    return{ initalDrawing, head, body, leftArm, rightArm, leftLeg, rightLeg};
};

//draw the man
const drawMan = (count) =>{
    let{head, body, leftArm, rightArm, leftLeg, rightLeg } =  canvasCreator() ;
    switch (count) {
        case 1:
      head();
        break;
            case 2:
                body();
                break;
                case 3:
                    leftArm();
                    break;
                    case 4:
                        rightArm();
                        break;
                        case 5:
                            leftLeg();
                            break;
                            case 6:
                                rightLeg();
                                break;
                                default:
                                    break;
                                }
                            };
                            
            //New Game
            newGameButton.addEventListener("click", initializer);
            window.onload = initializer;
