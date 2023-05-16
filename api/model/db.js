const sqlite3 = require('sqlite3').verbose()

const users = [
  {
    username: 'marvan',
    password: 123456,
  },
  {
    username: 'william',
    password: 123456,
  },
  {
    username: 'per',
    password: 123456,
  },
  {
    username: 'henry',
    password: 123456,
  },
]

const connectDatabase = () => {
  console.log('Connected to database')
  const db = new sqlite3.Database('./db.sqlite3', (err) => {
    console.log(err)

    if (err) {
      console.log(err.message)
      return
    }

    console.log('Connected to database')
    createTables(db)
  })
  return db
}
const createTables = (db) => {
  const maxUsernameLength = 30
  const maxPasswordLength = 30
  const groupNameLength = 50
  const messageContentLength = 300
  return db.exec(
    `CREATE TABLE IF NOT EXISTS User(Id INTEGER PRIMARY KEY AUTOINCREMENT,Username VARCHAR(${maxUsernameLength}),Password VARCHAR(${maxPasswordLength}));
    CREATE TABLE IF NOT EXISTS Message (Id INTEGER PRIMARY KEY AUTOINCREMENT,Content VARCHAR(${messageContentLength}),UserId INTEGER, CreatedAt DATE,ModifiedAt DATE ,FOREIGN KEY (UserId) REFERENCES User(Id));
    CREATE TABLE IF NOT EXISTS Groups (Id INTEGER PRIMARY KEY AUTOINCREMENT, Name VARCHAR(${groupNameLength}), Owner INTEGER, FOREIGN KEY (Owner) REFERENCES User(Id));
    CREATE TABLE IF NOT EXISTS UserGroup (Id INTEGER PRIMARY KEY AUTOINCREMENT,UserId INTEGER,GroupId INTEGER,FOREIGN KEY (UserId) REFERENCES User(Id),FOREIGN KEY (GroupId) REFERENCES Groups(Id));`,
    (err) => {
      if (err) {
        console.log(err)
        return
      }
      db.serialize(() => {
        db.all(`SELECT Id FROM User`, (err, row) => {
          if (err) {
            console.log(err)
          }
          if (row.length === 0) {
            for (let index = 0; index < users.length; index++) {
              const username = users[index].username
              const password = users[index].password
              addUser(db, username, password)
            }
          }
        })
      })
    }
  )
}

const addUser = (db, username, password) => {
  return db.run(
    `INSERT INTO User (Username, Password) VALUES ('${username}', '${password}')`,
    (err) => {
      if (err) {
        console.log(err.message)
        return
      }
      console.log('User added')
    }
  )
}
const db = connectDatabase()

module.exports = db
