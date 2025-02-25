let timeRemaining = 10; //temps de réponse en secondes avant blocage des propositions
let timerInterval; //  variable utile pour mettre à jour le timer toute les secondes
// Fonction pour démarrer le timer
function startTimer() {
    // Réinitialiser le temps restant à 10 secondes à chaque nouvelle question
    timeRemaining = 10;
  
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