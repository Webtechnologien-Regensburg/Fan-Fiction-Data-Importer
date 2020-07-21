/* eslint-env node */

import fs from "fs";
import path from "path";

let skippedFiles;

function createStoryFromFile(filePath, filters, callback) {
  let fileContent = fs.readFileSync(filePath, { encoding: "utf8" }),
    story = Story.fromJSON(fileContent);
  if (shouldBeFilteredOut(story, filters)) {
    skippedFiles++;
  } else {
    callback(story);
  }
}

function shouldBeFilteredOut(json, filters) {
  for (let i = 0; i < filters.length; i++) {
    if (filters[i].applyTo(json)) {
      return true;
    }
  }
  return false;
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

  static fromJSON(json) {
    let jsonObject = JSON.parse(json);
    return new Story(jsonObject.category[0], jsonObject.rating, jsonObject.relationship[0], jsonObject.title, jsonObject.text, jsonObject.additional_tag[0]);
  }

}

class StoryParser {

  constructor() {
    this.filters = [];
  }

  setStoryParserListener(callback) {
    this.storyParserListener = callback;
  }

  addFilter(filter) {
    this.filters.push(filter);
  }

  parseStoriesFrom(dataPath) {
    let files = fs.readdirSync(dataPath);
    skippedFiles = 0;
    for (let i = 0; i < files.length; i++) {
      let filePath = path.join(dataPath, files[i]);
      if (i % 100 === 0) {
        console.log(
          `[Parsing stories ... ${Math.floor((i/files.length) * 100)}% (Skipped ${skippedFiles}/${i} files)`
        );
      }
      createStoryFromFile(filePath, this.filters, this.storyParserListener);
    }
  }

}

export default new StoryParser();