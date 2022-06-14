const router = require('express').Router();
const childCommentController = require('../controllers/childCommentController');
const verifyToken = require('../middleware/auth');

router.post('/create', verifyToken, childCommentController.create);

//Get all reply comment of a comment
router.get('/:id', verifyToken, childCommentController.getAllChildComment);

router.put('/update/:id', verifyToken, childCommentController.update);

router.delete('/delete/:id', verifyToken, childCommentController.delete);

module.exports = router;
