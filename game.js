import { quiz_numerique_responsable } from "./questions.js"; // Import des questions

let currentQuestionIndex = 0;
let score =0
let timeRemaining = 1; //temps de réponse en secondes avant blocage des propositions
let timerInterval; //  variable utile pour mettre à jour le timer toute les secondes

// Récupérer les emplacements pour injecter la question et les options
const questions = document.getElementById("question-text");
const options = document.getElementById("options-container");
const suivant = document.getElementById("next-button");
const rejouer = document.getElementById("replay-button");
const scoreContainer = document.getElementById("score-container");
const canvas = document.querySelector('#confetti-canvas');




// Fonction pour démarrer le timer
function startTimer() {
  // Réinitialiser le temps restant à 10 secondes à chaque nouvelle question
  timeRemaining = 11;

  timerInterval = setInterval(() => {
    if (timeRemaining > 0) {
      timeRemaining--; // "timeRemaning" décrémente la variable de 1 "--"réduire la valeur d'une variable de 1 à chaque fois qu'il est exécuté.
      document.getElementById('timer-container').innerText = `Temps restant: ${timeRemaining}s`; // Afficher le temps restant
    } else {
      // Quand le temps est écoulé, les boutons sont bloqués et on passe à la question suivante
      clearInterval(timerInterval);
      blockOptions();
      suivant.disabled = false; // Le bouton "Suivant" devient actif
    }
  }, 1000); // Met à jour toutes les secondes
}

//Fonction pour bloquer les options
function blockOptions() {
  const allButtons = document.querySelectorAll("button");
  allButtons.forEach((button) => {
    button.disabled = true; // Désactiver tous les boutons
  });
}



function loadQuestion() {
  options.innerHTML = "";
  suivant.disabled = true; // Désactiver le bouton "Suivant" au début de la question

  // Démarrer le timer pour la nouvelle question
  startTimer();

    // Démarrer le timer au premier chargement
    if (currentQuestionIndex === 0) {
      //startTimer(); // Démarrer le timer
    }

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
      // Désactiver tous les boutons après le choix
    const allButtons = document.querySelectorAll('button');
    allButtons.forEach(btn => {
    btn.disabled = true; // Désactiver tous les boutons après sélection
  });
  clearInterval(timerInterval); // Arrêter le timer dès que l'utilisateur clique sur une option
      blockOptions(); // Bloquer les options
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
  const progress = ((currentQuestionIndex+1)/ totalQuestions) *100
console.log(progress);}
  // Mettre à jour la largeur de la barre de progression
  progressBar.style.width = `${progress}%`;

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
  timeRemaining = 60; // Réinitialise le timer
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