const Post = require('../../core/system/Post');
const express = require('express');

const { allowRoles, checkToken, isHasToken} = require("../../middlewares");

const router = express.Router();

router.post('/createPost', allowRoles(['author', 'admin']), (req, res, next) => {
    Post.createPost(req.body || {}, req.headers || {}, req.user)
        .then(data => res.status(200).json({ message: 'Success', data }))
        .catch(err => next(err));
});

router.post('/updatePost', allowRoles(['author', 'admin']), (req, res, next) => {
    Post.updatePost(req.body || {}, req.headers || {}, req.user)
        .then(data => res.status(200).json({ message: 'Success', data }))
        .catch(err => next(err));
});

router.post('/deletePost', allowRoles(['author', 'admin']), (req, res, next) => {
    Post.deletePost(req.body || {}, req.headers || {}, req.user)
        .then(data => res.status(200).json({ message: 'Success', data }))
        .catch(err => next(err));
});

router.post('/deletePostForAdmin', checkToken, (req, res, next) => {
    Post.deletePostForAdmin(req.body || {})
        .then(data => res.status(200).json({ message: 'Success', data }))
        .catch(err => next(err));
});

router.post('/getPost', (req, res, next) => {
    Post.getPost(req.body || {}, req.headers || {})
        .then(data => res.status(200).json({ message: 'Success', data }))
        .catch(err => next(err));
});

router.post('/searchPosts', isHasToken(['user', 'author', 'admin']), (req, res, next) => {
    Post.searchPosts(req.body || {}, req.headers || {}, req.user || {})
        .then(data => res.status(200).json({ message: 'Success', data }))
        .catch(err => next(err));
});

router.post('/searchModerationPosts', checkToken, (req, res, next) => {
    Post.searchModerationPosts(req.body || {}, req.headers || {}, req.user || {})
        .then(data => res.status(200).json({ message: 'Success', data }))
        .catch(err => next(err));
});

router.post('/searchPostsByIds', checkToken, (req, res, next) => {
    Post.searchPostsByIds(req.body || {})
        .then(data => res.status(200).json({ message: 'Success', data }))
        .catch(err => next(err));
});

router.post('/addCommentWithPost', allowRoles(['user', 'author', 'admin']), (req, res, next) => {
    Post.addCommentWithPost(req.body || {}, req.headers || {}, req.user || {})
        .then(data => res.status(200).json({ message: 'Success', data }))
        .catch(err => next(err));
});

router.post('/likePost', allowRoles(['user', 'author', 'admin']), (req, res, next) => {
    Post.likePost(req.body || {}, req.headers || {}, req.user || {})
        .then(data => res.status(200).json({ message: 'Success', data }))
        .catch(err => next(err));
});

router.post('/banPosts', checkToken, (req, res, next) => {
    Post.banPostsForAdmin(req.body || {}, req.headers || {}, req.user || {})
        .then(data => res.status(200).json({ message: 'Success', data }))
        .catch(err => next(err));
});

router.post('/unbanPosts', checkToken, (req, res, next) => {
    Post.unbanPostsForAdmin(req.body || {}, req.headers || {}, req.user || {})
        .then(data => res.status(200).json({ message: 'Success', data }))
        .catch(err => next(err));
});

router.post('/createPurchasedPosts', checkToken, (req, res, next) => {
    Post.createPurchasedUserPosts(req.body || {}, req.headers || {}, req.user || {})
        .then(data => res.status(200).json({ message: 'Success', data }))
        .catch(err => next(err));
});

router.post('/myPostsEditing', allowRoles(['user', 'author', 'admin']), (req, res, next) => {
    Post.myPostsForEditing(req.body || {}, req.headers || {}, req.user)
        .then(data => res.status(200).json({ message: 'Success', data }))
        .catch(err => next(err));
});

router.post('/updatePostForEditing', checkToken, (req, res, next) => {
    Post.updatePostForEditing(req.body || {})
        .then(data => res.status(200).json({ message: 'Success', data }))
        .catch(err => next(err));
});

router.post('/myPostsPurchase', checkToken, (req, res, next) => {
    Post.myPostsPurchase(req.body || {}, req.headers || {}, req.user)
        .then(data => res.status(200).json({ message: 'Success', data }))
        .catch(err => next(err));
});

router.post('/searchModerationComments', checkToken, (req, res, next) => {
    Post.searchModerationComments(req.body || {})
        .then(data => res.status(200).json({ message: 'Success', data }))
        .catch(err => next(err));
});

module.exports = router;