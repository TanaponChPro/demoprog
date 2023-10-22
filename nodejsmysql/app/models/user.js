const db = require('../util/database');

module.exports = class User {
  constructor(name, email, password) {
    this.name = name;
    this.email = email;
    this.password = password;
    this.role = role;
    this.remark = this.remark;
  }

  static find(email) {
    return db.execute('SELECT * FROM users WHERE email = ?', [email]);
  }

  static save(user) {
    return db.execute(
      'INSERT INTO users (name, email, password, role, remark) VALUES (?, ?, ?, ?, ?)',
      [user.name, user.email, user.password, user.role, user.remark]
    );
  }

  static getMenu(role)  {
    return db.execute(
      `SELECT tbl_menu.* FROM demodb.tbl_menu 
      INNER JOIN demodb.tbl_permission ON tbl_menu.id = tbl_permission.menuID
      WHERE tbl_permission.roleID = ?`,
      [role]
    );
  }
  
};
