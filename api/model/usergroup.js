const db = require('./db')

const UserGroupTable = {
  addNewMember: (user_id, group_id) => {
    return new Promise((resolve, reject) => {
      db.run(
        `INSERT INTO UserGroup(UserId, GroupId) VALUES (?,?)`,
        [user_id, group_id],
        (err) => {
          if (err) {
            reject(err)
            return
          }
          resolve(true)
        }
      )
    })
  },
  getGroup: (user_id, group_id) => {
    return new Promise((resolve, reject) => {
      db.get(
        `SELECT * FROM UserGroup WHERE UserId = ? AND GroupId = ?`,
        [user_id, group_id],
        (err, row) => {
          if (err) {
            reject(err)
            return
          }
          resolve(row)
        }
      )
    })
  },
  deleteMember: (user_id, group_id) => {
    return new Promise((resolve, reject) => {
      db.run(
        `DELETE FROM UserGroup WHERE UserId = ? AND GroupId = ?`,
        [user_id, group_id],
        (err) => {
          if (err) {
            reject(err)
            return
          }
          resolve(true)
        }
      )
    })
  },
}

module.exports = UserGroupTable
