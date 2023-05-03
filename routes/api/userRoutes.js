const router = require('express').Router();
import { getUsers, createUser, getSingleUser, updateUser, deleteUser, addFriend, deleteFriend } from '../../controllers/user-controller';



// /api/users
router.route('/').get(getUsers).post(createUser);

// /api/users/:userId
router.route('/:userId').get(getSingleUser).put(updateUser).delete(deleteUser);

// /api/users/:userId/friends/:friendId
router.route('/:userId/friends/:friendId').post(addFriend).delete(deleteFriend);


module.exports = router;