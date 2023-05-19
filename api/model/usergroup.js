const db = require('./db');

const UserGroupTable = {
  addNewMember: (user_id, group_id) => {
    return new Promise((resolve, reject) => {
      db.run(
        `INSERT INTO UserGroup(UserId, GroupId) VALUES (?,?)`,
        [user_id, group_id],
        (err) => {
          if (err) {
            reject(err);
            return;
          }
          resolve(true);
        }
      );
    });
  },
  getGroup: (user_id, group_id) => {
    return new Promise((resolve, reject) => {
      db.get(
        `SELECT * FROM UserGroup WHERE UserId = ? AND GroupId = ?`,
        [user_id, group_id],
        (err, row) => {
          if (err) {
            reject(err);
            return;
          }
          resolve(row);
        }
      );
    });
  },
  getAllMembers: (group_id) => {
    return new Promise((resolve, reject) => {
      db.all(
        `SELECT U.Username , U.Id  FROM UserGroup as UG JOIN User as U ON UG.UserId = U.Id WHERE UG.GroupId = ? `,
        [group_id],
        (err, rows) => {
          if (err) {
            reject(err);
            return;
          }
          resolve(rows);
        }
      );
    });
  },
  deleteMember: (user_id, group_id) => {
    return new Promise((resolve, reject) => {
      db.run(
        `DELETE FROM UserGroup WHERE UserId = ? AND GroupId = ?`,
        [user_id, group_id],
        (err) => {
          if (err) {
            reject(err);
            return;
          }
          resolve(true);
        }
      );
    });
  },
  getUserJoinedGroups: (id) => {
    return new Promise((resolve, reject) => {
      db.all(`SELECT * FROM UserGroup INNER JOIN Groups ON UserGroup.GroupId=Groups.Id WHERE UserId = ? `, [id], (err, rows) => {
        if (err) {
          reject(err);
        }
        resolve(rows);
      });
    });
  },
};

module.exports = UserGroupTable;
