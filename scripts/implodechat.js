import { addMessage, startSession } from "./implodebd.js";

const linkAtual = startSession();

document.body.style.position = 'relative';
document.body.style.bottom = `0px`; // Fixa na posição atual

document.querySelector('body').addEventListener('resize', function() {
    adjustHeight();
});

document.getElementById("send-msg").addEventListener('click', function(event) {
    document.getElementById("my-msg").focus();
    sendMessage(linkAtual);
});

document.getElementById("my-msg").addEventListener('keydown', function(event) {
    
    if (event.key === 'Enter') {

        sendMessage(linkAtual);
    }
});

function adjustHeight() {
    // Captura a altura real da janela de visualização
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
    const content = document.querySelector('body');
    content.style.height = `calc(var(--vh, 1vh) * 100)`;
    content.scrollTop = content.scrollHeight;
    document.body.style.position = 'relative';
    document.body.style.top = `0px`; // Fixa na posição atual
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
        let msgContainer = document.createElement('div');
        msgContainer.classList.add('msg-on-screen');

        let identifyDiv = document.createElement('p');
        identifyDiv.classList.add('msg-author');
        let screen = document.getElementById('all-messages');
        let showNewMsg = document.createElement('p');
        showNewMsg.classList.add('msg-body');
        identifyDiv.textContent = 'José: ';
        showNewMsg.textContent = msg;
        msgContainer.appendChild(identifyDiv);
        msgContainer.appendChild(showNewMsg);
        screen.appendChild(msgContainer);
        screen.scrollTop = screen.scrollHeight;
        addMessage(msg, linkAtual);        
        document.getElementById('my-msg').value = '';
    }
  }