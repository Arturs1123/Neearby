const express = require('express');
const {checkToken} = require("../../middlewares");
const Referral = require("../../core/system/Referral");

const router = express.Router();

router.post('/searchReferralTarget', checkToken, (req, res, next) => {
    Referral.searchReferralTarget(req.body || {})
        .then(data => res.status(200).json({ message: 'Success', data }))
        .catch(err => next(err));
});

module.exports = router