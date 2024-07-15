const Subscription = require('../../core/system/Subscription');
const express = require('express');
const { allowRoles, checkToken} = require("../../middlewares");
const Product = require("../../core/system/Product");

const router = express.Router();

router.post('/createSubscription', (req, res, next) => {
    Subscription.createSubscription(req.body || {}, req.headers || {}, req.user, req.files || {})
        .then(data => res.status(200).json({ message: 'Success', data }))
        .catch(err => next(err));
});

router.post('/updateSubscription', (req, res, next) => {
    Subscription.updateSubscription(req.body || {}, req.headers || {}, req.user, req.files || {})
        .then(data => res.status(200).json({ message: 'Success', data }))
        .catch(err => next(err));
});

router.post('/deleteSubscriptionForAdmin',(req, res, next) => {
    Subscription.deleteSubscriptionForAdmin(req.body || {})
        .then(data => res.status(200).json({ message: 'Success', data }))
        .catch(err => next(err));
});

router.post('/searchSubscriptions', (req, res, next) => {
    Subscription.searchSubscriptions(req.body || {}, req.headers || {})
        .then(data => res.status(200).json({ message: 'Success', data }))
        .catch(err => next(err));
});

router.post('/searchModerationSubscriptions', (req, res, next) => {
    Subscription.searchModerationSubscriptions(req.body || {}, req.headers || {})
        .then(data => res.status(200).json({ message: 'Success', data }))
        .catch(err => next(err));
});

router.post('/searchSubscriptionsByIds', (req, res, next) => {
    Subscription.searchSubscriptionsByIds(req.body || {})
        .then(data => res.status(200).json({ message: 'Success', data }))
        .catch(err => next(err));
});

router.post('/unbanSubscriptions', (req, res, next) => {
    Subscription.unbanSubscriptionsForAdmin(req.body || {})
        .then(data => res.status(200).json({ message: 'Success', data }))
        .catch(err => next(err));
});

router.post('/banSubscriptions', (req, res, next) => {
    Subscription.banSubscriptionsForAdmin(req.body || {})
        .then(data => res.status(200).json({ message: 'Success', data }))
        .catch(err => next(err));
});

router.post('/updateSubscriptionPosition', (req, res, next) => {
    Subscription.updateSubscriptionPosition(req.body || {}, req.headers || {}, req.user)
        .then(data => res.status(200).json({ message: 'Success', data }))
        .catch(err => next(err));
});
router.post('/updateSubscriptionComments', (req, res, next) => {
    Subscription.updateSubscriptionComments(req.body || {}, req.headers || {}, req.user)
        .then(data => res.status(200).json({ message: 'Success', data }))
        .catch(err => next(err));
});


router.post('/likeSubscription', (req, res, next) => {
    Subscription.likeSubscriptions(req.body || {}, req.headers || {}, req.user)
        .then(data => res.status(200).json({ message: 'Success', data }))
        .catch(err => next(err));
});
router.post('/searchLikes', (req, res, next) => {
    Subscription.searchLikes(req.body || {}, req.headers || {}, req.user)
        .then(data => res.status(200).json({ message: 'Success', data }))
        .catch(err => next(err));
});

router.post('/repostSubscription', (req, res, next) => {
    Subscription.repostSubscription(req.body || {}, req.headers || {}, req.user)
        .then(data => res.status(200).json({ message: 'Success', data }))
        .catch(err => next(err));
});

router.post('/searchRepost', (req, res, next) => {
    Subscription.searchRepostedByIds(req.body || {}, req.headers || {}, req.user)
        .then(data => res.status(200).json({ message: 'Success', data }))
        .catch(err => next(err));
});

router.post('/searchWallRepost', (req, res, next) => {
    Subscription.searchRepostedWallByIds(req.body || {}, req.headers || {}, req.user)
        .then(data => res.status(200).json({ message: 'Success', data }))
        .catch(err => next(err));
});


router.post('/repostFavor', (req, res, next) => {
    Subscription.FavorSubscription(req.body || {}, req.headers || {}, req.user)
        .then(data => res.status(200).json({ message: 'Success', data }))
        .catch(err => next(err));
});

