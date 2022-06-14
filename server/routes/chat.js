const router = require('express').Router();
const verifyToken = require('../middleware/auth');
const chatController = require('../controllers/chatController');

router.post('/message', verifyToken, chatController.createMessage);

router.get('/conversations', verifyToken, chatController.getConversations);

router.get('/message/:id', verifyToken, chatController.getMessages);

router.delete('/message/:id', verifyToken, chatController.deleteMessages);

router.delete(
	'/conversations/:id',
	verifyToken,
	chatController.deleteConversation
);

module.exports = router;
