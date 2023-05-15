const sqlite3 = require('sqlite3').verbose()

const db = new sqlite3.Database('./db/Chinook_Sqlite.sqlite')

const connectDatabase = () => {
  const db = new sqlite3.Database('./db/Chinook_Sqlite.sqlite')
  db.serialize(() => {
    db.each(
      'SELECT name FROM sqlite_master WHERE type="table"',
      (err, table) => {
        console.log(table)
      }
    )
  })

  return db
}
