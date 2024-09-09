import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
import { getDatabase, ref, set, onValue, update, push} from "https://www.gstatic.com/firebasejs/10.13.1/firebase-database.js";

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

export async function addMessage(message, link) {
  const messageRef = ref(database, link);
  console.log('link recebido na addMessage: ', link);
  push(messageRef, {
    text: message,
    timestamp: Date.now()
  });
}

export function startSession() {
  const sessionId1 = generateRandomId(); 
  const sessionId2 = generateRandomId();
  const sessionId = sessionId1 + sessionId2;
  const link = 'chats/secrets/sessions/' + sessionId + '/';
  const sessionRef = ref(database, 'chats/secrets/sessions/' + sessionId);

  // Adiciona dados ao nó da sessão
  set(sessionRef, {
    timestamp: Date.now()
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