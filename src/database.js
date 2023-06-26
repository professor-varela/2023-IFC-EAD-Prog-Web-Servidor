const sqlite3 = require('sqlite3')
const { open } = require('sqlite')

let instance = null

async function getDatabaseInstance() {
  if (instance)
    return instance
  
  const db = await open({ 
    filename: 'database.sqlite', 
    driver: sqlite3.Database 
  })

  await db.exec(`
    CREATE TABLE IF NOT EXISTS todo (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      text TEXT NOT NULL
    )
  `)

  instance = db

  return db
}

module.exports = { getDatabaseInstance }