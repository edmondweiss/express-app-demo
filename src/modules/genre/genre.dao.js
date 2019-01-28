const genres = require('../../../database/genres.json');

class GenreDao {
  constructor() {
    this.genres = genres || [];
  }

  getAllGenres() {
    return this.genres;
  }

  getGenreById(genreId) {
    return [this.genres[this.getGenreIndexById(genreId)]];
  }

  getGenreByName(name) {
    return this.genres.filter(genre => genre.name === name);
  }

  insertGenre(genre) {
    const newGenre = {
      id: this.getNextId(),
      name: genre.name
    }
    this.genres.push(newGenre);
    return [newGenre];
  }

  updateGenre(genreId, genre) {
    const genreIndex = this.getGenreIndexById(genreId);
    this.genres[genreIndex] = Object.assign(this.genres[genreIndex], genre);
    return [this.genres[genreIndex]];
  }

  deleteGenre(genreId, genre) {
    return this.genres.splice(this.getGenreIndexById(genreId), 1);
  }

  getNextId() {
    return this.genres[this.genres.length - 1].id + 1;
  }

  getGenreIndexById(genreId) {
    const existingGenreIndex = this.genres.findIndex(g => g.id === genreId);
    if (existingGenreIndex === -1) {
      throw new Error(`The genre with the ID ${genre.id} doesn't exist.`);
    }
    return existingGenreIndex;
  }
}

module.exports = {
  GenreDao: GenreDao
}
