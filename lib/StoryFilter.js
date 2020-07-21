/* eslint-env node */

class Filter {

  constructor(name) {
    this.name = name;
  }

  applyTo(story) {
    // Überschreiben Sie diese Methode für jeden individuellen Filter:
    // Die Methode gibt true zurück, wenn die Story ausgefiltert werden soll
    // und false, wenn die Story beibehalten werden soll.
  }

}

class RatingFilter extends Filter {

  constructor(rating) {
    super("Ranking Filter");
    this.rating = rating;
  }

  applyTo(story) {
    if (story.rating.toLowerCase() === this.rating.toLowerCase()) {
      return true;
    }
    return false;
  }
}

class MinTextLengthFilter extends Filter {

  constructor(minTextLength) {
    super("Minimal Text Length Filter");
    this.minTextLength = minTextLength;
  }

  applyTo(story) {
    if (story.text.length < this.minTextLength) {
      return true;
    }
    return false;
  }
}

class StoppwordFilter extends Filter {

  constructor(stopWords) {
    super("Stoppword Filter");
    this.stopWords = stopWords;
    for (let i = 0; i < this.stopWords.length; i++) {
      this.stopWords[i] = this.stopWords[i].toLowerCase();
    }
  }

  applyTo(story) {
    for (let i = 0; i < this.stopWords.length; i++) {
      if (story.text.toLowerCase().includes(this.stopWords[i])) {
        return true;
      }
    }
    return false;
  }
}

class WarningFilter extends Filter {

  constructor(warning) {
    super("Warning Filter");
    this.warning = warning.toLowerCase();
  }

  applyTo(story) {
    for (let i = 0; i < story.archiveWarnings.length; i++) {
      if (story.archiveWarnings[i].toLowerCase() === this.warning.toLowerCase()) {
        return true;
      }
    }
    return false;
  }
}

export { RatingFilter, MinTextLengthFilter, StoppwordFilter, WarningFilter };