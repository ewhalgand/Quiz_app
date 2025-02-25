const scoreFinal = document.getElementById('messageScore')


function newPageScore () {
     let scoreMarque = window.localStorage.getItem("score") // récupère la valeur du score
     console.log (scoreMarque)
     scoreFinal.innerText= "Vous avez obtenu le magnifique score de " + scoreMarque
   }
   
   newPageScore()