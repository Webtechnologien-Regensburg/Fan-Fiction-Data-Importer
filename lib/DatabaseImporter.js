/* eslint-env node */

import sqlite3 from "sqlite3";

// Über diese Variable ist die Datenbank innerhalb des Moduls zugänglich
var db;

function createDatabaseSchema(callback) {
  // TODO: Erzeugen Sie hier ihr Datenbankschema in der erstellen SQLite-Datenbank
  callback();
}

class DatabaseImporter {

  prepare(dbPath, callback) {
    db = new sqlite3.Database(dbPath, function() {
      createDatabaseSchema(callback);
    });
  }

  importStory(story) {
    // TODO: Speichern Sie die übergebene Story in der vorbereiteten Datenbank
  }

}

export default new DatabaseImporter();