const balance = document.getElementById("balance");
const moneyPlus = document.getElementById("money-plus");
const moneyMinus = document.getElementById("money-minus");
const list = document.getElementById("list");
const form = document.getElementById("form");
const text = document.getElementById("text");
const amount = document.getElementById("amount");
const notification = document.getElementById("notification");

const dummyTransactions = [
	/*
	{ id: 1, text: "Flower", amount: -20 },
	{ id: 2, text: "Salary", amount: 300 },
	{ id: 3, text: "Book", amount: -10 },
	{ id: 4, text: "Camera", amount: 150 },
	*/
];

let transactions = dummyTransactions;

// LocalStorage is not enabled in CodePen for security reasons
// const localStorageTransactions = JSON.parse(
//   localStorage.getItem("transactions")
// );
// let transactions =
//   localStorageTransactions !== null ? localStorageTransactions : [];

// function updateLocaleStorage() {
//   localStorage.setItem("transactions", JSON.stringify(transactions));
// }

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
	 pushValueChart(parseInt(transaction.amount),transaction.text);

      addTransactionDOM(transaction);
      updateValues();
	// console.log(transaction.text);
	 
	 
      // updateLocaleStorage();
      text.value = "";
      amount.value = "";
	 closeEditModal()
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
	
  // pushValueChart(parseInt(amount.value), text.value);

  item.innerHTML = `
          ${transaction.text}  ${transaction.id} <span>${sign}${Math.abs(transaction.amount)}</span
          ><button class="delete-btn" onclick="removeTransaction(${transaction.id /* transaction.text, transaction.amount*/}) 
		"><i class="fa fa-times"></i></button>
    `;
  list.appendChild(item);
}

function updateValues() {
  const amounts = transactions.map((transaction) => transaction.amount);
  const total = amounts
    .reduce((accumulator, value) => (accumulator += value), 0)
    .toFixed(2);
  const income = amounts
    .filter((value) => value > 0)
    .reduce((accumulator, value) => (accumulator += value), 0)
    .toFixed(2);
  const expense = (
    amounts
      .filter((value) => value < 0)
      .reduce((accumulator, value) => (accumulator += value), 0) * -1
  ).toFixed(2);
  balance.innerText = `$${total}`;
  moneyPlus.innerText = `$${income}`;
  moneyMinus.innerText = `$${expense}`;
}

function removeTransaction(id) {
  transactions = transactions.filter((transaction) => {
	  transaction.id === id
	  console.log(transaction.id)
	console.log(myChart.data.datasets[0].data);


	});



	// console.log(transaction.id);
	// updateLocaleStorage();
	
	
	init();
	//console.log(id, text, amount);
	/*
	myChart.data.datasets[0].data.splice(id, 1, parseInt(monto));
	myChart.data.labels.splice(id, 1, item);
	myChart.update();
  */
}

// Init
function init() {
  list.innerHTML = "";
  transactions.forEach(addTransactionDOM);
  console.log(addTransactionDOM)
  updateValues();
}
//console.log(transaction)

//onsole.log(init());

form.addEventListener("submit", addTransaction);

document.querySelector(".ButtonForm").addEventListener("click", showEditModal);

function showEditModal() {
    let containerEditModal = document.querySelector(".ModalForm");
    containerEditModal.style.display = "flex";
}

function closeEditModal() {
    let containerEditModal = document.querySelector(".ModalForm");
    containerEditModal.style.display = "none";
}

document.querySelector(".close").addEventListener("click", ()=>document.querySelector(".ModalForm").style.display = "none");

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
        labels: [''],
        datasets: [
            {
                label: "# of Votes",
                //data: ,
                data: [0.01], 
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


function pushValueChart (valueMonto, valueNota){
	myChart.data.datasets[0].data.push(valueMonto);
	myChart.data.labels.push(valueNota);
	myChart.update();
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
}
	*/