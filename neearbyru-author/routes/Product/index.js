const Product = require('../../core/system/Product');
const express = require('express');
const { allowRoles, checkToken, softAuth } = require("../../middlewares");

const router = express.Router();

router.post('/createProduct', (req, res, next) => {
    Product.createProduct(req.body || {},   req.headers || {}, req.user, req.files || {},)
        .then(data => res.status(200).json({ message: 'Success', data }))
        .catch(err => next(err));
});
router.post('/updateProduct', (req, res, next) => {
    Product.updateProduct(req.body || {}, req.headers || {}, req.user, req.files || {})
        .then(data => res.status(200).json({ message: 'Success', data }))
        .catch(err => next(err));
});
router.post('/updateProductPosition', (req, res, next) => {
    Product.updateProductPosition(req.body || {}, req.headers || {}, req.user)
        .then(data => res.status(200).json({ message: 'Success', data }))
        .catch(err => next(err));
});
router.post('/updateProductComments', (req, res, next) => {
    Product.updateProductComments(req.body || {}, req.headers || {}, req.user)
        .then(data => res.status(200).json({ message: 'Success', data }))
        .catch(err => next(err));
});

router.post('/updateActive', (req, res, next) => {
    Product.updateActive(req.body || {}, req.headers || {}, req.user)
        .then(data => res.status(200).json({ message: 'Success', data }))
        .catch(err => next(err));
});

router.post('/updateZakrep', (req, res, next) => {
    Product.updateZakrep(req.body || {}, req.headers || {}, req.user)
        .then(data => res.status(200).json({ message: 'Success', data }))
        .catch(err => next(err));
});

router.post('/deleteProduct', (req, res, next) => {
    Product.deleteProduct(req.body || {}, req.headers || {}, req.user)
        .then(data => res.status(200).json({ message: 'Success', data }))
        .catch(err => next(err));
});

router.post('/deleteProductForAdmin', checkToken, (req, res, next) => {
    Product.deleteProductForAdmin(req.body || {})
        .then(data => res.status(200).json({ message: 'Success', data }))
        .catch(err => next(err));
});

router.post('/searchProducts', (req, res, next) => {
    Product.searchProducts(req.body || {}, req.headers || {}, req.user)
        .then(data => res.status(200).json({ message: 'Success', data }))
        .catch(err => next(err));
});

router.post('/searchProductsAdmin', (req, res, next) => {
    Product.searchProductsAdmin(req.body || {}, req.headers || {}, req.user)
        .then(data => res.status(200).json({ message: 'Success', data }))
        .catch(err => next(err));
});

router.post('/searchUsers', (req, res, next) => {
    Product.searchUsers(req.body || {}, req.headers || {}, req.user)
        .then(data => res.status(200).json({ message: 'Success', data }))
        .catch(err => next(err));
});

router.post('/updateBanUser', (req, res, next) => {
    Product.updateBanUser(req.body || {}, req.headers || {}, req.user)
        .then(data => res.status(200).json({ message: 'Success', data }))
        .catch(err => next(err));
});

router.post('/searchModerationProducts', (req, res, next) => {
    Product.searchModerationProducts(req.body || {}, req.headers || {}, req.user)
        .then(data => res.status(200).json({ message: 'Success', data }))
        .catch(err => next(err));
});

router.post('/searchModerationProduct', (req, res, next) => {
    Product.searchProductAdmin(req.body || {}, req.headers || {}, req.user)
        .then(data => res.status(200).json({ message: 'Success', data }))
        .catch(err => next(err));
});
router.post('/searchModerationAcceptProduct', (req, res, next) => {
    Product.searchProductAcceptAdmin(req.body || {}, req.headers || {}, req.user)
        .then(data => res.status(200).json({ message: 'Success', data }))
        .catch(err => next(err));
});
router.post('/searchModerationCancelProduct', (req, res, next) => {
    Product.searchProductCancelAdmin(req.body || {}, req.headers || {}, req.user)
        .then(data => res.status(200).json({ message: 'Success', data }))
        .catch(err => next(err));
});

router.post('/searchCoversByIds', (req, res, next) => {
    Product.searchCoversByIds(req.body || {}, req.headers || {}, req.user)
        .then(data => res.status(200).json({ message: 'Success', data }))
        .catch(err => next(err));
});

router.post('/banCover', (req, res, next) => {
    Product.banCoverForAdmin(req.body || {})
        .then(data => res.status(200).json({ message: 'Success', data }))
        .catch(err => next(err));
});

router.post('/unbanCover', (req, res, next) => {
    Product.unbanCoverForAdmin(req.body || {})
        .then(data => res.status(200).json({ message: 'Success', data }))
        .catch(err => next(err));
});

router.post('/searchProductsByIds', (req, res, next) => {
    Product.searchProductsByIds(req.body || {}, req.headers || {}, req.user)
        .then(data => res.status(200).json({ message: 'Success', data }))
        .catch(err => next(err));
});

