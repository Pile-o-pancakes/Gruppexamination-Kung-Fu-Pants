const db = require('./db');

const UserTable = {
  findUserById: (id) => {
    return new Promise((resolve, reject) => {
      db.get(`SELECT * FROM User WHERE Id = ?`, [Number(id)], (err, row) => {
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
  updateUserPostedMessages: (id,update) => {
    return new Promise((resolve, reject) => {
      db.run(`UPDATE Message SET content = ? WHERE Id = ?`, [update, id], (err, rows) => {
        if (err) {
            reject(err);
          }
          db.all('SELECT * FROM Message WHERE Id = ?', [id], (err, rows) => {
            if (err) {
              reject(err);
            }
            resolve(rows);
        });
      });
    });
  },
  getUserSpecificMessage: (id) => {
    return new Promise((resolve, reject) => {
      db.all(`Select * FROM Message WHERE Id = ?`, [id], (err, rows) => {
        if (err) {
          reject(err);
        }
        resolve(rows);
      });
    });
  },
  deleteUserPostedMessages: (id) => {
    return new Promise((resolve, reject) => {
      db.run(`DELETE FROM Message WHERE Id = ?`, [id], (err, rows) => {
        if (err) {
          reject(err);
        }
        resolve(rows);
      });
    });
  },
};

module.exports = UserTable;
