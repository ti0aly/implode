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
let linkAtualRecebido;

export function setLink(link) {
  linkAtualRecebido = link;
}



export function monitorarNodeRealtime(linkNode) {
  const mensagensRef = ref(database, linkNode); 
  // Escuta todas as mudanças no nó e seus subnós e adiciona no DOM
  onValue(mensagensRef, (snapshot) => {
    snapshot.forEach((childSnapshot) => {
      const dados = childSnapshot.val();
      const mensagem = dados.message;
      const myId = dados.id;
      const chave = childSnapshot.key;
      if (mensagem != undefined) {
        let msgContainer = document.createElement('div');
        msgContainer.classList.add('msg-on-screen');
        let identifyDiv = document.createElement('p');
        identifyDiv.classList.add('msg-author');
        let screen = document.getElementById('all-messages');
        let showNewMsg = document.createElement('p');
        showNewMsg.classList.add('msg-body');
        identifyDiv.textContent = myId;
        showNewMsg.textContent = mensagem;
        msgContainer.appendChild(identifyDiv);
        msgContainer.appendChild(showNewMsg);
        screen.appendChild(msgContainer);
        screen.scrollTop = screen.scrollHeight;
        apagarMensagem(linkNode, chave);
    }
  }
  );
  });
}

function apagarMensagem(link, mensagemId) {
  const mensagemRef = ref(database, `${link}/${mensagemId}`); // Substitua 'mensagens' pelo caminho correto e 'mensagemId' pelo ID da mensagem a ser removida
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
  push(messageRef, {
    'message': message,
    'id': myId 
  });
}

export async function readData(nodePath) {
  const dbRef = ref(database); 

  try {
    const snapshot = await get(child(dbRef, nodePath));
    if (snapshot.exists()) {
      return snapshot.val(); 
    } else {
      console.log("Nenhum dado disponível nesse nó.");
      return null;
    }
  } catch (error) {
    console.error("Erro ao ler os dados:", error);
  }
}



export function startSession() {
  const sessionId1 = generateRandomId(); 
  const sessionId2 = generateRandomId();
  const sessionId = sessionId1 + sessionId2;
  const link = 'chats/secrets/sessions/' + sessionId + '/';
  const sessionRef = ref(database, 'chats/secrets/sessions/' + sessionId);
  
  // Adiciona dados ao nó da sessão
  set(sessionRef, {
    message: 'startChat!'
  }).then(() => {
    console.log('Dados adicionados ao nó da sessão com ID:', sessionId );
    console.log('conteudo do link: ', link);

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
  console.log('link recebido', linkAtualRecebido);
}, 1000);

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
  console.log("connections link: ", connectionsLink);
  const connectionsRef = ref(database, connectionsLink);
  onValue(connectionsRef, (snapshot) => {
    const numConnections = snapshot.size;
    document.getElementById('status-connection').textContent = `Conexões ativas: ${numConnections}`;
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


