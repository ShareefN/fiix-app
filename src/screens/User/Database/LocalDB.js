import SQLite from "react-native-sqlite-storage";

SQLite.DEBUG(true);
SQLite.enablePromise(true);

const database_name = "FiiX_local.db";
const database_version = "1.0";
const database_displayname = "FiiX List";
const database_size = 200000;

export default class Database {
  intiDB() {
    let db;
    return new Promise(resolve => {
      SQLite.echoTest()
        .then(() => {
          console.log("Opening DB");
          SQLite.openDatabase(
            database_name,
            database_version,
            database_displayname,
            database_size
          ).then(DB => {
            db = DB;
            console.log("DB Open");
            db.executeSql("SELECT 1 FROM List")
              .then(() => {
                console.log("DB is ready");
              })
              .catch(err => {
                db.transaction(tx => {
                  tx.executeSql(
                    "CREATE TABLE IF NOT EXISTS List (itemId, userId, itemTitle, itemStatus)"
                  );
                })
                  .then(() => {
                    console.log("List DB successfully created");
                  })
                  .catch(err => {
                    console.log("Error creating DB", err);
                  });
              });
            resolve(db);
          });
        })
        .catch(err => {
          console.log(err);
        });
    }).catch(err => {
      console.log("Echotest failed");
    });
  }

  closeDatabase(db) {
    if (db) {
      console.log("Closing DB");
      db.close()
        .then(status => {
          console.log("DB Closed");
        })
        .catch(err => console.log("Error closing DB ", err));
    } else {
      console.log("DB was never opened");
    }
  }

  getList(userId) {
    return new Promise(resolve => {
      const list = [];
      this.intiDB()
        .then(db => {
          db.transaction(tx => {
            tx.executeSql("SELECT * FROM List WHERE userId = ?", [userId]).then(
              ([tx, results]) => {
                var len = results.rows.length;
                for (let i = 0; i < len; i++) {
                  let row = results.rows.item(i);
                  const { itemId, itemTitle, itemStatus } = row;
                  list.push({ itemId, itemTitle, itemStatus });
                }
                resolve(list);
              }
            );
          })
            .then(result => {
              this.closeDatabase(db);
            })
            .catch(err => console.log(err));
        })
        .catch(err => console.log(err));
    });
  }

  addItem(item) {
    return new Promise(resolve => {
      this.intiDB().then(db => {
        db.transaction(tx => {
          tx.executeSql("INSERT INTO List VALUES (?, ?, ?, ?)", [
            item.itemId,
            item.userId,
            item.itemTitle,
            item.itemStatus
          ]).then(([tx, results]) => {
            resolve(results);
          });
        })
          .then(result => {
            this.closeDatabase(db);
          })
          .catch(err => console.log(err));
      });
    }).catch(err => console.log(err));
  }

  updateItemStatus(itemId, status) {
    return new Promise(resolve => {
      this.intiDB()
        .then(db => {
          db.transaction(tx => {
            tx.executeSql("UPDATE List SET itemStatus = ? WHERE itemId = ?", [
              status,
              itemId
            ]).then(([tx, results]) => {
              resolve(results);
            });
          })
            .then(result => {
              this.closeDatabase(db);
            })
            .catch(err => console.log(err));
        })
        .catch(err => console.log(err));
    });
  }

  deleteItem(itemId) {
    return new Promise(resolve => {
      this.intiDB().then(db => {
        db.transaction(tx => {
          tx.executeSql("DELETE FROM List WHERE itemId = ?", [itemId])
            .then(([tx, results]) => {
              resolve(results);
            })
            .then(result => {
              this.closeDatabase(db);
            })
            .catch(err => console.log(err));
        });
      });
    });
  }

  delete() {
    return new Promise(resolve => {
      this.intiDB()
        .then(db => {
          db.transaction(tx => {
            tx.executeSql("DROP TABLE List").then(([tx, results]) => {
              resolve(results);
            });
          })
            .then(result => this.closeDatabase(db))
            .catch(err => console.log(err));
        })
        .catch(err => console.log(err));
    });
  }
}
