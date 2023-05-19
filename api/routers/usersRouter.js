const { Router } = require('express');
const router = Router();
const userController = require('../controllers/usersController.js');

router.get('/message', userController.getUserPostedMessages);

router.post('/message/:group_id', userController.postMessage);

router.put('/message/:message_id', userController.updateMessage);

router.delete('/message/:message_id', userController.deleteMessage);

router.get('/groups', userController.getGroups);

router.post('/join/:group_id', userController.joinGroup);

router.delete('/leave/:group_id', userController.leaveGroup);

module.exports = router;