router.post('/searchFavor', (req, res, next) => {
    Subscription.searchFavorByIds(req.body || {}, req.headers || {}, req.user)
        .then(data => res.status(200).json({ message: 'Success', data }))
        .catch(err => next(err));
});

router.post('/searchWallFavor', (req, res, next) => {
    Subscription.searchFavorWallByIds(req.body || {}, req.headers || {}, req.user)
        .then(data => res.status(200).json({ message: 'Success', data }))
        .catch(err => next(err));
});


router.post('/addCommentWithSubscription', (req, res, next) => {
    Subscription.addCommentWithSubscriptions(req.body || {}, req.headers || {}, req.user)
        .then(data => res.status(200).json({ message: 'Success', data }))
        .catch(err => next(err));
});

router.post('/searchComments',  (req, res, next) => {
    Subscription.searchComByIds(req.body || {})
        .then(data => res.status(200).json({ message: 'Success', data }))
        .catch(err => next(err));
});


router.post('/createSubscribedUser',checkToken, (req, res, next) => {
    Subscription.createSubscribedUser(req.body || {})
        .then(data => res.status(200).json({ message: 'Success', data }))
        .catch(err => next(err));
});

router.post('/likeSubscription',allowRoles(['user', 'author', 'admin']), (req, res, next) => {
    Subscription.likeSubscription(req.body || {}, req.headers || {}, req.user)
        .then(data => res.status(200).json({ message: 'Success', data }))
        .catch(err => next(err));
});

router.post('/addCommentWithSubscription',allowRoles(['user', 'author', 'admin']), (req, res, next) => {
    Subscription.addCommentWithSubscription(req.body || {}, req.headers || {}, req.user)
        .then(data => res.status(200).json({ message: 'Success', data }))
        .catch(err => next(err));
});

router.post('/mySubscriptionsEditing',allowRoles(['user', 'author', 'admin']), (req, res, next) => {
    Subscription.mySubscriptionsForEditing(req.body || {}, req.headers || {}, req.user)
        .then(data => res.status(200).json({ message: 'Success', data }))
        .catch(err => next(err));
});

router.post('/updateSubscriptionForEditing',checkToken, (req, res, next) => {
    Subscription.updateSubscriptionForEditing(req.body || {})
        .then(data => res.status(200).json({ message: 'Success', data }))
        .catch(err => next(err));
});

router.post('/mySubscriptionsPurchase',checkToken, (req, res, next) => {
    Subscription.mySubscriptionPurchase(req.body || {})
        .then(data => res.status(200).json({ message: 'Success', data }))
        .catch(err => next(err));
});

router.post('/unsubscribe', allowRoles(['user', 'author', 'admin']), (req, res, next) => {
    Subscription.unsubscribe(req.body || {}, req.headers || {}, req.user)
        .then(data => res.status(200).json({ message: 'Success', data }))
        .catch(err => next(err));
});

router.post('/addSubscriptionInReferralSystem', allowRoles(['user', 'author', 'admin']), (req, res, next) => {
    Subscription.addSubscriptionInReferralSystem(req.body || {}, req.headers || {}, req.user)
        .then(data => res.status(200).json({ message: 'Success', data }))
        .catch(err => next(err));
});

router.post('/updateReferralSubscription', allowRoles(['user', 'author', 'admin']), (req, res, next) => {
    Subscription.updateReferralSubscription(req.body || {}, req.headers || {}, req.user)
        .then(data => res.status(200).json({ message: 'Success', data }))
        .catch(err => next(err));
});

router.post('/deleteReferralSubscription', allowRoles(['user', 'author', 'admin']), (req, res, next) => {
    Subscription.deleteReferralSubscription(req.body || {}, req.headers || {}, req.user)
        .then(data => res.status(200).json({ message: 'Success', data }))
        .catch(err => next(err));
});

router.post('/addUserInReferralSubscription', allowRoles(['user', 'author', 'admin']), (req, res, next) => {
    Subscription.addUserInReferralSubscription(req.body || {}, req.headers || {}, req.user)
        .then(data => res.status(200).json({ message: 'Success', data }))
        .catch(err => next(err));
});

router.post('/searchModerationComments', checkToken, (req, res, next) => {
    Subscription.searchModerationComments(req.body || {})
        .then(data => res.status(200).json({ message: 'Success', data }))
        .catch(err => next(err));
});

module.exports = router;