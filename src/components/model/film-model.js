export default class FilmModel {
  constructor(data) {
    this.id = data[`id`];
    this.name = data[`name`];
    this.posterImage = data[`poster_image`];
    this.previewImage = data[`preview_image`];
    this.backgroundImage = data[`background_image`];
    this.backgroundColor = data[`background_color`];
    this.videoLink = data[`video_link`];
    this.previewVideoLink = data[`preview_video_link`];
    this.description = data[`description`];
    this.rating = data[`rating`];
    this.scoresCount = data[`scores_count`];
    this.director = data[`director`];
    this.starrings = data[`starring`];
    this.runTime = data[`run_time`];
    this.genre = data[`genre`];
    this.released = data[`released`];
    this.isFavorite = data[`is_favorite`];
  }

  static parseFilm(data) {
    return new FilmModel(data);
  }

  static parseFilms(data) {
    return data.map(FilmModel.parseFilm);
  }
}
