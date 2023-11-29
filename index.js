const express = require("express")
const exphbs = require("express-handlebars")
const mysql = require("mysql2")

const app = express()

app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')

app.use(express.static('public'))

app.use(express.urlencoded({
    extended: true
}))

app.use(express.json())

app.post('/completar', (requisicao, resposta) => {
    const id = requisicao.body.id
    
    const sql = `
        UPDATE tarefas
        SET completa = '1'
        WHERE id = ${id}
        `

        conexao.query(sql, (erro) => {
            if (erro) {
                return console.log(erro)
            }

            resposta.redirect('/')
        })
})

app.post('/descompletar', (requisicao, resposta) => {
    const id = requisicao.body.id

    console.log(id)

    const sql = `
        UPDATE tarefas
        SET completa = '0'
        WHERE id = ${id}
    `

    conexao.query(sql, erro => {
        if (erro) {
            return console.log(erro)
        }

        resposta.redirect('/')
    })
})

app.post('/criar', (requisicao, resposta) =>{
    const descricao = requisicao.body.descricao
    const completa = 0

    const sql = `
    INSERT INTO tarefas(descricao, completa)
    VALUES ('${descricao}', '${completa}')
    `

    conexao,query(sql, (erro => {
        if (erro) {
            console.log(erro)
        }

        resposta.redirect('/')
    }))
})

app.get('/ativas', (requisicao, resposta) => {
    
})

app.get('/', (requisicao, resposta) => {
    const sql = 'SELECT * FROM tarefas'

    conexao.query(sql, (erro, dados) => {
        if (erro) {
            return console.log(erro)
        }

        console.log(dados)

        const tarefas = dados.map((dado) =>{
            return {
                id: dado.id,
                descricao: dado.descricao,
                completa: dados.completa === 0 ? false : true
            }
        })

        const tarefasAtivas = tarefas.filter((tarefa) => {
            return tarefa.completa === false && tarefa
        })

        const quantidadeTarefaAtivas = tarefasAtivas.legth

        resposta.render('home', {tarefas, quatidadeTarefasSAtivas})
    })
})

const conexao = mysql.createConnection({
    host: "localhost",
    user:"root",
    password:"root",
    database: "todoapp",
    port: 3306
})

conexao.connect((erro) => {
    if (erro) {
        return console.log(erro)
    }
})

console.log("LALALALASQL")

app.listen(3000, () => {
    console.log("Servidor rodando na porta 3000!")
})