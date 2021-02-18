
var addArBut = document.getElementById('add');
var addBut = document.getElementById('addBut');

addBut.onclick = () => addItem();

addArBut.onclick = function (){
    let addArea = document.getElementById('addArea');
    switch(addArBut.innerText){
        case "+": 
        addArea.style.display = "table";
        addArBut.innerText = "-";
        break;
        case "-":
        addArea.style.display = "none";
        addArBut.innerText = "+";
        break;
    }
}

function preventD(event){
  event.preventDefault()
}

function init() {
    if(document.querySelector("tbody").innerText != ""){
        document.querySelector("table").style.display = 'table';
    } else {
        document.querySelector("table").style.display = 'none';
    }
}

function attTable(){
    fetch("http://localhost:4000/api/all").then(res => {
        return res.json();
    }).then(json => {
    let prodElemments = '';

    let itens = JSON.parse(json);
    itens.forEach((item) => {
        let splittedDate = item.data.split("-")
        let fomatedDate = `${splittedDate[2]}/${splittedDate[1]}/${splittedDate[0]}`;

        let prodElement = `
          <tr id='${item.id}'>
            <th class="product" >${item.nome}</th>
            <td>${item.quantidade}</td>
            <td>${fomatedDate}</td>
            <td class="settings">
              <button class="prodBut " onclick="editItem('${item.id}')">
                <img src="./src/imagens/engrenagem.png" alt="Editar" class="editar">
              </button>
              <button class="prodBut" onclick="deleteItem('${item.id}')">X</button>
            </td>
          </tr>`

        prodElemments += prodElement;
        })

        document.getElementById("table").innerHTML = prodElemments;
        init();
        console.log(itens);
    })
}

function addItem(){
    let nome = document.getElementById("nome").value;
    let quantidade = document.getElementById("quantidade").value;
    let data = document.getElementById("data").value;
    
    let item = {nome, quantidade, data};
    
    const options = {
        method: "POST",
        headers: new Headers({'content-type': 'application/json'}),
        body: JSON.stringify(item)
    }

    fetch("http://localhost:4000/api/new", options).then(res => {
        attTable();

        document.getElementById("nome").value = '';
        quantidade = document.getElementById("quantidade").value = '';
        data = document.getElementById("data").value = '';
    })
}

function editItem(id) {
  const editArea = document.querySelector('.editArea').classList;
  if (editArea.contains('out')) {
    editArea.remove('out')
  }else{
    editArea.add('out')
    return
  }

  fetch("http://localhost:4000/api/edit/" + id).then(res => {
    return res.json()
  }).then(test => {
    let inputName = document.querySelector('.editField input[type=text]');
    let inputNumber = document.querySelector('.editField input[type=number]');
    let inputDate = document.querySelector('.editField input[type=date]');

    let saveBtn = document.querySelector('.editBut');

    inputName.value = test[0].nome;
    inputNumber.value = test[0].quantidade;
    inputDate.value = test[0].data;

    saveBtn.onclick = () => {
      saveEdition(test[0].id)
    }

    console.log(test);
  })
}

function saveEdition(OldItemId){
  let nome = document.querySelector('.editField input[type=text]').value;
  let quantidade = document.querySelector('.editField input[type=number]').value;
  let data = document.querySelector('.editField input[type=date]').value;

  let newItem = {nome, quantidade, data};

  console.log(newItem);

  const options = {
    method: "POST",
    headers: new Headers({'content-type': 'application/json'}),
    body: JSON.stringify(newItem)
  }

  fetch("http://localhost:4000/api/new", options).then(res => {
    attTable();
    editItem();
  })

  deleteItem(OldItemId)
}

function deleteItem(id){
    fetch('/api/' + id, {method: 'DELETE'}).then(res => {
        res.text().then(itemId => {
            console.log(itemId)
            document.getElementById(itemId).remove();
            init();
        })
    })
}

function onSearch(){
  let searchInput = document.querySelector('#pesq').value;
  searchInput = searchInput.toLowerCase();
  let w = document.getElementsByClassName('product');

  for (i = 0; i < w.length; i++){
    if (!w[i].innerHTML.toLowerCase().includes(searchInput)) {
      w[i].parentElement.classList.add('out');
      init();
    } else {
      w[i].parentElement.classList.remove('out');
      init();
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  attTable();
  init();
})

