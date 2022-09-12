// const { fetchAllMovies, addMovie } = require('../services/movies');

// exports.getAllMovies = async (req, res) => {
//   try {
//     const { query } = req;
//     console.log(query, "kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk")
//     const { movies } = await fetchAllMovies(query);
//     if (movies.length < 1) {
//       return res.status(404).json({ message: 'No movies found in database!' });
//     }
//     return res.status(200).json(movies);
//   } catch (error) {
//     return res.status(500).json({
//       message: 'Something went wrong, when trying to fetch movies!',
//       error
//     });
//   }
// };

// exports.createMovie = async (req, res) => {
//   const { title } = req.body;
//   try {
//     const movie = await addMovie(title);
//     return res.status(201).json({ movie });
//   } catch (error) {
//     return res
//       .status(400)
//       .json({ messege: 'Bad request! Could not find movie title', error });
//   }
// };



const mongoose = require("mongoose");
// const express = require("express");
// const router = express.Router();
const Movie = require("../models/movie");
const multer = require("multer");
const fs = require("fs");
const router = require("../routes/movies");


exports.getAllMovies = (req, res) => {
  Movie.find()
    .then((movies) =>
      res.status(200).json({
        count: movies.length,
        movies: movies,
      })
    )
    .catch((err) => res.status(500).json({ error: err }));
};

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    console.log(req.file, "fffffffffffffffffffffffffffffffffffffffffff")
    callback(null, './uploads');
  },
  filename: (req, file, callback) => {
    callback(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage })

exports.addMovie = (req, res) => {
  router.post('/', upload.array('images', 5), req, res, (err) => {
    console.log(req.file, "lllllllllllllllllllllllllllllllllllllllllll")
    if (err) res.status(500).json(err);
    else {
      fs.readFile(req.file.path, function (err, data) {
        if (err) throw err;
        else {
          const contentType = req.file.mimetype;
          const newMovie = new Movie({
            _id: mongoose.Types.ObjectId(),
            // title: req.body.title,
            // numberInStock: req.body.numberInStock,
            // genre: req.body.genre,
            // image: { data, contentType },
            // rate: 0,

            title: req.body.Title,
            year: req.body.Year,
            rated: req.body.Rated,
            released: req.body.Released,
            runtime: req.body.Runtime,
            genre: req.body.Genre,
            director: req.body.Director,
            writer: req.body.Writer,
            actors: req.body.Actors,
            plot: req.body.Plot,
            language: req.body.Language,
            country: req.body.Country,
            awards: req.body.Awards,
            poster: req.body.Poster,
            ratings: req.body.Ratings,
            metascore: req.body.Metascore,
            imdbRating: req.body.imdbRating,
            imdbVotes: req.body.imdbVotes,
            imdbID: req.body.imdbID,
            type: req.body.Type,
            dVD: req.body.DVD,
            boxOffice: req.body.BoxOffice,
            production: req.body.Production,
            website: req.body.Website,
            response: req.body.Response

          });

          //Saving new movie in db
          newMovie.save((err, movie) => {
            if (err) res.status(500).json({ error: err });
            else {
              res.status(201).json({
                message: "A new movie added.",
                movie: movie,
              });
            }
          });
        }
      });
    }
  });
};

exports.updateMovie = (req, res, next) => {
  const movieID = req.params.movieID;

  Movie.updateMany({ _id: movieID }, { $set: req.body })
    .then(movie => {
      if (!movie) {
        return res.status(404).send({
          message: "movie not found with id " + req.params.movieID
        });
      }
      res.send({ message: "movie Updated successfully!" });
    }).catch(err => {
      if (err.kind === 'ObjectId') {
        return res.status(404).send({
          message: "movie not found with id " + req.params.movieID
        });
      }
      return res.status(500).send({
        message: "Error updating movie with id " + req.params.movieID
      });
    });
};

exports.deleteMovie = (req, res, next) => {
  Movie.deleteOne({ _id: req.params.movieID })
    .then(movie => {
      if (!movie) {
        return res.status(404).send({
          message: "movie not found with id " + req.params.movieID
        });
      }
      res.send({ message: "movie deleted successfully!" });
    }).catch(err => {
      if (err.kind === 'ObjectId' || err.name === 'NotFound') {
        return res.status(404).send({
          message: "movie not found with id " + req.params.movieID
        });
      }
      return res.status(500).send({
        message: "Could not delete movie with id " + req.params.movieID
      });
    });
};

