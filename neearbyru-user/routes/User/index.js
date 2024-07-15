const User = require('../../core/system/User');
const express = require('express');
const { allowRoles, checkToken } = require("../../middlewares");

const router = express.Router();


router.post('/readNotification', allowRoles(['user', 'author']) ,(req, res, next) => {
    User.readNotification(req.body || {}, req.headers || {}, req.user)
        .then(data => res.status(200).json({ message: 'Success', data }))
        .catch(err => next(err));
});

router.post('/getUnreadNotifications', allowRoles(['user', 'author']) ,(req, res, next) => {
    User.getUnreadNotifications(req.body || {}, req.headers || {}, req.user)
        .then(data => res.status(200).json({ message: 'Success', data }))
        .catch(err => next(err));
});
router.post('/getNotifications', allowRoles(['user', 'author']) ,(req, res, next) => {
    User.getNotifications(req.body || {}, req.headers || {}, req.user)
        .then(data => res.status(200).json({ message: 'Success', data }))
        .catch(err => next(err));
});

router.post('/updateSubdomain', allowRoles(['user', 'author']) ,(req, res, next) => {
    User.setSubdomain(req.body || {}, req.headers || {}, req.user)
        .then(data => res.status(200).json({ message: 'Success', data }))
        .catch(err => next(err));
});

router.post('/getProfile', (req, res, next) => {
    User.getProfile(req.body || {}, req.headers || {})
        .then(data => res.status(200).json({ message: 'Success', data }))
        .catch(err => next(err));
});

router.post('/auth', (req, res, next) => {
    User.authenticate(req.body || {}, req.headers || {})
        .then(data => res.status(200).json({ message: 'Success', data }))
        .catch(err => next(err));
});

router.post('/registration', (req, res, next) => {
    User.registration(req.body || {}, req.headers || {})
        .then(data => res.status(200).json({ message: 'Success', data }))
        .catch(err => next(err));
});

router.post('/whoami', checkToken, (req, res, next) => {
    User.whoami(req.body || {}, req.headers || {})
        .then(data => res.status(200).json({ message: 'Success', data }))
        .catch(err => next(err));
});

router.post('/becomeAuthor', allowRoles(['user']) ,(req, res, next) => {
    User.becomeAuthor(req.body || {}, req.headers || {}, req.user)
        .then(data => res.status(200).json({ message: 'Success', data }))
        .catch(err => next(err));
});

router.post('/findUser', checkToken, (req, res, next) => {
    User.findUser(req.body || {}, req.headers || {})
        .then(data => res.status(200).json({ message: 'Success', data }))
        .catch(err => next(err));
});

router.post('/getSessions', allowRoles(['admin']) ,(req, res, next) => {
    User.findSessions(req.body || {}, req.headers || {}, req.user)
        .then(data => res.status(200).json({ message: 'Success', data }))
        .catch(err => next(err));
});

router.delete('/deleteSession', allowRoles(['admin']) ,(req, res, next) => {
    User.deleteSession(req.body || {}, req.headers || {}, req.user)
        .then(data => res.status(200).json({ message: 'Success', data }))
        .catch(err => next(err));
});

router.post('/passwordRecovery',(req, res, next) => {
    User.passwordRecovery(req.body || {}, req.headers || {}, req.user)
        .then(data => res.status(200).json({ message: 'Success', data }))
        .catch(err => next(err));
});

router.post('/passwordRecoveryByToken',(req, res, next) => {
    User.passwordRecoveryWithToken(req.body || {}, req.headers || {}, req.user)
        .then(data => res.status(200).json({ message: 'Success', data }))
        .catch(err => next(err));
});

router.post('/confirmRegistration',(req, res, next) => {
    User.confirmedRegistration(req.body || {}, req.headers || {}, req.user)
        .then(data => res.status(200).json({ message: 'Success', data }))
        .catch(err => next(err));
});

router.post('/updateCover', allowRoles(['user', 'author', 'admin']) ,(req, res, next) => {
    User.updateCover(req.body || {}, req.headers || {}, req.user)
      .then(data => res.status(200).json({ message: 'Success', data }))
      .catch(err => next(err));
});

