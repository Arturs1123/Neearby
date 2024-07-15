const Admin = require('../../core/system/Admin');
const express = require('express');
const { allowRoles, checkToken } = require("../../middlewares");

const router = express.Router();

router.post('/getUsers', allowRoles(['admin']), (req, res, next) => {
    Admin.getUsers(req.body || {}, req.headers || {}, req.user || {})
        .then(data => res.status(200).json({ message: 'Success', data }))
        .catch(err => next(err));
});

router.post('/banUser', allowRoles(['admin']), (req, res, next) => {
    Admin.banUser(req.body || {}, req.headers || {}, req.user || {})
        .then(data => res.status(200).json({ message: 'Success', data }))
        .catch(err => next(err));
});

router.post('/unbanUser', allowRoles(['admin']), (req, res, next) => {
    Admin.unbanUser(req.body || {}, req.headers || {}, req.user || {})
        .then(data => res.status(200).json({ message: 'Success', data }))
        .catch(err => next(err));
});

router.post('/searchComplaints', allowRoles(['admin']), (req, res, next) => {
    Admin.searchComplaints(req.body || {}, req.headers || {}, req.user || {})
        .then(data => res.status(200).json({ message: 'Success', data }))
        .catch(err => next(err));
});

router.post('/deleteComplaints', allowRoles(['admin']), (req, res, next) => {
    Admin.deleteComplaints(req.body || {}, req.headers || {}, req.user || {})
        .then(data => res.status(200).json({ message: 'Success', data }))
        .catch(err => next(err));
});

router.post('/deleteTarget', allowRoles(['admin']), (req, res, next) => {
    Admin.deleteTarget(req.body || {}, req.headers || {}, req.user || {})
        .then(data => res.status(200).json({ message: 'Success', data }))
        .catch(err => next(err));
});

router.post('/submitTargetEditing', allowRoles(['admin']), (req, res, next) => {
    Admin.submittingTargetForEditing(req.body || {}, req.headers || {}, req.user || {})
        .then(data => res.status(200).json({ message: 'Success', data }))
        .catch(err => next(err));
})

router.post('/allAds', allowRoles(['admin']), (req, res, next) => {
    Admin.allAds(req.body || {}, req.headers || {}, req.user || {})
        .then(data => res.status(200).json({ message: 'Success', data }))
        .catch(err => next(err));
});

router.post('/sendMessageAllUsers', allowRoles(['admin']), (req, res, next) => {
    Admin.sendMessageAllUsers(req.body || {}, req.headers || {}, req.user || {})
        .then(data => res.status(200).json({ message: 'Success', data }))
        .catch(err => next(err));
});

router.post('/sendMailing', allowRoles(['admin']), (req, res, next) => {
    Admin.sendMailing(req.body || {}, req.headers || {}, req.user || {})
        .then(data => res.status(200).json({ message: 'Success', data }))
        .catch(err => next(err));
});

router.post('/allOrders', allowRoles(['admin']), (req, res, next) => {
    Admin.allOrders(req.body || {}, req.headers || {}, req.user || {})
        .then(data => res.status(200).json({ message: 'Success', data }))
        .catch(err => next(err));
});

router.post('/allTargetsForModeration', allowRoles(['admin']), (req, res, next) => {
    Admin.allTargetsForModeration(req.body || {}, req.headers || {}, req.user || {})
        .then(data => res.status(200).json({ message: 'Success', data }))
        .catch(err => next(err));
});

router.post('/updateModerationRights', allowRoles(['admin']), (req, res, next) => {
    Admin.updateModerationRights(req.body || {}, req.headers || {}, req.user || {})
        .then(data => res.status(200).json({ message: 'Success', data }))
        .catch(err => next(err));
});

router.post('/searchModerationComments', allowRoles(['admin']), (req, res, next) => {
    Admin.searchModerationComments(req.body || {}, req.headers || {}, req.user || {})
        .then(data => res.status(200).json({ message: 'Success', data }))
        .catch(err => next(err));
});

router.post('/confirmSendComment', allowRoles(['admin']), (req, res, next) => {
    Admin.confirmSendComment(req.body || {}, req.headers || {}, req.user || {})
        .then(data => res.status(200).json({ message: 'Success', data }))
        .catch(err => next(err));
});

router.post('/moderationCovers', allowRoles(['admin']), (req, res, next) => {
    Admin.moderationCovers(req.body || {}, req.headers || {}, req.user || {})
        .then(data => res.status(200).json({ message: 'Success', data }))
        .catch(err => next(err));
});

router.post('/publicationCover', allowRoles(['admin']), (req, res, next) => {
    Admin.publicationCover(req.body || {}, req.headers || {}, req.user || {})
        .then(data => res.status(200).json({ message: 'Success', data }))
        .catch(err => next(err));
});

router.post('/moderationProfilePictures', allowRoles(['admin']), (req, res, next) => {
    Admin.moderationProfilePictures(req.body || {}, req.headers || {}, req.user || {})
        .then(data => res.status(200).json({ message: 'Success', data }))
        .catch(err => next(err));
});

router.post('/publicationProfilePicture', allowRoles(['admin']), (req, res, next) => {
    Admin.publicationProfilePicture(req.body || {}, req.headers || {}, req.user || {})
        .then(data => res.status(200).json({ message: 'Success', data }))
        .catch(err => next(err));
});

module.exports = router;