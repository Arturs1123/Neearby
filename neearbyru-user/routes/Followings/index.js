const Followings = require('../../core/system/Followings');
const express = require('express');
const { allowRoles, checkToken } = require("../../middlewares");

const router = express.Router();

router.post('/followAuthor', allowRoles() ,(req, res, next) => {
    Followings.followAuthor(req.body || {}, req.headers || {}, req.user)
        .then(data => res.status(200).json({ message: 'Success', data }))
        .catch(err => next(err));
});

router.post('/unfollowAuthor', allowRoles() ,(req, res, next) => {
    Followings.unfollowAuthor(req.body || {}, req.headers || {}, req.user)
        .then(data => res.status(200).json({ message: 'Success', data }))
        .catch(err => next(err));
});

router.post('/getUserFollowings', checkToken ,(req, res, next) => {
    Followings.getUserFollowings(req.body || {}, req.headers || {})
        .then(data => res.status(200).json({ message: 'Success', data }))
        .catch(err => next(err));
});

module.exports = router;