const sqlite = require('sqlite3').verbose()

// criar o objeto do banco de dados

const db = new sqlite.Database("./src/database/database.db")

module.exports = db; 
// utilizar o objeto do banco de dados
//db.serialize(() => {
  // criar tabela
 /* db.run(`
        CREATE TABLE IF NOT EXISTS places (
                 id  INTEGER PRIMARY KEY AUTOINCREMENT,
                 image TEXT,
                 name TEXT,
                 address TEXT,
                 address2 TEXT,
                 state TEXT,
                 city TEXT,
                 items TEXT
        );
  `)
  
  // 2. Inserir dados
  const query = `INSERT INTO places (image, name, address, address2,  state,  city, items) VALUES (?,?,?,?,?,?,?);`
  const values = [
    "https://images.unsplash.com/photo-1516992654410-9309d4587e94?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80",
    "Papersider",
    "Guilherme Gemballa, Jardim América",
    "Número 260",
    "Santa Catarina",
    "Rio do Sul",
    "Papéis e Papelão"
  ]
  function afterInsertData(err) {
    if (err) {
      return console.log(err)
    }
    console.log("Cadastrado com sucesso")
    console.log(this)
  }

  db.run(query, values, afterInsertData)





db.all(`SELECT * FROM places`, function (err, rows) {
  if (err) {
    return console.log(err)
  }

  console.log("aqui estão todos os dados")
  console.log(rows)
})


   // deletar um dado
   db.run(`DELETE FROM places WHERE id = ?`, [7], function (err) {
    if (err) {
      return console.log(err)
    }

    console.log("Registro deletado com sucesso")
  })

    
})
 */ 