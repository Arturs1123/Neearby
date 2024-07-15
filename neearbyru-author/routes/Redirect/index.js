const express = require('express');
const Redirect = require('../../core/system/Redirect')
const {allowRoles} = require("../../middlewares");

const router = express.Router();

router.post('/create', allowRoles(['author', 'admin']), (req, res, next) => {
    Redirect.createRedirect(req.body, req.headers, req.user)
        .then(data => res.status(200).json({message: 'Success', data}))
        .catch(err => next(err));
})

router.post('/update', allowRoles(['author', 'admin']), (req, res, next) => {
    Redirect.updateRedirect(req.body, req.headers, req.user)
        .then(data => res.status(200).json({message: 'Success', data}))
        .catch(err => next(err));
});

router.get('/redirectClick/r/:path', (req, res, next) => {
    Redirect.clickRedirect(req, res, req.params.path, next);
});

router.post('/redirectStats', allowRoles(['author', 'admin']), (req, res, next) => {
    Redirect.redirectStats(req.body, req.headers, req.user)
        .then(data => res.status(200).json({message: 'Success', data}))
        .catch(err => next(err));
});

router.delete('/delete', allowRoles(['author', 'admin']), (req, res, next) => {
    Redirect.deleteRedirect(req.body, req.headers, req.user)
        .then(data => res.status(200).json({message: 'Success', data}))
        .catch(err => next(err));
})

module.exports = router;