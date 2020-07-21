/* eslint-env node */

import fs from "fs";
import path from "path";

let skippedFiles;

function createStoryFromFile(filePath, filter, callback) {
  let fileContent = fs.readFileSync(filePath, { encoding: "utf8" }),
    json = JSON.parse(fileContent);
  if (!shouldBeFilteredOut(json, filter)) {
    let story = new Story(json.category[0], json.rating, json.relationship[
        0],
      json.title, json.text, json.additional_tag[0]);
    callback(story);
  } else {
    skippedFiles++;
  }
}

function shouldBeFilteredOut(json, filter) {
  for (let currentFilter in filter) {
    if (!Object.prototype.hasOwnProperty.call(filter, currentFilter)) {
      continue;
    }
    if (Object.prototype.hasOwnProperty.call(json, currentFilter)) {
      if (filter[currentFilter].includes(json[currentFilter])) {
        return true;
      }
    }
  }
  return false;
}

function printProgress(progress) {
  process.stdout.clearLine();
  process.stdout.cursorTo(0);
  process.stdout.write(progress);
}

class Story {

  constructor(category, rating, relationship, title, text, tags) {
    this.category = category;
    this.rating = rating;
    this.relationship = relationship;
    this.text = text;
    this.title = title;
    this.tags = tags;
    Object.freeze(this);
  }

}

class StoryParser {

  constructor() {
    this.filter = {};
  }

  setStoryParserListener(callback) {
    this.storyParserListener = callback;
  }

  addFilter(category, value) {
    if (this.filter[category] === undefined) {
      this.filter[category] = [];
    }
    this.filter[category].push(value);
  }

  parseStoriesFrom(dataPath) {
    let that = this,
      files = fs.readdirSync(dataPath);
    skippedFiles = 0;
    for (let i = 0; i < files.length; i++) {
      let filePath = path.join(dataPath, files[i]);
      printProgress(
        `[${i+1}/${files.length}] \t Parsing ${files[i]} now ... (Skipped ${skippedFiles} files)`
      );
      createStoryFromFile(filePath, that.filter, that.storyParserListener);
    }
  }

}

export default new StoryParser();