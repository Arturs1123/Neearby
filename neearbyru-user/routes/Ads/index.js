const express = require('express');
const Ads = require('../../core/system/Ads');
const {allowRoles} = require("../../middlewares");

const router = express.Router();

router.post('/create', allowRoles(['user', 'author', 'admin']), (req, res, next) => {
    Ads.create(req.body || {}, req.headers || {}, req.user || {})
        .then(data => res.status(200).json({message: "Success", data}))
        .catch(err => next(err))
})

router.post('/updateAds', allowRoles(['user', 'author', 'admin']), (req, res, next) => {
    Ads.updateAds(req.body || {}, req.headers || {}, req.user || {})
        .then(data => res.status(200).json({message: "Success", data}))
        .catch(err => next(err))
})

router.post('/delete', allowRoles(['author', 'admin']), (req, res, next) => {
    Ads.deleteAds(req.body || {}, req.headers || {},req.user || {})
        .then(data => res.status(200).json({message: "Success", data}))
        .catch(err => next(err))
})

router.post('/authorAds', (req, res, next) => {
    Ads.getAuthorAds( req.body || {})
        .then(data => res.status(200).json({message: "Success", data}))
        .catch(err => next(err))
})

router.post('/publication', allowRoles(['author', 'admin']), (req, res, next) => {
    Ads.publicationAds( req.body, req.headers || {},req.user || {})
        .then(data => res.status(200).json({message: "Success", data}))
        .catch(err => next(err))
})

router.post('/myAdsEditing', allowRoles(['user', 'author', 'admin']), (req, res, next) => {
    Ads.myAdsForEditing( req.body, req.headers || {},req.user || {})
        .then(data => res.status(200).json({message: "Success", data}))
        .catch(err => next(err))
})

//For Admin
router.post('/allAds', allowRoles(['admin']), (req, res, next) => {
    Ads.allAds( req.body || {}, req.headers || {}, req.user || {})
        .then(data => res.status(200).json({message: "Success", data}))
        .catch(err => next(err))
})

module.exports = router;