router.post('/updateCoverMiniature', allowRoles(['user', 'author', 'admin']) ,(req, res, next) => {
    User.updateProfileCoverMiniature(req.body || {}, req.headers || {}, req.user)
        .then(data => res.status(200).json({ message: 'Success', data }))
        .catch(err => next(err));
});

router.post('/updateProfilePicture', allowRoles(['user', 'author', 'admin']) ,(req, res, next) => {
    User.updateProfilePicture(req.body || {}, req.headers || {}, req.user)
        .then(data => res.status(200).json({ message: 'Success', data }))
        .catch(err => next(err));
});
router.delete('/delete-avatar', allowRoles(['user', 'author', 'admin']) ,(req, res, next) => {
    User.deleteAvatar(req.body || {}, req.headers || {}, req.user)
        .then(data => res.status(200).json({ message: 'Success', data }))
        .catch(err => next(err));
});
router.delete('/delete-cover', allowRoles(['user', 'author', 'admin']) ,(req, res, next) => {
    User.deleteCover(req.body || {}, req.headers || {}, req.user)
        .then(data => res.status(200).json({ message: 'Success', data }))
        .catch(err => next(err));
});

// router.delete('/delete-moderation-cover', allowRoles(['user', 'author', 'admin']) ,(req, res, next) => {
//     User.deleteModerationCover(req.body || {}, req.headers || {}, req.user)
//         .then(data => res.status(200).json({ message: 'Success', data }))
//         .catch(err => next(err));
// });

router.post('/updateProfilePictureMiniature', allowRoles(['user', 'author', 'admin']) ,(req, res, next) => {
    User.updateProfilePictureMiniature(req.body, req.headers || {}, req.user)
        .then(data => res.status(200).json({ message: 'Success', data }))
        .catch(err => next(err));
});

router.post('/update-profile-avatar',(req, res, next) => {
    User.updateProfileAvatar(req.body, req.headers || {}, req.user)
        .then(data => res.status(200).json({ message: 'Success', data }))
        .catch(err => next(err));
});

router.post('/update-profile-cover', (req, res, next) => {
    User.updateProfileCover(req.body, req.headers || {}, req.user)
        .then(data => res.status(200).json({ message: 'Success', data }))
        .catch(err => next(err));
});

router.post('/request-moderation-profile-cover', allowRoles(['user', 'author', 'admin']) ,(req, res, next) => {
    User.updateModerationProfileCover(req.files || {}, req.headers || {}, req.user)
        .then(data => res.status(200).json({ message: 'Success', data }))
        .catch(err => next(err));
});

router.post('/moderation-avatar-status-accept', allowRoles(['user', 'author', 'admin']) ,(req, res, next) => {
    User.updateModerationProfileAvatarStatus(req.body, req.headers || {}, req.user)
        .then(data => res.status(200).json({ message: 'Success', data }))
        .catch(err => next(err));
});

router.post('/moderation-avatar-status-cancel', allowRoles(['user', 'author', 'admin']) ,(req, res, next) => {
    User.updateModerationProfileAvatarStatusCancel(req.body, req.headers || {}, req.user)
        .then(data => res.status(200).json({ message: 'Success', data }))
        .catch(err => next(err));
});



router.post('/moderation-avatar-picture-accept', allowRoles(['user', 'author', 'admin']) ,(req, res, next) => {
    User.updateModerationProfilePictureStatus(req.body, req.headers || {}, req.user)
        .then(data => res.status(200).json({ message: 'Success', data }))
        .catch(err => next(err));
});

router.post('/moderation-avatar-picture-cancel', allowRoles(['user', 'author', 'admin']) ,(req, res, next) => {
    User.updateModerationProfilePictureStatusCancel(req.body, req.headers || {}, req.user)
        .then(data => res.status(200).json({ message: 'Success', data }))
        .catch(err => next(err));
});



router.post('/get-moderation-cover',(req, res, next) => {
    User.findModerationProfileCover(req.body || {})
        .then(data => res.status(200).json({ message: 'Success', data }))
        .catch(err => next(err));
});

