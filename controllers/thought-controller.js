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

}
};
module.exports = thoughtController;