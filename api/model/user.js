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
  getUserPostedMessages: (id) => {
    return new Promise((resolve, reject) => {
      db.all(`SELECT * FROM Message WHERE UserId = ?`, [id], (err, rows) => {
        if (err) {
          reject(err);
        }
        resolve(rows);
      });
    });
  },
};

module.exports = UserTable;
