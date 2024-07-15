const express = require('express')
const Mail = require('../../core/system/Mail')
const { checkToken } = require('../../middlewares/index')

const router = express.Router()

// router.post('/mailRegistration',checkToken, (req, res, next) => {
//     Mail.registrationMail(req.body || {}, req.headers || {})
//         .then(data => res.status(200).json({ message: 'Success', data }))
//         .catch(err => next(err));
// });

router.post('/recoverPassword',checkToken, (req, res, next) => {
    Mail.mailRecoverPassword(req.body || {}, req.headers || {})
        .then(data => res.status(200).json({ message: 'Success', data }))
        .catch(err => next(err));
});

router.post('/registrationAndConfirmation',checkToken, (req, res, next) => {
    Mail.mailRegistrationAndConfirmation(req.body || {}, req.headers || {})
        .then(data => res.status(200).json({ message: 'Success', data }))
        .catch(err => next(err));
});

router.post('/mailAfterConfirmedRegistration',checkToken, (req, res, next) => {
    Mail.mailAfterConfirmedRegistration(req.body || {}, req.headers || {})
        .then(data => res.status(200).json({ message: 'Success', data }))
        .catch(err => next(err));
});

router.post('/mailAfterBecomeAuthor',checkToken, (req, res, next) => {
    Mail.mailAfterBecomeAuthor(req.body || {}, req.headers || {})
        .then(data => res.status(200).json({ message: 'Success', data }))
        .catch(err => next(err));
});

router.post('/subscriptionRenewal',checkToken, (req, res, next) => {
    Mail.subscriptionRenewal(req.body || {}, req.headers || {})
        .then(data => res.status(200).json({ message: 'Success', data }))
        .catch(err => next(err));
});

router.post('/mailBuyProduct', checkToken,(req, res, next) => {
    Mail.mailBuyProduct(req.body || {}, req.headers || {})
        .then(data => res.status(200).json({ message: 'Success', data }))
        .catch(err => next(err));
});

router.post('/mailBuySubscription', checkToken,(req, res, next) => {
    Mail.mailBuySubscription(req.body || {}, req.headers || {})
        .then(data => res.status(200).json({ message: 'Success', data }))
        .catch(err => next(err));
});

router.post('/mailBuyPost', checkToken,(req, res, next) => {
    Mail.mailBuyPost(req.body || {}, req.headers || {})
        .then(data => res.status(200).json({ message: 'Success', data }))
        .catch(err => next(err));
});


router.post('/mailBuyAds', checkToken,(req, res, next) => {
    Mail.mailBuyAds(req.body || {}, req.headers || {})
        .then(data => res.status(200).json({ message: 'Success', data }))
        .catch(err => next(err));
});

router.post('/deleteAds', checkToken,(req, res, next) => {
    Mail.deleteAds(req.body || {})
        .then(data => res.status(200).json({ message: 'Success', data }))
        .catch(err => next(err));
});

router.post('/sendMailing', checkToken,(req, res, next) => {
    Mail.sendMailing(req.body || {})
        .then(data => res.status(200).json({ message: 'Success', data }))
        .catch(err => next(err));
});

router.post('/mailDeleteTarget', checkToken,(req, res, next) => {
    Mail.mailDeleteTarget(req.body || {}, req.headers || {})
        .then(data => res.status(200).json({ message: 'Success', data }))
        .catch(err => next(err));
});

router.post('/mailUnsubscribe', checkToken,(req, res, next) => {
    Mail.mailUnsubscribe(req.body || {}, req.headers || {})
        .then(data => res.status(200).json({ message: 'Success', data }))
        .catch(err => next(err));
});

module.exports = router;