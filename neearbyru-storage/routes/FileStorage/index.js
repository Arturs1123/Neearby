const FileStorage = require('../../core/system/Storage');
const express = require('express');
const { allowRoles, checkToken } = require("../../middlewares");

const router = express.Router();

router.post('/upload', allowRoles('admin'), (req, res, next) => {
    FileStorage.upload(req.body || {}, req.headers || {}, req.files, req.user)
        .then(data => res.status(200).json({ message: 'Success', data }))
        .catch(err => next(err));
});

router.get('/getFile/:path*', (req, res, next) => {
    FileStorage.getFile(req.params.path || {}, req.headers || {}, res).catch(err => next(err));
});

module.exports = router;