router.post('/banProducts', (req, res, next) => {
    Product.banProductsForAdmin(req.body || {})
        .then(data => res.status(200).json({ message: 'Success', data }))
        .catch(err => next(err));
});

router.post('/unbanProducts', (req, res, next) => {
    Product.unbanProductsForAdmin(req.body || {})
        .then(data => res.status(200).json({ message: 'Success', data }))
        .catch(err => next(err));
});

router.post('/likeProduct', (req, res, next) => {
    Product.likeProduct(req.body || {}, req.headers || {}, req.user)
        .then(data => res.status(200).json({ message: 'Success', data }))
        .catch(err => next(err));
});

router.post('/repostProduct', (req, res, next) => {
    Product.repostProduct(req.body || {}, req.headers || {}, req.user)
        .then(data => res.status(200).json({ message: 'Success', data }))
        .catch(err => next(err));
});

router.post('/searchRepost', (req, res, next) => {
    Product.searchRepostedByIds(req.body || {}, req.headers || {}, req.user)
        .then(data => res.status(200).json({ message: 'Success', data }))
        .catch(err => next(err));
});

router.post('/searchWallRepost', (req, res, next) => {
    Product.searchRepostedWallByIds(req.body || {}, req.headers || {}, req.user)
        .then(data => res.status(200).json({ message: 'Success', data }))
        .catch(err => next(err));
});


router.post('/repostFavor', (req, res, next) => {
    Product.FavorProduct(req.body || {}, req.headers || {}, req.user)
        .then(data => res.status(200).json({ message: 'Success', data }))
        .catch(err => next(err));
});

router.post('/searchFavor', (req, res, next) => {
    Product.searchFavorByIds(req.body || {}, req.headers || {}, req.user)
        .then(data => res.status(200).json({ message: 'Success', data }))
        .catch(err => next(err));
});

router.post('/searchWallFavor', (req, res, next) => {
    Product.searchFavorWallByIds(req.body || {}, req.headers || {}, req.user)
        .then(data => res.status(200).json({ message: 'Success', data }))
        .catch(err => next(err));
});

router.post('/searchLikes', (req, res, next) => {
    Product.searchLikes(req.body || {}, req.headers || {}, req.user)
        .then(data => res.status(200).json({ message: 'Success', data }))
        .catch(err => next(err));
});

router.post('/addCommentWithProduct', (req, res, next) => {
    Product.addCommentWithProduct(req.body || {}, req.headers || {}, req.user)
        .then(data => res.status(200).json({ message: 'Success', data }))
        .catch(err => next(err));
});

router.post('/myProductsEditing', allowRoles(['user', 'author', 'admin']), (req, res, next) => {
    Product.myProductsForEditing(req.body || {}, req.headers || {}, req.user)
        .then(data => res.status(200).json({ message: 'Success', data }))
        .catch(err => next(err));
});

router.post('/updateProductForEditing', checkToken, (req, res, next) => {
    Product.updateProductForEditing(req.body || {})
        .then(data => res.status(200).json({ message: 'Success', data }))
        .catch(err => next(err));
});

router.post('/myProductsPurchase', checkToken, (req, res, next) => {
    Product.myProductsPurchase(req.body || {})
        .then(data => res.status(200).json({ message: 'Success', data }))
        .catch(err => next(err));
});

router.post('/addProductInReferralSystem', allowRoles(['user', 'author', 'admin']), (req, res, next) => {
    Product.addProductInReferralSystem(req.body || {}, req.headers || {}, req.user)
        .then(data => res.status(200).json({ message: 'Success', data }))
        .catch(err => next(err));
});

router.post('/updateReferralProduct', allowRoles(['user', 'author', 'admin']), (req, res, next) => {
    Product.updateReferralProduct(req.body || {}, req.headers || {}, req.user)
        .then(data => res.status(200).json({ message: 'Success', data }))
        .catch(err => next(err));
});

router.post('/deleteReferralProduct', allowRoles(['user', 'author', 'admin']), (req, res, next) => {
    Product.deleteReferralProduct(req.body || {}, req.headers || {}, req.user)
        .then(data => res.status(200).json({ message: 'Success', data }))
        .catch(err => next(err));
});

router.post('/addUserInReferralProduct', allowRoles(['user', 'author', 'admin']), (req, res, next) => {
    Product.addUserInReferralProduct(req.body || {}, req.headers || {}, req.user)
        .then(data => res.status(200).json({ message: 'Success', data }))
        .catch(err => next(err));
});

router.post('/searchModerationComments',  (req, res, next) => {
    Product.searchModerationComments(req.body || {})
        .then(data => res.status(200).json({ message: 'Success', data }))
        .catch(err => next(err));
});

router.post('/searchComments',  (req, res, next) => {
    Product.searchComByIds(req.body || {})
        .then(data => res.status(200).json({ message: 'Success', data }))
        .catch(err => next(err));
});

router.post('/confirmSendComment', (req, res, next) => {
    Product.confirmSendComment(req.body || {})
        .then(data => res.status(200).json({ message: 'Success', data }))
        .catch(err => next(err));
});

module.exports = router;