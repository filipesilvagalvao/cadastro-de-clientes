// Classe responsável por fazer requisições à API (GET, POST, PUT e DELETE)
export class RequestType {
    #api // propriedade privada com o endpoint da API

    constructor(name, email) {
        this.#api = 'https://680bcc3f2ea307e081d25cc5.mockapi.io/clientes' // URL da API
        this.name = name // nome do cliente
        this.email = email // email do cliente
    }

    // Método genérico de requisição com método (GET, POST, PUT ou DELETE) e ID opcional
    async request(typeMethod = 'GET', id = '') {
        // Se a requisição for POST ou PUT (precisa de body e headers)
        if (typeMethod !== 'DELETE' && typeMethod !== 'GET') {
            try {
                const response = await fetch(this.#api, {
                    method: typeMethod,
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ nome: this.name, email: this.email }) // corpo da requisição
                })

                const data = await response.json() // converte resposta para objeto
                return data // retorna os dados recebidos
            } catch (erro) {
                console.error('Deu erro:', erro) // erro no POST ou PUT
            }

        } else {
            // Se for GET ou DELETE
            try {
                // Adiciona o ID à URL, se fornecido (usado para DELETE ou GET específico)
                const url = id ? `${this.#api}/${id}` : this.#api

                const response = await fetch(url, {
                    method: typeMethod
                })

                let data = {}
                // Se não for resposta vazia (ex: DELETE com status 204), converte JSON
                if (response.status !== 204) {
                    data = await response.json()
                }

                return data // retorna os dados ou objeto vazio
            } catch (erro) {
                console.error('Deu erro:', erro) // erro no GET ou DELETE
            }
        }
    }
}