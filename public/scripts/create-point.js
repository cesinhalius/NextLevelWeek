function populateUFs() {
  const ufSelect = document.querySelector("select[name=uf]")

  fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then((res) => { return res.json() })
    .then(states => {


      for (const state of states) {

        ufSelect.innerHTML += `<option value= "${state.id}">${state.nome}</option>`
      }

    })
}

populateUFs()




function getCities(event) {
  const citySelect = document.querySelector("[name=city]")
  const stateInput = document.querySelector("[name=state]")

  const ufValue = event.target.value

  const indexOfSelectedState = event.target.selectedIndex
  stateInput.value = event.target.options[indexOfSelectedState].text

  const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/distritos`

  citySelect.innerHTML = ""
  citySelect.disabled = true

  fetch(url)
    .then((res) => { return res.json() })
    .then(cities => {


      for (const city of cities) {

        citySelect.innerHTML += `<option value= "${city.nome}">${city.nome}</option>`
      }
      citySelect.disabled = false

    })
}



document
  .querySelector("select[name=uf]")
  .addEventListener("change", getCities)




// items de coleta
//pegar todos os li´s


const itemsToCollect = document.querySelectorAll(".items-grid li")

for (items of itemsToCollect) {
  items.addEventListener("click", handleSelectedItem)
}

const collectItems = document.querySelector("[name=item]")

let selectedItems = []

function handleSelectedItem(event) {
  const itemLi = event.target

  // adicionando ou remover uma classe com javascript
  itemLi.classList.toggle("selected")

  const itemsId = itemLi.dataset.id



  // verifica se existem items selecionar se sim
  //pegar os items selecionados

  const alreadySelected = selectedItems.findIndex((item) => {
    const itemFound = item === itemsId
    return itemFound
  })


  // se ja estiver selecionado tirar da seleção

  if (alreadySelected >= 0) {
    const filterItems = selectedItems.filter(item => {
      const itemIsDifferent = item != itemsId
      return itemIsDifferent
    })
    selectedItems = filterItems
  } else {
    // se não estiver , 
    //adicionar a seleção
    selectedItems.push(itemsId)
  }
  // atualizar o campo escondido com items selecionados
  collectItems.value = selectedItems
}

