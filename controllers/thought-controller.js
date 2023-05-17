const { User, Thought } = require('../models');

const thoughtController = {
    async getThoughts(req, res) {
        try {
            const dbThoughtData = await Thought.find();
            res.json(dbThoughtData);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    // create a thought
  async createThought(req, res) {
    try {
      const dbThoughtData = await Thought.create(req.body);

      const dbUserData = await User.findOneAndUpdate(
        { _id: req.body.userId },
        { $push: { thoughts: dbThoughtData._id } },
        { new: true }
      );

      if (!dbUserData) {
        return res.status(404).json({ message: 'Thought created but no user with this id!' });
      }

      res.json({ message: 'Thought successfully created!' });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  async getSingleThought(req, res) {
    try {
      const dbThoughtData = await Thought.findOne({ _id: req.params.thoughtId })
      .select('-__v')
      .populate('friends');
      res.json(dbThoughtData);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  async updateThought(req, res) {
    try {
      const dbThoughtData = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        {
          $set: req.body,
        },
        {
          runValidators: true,
          new: true,
        }
      );
      res.json(dbThoughtData);
    } catch (error) {
      res.status(500).json(error);
    }
},
async deleteThought(req, res) {
    try {
      const dbThoughtData = await Thought.findOneAndDelete({ _id: req.params.thoughtId });
      res.json(dbThoughtData);
    } catch (error) {
      res.status(500).json(error);
    }
},
async addReaction(req, res) {
    try {
      const dbThoughtData = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $addToSet: { reactions: req.body } },
        { new: true }
      );
      res.json(dbThoughtData);
    } catch (error) {
      res.status(500).json(error);
    }
},
async deleteReaction(req, res) {
    try {
      const dbThoughtData = await Thought.findOneAndDelete(
        { _id: req.params.thoughtId },
        { $pull: { reactions: { reactionId: req.params.reactionId } } },
        { new: true }
      );
      res.json(dbThoughtData);
    } catch (error) {
      res.status(500).json(error);
    }
  },
};
module.exports = thoughtController;