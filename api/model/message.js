const db = require('./db');

const MessageTable = {
  getMessages: (group_id, sort) => {
    return new Promise((resolve, reject) => {
      db.all(
        `SELECT M.Id, M.Content, M.CreatedAt, ,User.Username FROM Message AS M JOIN User ON User.Id = M.UserId WHERE M.GroupId = ? ORDER BY M.CreatedAt ${sort};`,
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
};

module.exports = MessageTable;
