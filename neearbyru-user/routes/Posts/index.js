const Post = require('../../core/system/Post');
const express = require('express');
const { allowRoles, checkToken } = require("../../middlewares");

const router = express.Router();

router.post('/getPurchasedPosts', checkToken ,(req, res, next) => {
    Post.getPurchasedPosts(req.body || {}, req.headers || {})
        .then(data => res.status(200).json({ message: 'Success', data }))
        .catch(err => next(err));
});

module.exports = router;