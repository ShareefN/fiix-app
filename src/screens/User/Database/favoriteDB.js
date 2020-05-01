import SQLite from "react-native-sqlite-storage";

SQLite.DEBUG(true);
SQLite.enablePromise(true);

const database_name = "FiiX_local_favorites.db";
const database_version = "1.0";
const database_displayname = "FiiX Favorites";
const database_size = 200000;

export default class Favorites {
  initDB() {
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
            db.executeSql("SELECT 1 FROM Favorites")
              .then(() => {
                console.log("DB is ready");
              })
              .catch(Err => {
                db.transaction(tx => {
                  tx.executeSql(
                    "CREATE TABLE IF NOT EXISTS Favorites (contractorId, contractorName, contractorImage)"
                  );
                })
                  .then(() => {
                    console.log("Favorites DB successfully created");
                  })
                  .catch(err => {
                    console.log("error creating DB ", err);
                  });
              });
            resolve(db);
          });
        })
        .catch(err => console.log(err));
    }).catch(err => console.log(err));
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

  getFavorites() {
    return new Promise(resolve => {
      const favorites = [];
      this.initDB();
    })
      .then(db => {
        db.transaction(tx => {
          tx.executeSql("SELECT * FROM Favorites").then(([tx, results]) => {
            var len = results.rows.length;
            for (var i = 0; i < len; i++) {
              let row = results.rows.item(i);
              const { contractorId, contractorName, contractorImage } = row;
              favorites.push({ contractorId, contractorName, contractorImage });
            }
            resolve(favorites);
          });
        })
          .then(result => {
            this.closeDatabase(db);
          })
          .catch(err => console.log(err));
      })
      .catch(err => console.log(err));
  }

  addFavorite(contractor) {
    return new Promise(resolve => {
      this.initDB()
        .then(db => {
          db.transaction(tx => {
            tx.executeSql("INSERT INTO Favorites VALUES (?, ?, ?)", [
              contractor.id,
              contractor.name,
              contractor.image
            ]).then(([tx, results]) => {
              resolve(results);
            });
          });
        })
        .then(result => {
          this.closeDatabase(db);
        })
        .catch(err => console.log(err));
    }).catch(err => console.log(err));
  }
}
