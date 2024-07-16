const mongoose = require('mongoose');
require('dotenv').config();

const mongo_url = process.env.MONGO_URL;
mongoose.connect(mongo_url).then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        minLength: 3,
        maxLength: 30
    },
    password: {
        type: String,
        required: true,
        minLength: 6
    },
    firstName: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    }
});

const accountSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
	balance: {
        type: Number,
        required: true
    }
});
const User = mongoose.model("RecipientUser", userSchema);
const Accounts = mongoose.model("Accounts", accountSchema);
module.exports = {User, Accounts};