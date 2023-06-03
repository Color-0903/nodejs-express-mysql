const mysql = require("mysql");
const dbConfig = require("../config/db.config.js");

class db {
  //
  constructor() {
    this.connection = mysql.createPool({
      host: dbConfig.HOST,
      user: dbConfig.USER,
      password: dbConfig.PASSWORD,
      database: dbConfig.DB,
    });
  }

  //
  close() {
    this.connection.end((error) => {
      if (error) {
        console.error("Error closing database pool:", error);
        return;
      }
      console.log("Closed database conection!");
    });
  }

  //excuteQuery
  async excuteQuery(sql) {
    try {
      const result = await new Promise((resolve, reject) => {
        this.connection.query(sql, (error, results, fields) => {
          if (error) {
            console.error("Error executing query:", error);
            reject(error);
            return;
          }
          resolve(results);
        });
      });
      this.close();
      return result;
    } catch (error) {
      console.error("Error executing query:", error);
      throw error;
    } 
  }

  //excuteNonQuery
  async excuteNonQuery(sql) {
    try {
      const result = await new Promise((resolve, reject) => {
        this.connection.query(sql, (error, results, fields) => {
          if (error) {
            reject("Error executing query:", error);
            return;
          }
          resolve("excuteNonQuery is success!");
        });
      });
      this.close();
      return result;
    } catch (error) {
      console.error("Error executing query:", error);
      throw error;
    } 
  }
}

module.exports = db;
