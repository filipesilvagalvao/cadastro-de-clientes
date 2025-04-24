//cadastras clientes, lista e excluir
//usar a API do CrudCrud
//consumo de API com fetch
//usar requisições GET, POST e DELETE
const clientList = document.querySelector('.client-list')
function setClients(e) {
    e.preventDefault()
    const clientName = document.querySelector('#nome').value
    const clientEmail = document.querySelector('#email').value

    if (clientName && clientEmail) {
        fetch('https://crudcrud.com/api/8f3c9d5b42574949a2aba6957cdefaa4/clientes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ nome: clientName, email: clientEmail })
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Erro na requisição: ${response.status}`);
                }
                return response.json();
            })
            .then((client) => {
                const li = document.createElement('li')
                li.innerHTML = `<span id="nameClient">${client.nome}</span> <span id="emailClient">${client.email}</span><button onclick="removeClient('${client._id}',this)">X</button>`
                clientList.appendChild(li)
            })
            .catch(error => console.error(error));
    }
}

document.querySelector('#register-btn').addEventListener('click', setClients)

function removeClient(id,e) {
    fetch(`https://crudcrud.com/api/8f3c9d5b42574949a2aba6957cdefaa4/clientes/${id}`, {
        method: 'DELETE'
    })
    .catch(error => console.error(error));

    e.closest('li').remove();
}

function showClients() {
    clientList.innerHTML = ''
    fetch('https://crudcrud.com/api/8f3c9d5b42574949a2aba6957cdefaa4/clientes')
        .then(response => {
            if (!response.ok) {
                throw new Error(`Erro na requisição: ${response.status}`);
            }
            return response.json();
        })
        .then((data) => {
            data.forEach((client) => {
                const li = document.createElement('li')
                li.innerHTML = `<span id="nameClient">${client.nome}</span> <span id="emailClient">${client.email}</span><button onclick="removeClient('${client._id}')">X</button>`
                clientList.appendChild(li)
            });
        })
        .catch(error => console.error(error));
}



