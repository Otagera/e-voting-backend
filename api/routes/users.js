const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user');
const upload = require('../middlewares/multer');

/* GET users listing. */
router.route('/user/:userId').delete(userCtrl.userDelete);
router.route('/login').post(upload.single(), userCtrl.userLogin);
router.route('/signup').post(upload.single(), userCtrl.userSignUp);

module.exports = router;
