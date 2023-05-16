const db = require('./db')
const findUserById = (id) => {
  return new Promise((resolve, reject) => {
    db.get(`SELECT * FROM User WHERE Id = ?`, [Number(id)], (err, row) => {
      if (err) {
        reject(err)
      }
      resolve(row)
    })
  })
}

module.exports = {
  findUserById,
}
