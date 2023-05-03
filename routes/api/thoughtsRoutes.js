const router = require('express').Router();
const { getThoughts, createThought } = require('../../controllers/thought-controller');



// /api/thoughts
router.route('/').get(getThoughts).post(createThought);

// /api/thoughts/:thoughtId
// /api/thoughts/:thoughtId/friends/:friendId


module.exports = router;