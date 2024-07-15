const Message = require('../../core/system/Message');
const express = require('express');
const { allowRoles, checkToken} = require("../../middlewares");

const router = express.Router();

router.post('/createChat', allowRoles(['user','author', 'admin']) ,(req, res, next) => {
    Message.createChat(req.body || {}, req.user)
        .then(data => res.status(200).json({ message: 'Success', data }))
        .catch(err => next(err));
});

router.post('/deleteChat', allowRoles(['user','author', 'admin']) ,(req, res, next) => {
    Message.deleteChat(req.body || {}, req.headers || {}, req.user)
        .then(data => res.status(200).json({ message: 'Success', data }))
        .catch(err => next(err));
});

router.post('/addUserWithChat', allowRoles(['user','author', 'admin']) ,(req, res, next) => {
Message.addUserWithChat(req.body || {}, req.headers || {}, req.user)
    .then(data => res.status(200).json({ message: 'Success', data }))
    .catch(err => next(err));
});

router.post('/deleteUserWithChat', allowRoles(['user','author', 'admin']) ,(req, res, next) => {
    Message.deleteUserWithChat(req.body || {}, req.headers || {}, req.user)
        .then(data => res.status(200).json({ message: 'Success', data }))
        .catch(err => next(err));
});

router.post('/sendMessage', allowRoles(['user','author', 'admin']) ,(req, res, next) => {
    Message.sendMessage(req.body || {}, req.headers || {}, req.user)
        .then(data => res.status(200).json({ message: 'Success', data }))
        .catch(err => next(err));
});

router.post('/updateMessage', allowRoles(['user','author', 'admin']) ,(req, res, next) => {
    Message.updateMessage(req.body || {}, req.headers || {}, req.user)
        .then(data => res.status(200).json({ message: 'Success', data }))
        .catch(err => next(err));
});

router.post('/readMessage', allowRoles(['user', 'author', 'admin']) ,(req, res, next) => {
    Message.readMessage(req.body || {}, req.headers || {}, req.user)
        .then(data => res.status(200).json({ message: 'Success', data }))
        .catch(err => next(err));
});

router.post('/deleteMessage', allowRoles(['user','author', 'admin']) ,(req, res, next) => {
    Message.deleteMessage(req.body || {}, req.headers || {}, req.user)
        .then(data => res.status(200).json({ message: 'Success', data }))
        .catch(err => next(err));
});

router.post('/chat', allowRoles(['user', 'author', 'admin']), (req, res, next) => {
    Message.getAllMessages(req.body || {}, req.headers || {}, req.user)
        .then(data => res.status(200).json({ message: 'Success', data }))
        .catch(err => next(err));
})

router.get('/chats', allowRoles(['user', 'author', 'admin']), (req, res, next) => {
    Message.getAllChats(req.user)
        .then(data => res.status(200).json({ message: 'Success', data }))
        .catch(err => next(err));
})

router.post('/notReadChats', allowRoles(['user', 'author', 'admin']), (req, res, next) => {
    Message.notReadChats(req.user)
        .then(data => res.status(200).json({ message: 'Success', data }))
        .catch(err => next(err));
})

router.post('/messageSupportNeearby', checkToken, (req, res, next) => {
    Message.sendMessageSupportNeearby(req.body || {}, req.headers || {})
        .then(data => res.status(200).json({ message: 'Success', data }))
        .catch(err => next(err));
})

module.exports = router;