const router = require('express').Router();
const { getThoughts, createThought, getSingleThought, updateThought, deleteThought, addReaction, deleteReaction } = require('../../controllers/thought-controller');



// /api/thoughts
router.route('/').get(getThoughts).post(createThought);

// /api/thoughts/:thoughtId
router.route('/:id').get(getSingleThought).put(updateThought).delete(deleteThought);
// /api/thoughts/:thoughtId/friends/:friendId
router.route('/:id/reactions/:reactionId').post(addReaction).delete(deleteReaction);

module.exports = router;