router.post('/searchModerationAcceptCover', (req, res, next) => {
    User.searchCoverAcceptAdmin(req.body || {}, req.headers || {}, req.user)
        .then(data => res.status(200).json({ message: 'Success', data }))
        .catch(err => next(err));
});
router.post('/searchModerationCancelCover', (req, res, next) => {
    User.searchCoverCancelAdmin(req.body || {}, req.headers || {}, req.user)
        .then(data => res.status(200).json({ message: 'Success', data }))
        .catch(err => next(err));
});


router.post('/get-moderation-avatar',(req, res, next) => {
    User.findModerationProfileAvatars(req.body || {})
        .then(data => res.status(200).json({ message: 'Success', data }))
        .catch(err => next(err));
});

router.post('/searchModerationAcceptAvatar', (req, res, next) => {
    User.searchAvatarsAcceptAdmin(req.body || {}, req.headers || {}, req.user)
        .then(data => res.status(200).json({ message: 'Success', data }))
        .catch(err => next(err));
});
router.post('/searchModerationCancelAvatar', (req, res, next) => {
    User.searchAvatarsCancelAdmin(req.body || {}, req.headers || {}, req.user)
        .then(data => res.status(200).json({ message: 'Success', data }))
        .catch(err => next(err));
});

router.post('/banAvatar', (req, res, next) => {
    User.banAvatarsForAdmin(req.body || {})
        .then(data => res.status(200).json({ message: 'Success', data }))
        .catch(err => next(err));
});

router.post('/unbanAvatar', (req, res, next) => {
    User.unbanAvatarsForAdmin(req.body || {})
        .then(data => res.status(200).json({ message: 'Success', data }))
        .catch(err => next(err));
});


router.post('/get-moderation-product',(req, res, next) => {
    User.searchProductAdmin(req.body || {})
        .then(data => res.status(200).json({ message: 'Success', data }))
        .catch(err => next(err));
});

router.post('/searchModerationAcceptProduct', (req, res, next) => {
    User.searchProductAcceptAdmin(req.body || {}, req.headers || {}, req.user)
        .then(data => res.status(200).json({ message: 'Success', data }))
        .catch(err => next(err));
});
router.post('/searchModerationCancelProduct', (req, res, next) => {
    User.searchProductCancelAdmin(req.body || {}, req.headers || {}, req.user)
        .then(data => res.status(200).json({ message: 'Success', data }))
        .catch(err => next(err));
});

router.delete('/delete-cover-moder', allowRoles(['user', 'author', 'admin']) ,(req, res, next) => {
    User.deleteCoverModer(req.body || {}, req.headers || {}, req.user)
        .then(data => res.status(200).json({ message: 'Success', data }))
        .catch(err => next(err));
});


router.post('/request-moderation-profile-avatar', allowRoles(['user', 'author', 'admin']) ,(req, res, next) => {
    User.updateModerationProfileAvatar(req.files || {}, req.headers || {}, req.user)
        .then(data => res.status(200).json({ message: 'Success', data }))
        .catch(err => next(err));
});


router.post('/get-all-moderation-avatar', allowRoles(['user', 'author', 'admin']) ,(req, res, next) => {
    User.findModerationProfileAvatar(req.body || {}, req.headers || {}, req.user)
        .then(data => res.status(200).json({ message: 'Success', data }))
        .catch(err => next(err));
});

router.post('/get-all-moderation-avatar-status', allowRoles(['user', 'author', 'admin']) ,(req, res, next) => {
    User.findModerationProfileAvatarStatus(req.body || {}, req.headers || {}, req.user)
        .then(data => res.status(200).json({ message: 'Success', data }))
        .catch(err => next(err));
});

router.post('/get-all-moderation-cover-status',(req, res, next) => {
    User.findModerationProfileCoverStatus(req.body || {}, req.headers || {}, req.user)
        .then(data => res.status(200).json({ message: 'Success', data }))
        .catch(err => next(err));
});
router.post('/searchCoversByIds', (req, res, next) => {
    User.searchCoversByIds(req.body || {}, req.headers || {}, req.user)
        .then(data => res.status(200).json({ message: 'Success', data }))
        .catch(err => next(err));
});
router.post('/searchAvatarsByIds', (req, res, next) => {
    User.searchAvatarsByIds(req.body || {}, req.headers || {}, req.user)
        .then(data => res.status(200).json({ message: 'Success', data }))
        .catch(err => next(err));
});

