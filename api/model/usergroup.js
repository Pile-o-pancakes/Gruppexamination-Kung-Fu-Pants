const db = require('./db')

const UserGroupTable = {
  insert: (user_id, group_id) => {
    return new Promise((resolve, reject) => {
      db.run(
        `INSERT INTO UserGroup(UserId, GroupId) VALUES (?,?)`,
        [user_id, group_id],
        (err) => {
          console.log('UserGroupTable insert', err)

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
