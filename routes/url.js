const express = require("express");
const {
    handleGenerateNewShortURL,
    handleIncomingShortURL
} = require("../controllers/url")

const router = express.Router();

router.post('/',handleGenerateNewShortURL);

router.get('/:shortID', handleIncomingShortURL);

module.exports = {
    router,
};