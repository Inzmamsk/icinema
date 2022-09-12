const express = require("express");
const router = express.Router();
// const checkAuth = require("../middleware/checkAuth");
const { celebrate, Joi, errors } = require('celebrate');
const { getAllMovies, createMovie, addMovie, updateMovie, deleteMovie } = require("../controller/movie");

router.get("/", getAllMovies);
//router.post("/addmovie", addMovie);
router.post("/:movieID", updateMovie);
router.post("/:movieID", deleteMovie);

//router.get('/', getAllMovies);
// router.post(
//     '/addmovie',
//     celebrate({
//         body: Joi.object({
//             title: Joi.string().required()
//         })
//     }),
//     createMovie
// );

router.use(errors());

module.exports = router;

