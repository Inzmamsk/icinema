const mongoose = require("mongoose");

const movieSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  // title: { type: String, required: true },
  // numberInStock: { type: Number, required: true },
  // genre: { type: String, required: true },
  // image: { data: Buffer, contentType: String },
  // rate: { type: Number, required: true },
  // description: { type: String, require: true },
  // trailerLink: { type: String, require: true },
  // movieLength: { type: String, require: true },
  title: String,
  year: String,
  rated: String,
  released: String,
  runtime: String,
  genre: String,
  director: String,
  writer: String,
  actors: String,
  plot: String,
  language: String,
  country: String,
  awards: String,
  poster: String,
  ratings: Array,
  metascore: Number,
  imdbRating: Number,
  imdbVotes: String,
  imdbID: String,
  type: String,
  dVD: String,
  boxOffice: String,
  production: String,
  website: String,
  response: String
});

const Movie = mongoose.model("Movie", movieSchema, "movies");

module.exports = Movie;
//module.exports = mongoose.model("Movie", movies, "movies");

