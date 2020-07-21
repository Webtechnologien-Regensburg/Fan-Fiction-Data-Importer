# Fan-Fiction Data-Importer

Mit diesem Skript können Sie den Import der im *JSON*-Format vorliegenden GeEschichten in die benötigte SQLite-Datenbank automatisieren. Wir haben Ihnen dazu einen Teil des Skripts bereits vorgegeben. Sie müssen noch eine geeignete Datenbankstruktur erstellen und die SQL-Querys zum Eintragen der einzelnen Geschichten schreiben. Aktuell erstellt das Skript eine leere SQLite-Datenbank, iteriert über einen angegebenen Ordner und wandelt die dortigen Dateien in JavaScript-Objekte um, die einzelne *Fan Fiction*-Geschichten repräsentieren. Für jede Story wird in dem zentralen Modul der Anwendung (`index.js`) einmal die *Callback*-Methode `onStoryParsed` aufgerufen. Im Parameter finden Sie die jeweilige Story, die bereits an das `DatabaseImporter`-Modul weitergeben wird. Dort müssen die Informationen aus dem JavaScript-Objekt dann in die SQLite-Datenbank übertragen werden.

## Vorbereitung

- Laden Sie den Quellcode über diesen Link herunter. 
- Führen Sie im Projektverzeichnis, in einer Kommandozeile, den Befehl `npm install` aus, um alle notwendigen Abhängigkeiten zu installieren.
- Erstellen Sie einen Ordner `data` im Projektverzeichnis und kopieren Sie die bereitgestellten JSON-Dateien dort hinein

## Starten des Import-Skripts

- Führen Sie im Projektverzeichnis, in einer Kommandozeile, den Befehl `npm start` aus
- Der Skript erstellt eine leere SQLite-Datenbank (`db.sqlite`) und versucht alle JSON-Dateien aus dem `data`-Verzeichnis zu importieren

### Filter

- Der Import-Vorgang wird in `index.js` in der Methode `onDatabaseReady` gestartet. Hier können Filter in Form von Eigenschaften und Werten übergeben werden. Stories, die diesen Filtern entsprechen, werden **nicht importiert**. 

### TODOs

- Ergänzen Sie im Modul `DatabaseImporter.js` die notwendige Funktionalität zum Erstellen eines geeigneten Datenbankschemas
- Vervollständigen Sie im Modul `DatabaseImporter.js` die Methode zum Überführen des JavaScript-OBjekts in die Datenbank
- Ergänzen Sie ggf. weitere Filter um die importierten Stories, z.B. nach Qualitätskritierien, weiter einzuschränken