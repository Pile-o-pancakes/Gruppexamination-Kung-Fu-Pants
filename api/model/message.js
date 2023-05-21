const db = require('./db');

const MessageTable = {
  getMessages: (group_id, sort) => {
    return new Promise((resolve, reject) => {
      db.all(
        `SELECT M.Id, M.Content, M.CreatedAt,M.ModifiedAt ,User.Username FROM Message AS M JOIN User ON User.Id = M.UserId WHERE M.GroupId = ? ORDER BY M.CreatedAt ${sort};`,
        [group_id],
        (err, row) => {
          if (err) {
            reject(err);
          }
          resolve(row);
        }
      );
    });
  },
  createMessage: (user_id, group_id, message) => {
    return new Promise((resolve, reject) => {
      const createdAt = new Date().toISOString();
      db.get(
        'INSERT INTO Message(UserId, GroupId, Content, CreatedAt, ModifiedAt) VALUES (?,?,?,?,?)',
        [user_id, group_id, message, createdAt, createdAt],
        (err, row) => {
          if (err) {
            reject(err);
          } else {
            resolve(true);
          }
        }
      );
    });
  },
  getUserPostedMessages: (id) => {
    return new Promise((resolve, reject) => {
      db.all(
        `SELECT M.Id,M.GroupId, M.Content, M.CreatedAt, M.ModifiedAt FROM Message AS M WHERE UserId = ?`,
        [id],
        (err, rows) => {
          if (err) {
            reject(err);
          }
          resolve(rows);
        }
      );
    });
  },
  update: (id, update) => {
    return new Promise((resolve, reject) => {
      db.serialize(() => {
        db.get('SELECT * FROM Message WHERE Id = ?', [id], (err, row) => {
          if (err) {
            reject(err);
          }
          if (!row) {
            resolve(false);
          } else {
            db.serialize(() => {
              const modifiedAt = new Date().toISOString();
              db.run(
                `UPDATE Message SET Content = ? , ModifiedAt =? WHERE Id = ?`,
                [update, modifiedAt, id],
                (err) => {
                  if (err) {
                    reject(err);
                  }
                  resolve(true);
                }
              );
            });
          }
        });
      });
    });
  },
  delete: (id, update) => {
    return new Promise((resolve, reject) => {
      db.serialize(() => {
        db.get('SELECT * FROM Message WHERE Id = ?', [id], (err, row) => {
          if (err) {
            reject(err);
          }
          if (!row) {
            resolve(false);
          } else {
            db.serialize(() => {
              db.run(
                `DELETE FROM Message WHERE Id = ?,?`,
                [update, id],
                (err) => {
                  if (err) {
                    reject(err);
                  }
                  resolve(true);
                }
              );
            });
          }
        });
      });
    });
  },
};

module.exports = MessageTable;
