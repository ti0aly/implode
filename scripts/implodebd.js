import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
import { getDatabase, ref, set, get, onValue, update, push, child, onChildAdded, remove} from "https://www.gstatic.com/firebasejs/10.13.1/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyDmUlTq07ato7k8RJaA0B2kglTl7dFRn88",
  authDomain: "implode-1bc60.firebaseapp.com",
  projectId: "implode-1bc60",
  storageBucket: "implode-1bc60.appspot.com",
  messagingSenderId: "21923197579",
  appId: "1:21923197579:web:d29d547dbe941ebf5f1a8e",
  measurementId: "G-5NVCJZ3E6J"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
let myId;
let linkAtualRecebido;
let msgKeysPrinted = [];
let msgKeysDeleted = [];
let myMsgs = [];

export function setLink(link) { linkAtualRecebido = link; }
export function setMyId(id) { myId = id;}
export function includeMyMsg(chave) { myMsgs.push(chave); }

export function monitorarNodeRealtime(linkNode) {
  const mensagensRef = ref(database, linkNode); 
  // Escuta todas as mudanças no nó e seus subnós e adiciona no DOM
  onValue(mensagensRef, (snapshot) => {
    snapshot.forEach((childSnapshot) => {
      const dados = childSnapshot.val();
      const mensagem = dados.message;
      const idMensagem = dados.id;
      const chave = childSnapshot.key;
      if (mensagem != undefined) { 
        printMsg(mensagem, chave, idMensagem);
      }
    }
  );
});
}

function printMsg(mensagem, chave, idMensagem) {
  if (!msgKeysPrinted.includes(chave) && !msgKeysDeleted.includes(chave)) {
    msgKeysPrinted.unshift(chave);
    let msgContainer = document.createElement('div');
    if (idMensagem === myId) {
      msgContainer.classList.add('my-msg-on-screen');
    } 
    else if (idMensagem === 'implode-this-chat-now') {
      alert("💥 This chat has been imploded! 💥");
      window.location.href = 'https://ti0aly.github.io/implode';
    }     
    else {
      msgContainer.classList.add('msg-on-screen');
    }
    let identifyDiv = document.createElement('p');
    identifyDiv.classList.add('msg-author');
    let screen = document.getElementById('all-messages');
    let showNewMsg = document.createElement('p');
    showNewMsg.classList.add('msg-body');
    showNewMsg.id = chave;
    identifyDiv.textContent = idMensagem;
    showNewMsg.textContent = mensagem;
    msgContainer.appendChild(identifyDiv);
    msgContainer.appendChild(showNewMsg);
    screen.appendChild(msgContainer);
    screen.scrollTop = screen.scrollHeight;
    console.log('chave: dentro do printmsg: ', chave);
    }
    verifyImplode();
}

function apagarMensagem(link, mensagemId) {
  // 'mensagens' caminho e 'mensagemId' ID da mensagem
  const mensagemRef = ref(database, `${link}/${mensagemId}`); 
  remove(mensagemRef)
    .then(() => {
      console.log("Mensagem removida com sucesso.");
    })
    .catch((error) => {
      console.error("Erro ao remover a mensagem: ", error);
    });
}

export async function addMessage(message, myId, link) {
  const messageRef = ref(database, link);
  const key = push(messageRef, {
    'message': message,
    'id': myId 
  });
  myMsgs.push(key);
}



export function startSession() {
  const sessionId1 = generateRandomId(); 
  const sessionId2 = generateRandomId();
  const sessionId = sessionId1 + sessionId2;
  const link = 'chats/' + sessionId + '/';
  const sessionRef = ref(database, 'chats/' + sessionId);
  set(sessionRef, {
    message: 'startChat!'
  }).then(() => {
    console.log('Dados adicionados ao nó da sessão com ID:', sessionId );
  }).catch((error) => {
    console.error('Erro ao adicionar dados:', error);
  });
  return link;
}

function generateRandomId() {
  return '_' + Math.random().toString(36).substr(2, 9);
}

export async function verificarNodeExistente(caminhoNode) {
  const nodeRef = ref(database, caminhoNode); // Especifique o caminho do nó
  let answer = Boolean;
  get(nodeRef)
    .then((snapshot) => {
      if (snapshot.exists()) {
        answer = true;
      } else {
        answer = false;
      }
      return answer
    })
    .catch((error) => {
      console.error("Erro ao verificar o nó: ", error);
    });
}

setTimeout(function() {
  const connectedRef = ref(database, linkAtualRecebido);
  console.log('connections: ', linkAtualRecebido);
  onValue(connectedRef, (snap) => {
    if (snap.val() === true) {
      const conRef = push(ref(database, linkAtualRecebido));
      set(conRef, true);
      onDisconnect(conRef).remove();
    }
  });
}, 2000);

setTimeout(function() {
  const connectionsLink = linkAtualRecebido + "connections/" 
  const connectionsRef = ref(database, connectionsLink);

  onValue(connectionsRef, (snapshot) => {
    const numConnections = snapshot.size;
    let childDataActive = '';
    snapshot.forEach((childSnapshot) => {
      const childData = childSnapshot.val(); // Pega o valor de cada entrada
      childDataActive += childData['connection'];
  });
    document.getElementById('status-connection').textContent = `Conexões ativas: ${numConnections} (${childDataActive})`;
  });
}, 3000);

export async function addConnection(myId, link) {
  const connectionsLink = link + "connections/" 
  const messageRef = ref(database, connectionsLink);
  const newMessageRef = push(messageRef, {
    'connection': myId
  });
  window.addEventListener('unload', () => {
    remove(newMessageRef);


  });
}

function verifyImplode() {
  if (msgKeysPrinted.length > 6) {
    let implodeNowKey = msgKeysPrinted[msgKeysPrinted.length - 1];
    apagarMensagem(linkAtualRecebido, implodeNowKey);
    msgKeysDeleted.push(implodeNowKey);
    msgKeysPrinted = msgKeysPrinted.filter(item => item !== implodeNowKey);
    document.getElementById(implodeNowKey).innerText = ' 💥 MSG IMPLODED 💥 ';

  }
}

export function deleteChat() {
  const referencia = ref(database, linkAtualRecebido);
  remove(referencia);
} 

export function addPassWord(password) {
  const messageRef = ref(database, linkAtualRecebido + 'pass/');
  update(messageRef, {
    'password': password 
  });
}

export async function readPassword(password) {
  const dbRef = ref(database); 
  try {
    const snapshot = await get(child(dbRef, linkAtualRecebido + 'pass/'));
    if (snapshot.exists()) {
      const snap = snapshot.val();
      console.log("snap: ", snap);
      const valor = snap['password'];
      console.log("valor===password", valor===password);
      if (valor != password) {
        incorrectPassword();        
      } 

    } else {
      console.log("Nenhum dado disponível nesse nó.");
    }
  } catch (error) {
    console.error("Erro ao ler os dados:", error);
  }
}

function incorrectPassword() {
  alert("💥 INCORRECT PASSWORD 💥");
  window.location.href = 'https://ti0aly.github.io/implode';
}