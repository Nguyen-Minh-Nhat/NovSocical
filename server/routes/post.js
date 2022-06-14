const router = require('express').Router();
const verifyToken = require('../middleware/auth');
const postController = require('../controllers/postController');

router.post('/create', verifyToken, postController.create);

//Get all post of an user
router.get('/', verifyToken, postController.getAllPost);

router.get('/:id', verifyToken, postController.getAPost);

router.get('/profile/:id', verifyToken, postController.getAllPostOfAUser);

router.put('/update/:id', verifyToken, postController.update);

router.put('/love', verifyToken, postController.love);

router.delete('/delete/:id', verifyToken, postController.delete);

module.exports = router;
