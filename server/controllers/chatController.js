const Conversations = require("../models/Conversation");
const Messages = require("../models/Message");
const { upload, destroy, destroyDirectory, deleteTmp } = require("../utils");
class APIfeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  paginating() {
    const page = this.queryString.page * 1 || 1;
    const limit = this.queryString.limit * 1 || 9;
    const skip = (page - 1) * limit;
    this.query = this.query.skip(skip).limit(limit);
    return this;
  }
}

const chatController = {
  createMessage: async (req, res) => {
    const { sender, recipient, text, media, call } = req.body;
    let file = req.files?.image;
    try {
      if (!recipient || (!text.trim() && !file && media.length === 0 && !call))
        return;

      var image = "";
      let newConversation = await Conversations.findOneAndUpdate(
        {
          $or: [
            { recipients: [sender, recipient] },
            { recipients: [recipient, sender] },
          ],
        },
        {
          recipients: [sender, recipient],
          text,
          media,
          image,
          call,
        },
        { new: true, upsert: true },
      );

      if (file) {
        image = await upload(
          file.tempFilePath,
          `novsocial/chats/${newConversation._id}`,
        );
      }

      newConversation = await Conversations.findByIdAndUpdate(
        { _id: newConversation._id },
        { image },
        { new: true },
      ).populate("recipients", "avatar username name");

      const newMessage = new Messages({
        conversation: newConversation._id,
        sender,
        call,
        recipient,
        image,
        text,
        media,
      });

      await newMessage.save();

      res.json({
        success: true,
        msg: "Create Success!",
        conversation: newConversation,
        newMessage,
      });
    } catch (err) {
      return res.status(500).json({ success: false, msg: err.message });
    }
  },
  getConversations: async (req, res) => {
    try {
      const features = new APIfeatures(
        Conversations.find({
          recipients: req.body.userID,
        }),
        req.query,
      ).paginating();

      const conversations = await features.query
        .sort("-updatedAt")
        .populate("recipients", "avatar username name");

      res.json({
        message: "get data successfully",
        conversations,
        result: conversations.length,
      });
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  },
  getMessages: async (req, res) => {
    try {
      const features = new APIfeatures(
        Messages.find({
          $or: [
            { sender: req.body.userID, recipient: req.params.id },
            { sender: req.params.id, recipient: req.body.userID },
          ],
        }),
        req.query,
      ).paginating();

      const messages = await features.query.sort("-createdAt");

      res.json({
        message: "get data successfully",
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
        sender: req.user._id,
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

module.exports = chatController;
