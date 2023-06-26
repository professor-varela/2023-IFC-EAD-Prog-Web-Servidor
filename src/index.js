const express = require('express')
const app = express()
const { getDatabaseInstance } = require("./database.js")

// Create
// Read
// Update
// Delete

async function main() {
  app.use("/", express.static(__dirname + "/../public"))

  app.get('/create', async function (req, res) {
    const db = await getDatabaseInstance()
    const { text } = req.query
    const result = await db.run(`INSERT INTO todo(text) VALUES(?)`, text)
    res.send(result)
  })

  app.get('/read', async function (req, res) {
    const db = await getDatabaseInstance()
    const { id } = req.query
    if (id) {
      const result = await db.all(`SELECT * FROM todo WHERE id=?`, id)
      res.send(result)
      return
    }
    const result = await db.all(`SELECT * FROM todo`)
    res.send(result)
  })

  app.listen(3000, function() {
    console.log(`⚡ Server is running on 3000`)
  })
}

main()