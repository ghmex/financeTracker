const balanceTotal = document.getElementById("balance");
const ingresos = document.getElementById("money-plus");
const egresos = document.getElementById("money-minus");
const list = document.getElementById("list");
const form = document.getElementById("form");
const text = document.getElementById("text");
const amount = document.getElementById("amount");
const notification = document.getElementById("notification");

const todoElArray = [];

let transactions = todoElArray;
//console.log(transactions);

// LocalStorage is not enabled in CodePen for security reasons
const localStorageTransactions = JSON.parse(
  localStorage.getItem("transactions")
);
transactions =
  localStorageTransactions !== null ? localStorageTransactions : [];

function updateLocaleStorage() {
  localStorage.setItem("transactions", JSON.stringify(transactions));
}

function showNotification() {
  notification.classList.add("show");
  setTimeout(() => {
    notification.classList.remove("show");
  }, 2000);
}

function generateID() {
  return Math.floor(Math.random() * 100000000);
}

function addTransaction(e) {
  e.preventDefault();
  if (text.value.trim() === "" || amount.value.trim() === "") {
    showNotification();
  } else {
    const transaction = {
      id: generateID(),
      text: text.value,
      amount: +amount.value,
    };

    transactions.push(transaction);

    addTransactionDOM(transaction);
    pushValueChart(parseInt(amount.value), text.value);
    updateValues();
    updateLocaleStorage();
    text.value = "";
    amount.value = "";
  }
}

function addTransactionDOM(transaction) {
  const sign = transaction.amount < 0 ? "-" : "+";
  const item = document.createElement("li");
  item.classList.add(sign === "+" ? "plus" : "minus");

  /*
	
	if(sign == "-"){
		pushValueChart(parseInt(transaction.amount),transaction.text);
		console.log('Menos');
		//pushValueChart(transaction.amount);
		console.log(transaction.amount);
	}
	if(sign == '+'){
		console.log('Mas');
		pushValueChart(parseInt(transaction.amount),transaction.text);
		console.log(transaction.id);
		
	}
	*/

  item.innerHTML = `
  ${transaction.text}  <span>${sign}${Math.abs(transaction.amount)}</span>
  
  <button class="delete-btn" onclick="removeTransaction(${
    transaction.id /* transaction.text, transaction.amount*/
  })"><i class="fa fa-times"></i></button>

<button class="edit-btn" onclick="editTransaction(${
    transaction.id
  }) "><i class="fa-solid fa-pen-to-square"></i></button>
		
    `;

  list.appendChild(item);
  closeModal();
}

function updateValues() {
  const amounts = transactions.map((transaction) => transaction.amount);
  const total = amounts
    .reduce((accumulator, value) => (accumulator += value), 0)
    .toFixed(2);
  const ingreso = amounts
    .filter((value) => value > 0)
    .reduce((accumulator, value) => (accumulator += value), 0)
    .toFixed(2);
  const egreso = (
    amounts
      .filter((value) => value < 0)
      .reduce((accumulator, value) => (accumulator += value), 0) * -1
  ).toFixed(2);
  balanceTotal.innerText = `$${total}`;
  ingresos.innerText = `$${ingreso}`;
  egresos.innerText = `$${egreso}`;
}

function removeTransaction(id) {
  for (let i = 0; i < transactions.length; i++) {
    console.log(`lONGITUD ES ${id}`);
    if (transactions[i].id == id) {
      transactions.splice(i, 1);
      //let element = document.getElementById(i);
      myChart.data.datasets[0].data.splice(i, 1);
      myChart.data.labels.splice(i, 1);
      myChart.update();
      //console.log(element);
    } else {
      //console.log('Nothing');
    }
  }
  updateLocaleStorage();
  init();
}

function editTransaction(id) {
  console.log("Editar", id);
  document.querySelector("#formEdit").addEventListener("submit", (e) => {
    e.preventDefault();
    console.log("Formulario editar");
    let textEdit = document.querySelector("#textEdit").value;
    let amountEdit = document.querySelector("#amountEdit").value;
    console.log(textEdit, amountEdit);
  });
}

// Init
function init() {
  list.innerHTML = "";
  transactions.forEach(addTransactionDOM);
  // console.log(addTransactionDOM)
  updateValues();
}
//console.log(transaction)

