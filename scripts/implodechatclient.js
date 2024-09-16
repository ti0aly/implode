import { addMessage, monitorarNodeRealtime, verificarNodeExistente, setLink, addConnection, setMyId, readPassword } from "./implodebd.js";

const emojis = ["😀", "😃", "😄", "😁", "😆", "😇", "😎", "🧐", "🤓", "🥳", "😺", "😸", "🐶", "🐱", "🦁", "🐯", "🦊", "🦝", "🐻", "🐼", "🦄", "🐷", "🐣", "🐥", "🦄", "🐝", "🦋", "🐢", "🐠", "🐬", "🐳", "🐍", "🍎", "🍊", "🍉", "🍇", "🍒", "🍓", "🍍", "🥥", "🍌", "🍑", "🚗", "🚀", "🛸", "🚁", "🛶", "🚤", "✈️", "🚂", "🚉", "🚜", "🌈", "🌟", "🌼", "🌻", "🌺", "🍀", "🍁", "🍄", "🌵", "🎄", "⚽", "🏀", "🏈", "🎾", "🏐", "🎲", "🧩", "🎮", "🎯", "🧸", "📚", "✏️", "🖍️", "🎨", "🖌️", "🎻", "🎸", "🎺", "🎷", "🥁"];
const myId = emojiAleatorio();
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
if (urlParams.size === 0) { alert('YOU NEED A VALID LINK');
    window.location.href = 'https://ti0aly.github.io/implode';
} 
    
const linkAtual = urlParams.get('sala');
setLink(linkAtual);
setMyId(myId);
addConnection(myId, linkAtual);
monitorarNodeRealtime(linkAtual);
let lowerUpper = 1;
let password = prompt("Enter your password:");
readPassword(password);

document.body.style.position = 'relative';
document.body.style.bottom = `0px`; // Fixa na posição atual
document.querySelector('body').addEventListener('resize', function() { adjustHeight();});
document.getElementById('delete-chat').addEventListener('click', function() {
    // enviar uma mensagem pro servidor pra derrubar os clientes
    addMessage('', 'implode-this-chat-now', linkAtual);
});
document.getElementById("send-msg").addEventListener('click', function(event) { document.getElementById("my-msg").focus();
    sendMessage(linkAtual);
});

document.getElementsByClassName('')


document.getElementById("my-msg").addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        sendMessage(linkAtual);
    }
});

function adjustHeight() {
    document.getElementById('body-content').style.height = '70%';
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


  