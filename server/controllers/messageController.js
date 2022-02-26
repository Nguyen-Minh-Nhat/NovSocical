const Conversations = require("../models/conversationModel");
const Messages = require("../models/messageModel");

const messageController = {
    create: async (req, res) => {
        try {
            const { userID, recipient, text } = req.body;

            if (!recipient || (!text.trim() && media.length === 0 && !call))
                return;

            const newConversation = await Conversations.findOneAndUpdate(
                {
                    $or: [
                        { recipients: [userID, recipient] },
                        { recipients: [recipient, userID] },
                    ],
                },
                {
                    recipients: [userID, recipient],
                    text,
                },
                { new: true, upsert: true }
            );

            const newMessage = new Messages({
                conversation: newConversation._id,
                userID,
                recipient,
            });

            await newMessage.save();

            res.json({ msg: "Create Success!" });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
    getConversations: async (req, res) => {
        try {
            const features = new APIfeatures(
                Conversations.find({
                    recipients: req.user._id,
                }),
                req.query
            ).paginating();

            const conversations = await features.query
                .sort("-updatedAt")
                .populate("recipients", "avatar username fullname");

            res.json({
                conversations,
                result: conversations.length,
            });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
    getMessages: async (req, res) => {
        try {
            const features = new APIfeatures(
                Messages.find({
                    $or: [
                        { userID: req.user._id, recipient: req.params.id },
                        { userID: req.params.id, recipient: req.user._id },
                    ],
                }),
                req.query
            ).paginating();

            const messages = await features.query.sort("-createdAt");

            res.json({
                messages,
                result: messages.length,
            });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
    deleteMessages: async (req, res) => {
        try {
            await Messages.findOneAndDelete({
                _id: req.params.id,
                userID: req.user._id,
            });
            res.json({ msg: "Delete Success!" });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
    deleteConversation: async (req, res) => {
        try {
            const newConver = await Conversations.findOneAndDelete({
                $or: [
                    { recipients: [req.user._id, req.params.id] },
                    { recipients: [req.params.id, req.user._id] },
                ],
            });
            await Messages.deleteMany({ conversation: newConver._id });

            res.json({ msg: "Delete Success!" });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
};

module.exports = messageController;
