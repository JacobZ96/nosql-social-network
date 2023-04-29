const { Schema, model } = require('mongoose');

const userSchema = new Schema(
    {
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/.+@.+\..+/],
    },
    thoughts: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Thought',
        },
    ],
    friends: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
    ],
    },
    // create virtual to get total count of friends on retrieval
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    },  
);

const User = model('User', userSchema);

module.exports = User;
