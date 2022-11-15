const animal = [
    {id: 0, pronoun:"un", name:"Canard"},
    {id: 1, pronoun:"un", name:"Chat"},
    {id: 2, pronoun:"un", name:"Chien"},
    {id: 3, pronoun:"un", name:"Cochon"},
    {id: 4, pronoun:"un", name:"Coq"},
    {id: 5, pronoun:"un", name:"Eléphant"},
    {id: 6, pronoun:"un", name:"Hamster"},
    {id: 7, pronoun:"un", name:"Kiwii"},
    {id: 8, pronoun:"un", name:"Lapin"},
    {id: 9, pronoun:"un", name:"Ours polaire"},
    {id: 10, pronoun:"un", name:"Ours"},
    {id: 11, pronoun:"un", name:"Panda roux"},
    {id: 12, pronoun:"un", name:"Panda"},
    {id: 13, pronoun:"un", name:"Paresseux"},
    {id: 14, pronoun:"un", name:"Pingouin"},
    {id: 15, pronoun:"un", name:"Poussin"},
    {id: 16, pronoun:"un", name:"Raton laveur"},
    {id: 17, pronoun:"un", name:"Renard"},
    {id: 18, pronoun:"un", name:"Singe"},
    {id: 19, pronoun:"une", name:"Souris"},
    {id: 20, pronoun:"un", name:"Tigre"}
]

let recognitionStatus = 0

/*---------------------------------------RECUPERATION DES ELEMENTS HTML----------------------------------------------------*/

let btnReply = document.getElementById("reply")
let h2Reply = document.getElementById("replyH2")

let divBox = document.getElementById("box")
let divHelp = document.getElementById("helpDiv")

main()

/*---------------------------------------CHANGE ANIMAL----------------------------------------------------*/

function changeAnimal(){                                                                                                        //Change l'animal affiché dans la box
    
    divBox.innerHTML = ""
    let elImg = document.createElement("img")

    let randomInt = Math.floor(Math.random()*animal.length)

    elImg.src = "assets/animals/" + animal[randomInt].name + ".png"

    divBox.dataset.animalName = animal[randomInt].name
    divBox.dataset.animalPronoun = animal[randomInt].pronoun
    divBox.appendChild(elImg)

}


/*---------------------------------------REPLY PART----------------------------------------------------*/

let recognition = new webkitSpeechRecognition();                                                                //création d'un élément de reconnaissance vocale
recognition.lang="fr-FR"                                                                                        //paramètre la langue comme étant le Français
recognition.addEventListener("result", checkResponse)                                                           //permet de récupérer le résultat de la reconnaissance

function reply(){                                                                                               //gère le statut de la reconnaissance
    if(recognitionStatus == 0){                                                                                 //l'écoute n'est pas encore commencée
        recognition.start()                                                                                     //débute l'écoute
        recognitionStatus = 1                                                                                   //recognitionStatus = 1 signifie que l'écoute est en cours
    } else {                                                                                                    //l'écoute est commencée
        recognition.stop()                                                                                      //arrête l'écoute
        recognitionStatus = 0                                                                                   //recognitionStatus = 1 signifie que l'écoute n'est pas en cours
    }
    buttonStyle()
}

function checkResponse(event){

    let words = (event.results[0][0].transcript).split(' ')                                                     //sépare le résultat à chaque espace
    checkWords(words)

    let phrase = words.join(" ")                                                                                //joint les enregistrements de l'array words en une string et sépare les enregistrements par un espace

    let ssu = new SpeechSynthesisUtterance()                                                                    //crée un objet de type SpeechSynthesisUtterance
    ssu.lang = "fr-FR"                                                                                          //renseigne la langue de la synthèse sur français

    if(divBox.dataset.animalName.toLowerCase() == phrase){                                                   //vérifie si la réponse donnée est la bonne
        ssu.text = "Bravo, c'est bien" + divBox.dataset.animalPronoun + divBox.dataset.animalName               //déclare le texte
        window.speechSynthesis.speak(ssu)                                                                       //dit le texte
    } else {                                                                                                 //sinon
        ssu.text = "Ce n'est pas " + event.results[0][0].transcript                                             //déclare le texte
        window.speechSynthesis.speak(ssu)                                                                       //dit le texte
    }
}

function checkWords(words){                                                                                     //vérifie si il y'a "un" ou "une" dans la réponse et l'enlève
    if(words.length > 0){                                                                                       //si il y'a plusieurs enregistrements dans words
        for(let i = 0; i < words.length; i++){
            if(words[i] == "un" || words[i] == "une"){                                                          
                words.splice(i, 1)                                                                              //supprime l'élément trouvé
                i = 0                                                                                           //relance la vérification si jamais l'utilisateur a dit "un un chien" pour éviter que la réponse soit fausse
            }
        }
    }
}

function buttonStyle(){                                                                                         //gère le style du bouton de réponse
    if(recognitionStatus == 1){                                                                                 //si l'écoute est en cours
        btnReply.classList.add('replyEc')                                                                       //renseigne une nouvelle classe pour donner le style du bouton "écoute en cours"
        btnReply.classList.remove('replyAv')                                                                    //supprime la classe qui a le style du bouton "écoute pas encore commencée"
        replyH2.innerHTML = "Arrêter"                                                                           //change le texte pour écrire "Arréter"
    } else {                                                                                                    //si l'écoute n'est pas en cours
        btnReply.classList.add('replyAv')                                                                       //renseigne une nouvelle classe pour donner le style du bouton "écoute pas encore commencée"
        btnReply.classList.remove('replyEc')                                                                    //supprime la classe qui a le style du bouton "écoute en cours"
        replyH2.innerHTML = "Répondre"                                                                          //change le texte pour écrire "Répondre"
    }
}

/*---------------------------------------HELP PART----------------------------------------------------*/

function understandRule(){
    helpDiv.style.visibility = "hidden"
}

function showRule(){
    helpDiv.style.visibility = "visible"
}

/*---------------------------------------DEFAULT INITIALISATION----------------------------------------------------*/

function main(){
    changeAnimal()
}


