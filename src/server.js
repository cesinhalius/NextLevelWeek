const express = require('express')
const server = express()




// para pegar o bancodedados
const db = require('./database/db')

//configurar pasta publica

server.use(express.static("public"))

server.use(express.urlencoded({ extended: true }))

// utlizando template engine 

const nunjucks = require('nunjucks')
nunjucks.configure("src/views", {
  express: server,
  noCache: true
})


// configurar caminhos da minha aplicação
// pagina inicial


server.get('/', (req, res) => {
  return res.render("index.html", { title: "um titulo" })
})

server.get('/create-point', (req, res) => {

  // console.log(req.query)


  return res.render("create-point.html")
})
server.post('/savepoint', (req, res) => {
  //inserir dados no banco de dados

  const query = `INSERT INTO places (image, 
    name,
     address, 
     address2,  
     state, 
      city,
       items) VALUES (?,?,?,?,?,?,?);`
  const values = [
       req.body.image,
       req.body.name,
       req.body.address,
       req.body.address2,
       req.body.state,
       req.body.city,
       req.body.items
  ]
  function afterInsertData(err) {
    if (err) {
       console.log(err)
       return res.send("Erro no cadastro")
    }
    console.log("Cadastrado com sucesso")
    console.log(this)


    return res.render("create-point.html", { saved: true})
  }

  db.run(query, values, afterInsertData)
  


})




server.get('/search', (req, res) => {

  const search = req.query.search

  if(search == ""){
    // pesquisa vazia 
    return res.render("search-result.html", { total: 0 })
  }

  db.all(`SELECT * FROM places WHERE city LIKE '%${search}%'`, function (err, rows) {
    if (err) {
      return console.log(err)
    }
    const total = rows.length
    // mostrar a pagina html com dados di banco de dados
    return res.render("search-result.html", { places: rows, total: total })
  })

})


server.listen(3000);