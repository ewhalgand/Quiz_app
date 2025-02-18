import {quiz_numerique_responsable} from './questions.js'; // Import des questions

// Récupérer les emplacements pour injecter la question et les options
const questions = document.getElementById('question-text');
const options = document.getElementById('options-container');

// // Récupérer la première question
const firstQuestion = quiz_numerique_responsable.questions[0];
console.log(firstQuestion);


// // Injecter le texte de la question dans l'emplacement dédié
questions.innerText = firstQuestion.text;
options.innerText = firstQuestion.options;
// // Pour chaque option, créer un bouton et l'ajouter au conteneur
firstQuestion.options.forEach(reponse => {
  const boutonOption = document.createElement('button');
  options.innerText = firstQuestion.options;
   options.classList.add('button');
   options.appendChild(questions);
 });