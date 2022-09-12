const mongoose = require("mongoose");
const Genre = require("../models/genre");

exports.GET_ALL_GENRES = (req, res) => {
  Genre.find()
    .then((docs) => {
      return res.status(200).json(docs);
    })
    .catch((err) => res.status(500).json(err));
};

exports.ADD_GENRE = (req, res) => {
  const genre = new Genre({
    _id: mongoose.Types.ObjectId(),
    genre: req.body.genre,
  });

  genre
    .save()
    .then(() =>
      res.status(201).json({ message: "Genre added successfuly to MongoDB" })
    )
    .catch((error) =>
      res.status(500).json({
        message: "Something went wrong when adding to MongoDB",
        error,
      })
    );
};

exports.updateGenres = (req, res, next) => {
  const genreID = req.params.genreID;

  Genre.updateMany({ _id: genreID }, { $set: req.body })
    .then(genre => {
      if (!genre) {
        return res.status(404).send({
          message: "genre not found with id " + req.params.genreID
        });
      }
      res.send({ message: "genre Updated successfully!" });
    }).catch(err => {
      if (err.kind === 'ObjectId') {
        return res.status(404).send({
          message: "genre not found with id " + req.params.genreID
        });
      }
      return res.status(500).send({
        message: "Error updating genre with id " + req.params.genreID
      });
    });
};

exports.deleteGenres = (req, res, next) => {
  Genre.deleteOne({ _id: req.params.genreID })
    .then(genre => {
      if (!genre) {
        return res.status(404).send({
          message: "genres not found with id " + req.params.genreID
        });
      }
      res.send({ message: "genres deleted successfully!" });
    }).catch(err => {
      if (err.kind === 'ObjectId' || err.name === 'NotFound') {
        return res.status(404).send({
          message: "genres not found with id " + req.params.genreID
        });
      }
      return res.status(500).send({
        message: "Could not delete genres with id " + req.params.genreID
      });
    });
};

