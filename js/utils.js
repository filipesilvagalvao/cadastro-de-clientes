
import { RequestType } from './classes.js'
// Função que gerencia o envio de dados ou exclusão de um cliente
export async function managerClient(e) {
    e.preventDefault() // previne recarregamento do formulário

    let TypeMethod = 'POST' // método padrão (cadastrar)
    let NumId = '' // ID do cliente (usado no DELETE)

    const name = document.querySelector('#nome').value
    const email = document.querySelector('#email').value

    // Se o botão clicado não for o de "Cadastrar", muda para DELETE
    if (!(e.currentTarget.innerText.toLowerCase() === 'cadastrar')) {
        TypeMethod = 'DELETE'
        NumId = e.currentTarget.id // ID do cliente a ser deletado
    }

    const user = new RequestType(name, email) // cria novo objeto com dados

    await user.request(TypeMethod, NumId) // envia a requisição (POST ou DELETE)

    listClients() // atualiza a lista de clientes na tela
    document.querySelector('form').reset() // limpa os campos do formulário
}

// Função que busca e exibe todos os clientes da API
export async function listClients() {
    const clients = new RequestType() // cria objeto (sem dados, pois GET não usa body)
    const data = await clients.request() // faz a requisição GET
    const ul = document.querySelector('.client-list')
    ul.innerHTML = '' // limpa a lista atual para evitar duplicatas

    // Cria os elementos da lista com os dados recebidos
    data.forEach((client) => {
        ul.innerHTML += `
            <li>
                <span id="nameClient">${client.nome}</span> 
                <span id="emailClient">${client.email}</span>
                <button id="${client.id}">X</button>
            </li>`;
    });

    // Adiciona o evento de clique aos botões (para deletar)
    document.querySelectorAll('button').forEach((button) => {
        button.addEventListener('click', managerClient)
    })
}

// Chama a função assim que a página carrega para exibir a lista inicial
listClients()