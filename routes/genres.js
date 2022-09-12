const express = require("express");
const router = express.Router();
const genreController = require("../controller/genre");

//const { signIn, signUp, updateUser, deleteUser } = require("../controller/genre");

//Handling all the incoming requests
router.get("/", genreController.GET_ALL_GENRES);
router.post("/addgenre", genreController.ADD_GENRE);
router.patch("/:genreID", genreController.updateGenres);
router.delete("/:genreID", genreController.deleteGenres);

module.exports = router;