//onsole.log(init());

form.addEventListener("submit", addTransaction);
document.querySelector(".ButtonForm").addEventListener("click", showModal);
document.querySelector(".close").addEventListener("click", closeModal);

function showModal() {
  let containerEditModal = document.querySelector(".ModalForm");
  containerEditModal.style.display = "flex";
}

function closeModal() {
  let containerEditModal = document.querySelector(".ModalForm");
  containerEditModal.style.display = "none";
}


/*
document.querySelector('.edit-btn').addEventListener('click', () => {
	console.log('OK');
})
*/



// function closeModal() {
//     modal.style.display = "none";

// }

/*
colocar modal en historial para  mostrar los registros, 
autenticar con firebase, crear usuarios y guardar array
tomar los datos del egreso e ingreso, y pasarlos al balance
login, pagina de login, registro
landingpage
setear grafico al inicio
*/

/*
//Balance
const totalBalance = document.querySelector("#totalBalance");
//Ingresos
const ingresoBalance = document.querySelector("#ingresoBalance");
//Egresos
const egresoBalance = document.querySelector("#egresoBalance");
//Modal de ingreso y egreso
let modal = document.querySelector("#modal");

document.querySelector(".plus").addEventListener("click", () => {
	let modo = "ingreso";
	abrirModal(modo);
});

document.querySelector(".minus").addEventListener("click", () => {
	let modo = "egreso";
	abrirModal(modo);
});

function abrirModal(modo) {
	modal.style.display = "block";
	let navModal = document.querySelector("#modal nav");
	let inputModo = document.querySelector("#input-modo");
	if(modo === "ingreso"){
		document.querySelector("#modo").innerHTML = "Añadir Ingreso";
		navModal.style.backgroundColor = "#0cb95a";
		inputModo.value = modo;
	}
	if(modo === "egreso"){
		document.querySelector("#modo").innerHTML = "Añadir Egreso";
		navModal.style.backgroundColor = "#ef3434";
		inputModo.value = modo;
	}
}

//Cerrar modal
document.querySelector(".close").addEventListener("click", closeModal);

function closeModal() {
	modal.style.display = "none";
}
//let balance ;




function updateValues(){
	//const amounts = allArray.map((transaction) => transaction.monto);
	console.log(amounts);

	const total = amounts
	.reduce((accumulator, value) => (accumulator += value), 0)
	.toFixed(2);
	ingresoBalance.innerText = `${total}`;
	totalBalance.innerText = `${total}`
	
	/*
	const expense = (
		amounts
		.filter((value) => value < 0)
		.reduce((accumulator, value) => (accumulator += value), 0) * -1
		).toFixed(2);
		moneyMinus.innerText = `$${expense}`;
		
	}
	*/

