  const { User, Thought } = require('../models');

const userController = {
    // get all users
    async getUsers(req, res) {
        try {
            const dbUserData = await User.find()
            .select('-__v');
            res.json(dbUserData);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    async createUser(req, res) {
        try {
            const dbUserData = await User.create(req.body);
            res.json(dbUserData);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    async getSingleUser(req, res) {
        try {
            const dbUserData = await User.findOne({ _id: req.params.userId })
            .select('-__v')
        .populate('friends')
        .populate('thoughts');

            res.json(dbUserData);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    async updateUser(req, res) {
        try {
            const dbUserData = await User.findOneAndUpdate(
              { _id: req.params.userId },
              {
                $set: req.body,
              },
              {
                runValidators: true,
                new: true,
              }
            );  
            res.json(dbUserData);    
        } catch (error) {
        res.status(500).json(error);
        }
    },
    async addFriend(req, res) {
        try {
            const dbUserData = await User.findOneAndUpdate(
              { _id: req.params.userId },
              { $addToSet: { friends: req.params.friendId } },
              { new: true }
            );
            if (!dbUserData) {
              return res.status(404).json({ message: 'No user found with this id!' });
            }
            res.json(dbUserData);
          } catch (err) {
            console.log(err);
            res.status(500).json(err);
          }
    },
    async deleteFriend(req, res) {
        try {
            const dbUserData = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $pull: { friends: req.params.friendId } },
                { new: true }
            );
                res.json(dbUserData);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    async deleteUser(req, res) {
        try {
            const dbUserData = await User.findOneAndDelete({ _id: req.params.userId });
            if (!dbUserData) {
                return res.status(404).json({ message: 'No user found with this id!' });
                }
                res.json(dbUserData);
        } catch (error) {
         res.status(500).json(error); 
        }
    }
};



module.exports = userController;