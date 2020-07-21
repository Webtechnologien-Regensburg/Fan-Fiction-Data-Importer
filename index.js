/* eslint-env node */

import DatabaseImporter from "./lib/DatabaseImporter.js";
import StoryParser from "./lib/StoryParser.js";

let dbFile = process.argv[2],
  dataPath = process.argv[3];

function onStoryParsed(story) {
  DatabaseImporter.importStory(story);
}

function onDatabaseReady() {
  StoryParser.setStoryParserListener(onStoryParsed);
  // TODO: Ergänzen Sie hier ggf. weitere Filter
  StoryParser.addFilter("rating", "Mature");
  StoryParser.addFilter("rating", "Explicit");
  StoryParser.parseStoriesFrom(dataPath);
}

DatabaseImporter.prepare(dbFile, onDatabaseReady);