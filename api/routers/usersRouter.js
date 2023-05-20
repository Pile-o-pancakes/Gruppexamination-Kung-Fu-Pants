const { Router } = require('express');
const router = Router();
const userController = require('../controllers/usersController.js');
const {checkMessageId} = require('../middleware');


router.get('/message', userController.getUserPostedMessages);

router.post('/message/:group_id', userController.postMessage);

router.put('/message/:message_id', checkMessageId, userController.updateMessage);

router.delete('/message/:message_id', checkMessageId, userController.deleteMessage);

router.get('/groups', userController.getGroups);

router.post('/join/:group_id', userController.joinGroup);

router.delete('/leave/:group_id', userController.leaveGroup);

module.exports = router;
