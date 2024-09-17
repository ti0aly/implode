import { addMessage, startSession, monitorarNodeRealtime, setLink, addConnection, setMyId, addPassWord} from "./implodebd.js";

const emojis = ['😀', '😃', '😄', "😁", "😆", "😇", "😎", "🧐", "🤓", "🥳", "😺", "😸", "🐶", "🐱", "🦁", "🐯", "🦊", "🦝", "🐻", "🐼", "🦄", "🐷", "🐣", "🐥", "🦄", "🐝", "🦋", "🐢", "🐠", "🐬", "🐳", "🐍", "🍎", "🍊", "🍉", "🍇", "🍒", "🍓", "🍍", "🥥", "🍌", "🍑", "🚗", "🚀", "🛸", "🚁", "🛶", "🚤", "✈️", "🚂", "🚉", "🚜", "🌈", "🌟", "🌼", "🌻", "🌺", "🍀", "🍁", "🍄", "🌵", "🎄", "⚽", "🏀", "🏈", "🎾", "🏐", "🎲", "🧩", "🎮", "🎯", "🧸", "📚", "✏️", "🖍️", "🎨", "🖌️", "🎻", "🎸", "🎺", "🎷", "🥁"];
const myId = emojiAleatorio();
const  linkAtual = startSession();
setLink(linkAtual);
setMyId(myId);
addConnection(myId, linkAtual);
let password;

monitorarNodeRealtime(linkAtual);
let lowerUpper = 1;
document.body.style.position = 'relative';
document.body.style.bottom = `0px`; // Fixa na posição atual

document.querySelector('body').addEventListener('resize', function() { adjustHeight();});
document.getElementById('delete-chat').addEventListener('click', function() {
    // enviar uma mensagem pro servidor pra derrubar os clientes
    addMessage('bye', 'implode-this-chat-now', linkAtual);
});

document.getElementById("send-msg").addEventListener('click', function(event) { 
    document.getElementById("my-msg").focus();
    sendMessage(linkAtual);
});

const copyBtn = document.getElementById('copy-link');
copyBtn.addEventListener('click', () => {
    navigator.clipboard.writeText('https://implode-1bc60.web.app/implodechatclient.html?sala=' + linkAtual);
    password = prompt("Please set your password:");
    addPassWord(password);
    document.getElementById('my-msg').placeholder = 'PASTE LINK TO YOUR FRIEND';
    setTimeout(function() {document.getElementById('my-msg').placeholder = '. . .'},3000);
});

document.getElementById("my-msg").addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        sendMessage(linkAtual);
    }
});

function adjustHeight() {
    document.getElementById('body-content').style.height = '70%';
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

function sendMessage(linkAtual) {
    let msg = document.getElementById('my-msg').value;
    if (msg != '') {
        addMessage(msg, myId, linkAtual);        
    }
    document.getElementById('my-msg').value = '';
}

function emojiAleatorio() {
    const randomIndex = Math.floor(Math.random() * emojis.length);
    return emojis[randomIndex];
}  