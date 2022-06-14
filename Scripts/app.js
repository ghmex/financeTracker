const balanceTotal = document.getElementById("balance");
const ingresos = document.getElementById("money-plus");
const egresos = document.getElementById("money-minus");
let list = document.getElementById("list");
const form = document.getElementById("form");
const text = document.getElementById("text");
const amount = document.getElementById("amount");
const notification = document.getElementById("notification");

document.addEventListener("DOMContentLoaded", () => {
    
    arrayActividades = JSON.parse(localStorage.getItem("transactions"));

    if (arrayActividades === null) {
        arrayActividades = [];
    } else {
        arrayActividades.map(element  => {
			addTransactionDOM(element);
			myChart.data.datasets[0].data.push(element.amount);
			myChart.data.labels.push(element.text);
			myChart.update();
			updateValues();
        });
    }
});

let todoElArray = [];

let transactions = todoElArray;
//console.log(transactions);


const localStorageTransactions = JSON.parse(
	localStorage.getItem("transactions")
);
	
transactions = localStorageTransactions !== null ? localStorageTransactions : [];
	
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
	let item = document.createElement("li");
  	const sign = transaction.amount < 0 ? "-" : "+";
  	item.classList.add(sign === "+" ? "plus" : "minus");

  	item.innerHTML = `
				${transaction.text}<span>${sign}${Math.abs(transaction.amount)}</span>
				<button class="delete-btn" onclick="removeTransaction(${
					transaction.id
				})"><i class="fa fa-times"></i></button>
				<button class="edit-btn" onclick="editTransaction(${
					transaction.id
				}), showEditModal()"><i class="fa-solid fa-pen-to-square"></i></button>
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

  //if(total <= 10000){

	  balanceTotal.innerText = `$${total}`;

  //}

//   let negativo = egreso * 100 / ingreso;

//   let positivo = negativo - ingreso;


//   alert(porcentaje)

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
	  console.log("Formulario editar");
	  var textEdit = document.querySelector("#textEdit").value;
   var amountEdit = document.querySelector("#amountEdit").value;
    console.log(textEdit, amountEdit);

	transactions.map(function (item) {
		if (item.id === id) {
			item.text = textEdit;
			item.amount = parseInt(amountEdit);
        }

        return item;
    });
	console.log(transactions)
	document.querySelector("#formEdit").reset();
	closeEditModal();
	updateValues();
	updateLocaleStorage();
	init();
	//e.preventDefault();
	
});
}

// Init
function init() {
  list.innerHTML = "";
  transactions.forEach(addTransactionDOM);
  // console.log(addTransactionDOM)
  updateValues();
}


form.addEventListener("submit", addTransaction);
document.querySelector(".ButtonForm").addEventListener("click", showModal);
document.querySelector(".close").addEventListener("click", closeModal);

function showModal() {
  let containerModal = document.querySelector(".ModalForm");
  containerModal.style.display = "flex";
}

function closeModal() {
  let containerModal = document.querySelector(".ModalForm");
  containerModal.style.display = "none";
}

document.querySelector(".closeEdit").addEventListener("click", closeEditModal);

function showEditModal() {
    let containerEditModal = document.querySelector(".ModalEdit");
    containerEditModal.style.display = "flex";
}

function closeEditModal() {
    let containerEditModal = document.querySelector(".ModalEdit");
    containerEditModal.style.display = "none";
}

//Grafico de ChartJS

let ctx = document.getElementById("myChart").getContext("2d");
let myChart = new Chart(ctx, {
    type: "doughnut",
    data: {
        labels: [],
        datasets: [
            {
                label: "",
                //data: ,
                data: [],
                //data: ,
                backgroundColor: [
                    "rgba(46, 204, 113, 1)",
					"rgba(239, 52, 52, 1)",
					"rgba(255, 99, 132, 1)",
                    "rgba(54, 162, 235, 1)",
                    "rgba(255, 206, 86, 1)",
                    "rgba(75, 192, 192, 1)",
                    "rgba(153, 102, 255, 0.6)",
                    "rgba(255, 159, 64, 0.6)",
                ],
                borderColor: [
                    /*"
			"rgba(75, 192, 192, 1)",
			"rgba(255, 206, 86, 1)",
        	"rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(153, 102, 255, 1)",
          "red",
	*/
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