router.delete('/delete-avatar-moder', allowRoles(['user', 'author', 'admin']) ,(req, res, next) => {
    User.deleteCoverAvatar(req.body || {}, req.headers || {}, req.user)
        .then(data => res.status(200).json({ message: 'Success', data }))
        .catch(err => next(err));
});


router.post('/createComplaint', allowRoles(['user', 'author', 'admin']) ,(req, res, next) => {
    User.createComplaint(req.body || {}, req.headers || {}, req.user)
        .then(data => res.status(200).json({ message: 'Success', data }))
        .catch(err => next(err));
});

router.post('/myPurchases', allowRoles(['user', 'author', 'admin']) ,(req, res, next) => {
    User.myPurchases(req.body || {}, req.headers || {}, req.user)
        .then(data => res.status(200).json({ message: 'Success', data }))
        .catch(err => next(err));
});

router.post('/searchCardUser', checkToken, (req, res, next) => {
    User.searchCardUser(req.body || {}, req.headers || {})
        .then(data => res.status(200).json({ message: 'Success', data }))
        .catch(err => next(err));
});

router.post('/addCard', allowRoles(['user', 'author', 'admin']), (req, res, next) => {
    User.addCard(req.body || {}, req.headers || {}, req.user)
        .then(data => res.status(200).json({ message: 'Success', data }))
        .catch(err => next(err));
});

router.post('/addFavorites', allowRoles(['user', 'author', 'admin']), (req, res, next) => {
    User.addFavorites(req.body || {}, req.headers || {}, req.user)
        .then(data => res.status(200).json({ message: 'Success', data }))
        .catch(err => next(err));
});

router.post('/searchFavorites', allowRoles(['user', 'author', 'admin']), (req, res, next) => {
    User.searchFavorites(req.body || {}, req.headers || {}, req.user)
        .then(data => res.status(200).json({ message: 'Success', data }))
        .catch(err => next(err));
});

router.post('/deleteFavorite', allowRoles(['user', 'author', 'admin']), (req, res, next) => {
    User.deleteFavorite(req.body || {}, req.headers || {}, req.user)
        .then(data => res.status(200).json({ message: 'Success', data }))
        .catch(err => next(err));
});

router.post('/serviceDeleteFavorite', checkToken, (req, res, next) => {
    User.serviceDeleteFavorite(req.body || {}, req.headers || {}, req.user)
        .then(data => res.status(200).json({ message: 'Success', data }))
        .catch(err => next(err));
});

router.post('/findUsersByIds', checkToken, (req, res, next) => {
    User.findUsersByIds(req.body || {})
        .then(data => res.status(200).json({ message: 'Success', data }))
        .catch(err => next(err));
});

router.post('/searchProfilePicture', checkToken, (req, res, next) => {
    User.searchProfilePicture(req.body || {}, req.headers || {}, req.user)
        .then(data => res.status(200).json({ message: 'Success', data }))
        .catch(err => next(err));
});

router.post('/repostOnWall', allowRoles(['user', 'author', 'admin']), (req, res, next) => {
    User.repostOnWall(req.body || {}, req.headers || {}, req.user)
        .then(data => res.status(200).json({ message: 'Success', data }))
        .catch(err => next(err));
});

router.post('/repostOnMessage', allowRoles(['user', 'author', 'admin']), (req, res, next) => {
    User.repostOnMessage(req.body || {}, req.headers || {}, req.user)
        .then(data => res.status(200).json({ message: 'Success', data }))
        .catch(err => next(err));
});

router.post('/searchMyReportsOnWall', allowRoles(['user', 'author', 'admin']), (req, res, next) => {
    User.searchMyReportsOnWall(req.body || {}, req.headers || {}, req.user)
        .then(data => res.status(200).json({ message: 'Success', data }))
        .catch(err => next(err));
});

router.post('/deleteRepost', allowRoles(['user', 'author', 'admin']), (req, res, next) => {
    User.deleteRepost(req.body || {}, req.headers || {}, req.user)
        .then(data => res.status(200).json({ message: 'Success', data }))
        .catch(err => next(err));
});

module.exports = router;