/*
		const income = amounts
		//.filter((value) => value /*> 0)
		.reduce((accumulator, value) => (accumulator + value), 0)
		//.toFixed(2);
		egresoBalance.innerText = `${income}`;
		
		//inObj = array
function sumaTotal(inObj) { // 1 2 3 1+2+3
	const total = inObj.reduce((a, b) => {
		 a + b.monto;
	}, 0);
	//balance = total;
	//return 
	//return total
		//ingresoBalance.innerHTML = total
		//console.log(total)
	}
	//console.log(total);
let balances;
function restaTotal(inObj){
	const total = inObj.reduce((a, b) => {
		return a + b.monto;
	}, 0);
	balances = total;
	//console.log(total);
	egresoBalance.innerHTML = total
	
}
// console.log(ingresoBalance.innerHTML = total)
const modalForm = document.querySelector(".modal-form");

modalForm.addEventListener("submit", (e) => {
	e.preventDefault();
	
	const inputIngreso = document.querySelector(".inputIngreso").value;
	const inputNoteIngreso = document.querySelector(".inputNoteIngreso").value;
	const inputModo = document.querySelector("#input-modo");
	
	if (!/^[0-9]+$/.test(inputIngreso)) {
		alert("Por favor solo introduce numeros (0-9)");
	} else {
		let letra = inputNoteIngreso[0].toUpperCase();
		let resto = inputNoteIngreso.slice(1);
		let input = letra + resto;
		addItem(inputIngreso, input, inputModo);
		pushValueChart(parseInt(inputIngreso), inputNoteIngreso);
		// regexInputNumbers1to9(inputIngreso);
		modalForm.reset();
		closeModal();
	}
});

let allArray = [];

let i = 0;

function addItem(inputValue, inputNoteValue, inputModo) {
	const itemObj = {
		id: i++,
		monto: parseInt(inputValue),
		nota: inputNoteValue,
	};

	allArray.push(itemObj);

	let { id, monto, nota } = itemObj;
	
	let date = new Date();
	
	let string = `
		<section class="component ${inputModo.value}" id='${id}'>
			<h4 class='notaParaEditar'>${nota}</h4>
			<p id="itemMonto">$ ${monto}</p>
			<p>${date.toISOString().split("T")[0]}</p>
			<img src="/IMG/editing.png" id="t" class="edit" alt="Editando" onclick="handleEdit(${id})">
			<img src="/IMG/close.png" class="cerrar" alt="Cerrar" onclick="handleClose(${id})">
		</section>
		`;
		
	let containerHistorial = document.querySelector("#historial");
	containerHistorial.innerHTML += string;
	
	if(inputModo.value === "ingreso"){
		//allArray.values.filter()
		sumaTotal(allArray)
	}else{
		restaTotal(allArray)
	}
	

	
		updateValues()
	
	//Cerrar Item
	modalForm.reset();
	return allArray;
}

document.querySelector(".container-edit-modal .close").addEventListener("click", closeEditModal);

function showEditModal() {
	let containerEditModal = document.querySelector(".container-edit-modal");
	containerEditModal.style.display = "flex";
}

function closeEditModal() {
	let containerEditModal = document.querySelector(".container-edit-modal");
	containerEditModal.style.display = "none";
}

const handleEdit = id => {
	showEditModal();
	document.querySelector("#editForm").addEventListener("submit", function(e) {
		e.preventDefault();
		let editInput = document.querySelector(".editInput").value;
		let editMonto = document.querySelector(".editMonto").value;
		let elemento = document.getElementById(id);
		for (let i = 0; i < allArray.length; i++) {
			if (allArray[i].id == id) {

				allArray.splice(id, 1, {id: id, monto : parseInt(editMonto), nota : editInput});
				// allArray.splice(2, 1, nota = editInput);
				//updateValues(allArray)
				
				INIT()
				// allArray[i].nota = editInput;
				// allArray[i].monto = parseInt(editMonto);
				elemento.children[0].innerHTML = editInput;
				elemento.children[1].innerHTML = `$ ${parseInt(editMonto)}`;
				
				myChart.data.datasets[0].data.splice(id, 1, parseInt(editMonto));
				myChart.data.labels.splice(id, 1, editInput);
				myChart.update();
			}
		}

		this.reset();
		closeEditModal();
	});
}

function handleClose(id) {
	for (let i = 0; i < allArray.length; i++) {
		if (allArray[i].id == id) {
			allArray.splice(i, 1);
			let padre = document.querySelector("#historial");
			let elemento = document.getElementById(id);
			if (!elemento) {
				alert("El elemento seleccionado no existe");
			} else {
				padre = elemento.parentNode;
				padre.removeChild(elemento);
			}
		}
	}
}

*/
//Grafico de ChartJS

let ctx = document.getElementById("myChart").getContext("2d");
let myChart = new Chart(ctx, {
  type: "doughnut",
  data: {
    labels: [],
    datasets: [
      {
        label: "# of Votes",
        //data: ,
        data: [],
        //data: ,
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "red",
        ],
        borderWidth: 1,
      },
    ],
    hoverOffset: 4,
  },
  options: {
    responsive: true,
    // scales: {
    // 	y: {
    // 		beginAtZero: true,
    // 	},
    // },
  },
});

function pushValueChart(valueMonto, valueNota) {
  myChart.data.datasets[0].data.push(valueMonto);
  myChart.data.labels.push(valueNota);
  myChart.update();
}

function removeFirstItemFromArray(dni, trasacion) {
  trasacion.splice(dni, 1);
}
/*
function removeValueChart(valueMonto, valueNota){
	
}
*/

/*
//.shift()


function INIT() {
	allArray.forEach(addItem);
	updateValues()
}*/
