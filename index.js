/* eslint-env node */

import DatabaseImporter from "./lib/DatabaseImporter.js";
import StoryParser from "./lib/StoryParser.js";
import { RatingFilter, MinTextLengthFilter, StoppwordFilter, WarningFilter } from "./lib/StoryFilter.js";

let dbFile = process.argv[2],
  dataPath = process.argv[3];

function onStoryParsed(story) {
  DatabaseImporter.importStory(story);
}

function onDatabaseReady() {
  StoryParser.setStoryParserListener(onStoryParsed);
  // TODO: Ergänzen Sie hier ggf. weitere Filter
  StoryParser.addFilter(new RatingFilter("Mature"));
  StoryParser.addFilter(new RatingFilter("Explicit"));
  StoryParser.addFilter(new RatingFilter("Not rated"));
  StoryParser.addFilter(new WarningFilter("rape/non-con"));
  StoryParser.addFilter(new WarningFilter("underage"));
  StoryParser.addFilter(new MinTextLengthFilter(1000));
  StoryParser.parseStoriesFrom(dataPath);
}

DatabaseImporter.prepare(dbFile, onDatabaseReady);