// Taken from /design 27/11 9:20

// index pour évitera un méga boucle
let currentId = 0;
const btn = document.querySelector(".next");
const btnNextQuestion = document.querySelector("#nextQuestion");

// set de fonctions qui gèrent le drag and drop
// pour les options à drag
function allowDrop(ev) {
  ev.preventDefault();
  //need car par défaut on peut pas drop sur un autre élem
}
function drag(ev) {
  ev.dataTransfer.setData("text", ev.target.id);
}
function drop(ev) {
  const data = ev.dataTransfer.getData("text");
  ev.target.appendChild(document.getElementById(data));
  // console.log(ev.target.appendChild(document.getElementById(data)).innerHTML);
  // recup la réponse utilisateur par ce biais ??
}

// fonction qui s'occupe exclusivement de l'affichage
function createCodeQuestions(arr) {
  let answer;
  let question = "";
  question += "<div class='question'>" + arr[currentId]["question"] + "</div>";
  answer = `<div class='${arr[currentId].type}'>`;
  
  if (arr[currentId]["type"] === "reponse-choixMultiple") {
    for (let j = 0; j < arr[currentId]["reponses"].length; j++) {
      answer += `<input type="radio" class="choix" id='${arr[currentId].id}' name='${arr[currentId].id}' data-index='${arr[currentId].id}' value='${arr[currentId]["reponses"][j]}'><label for='option'>${arr[currentId]["reponses"][j]}</label>`;
    }
  } else if (arr[currentId]["type"] === "reponse-open") {
    answer += `${arr[currentId].remaining[0]}<input id='input' type='text' data-index='${arr[currentId].id}'>${arr[currentId].remaining[1]}`;
  } else if (arr[currentId]["type"] === "reponse-drag") {
    
    for (let k = 0; k < arr[currentId]["choices"].length; k++) {
      // créa d'un container pour flex les options ??
      // zone des éléments à drag
      answer += `<li id="dragdrop${k}" class="option" draggable="true" ondragstart="drag(event)">${arr[currentId]["choices"][k]}</li>`;
    }

    answer += `<div class="span">`;

    for (let l = 0; l < arr[currentId]["tofill"].length; l++) {
      // zone des espaces où drop
      answer += `<br><span id="blank" ondrop="drop(event)" ondragover="allowDrop(event)">${arr[currentId]["tofill"][l]}</span>`;
    }

    answer += `</div>`;

  }

  answer += `<div id="output"></div></div>`;
  question += answer;
  questions_container.innerHTML = question;
}


function checkAnswer(level, playerInput=null) // out_consoleOutput won’t work, gonna have to fill the HTML directly here
{
    const co = document.querySelector("#output");
    console.log(level);
    
    if (level.type == "reponse-open")
    {
      if (playerInput == null) playerInput = document.querySelector("#input").value;
        // Assemble the code to send to the interpreter
        var skulptInput = ""
        for (i=0; i<level.remaining.length; i++)
        {
            if (level.remaining[i] == "")
                skulptInput += playerInput;
            else
                skulptInput += level.remaining[i];
        }

        let variablesValues = null;
        if (level.variables != null)
            variablesValues = JSON.parse(JSON.stringify(level.variables));

        consoleOutput = skulpt(skulptInput, variablesValues);
        co.innerHTML = consoleOutput;

        // Check if the result is what we expect
        if (level.reponse != null)
        {
            if (playerInput != level.reponse) {
                console.log("Player input isn’t what was expected");
                return false;
            }
        }
        if (level.renduconsole != null)
        {
            if (consoleOutput != level.renduconsole) {
                console.log("Console output isn’t what we expected");
                return false;
            }
        }
        if (level.variables != null)
        {
            console.log("Warning: Variables check hasn’t been tested yet");
            for (i=0; i<variables.length; i++)
            {
                if(variablesValues[i].value != level.variables[i].value) {
                    console.log("Variable " + level.variablesValues[i].name + " isn’t what we expected");
                    return false;
                }       
            }
        }
        return true;
    }
    else if (level.type="reponse-choixMultiple")
    {
      if (playerInput==null)
        playerInput=document.querySelector('input[type="radio"]:checked').value;
        console.log(playerInput);
        console.log(level.bonreponse);
      if (playerInput != level.bonreponse)
      { 
        co.innerHTML = "Mauvaise réponse :( Réessayez.";
        return false;
      } else {
        co.innerHTML = "Bravo :)";
        return true;}
      
      
    
    }   
    else
    {
      console.error("Invalid question type");
    } 
}

const questions_container = document.querySelector(".questions_container");
// on gère apd ici ce qu'il se passe au clic du bouton
btn.addEventListener("click", function () {
  console.log(questionsReponses);
  if(checkAnswer(questionsReponses[currentId])){
    btnNextQuestion.style.visibility = "visible";
    btn.style.visibility = "hidden";
  }
  
});
    btnNextQuestion.addEventListener("click", function(){
      goToNext(questionsReponses);
      btn.style.visibility = "visible";
      btnNextQuestion.style.visibility = "hidden";
    });


createCodeQuestions(questionsReponses);

// fonction de passage à la question suivante
function goToNext(arr) {
  console.log(arr);
  currentId++;
  if (currentId >= arr.length) {
    questions_container.innerHTML = "<p style='text-align: center; font-size: xx-large;'>Merci d'avoir participé à notre quizz !</p>";
    questions_container.innerHTML += "<img style='height: 400px; width: 400px;' src='Pablit.svg'/>";
    btn.style.display = "none";
  } else {
    createCodeQuestions(arr);
  }
}
