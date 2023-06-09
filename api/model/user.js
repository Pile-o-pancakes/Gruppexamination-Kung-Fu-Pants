const db = require('./db');

const UserTable = {
  findUserById: (id) => {
    return new Promise((resolve, reject) => {
      db.get(`SELECT * FROM User WHERE Id = ?`, [id], (err, row) => {
        if (err) {
          reject(err);
        }
        resolve(row);
      });
    });
  },
};

module.exports = UserTable;
