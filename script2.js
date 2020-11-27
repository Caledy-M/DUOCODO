const questionsReponses = [
  {
    id: 0,
    type: "reponse-open",
    question: "Entrez la fonction qui permet d'afficher dans la console: ",
    reponse: "print",
    renduconsole: "Hello World",
    // phrase complète print("Hello World")
    remaining: ["", '("Hello World")'],
  },
  {
    id: 1,
    question: "la quelle de ces propostions est une string?",
    reponses: ["&lt;hello&gt;", "/hey/", "[hallo]", "&apos;yo&apos;"],
    bonreponse: "&apos;yo&apos;",
    type: "reponse-choixMultiple",
  },
  {
    id: 2,
    question:
      "Complètez la ligne de commande pour afficher cinq fois le mot &apos;gold&apos;",
    renduconsole: "goldgoldgoldgoldgold",
    choices: ["*", "&apos;gold&apos;", "print(", "5", ")"],
    // création du même nb d'emplacements vides que les choices ?
    tofill: [
      "&nbsp;&nbsp;",
      "&nbsp;&nbsp;",
      "&nbsp;&nbsp;",
      "&nbsp;&nbsp;",
      "&nbsp;&nbsp;",
    ],
    type: "reponse-drag",
  },
];

// index pour évitera un méga boucle
let currentId = 0;
const btn = document.querySelector(".next");
// test pour récup la phrase lors d'un drag and drop
// attention: ne fonctionne que si toute la phrase a été construite comme telle
const droppedOptions = [];
let droppedSentence;

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
  droppedOptions.push(ev.target.appendChild(document.getElementById(data)).innerHTML);
  droppedSentence = droppedOptions.join('');
  console.log(droppedSentence);
  return droppedSentence;
  // console.log(ev.target.appendChild(document.getElementById(data)).innerHTML);
}

// fonction qui s'occupe exclusivement de l'affichage
function createCodeQuestions(arr) {
  let answer;
  let question = "";
  question += "<div class='question'>" + arr[currentId]["question"] + "</div>";
  answer = `<div class='${arr[currentId].type}'>`;
  if (arr[currentId]["type"] === "reponse-choixMultiple") {
    for (let j = 0; j < arr[currentId]["reponses"].length; j++) {
      answer += `<input type="radio" id='${arr[currentId].id}' name='${arr[currentId].id}' data-index='${arr[currentId].id}' value='${arr[currentId]["reponses"][j]}'><label for='option'>${arr[currentId]["reponses"][j]}</label>`;
    }
  } else if (arr[currentId]["type"] === "reponse-open") {
    answer += `${arr[currentId].remaining[0]}<input id='input type='text' data-index='${arr[currentId].id}'>${arr[currentId].remaining[1]}`;
  } else if (arr[currentId]["type"] === "reponse-drag") {

    for (let k = 0; k < arr[currentId]["choices"].length; k++) {
      // créa d'un container pour flex les options ??
      // zone des éléments à drag
      answer += `<li id="dragdrop${k}" class="option" draggable="true" ondragstart="drag(event)">${arr[currentId]["choices"][k]}</li>`;
    }
    for (let l = 0; l < arr[currentId]["tofill"].length; l++) {
      // zone des espaces où drop
      answer += `<br><span id="blank" ondrop="drop(event)" ondragover="allowDrop(event)">${arr[currentId]["tofill"][l]}</span>`;
    }

  }

  answer += `</div>`;
  question += answer;
  questions_container.innerHTML = question;
}

// on gère apd ici ce qu'il se passe au clic du bouton
btn.addEventListener("click", function () {
  /* code de validation */
  goToNext(questionsReponses);
});

const questions_container = document.querySelector(".questions_container");
createCodeQuestions(questionsReponses);

// fonction de passage à la question suivante
function goToNext(arr) {
  console.log(arr);
  currentId++;
  if (currentId >= arr.length) {
    questions_container.innerHTML = "Merci d'avoir participé à notre quiz !";
    btn.style.display = "none";
  } else {
    createCodeQuestions(arr);
  }
}
