import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-analytics.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
import { getFirestore, collection, getDocs, doc, where, query, updateDoc } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js"

//information removed for security
const firebaseConfig = {
apiKey: "",
authDomain: "",
projectId: "",
storageBucket: "",
messagingSenderId: "",
appId: "",
measurementId: ""
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

var action =  {

  add: async function (named, telephone, id) {
    try {
      await updateDoc(doc(db, "Sorteio", String(id)), { nome: named, numero: telephone, comprado: true });    
    } catch (error) {
      console.log("Error: ", error);
      return;
    }
  },

  show: async function () {
    try {
      let snapshot = await getDocs(query(collection(db, "Sorteio"), where("comprado", "!=", false))); 
      return snapshot;
    } catch (error) {
      console.log("Erro: ", error);
      return;
    }
  },

  del: async function name(id) {
    try {
      await updateDoc(doc(db, "Sorteio", String(id)), { nome: "", numero: "", comprado: false });
    } catch (error) {
      console.log("Error: ", error);
      return;   
    }
  },
}


export default action;

// let data = {
//     nome: "",
//     numero: "",
// }

// for (let index = 1; index <= 500; index++) {
//     colocar()
//     function colocar() {
//         let promise = new Promise(async function(resolve, reject) {
//             try {
//                     await updateDoc(doc(db, "Sorteio", String(index)), {comprado: false});

//                     setTimeout(()=>{resolve()
//                         console.log("deu certo");}, 5000);
//                 } catch (error) {
//                     reject();
//                     console.log(error);
//                 }
//             return promise;            
//         })
//     }

// }

// // try {
//     const docRefer = await addDoc(collection(db, "Sorteio"), {
//         Nome: "Matias",
//         Numero: "(88) 988575986",
//         id: 21,
//     });
//     console.log("id:", docRefer);
// } catch (error) {
//     console.log("Erro ao adicionar informação ", error);
// }

