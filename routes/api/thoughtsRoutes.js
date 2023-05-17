const router = require('express').Router();
const { getThoughts, createThought, getSingleThought, updateThought, deleteThought, addReaction, deleteReaction } = require('../../controllers/thought-controller');



// /api/thoughts
router.route('/').get(getThoughts).post(createThought);

// /api/thoughts/:thoughtId
router.route('/:thoughtId').get(getSingleThought).put(updateThought).delete(deleteThought);
// /api/thoughts/:thoughtId/friends/:friendId
router.route('/:thoughtId/friends/:friendId').post(addReaction).delete(deleteReaction);

module.exports = router;