/* 
Instale as bibliotecas e o cliente de API:
npm init
npm i express
Procure pela extensão RapidAPI Client no VSCode.
*/
// Para executar a API no terminal: node index.js
// Link para testar a API: http://localhost:3000/rota
const express = require("express")
const app = express()
const port = 3000
app.use(express.json()) 
const fs = require('fs') 

app.post("/famosos", (req, res) => {
    const famoso = req.body
    try {

        const bd = JSON.parse(fs.readFileSync("famosos.json", "utf8"))
        bd.push(famoso)
        fs.writeFileSync("famosos.json", JSON.stringify(bd), "utf8")
        res.status(201).json({resposta: "Famoso cadastrados com sucesso!"})
    } catch (erro) {
        res.status(500).json({erro: erro.message})
    }
})


app.get("/famosos", (req, res) => {
    try {
        const famoso = JSON.parse(fs.readFileSync("famosos.json", "utf8"))
        res.status(200).json({resposta: famoso})
    } catch (erro) {
        res.status(500).json({erro: erro.message})
    }
})

app.get("/famosos/:id", (req, res) => {
    const id = req.params.id
    try {
        const famosos = JSON.parse(fs.readFileSync("famosos.json", "utf8"))
        const famoso = famosos.find((famoso) => famoso.id == id)
        if(!famoso) {
            return res.status(404).json({erro: "famoso não existe no BD!"})
        }
        res.status(200).json({resposta: famoso})
    } catch (erro) {
        res.status(500).json({erro: erro.message})
    }
})

app.delete("/famosos/:id", (req, res) => {
    const id = req.params.id
    try {
        const bd = JSON.parse(fs.readFileSync("famosos.json", "utf8"))
        const indiceFamoso = bd.findIndex((famoso) => famoso.id == id)
        if (indiceFamoso == -1) {
            return res.status(404).json({erro: "O famoso não existe"})
        }
        bd.splice(indiceFamoso, 1)
        fs.writeFileSync("famosos.json", JSON.stringify(bd), "utf8")
        res.status(200).json({resposta: "famoso removido com sucesso!"})
    } catch (error){
        res.status(500).json({erro: error.message})
    }
})

// Execução da API:
app.listen(port, ()=>{
    console.log("API rodando na porta " + port)
})