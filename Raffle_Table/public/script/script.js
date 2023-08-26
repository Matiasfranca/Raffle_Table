import action from "./db.js"

const data = action.show();

const NUM = 50;
const ATU = 10;
const CARD = "c"
const table = document.getElementById("table");
const btnSave = document.getElementById("registrar");
const btnDel = document.getElementById("deleted");

document.getElementById("registrar").addEventListener("click", save);
document.getElementById("hideRegister").addEventListener("click", hideRegister);
document.getElementById("deleted").addEventListener("click", deleted);

makeTable();

function makeTable() {
  let lim = ATU;
  let atu = 1;
  table.innerHTML = "";

  for (let index = 0; index < NUM; index++) {

    let lineTable = document.createElement("div");
    lineTable.classList.add("row");
    lineTable.classList.add("justify-content-center");

    for (let index = atu; index <= lim; index++) {

      let column = document.createElement("div");
      column.classList.add("col");
      column.classList.add(CARD);
      column.id = index;
      column.addEventListener("click", register);
      column.innerText = index;
      lineTable.appendChild(column);

    }

    table.appendChild(lineTable);
    atu += ATU;
    lim += ATU;

  }

  atualizar();

}

function atualizar() {
      data.then(snapshot => {
          snapshot.forEach(snap => {
          document.getElementById(snap.id).classList.add("sale");
        })
        return snapshot
      }
  );
}

function register() {

  if(!verify(this));
  {
    btnSave.innerText = "Registrar";
    btnDel.style.display = "none"
    btnSave.classList.remove("bg-success");
    btnSave.classList.add("bg-info")
    reset();
  }

  document.getElementById("register").style.display = "block"
  document.getElementById("h1").innerText = this.id;
  btnSave.dataset.id = this.id;
}

function verify(num) {
  let x = false;
  data.then(snapshot=>snapshot.forEach(snap=>{
  if(snap.id === num.id){
    let inputs = document.querySelectorAll(".input");
    inputs[0].value = snap.data().nome;
    inputs[1].value = snap.data().numero;
    btnDel.style.display = "inline-block"
    btnSave.innerText = "Alterar";
    btnSave.classList.remove("bg-info");
    btnSave.classList.add("bg-success");
    x = true;
  }
}))
  return x;
}

function hideRegister() {
  document.getElementById("register").style.display = "none"
  reset();
}

function reset() {
  let inputs = document.querySelectorAll(".input");
  inputs.forEach((input) => {
    input.value = null;
  })
}

function save() {
let telephone = document.getElementById("telephone");
  if (telefone_validation(telephone.value)) {
    action.add(document.getElementById("name").value, telephone.value.replace(/\D/g, ''), this.dataset.id);
    document.getElementById(String(this.dataset.id)).classList.add("sale");
    hideRegister();
    setTimeout(()=>location.reload(), 200);
  }
}

function deleted() {
  document.getElementById(String(btnSave.dataset.id)).classList.remove("sale");
  action.del(btnSave.dataset.id);
  setTimeout(()=>location.reload(), 300);
}

function telefone_validation(telefone) {
  telefone = telefone.replace(/\D/g, '');

  if (!(telefone.length >= 10 && telefone.length <= 11)) return false;

  if (telefone.length == 11 && parseInt(telefone.substring(2, 3)) != 9) return false;

  for (var n = 0; n < 10; n++) {

    if (telefone == new Array(11).join(n) || telefone == new Array(12).join(n)) return false;
  }

  var codigosDDD = [11, 12, 13, 14, 15, 16, 17, 18, 19,
    21, 22, 24, 27, 28, 31, 32, 33, 34,
    35, 37, 38, 41, 42, 43, 44, 45, 46,
    47, 48, 49, 51, 53, 54, 55, 61, 62,
    64, 63, 65, 66, 67, 68, 69, 71, 73,
    74, 75, 77, 79, 81, 82, 83, 84, 85,
    86, 87, 88, 89, 91, 92, 93, 94, 95,
    96, 97, 98, 99];

  if (codigosDDD.indexOf(parseInt(telefone.substring(0, 2))) == -1) return false;



  if (new Date().getFullYear() < 2017) return true;
  if (telefone.length == 10 && [2, 3, 4, 5, 7].indexOf(parseInt(telefone.substring(2, 3))) == -1) return false;

  return true;
}

//telefone_validation("1111111
  //   table.innerHTML += `<div class="row justify-content-center ">
  //   <div class="col c">
  //     ${index}
  //   </div>
  //   <div class="col c">
  //     ${index + 1}
  //   </div>
  //   <div class="col c">
  //     ${index + 2}
  //   </div>
  //   <div class="col c">
  //     ${index+ 3}
  //   </div>
  //   <div class="col c">
  //     ${index+ 4}
  //   </div>
  //   <div class="col c">
  //     ${index+ 5}
  //   </div>
  //   <div class="col c">
  //     ${index+ 6}
  //   </div>
  //   <div class="col c">
  //     ${index+ 7}
  //   </div>
  //   <div class="col c">
  //     ${index+ 8}
  //   </div>
  //   <div class="col c">
  //     ${index+ 9}
  //   </div>
  //   </div>`
  //   index += 9;
  // }

  // makeTable();


