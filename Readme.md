# Fan-Fiction Data-Importer

Mit diesem Skript können Sie den Import der im *JSON*-Format vorliegenden Geschichten in die benötigte SQLite-Datenbank automatisieren. Wir haben Ihnen dazu einen Teil des Skripts bereits vorgegeben. Sie müssen noch eine geeignete Datenbankstruktur erstellen und die SQL-Querys zum Eintragen der einzelnen Geschichten schreiben. Aktuell erstellt das Skript eine leere SQLite-Datenbank, iteriert über einen angegebenen Ordner und wandelt die dortigen Dateien in JavaScript-Objekte um, die einzelne *Fan Fiction*-Geschichten repräsentieren. Für jede Geschichten wird in dem zentralen Modul der Anwendung (`index.js`) einmal die *Callback*-Methode [`onStoryParsed`](https://github.com/Webtechnologien-Regensburg/Fan-Fiction-Data-Importer/blob/f52771ae246e492709ace06ae7ca98c2344eff80/index.js#L9) aufgerufen. Im Parameter finden Sie die jeweilige Story, die bereits an das `DatabaseImporter`-Modul weitergeben wird. Dort müssen die Informationen aus dem JavaScript-Objekt dann in die SQLite-Datenbank übertragen werden.

**Bei Fragen zu diesem Teil der Aufgabe wenden Sie sich bitte an Alexander Bazo.**

## Grundlagen

Der Skript funktioniert mit den JSON-formatierten *Fan Fiction*-Dateien, die wir Ihnen in einem separaten Datensatz bereitgestellt haben. Die Inhalte sind dabei nach diesem Schema aufgebaut:

```
{ 
  "category": [], 
  "rating": "", 
  "relationship": [], 
  "title": "", 
  "archive_warning": [],
  "text": ""
  "additional_tag": []
}
```

Der Skript exportiert alle relevanten Informationen aus diesen Dateien. Die exportierten Daten werden innerhalb des Skrips als [Story-Prototyp](https://github.com/Webtechnologien-Regensburg/Fan-Fiction-Data-Importer/blob/f52771ae246e492709ace06ae7ca98c2344eff80/lib/StoryParser.js#L41) abgebildet und kommuniziert.

## Vorbereitung

- Laden Sie den Quellcode über [diesen Link](https://github.com/Webtechnologien-Regensburg/Fan-Fiction-Data-Importer/archive/master.zip) herunter. 
- Führen Sie im Projektverzeichnis, in einer Kommandozeile, den Befehl `npm install` aus, um alle notwendigen Abhängigkeiten zu installieren.
- Erstellen Sie einen Ordner `data` im Projektverzeichnis und kopieren Sie die bereitgestellten JSON-Dateien dort hinein

## Starten des Import-Skripts

- Führen Sie im Projektverzeichnis, in einer Kommandozeile, den Befehl `npm start` aus
- Der Skript erstellt eine leere SQLite-Datenbank (`db.sqlite`) und versucht alle JSON-Dateien aus dem `data`-Verzeichnis zu importieren

### Filter

Der Import-Vorgang wird in `index.js` in der Methode `onDatabaseReady` gestartet. Hier können Filter übergeben werden, die verhindern, dass bestimmte Geschichten importiert werden. Das ist besonders sinnvoll, wenn Sie verhindern möchten, dass Geschichten mit explizitem oder rechtlich fragwürdigem Inhalt oder unzureichenden Qualitätskriterien, z.B. zu kurzen Texten, in die Datenbank importiert werden. Sie finden die vorhanden Filter in der Datei `lib\StoryFilter.js`. Jeder Filter basiert auf dem Prototypen `Filter` und verfügt über eine Methode `applyTo`, die, wenn der Filter aktiviert wurde, während des Importvorgang für jede Story aufgerufen wird. Gibt die Methode `true` zurück, wird der Import der Story abgebrochen, gibt die Methode `false` zurück, wird die Story in die Datenbank eingetragen. Sie können nach diesem Muster eigenen Filter erstellen:

- Erstellen Sie in der Datei `StoryFitler.js` eine entsprechende, neue Klasse (Nutzen Sie `RatingFilter` oder `MinTextLengthFilter` als Vorlage).
- Exportieren Sie den neu erstellten Filter aus dem Modul.
- Importieren Sie den Filter in der `index.js`-Datei und fügen Sie diesen dann in der Methode `onDatabaseReady` dem `StoryParser` hinzu.

#### Beispiel für einen Filter

Mit diesem Filter wird geprüft, ob die übergebene Story eine Mindestlänge (in Zeichen) vorweisen kann.

```
class MinTextLengthFilter extends Filter {

  // Die minimale Anzahl der Zeichen wird im Konstruktor übergeben
  constructor(minTextLength) {
    super("Minimal Text Length Filter");
    this.minTextLength = minTextLength;
  }

  // Diese Methode wird beim Import - sofern der Filter aktiviert wurde - für jede Story aufgerufen
  // Die jeweilige Story wird als Parameter übergeben
  applyTo(story) {
  	// Die Länge des Texts wird mit der im Filter gespeicherten Mindestlänge verglichen
    if (story.text.length < this.minTextLength) {
      // Unterschreitet die Story die Mindestlänge, wird true zurückgegeben und die Story ausgefiltert	
      return true;
    }
    // Ist die Story lang genug, wird false zurückgegeben und die Story landet in der Datenbank
    return false;
  }
}
```


### TODOs

- Ergänzen Sie im Modul `DatabaseImporter.js` die notwendige Funktionalität zum Erstellen eines geeigneten Datenbankschemas
- Vervollständigen Sie im Modul `DatabaseImporter.js` die Methode zum Überführen des JavaScript-OBjekts in die Datenbank
- Ergänzen Sie ggf. weitere Filter um die importierten Stories, z.B. nach Qualitätskriterien, weiter einzuschränken