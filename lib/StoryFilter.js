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
    if (story.rating === this.rating) {
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
  }

  applyTo(story) {
    for (let i = 0; i < this.stopWords.length; i++) {
      if (story.text.includes(this.stopWords[i])) {
        return true;
      }
    }
    return false;
  }
}

export { RatingFilter, MinTextLengthFilter, StoppwordFilter };