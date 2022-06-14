const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema(
	{
		email: {
			type: String,
			required: true,
			unique: true,
		},
		password: {
			type: String,
			required: true,
		},
		name: {
			type: String,
			required: true,
		},
		avatar: {
			type: String,
			required: true,
		},
		birthDate: {
			type: Date,
			required: true,
		},
		description: {
			type: String,
			maxlength: 200,
		},
		address: { type: String, default: '' },
		phoneNumber: { type: String, default: '' },
		gender: { type: String, default: 'male' },
		followers: [
			{
				type: mongoose.Types.ObjectId,
				ref: 'user',
			},
		],
		following: [
			{
				type: mongoose.Types.ObjectId,
				ref: 'user',
			},
		],
	},
	{ timestamps: true }
);

module.exports = mongoose.model('user', UserSchema);
