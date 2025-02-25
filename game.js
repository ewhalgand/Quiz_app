import { quiz_numerique_responsable } from "./questions.js"; // Import des questions

let currentQuestionIndex = 0;
let score =0 

// Récupérer les emplacements pour injecter la question et les options
const questions = document.getElementById("question-text");
const options = document.getElementById("options-container");
const suivant = document.getElementById("next-button");
const rejouer = document.getElementById("replay-button");
const scoreContainer = document.getElementById("score-container");
const canvas = document.querySelector('#confetti-canvas');

function loadQuestion() {
  options.innerHTML = "";

  // Récupérer la première question
  const currentQuestion = quiz_numerique_responsable.questions[currentQuestionIndex];

  // Injecter le texte de la question dans l'emplacement dédié
  questions.innerText = currentQuestion.text;

  // Pour chaque option, créer un bouton et l'ajouter au conteneur
  currentQuestion.options.forEach((reponse) => {
    const boutonOption = document.createElement("button");
    
    boutonOption.innerText = reponse;

    boutonOption.classList.add('button');

    // Bouton suivant disabled 
    suivant.disabled = true
    boutonOption.addEventListener('click', () => { 
      checkAnswer(reponse) 
      //  // Désactiver tous les boutons après le choix
    const allButtons = document.querySelectorAll('button');
    allButtons.forEach(btn => {
    btn.disabled = true; // Désactiver tous les boutons après sélection
  });

      // bouton "suivant" activé
      suivant.disabled = false
      // // Couleur des bordures
      reponse !== currentQuestion.correct_answer ? boutonOption.style.borderColor = 'red' : boutonOption.style.borderColor
      reponse === currentQuestion.correct_answer ? boutonOption.style.borderColor = 'green' : boutonOption.style.borderColor  
    })

    // suivant.disabled = false
    options.appendChild(boutonOption);
  });
  updateProgressBar();
}

// Fonction pour mettre à jour la barre de progression
function updateProgressBar() {
  const totalQuestions = quiz_numerique_responsable.questions.length;
  const progress = (currentQuestionIndex / totalQuestions) * 108; // Calcul du pourcentage de progression
  const progressBar = document.getElementById("progress-bar");
console.log(progress);
  // Mettre à jour la largeur de la barre de progression
  progressBar.style.width = `${progress}%`;
}

// Ajouter un écouteur d'événements pour le bouton "Suivant"
suivant.addEventListener("click", () => {
  // Incrémenter l'index de la question
  currentQuestionIndex++;

  // Vérifier s'il reste des questions
  if (currentQuestionIndex < quiz_numerique_responsable.questions.length) {
    // Afficher la question suivante
    loadQuestion();
  } else {
    // Si plus de questions, indiquer la fin du quiz
    questions.innerText = "Fin";
    options.innerHTML = ""; // Effacer les options
    suivant.style.display = "none"; // Cacher le bouton Suivant
    rejouer.style.display = "inline-block";
    rejouer.disabled = false;
     questions.innerText = `Vous avez obtenu ${score} points sur ${quiz_numerique_responsable.questions.length}`;
  }
});

rejouer.addEventListener("click", () => {
  currentQuestionIndex = 0;
  score =0;
  rejouer.style.display = "none";
  suivant.style.display = "inline-block";
  loadQuestion();
});

function checkAnswer (reponse) {
  const bonneReponse = quiz_numerique_responsable.questions[currentQuestionIndex].correct_answer
  // console.log({mareponse: bonneReponse});
  // console.log({user: reponse});
  
  if (reponse === bonneReponse) {
    console.log("vrai");
    score++;
    onButtonClick()
  } else {
    console.log("faux");
    
  }
  scoreContainer.innerText = `Score: ${score}`;
  window.localStorage.setItem("score", score); // stocke la valeur du score dans le localStorage
}

function onButtonClick(){
  const myConfetti = confetti.create(canvas, {
    resize: true,
    useWorker: true
  });
  myConfetti({
    particleCount: 100,
    spread: 160
  });
}

// Charger la première question au chargement de la page
loadQuestion();