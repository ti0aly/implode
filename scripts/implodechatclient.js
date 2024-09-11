import { addMessage, readData, monitorarNodeRealtime, verificarNodeExistente, setLink } from "./implodebd.js";


const emojis = ["😀", "😃", "😄", "😁", "😆", "😇", "😎", "🧐", "🤓", "🥳", "😺", "😸", "🐶", "🐱", "🦁", "🐯", "🦊", "🦝", "🐻", "🐼", "🦄", "🐷", "🐣", "🐥", "🦄", "🐝", "🦋", "🐢", "🐠", "🐬", "🐳", "🐍", "🍎", "🍊", "🍉", "🍇", "🍒", "🍓", "🍍", "🥥", "🍌", "🍑", "🚗", "🚀", "🛸", "🚁", "🛶", "🚤", "✈️", "🚂", "🚉", "🚜", "🌈", "🌟", "🌼", "🌻", "🌺", "🍀", "🍁", "🍄", "🌵", "🎄", "⚽", "🏀", "🏈", "🎾", "🏐", "🎲", "🧩", "🎮", "🎯", "🧸", "📚", "✏️", "🖍️", "🎨", "🖌️", "🎻", "🎸", "🎺", "🎷", "🥁"];
const myId = emojiAleatorio();
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
if (urlParams.size === 0) {
    alert('YOU NEED A VALID LINK');
    window.location.href = 'https://ti0aly.github.io/implode';
} 
    
const linkAtual = urlParams.get('sala');
setLink(linkAtual);

monitorarNodeRealtime(linkAtual);
let lowerUpper = 1;

document.body.style.position = 'relative';
document.body.style.bottom = `0px`; // Fixa na posição atual
document.querySelector('body').addEventListener('resize', function() { adjustHeight();});

document.getElementById("send-msg").addEventListener('click', function(event) { document.getElementById("my-msg").focus();
    sendMessage(linkAtual);
});

document.getElementById("my-msg").addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        sendMessage(linkAtual);
    }
});



function adjustHeight() {
    document.getElementById('body-content').style.height = '70%';
    
/*     let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
    const content = document.querySelector('body');
    content.style.height = `calc(var(--vh, 1vh) * 100)`;
    content.scrollTop = content.scrollHeight;
    document.body.style.position = 'relative';
    document.body.style.top = `0px`; */
}

const inputField = document.getElementById("my-msg");
const keys = document.querySelectorAll(".key");

keys.forEach(key => {
  key.addEventListener("click", () => {
    const keyValue = key.textContent;

    if (keyValue === "DEL") {
        inputField.value = inputField.value.slice(0, -1);
    } 
    else if (keyValue === "ESP") {
        inputField.value += " ";
    } 
    else if (keyValue === "⇪") {
        turnUpperLower();
    }
    else {
      inputField.value += keyValue;
    }
  });
});

function turnUpperLower() {
    lowerUpper++
    keys.forEach(key => {
        if ((lowerUpper%2) === 0) {
            key.textContent = key.textContent.toUpperCase();
        } else {
            if (key.textContent === "DEL" || key.textContent === "ESP") {

            } 
            else {
                key.textContent = key.textContent.toLowerCase();
            }

        }
    });
}

 

/* setTimeout(() => {
    Swal.fire({
      title: 'Copy/Send this link<br>to your friend:',
      text: link,
      icon: 'warning',
      confirmButtonText: 'OK, I’ve copied it!'
    });
  }, 1000); */

function sendMessage(linkAtual) {

    let msg = document.getElementById('my-msg').value;
    if (msg != '') {
        addMessage(msg, myId, linkAtual);        
    }
    document.getElementById('my-msg').value = '';
}

  // Função para selecionar um emoji aleatório
  function emojiAleatorio() {
    const randomIndex = Math.floor(Math.random() * emojis.length);
    return emojis[randomIndex];
  }  