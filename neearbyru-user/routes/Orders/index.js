const express = require('express');
const Order = require('../../core/system/Order');
const {allowRoles, checkToken} = require("../../middlewares");

const router = express.Router();

router.post('/createOrder', allowRoles(['user', 'author', 'admin']), (req, res, next) => {
    Order.createOrder(req.body || {}, req.headers || {}, req.user || {})
        .then(data => res.status(200).json({message: "Success", data}))
        .catch(err => next(err))
});

router.post('/orderConfirmed', checkToken, (req, res, next) => {
    Order.orderConfirmed(req.body || {}, req.headers || {}, req.user || {})
        .then(data => res.status(200).json({message: "Success", data}))
        .catch(err => next(err))
});

router.post('/getOrders', allowRoles(['author', 'admin']), (req, res, next) => {
    Order.getOrders(req.body || {}, req.headers || {}, req.user || {})
        .then(data => res.status(200).json({message: "Success", data}))
        .catch(err => next(err))
})

router.post('/findOrder', checkToken, (req, res, next) => {
    Order.findOrder(req.body || {}, req.headers || {}, req.user || {})
        .then(data => res.status(200).json({message: "Success", data}))
        .catch(err => next(err))
});

module.exports = router;