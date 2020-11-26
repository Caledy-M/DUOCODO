console.log('it works script2');

//chercher comme afficher <hello> en html

const questionsReponses = [
    {
        'id': 0,
        'type': 'reponse-open',
        'question': 'Entrez la fonction qui permet d\'afficher dans la console: ',
        'reponse': 'print',
        'renduconsole': 'Hello World',
        // phrase complète print("Hello World")
        'remaining': ['',
          '("Hello World")'],
    },
     {
        'id': 1,
        'question': 'la quelle de ces propostions est une string?',
        'reponses': ['&lt;hello&gt;','/hey/','[hallo]','&apos;yo&apos;'],
        'bonreponse': '&apos;yo&apos;',  
        'type': 'reponse-choixMultiple', 
    },
    {
        'id': 2,
        'question': 'question 2?',
        'reponses': ['&lt;hello&gt;','/hey/','[hallo]','&apos;yo&apos;'],
        'bonreponse': '&apos;yo&apos', 
        'type': 'reponse-choixMultiple',  
    },    
]

//console.log(arr[2]['reponses'].length);

//Faire function adapté a un objet un concret, recoit deux paramentres: le objet et le numero de la question (quand on l'appelle c'est questionsReponses[0], 0)

let currentId = 0;
const btn = document.querySelector(".next");

function createCodeQuestions(arr) {
    let answer;
    let question = '';
    question += "<div class='question'>" + arr[currentId]['question'] + "</div>";
    answer = `<div class='${arr[currentId].type}'>`;
    //let counter = 0;  
    //console.log(arr[currentId]['type']);  
    if (arr[currentId]['type']==='reponse-choixMultiple')
    { 
        for (let j = 0; j < arr[currentId]['reponses'].length; j++)//for (var key in arr[i])  
    {       
      answer += `<input type="radio" id='${arr[currentId].id}' name='${arr[currentId].id}' data-index='${arr[currentId].id}' value='${arr[currentId]['reponses'][j]}'><label for='option'>${arr[currentId]['reponses'][j]}</label>`;
      //console.log(answer);
      //console.log(arr[currentId]['reponses'].length)
      //counter++;
    }
    } else if (arr[currentId]['type']==='reponse-open'){
    answer += `${arr[currentId].remaining[0]}<input id='input type='text' data-index='${arr[currentId].id}'>${arr[currentId].remaining[1]}`;  
            
        } else {
            //Inserer le block pour le drag and drop
        }
       
    answer += `</div>`;  
    question +=  answer;
    
    //<button>Check</button>
    //<input type="submit" value="Check">
    questions_container.innerHTML =  question;
  } 
console.log(btn);
          
btn.addEventListener('click', function()
{
/* code de validation */
goToNext(questionsReponses);
});
            

  //()[]{}
//   function validateInputAnswer(arr)
//   {
//       const input = document.querySelector("#input");
//       const userInput = input.value;
//       if(userInput === arr[currentId].reponse)
//       {
//           answer += "Bonne reponse";
//       } else {
//         answer += "Mauvaise reponse";

//       }
//       console.log(answer);

//   }


  const questions_container = document.querySelector('.questions_container');
  createCodeQuestions(questionsReponses);


  //Function go to Next

  function goToNext(arr) {
      console.log(arr);
      currentId++;
      if(currentId > arr.length) {
        questions_container.innerHTML = "bla";
      }else {
        createCodeQuestions(arr);
      }
  }
  