import { quiz_numerique_responsable } from "./questions.js"; // Import des questions

let currentQuestionIndex = 0;

// Récupérer les emplacements pour injecter la question et les options
const questions = document.getElementById("question-text");
const options = document.getElementById("options-container");
const suivant = document.getElementById("next-button");

function loadQuestion() {
  options.innerHTML = "";

  // // Récupérer la première questio0
  const currentQuestion = quiz_numerique_responsable.questions[currentQuestionIndex];
  console.log(currentQuestion)
  // // Injecter le texte de la question dans l'emplacement dédié
  questions.innerText = currentQuestion.text;
  
  // // Pour chaque option, créer un bouton et l'ajouter au conteneur
  currentQuestion.options.forEach((reponse) => {
    const boutonOption = document.createElement("button");
    
    boutonOption.innerText = reponse;
  
    boutonOption.classList.add("button");
  
    options.appendChild(boutonOption);
  });
}

// Ajouter un écouteur d'événements pour le bouton "Suivant"
suivant.addEventListener('click', () => {
  // Incrémenter l'index de la question
  currentQuestionIndex++;

  // Vérifier s'il reste des questions
  if (currentQuestionIndex < quiz_numerique_responsable.questions.length) {
    // Afficher la question suivante
    loadQuestion();
  } else {
    // Si plus de questions, indiquer la fin du quiz
    questions.innerText = 'Fin';
    options.innerHTML = ''; // Effacer les options
    suivant.style.display = 'none'; // Cacher le bouton Suivant
  }
});

// Charger la première question au chargement de la page
loadQuestion()