import {quiz_numerique_responsable} from './questions.js'; // Import des questions

// Récupérer les emplacements pour injecter la question et les options
const questions = document.getElementById('question-text');
const options = document.getElementById('options-container');
console.log(quiz_numerique_responsable);

// // Récupérer la première question
// const firstQuestion = __________.questions[0];

// // Injecter le texte de la question dans l'emplacement dédié
// __________.innerText = __________;

// // Pour chaque option, créer un bouton et l'ajouter au conteneur
// firstQuestion.__________.forEach(__________ => {
//   const __________ = document.createElement('button');
//   __________.innerText = __________;
//   __________.classList.add('__________');
//   __________.appendChild(__________);
// });