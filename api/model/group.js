const db = require('./db')

const GroupTable = {
  createGroup: (name, user_id) => {
    return new Promise((resolve, reject) => {
      db.get(
        `INSERT INTO Groups(Name , Owner) VALUES (?,?)`,
        [name, user_id],
        (err, row) => {
          if (err) {
            reject(err)
            return
          }
          resolve(true)
        }
      )
    })
  },

  findGroupByName: (name) => {
    return new Promise((resolve, reject) => {
      db.get('SELECT * FROM Groups WHERE Name = ?', [name], (err, row) => {
        if (err) {
          reject(err)
          return
        }
        resolve(row)
      })
    })
  },
}

module.exports = GroupTable
