const { Router } = require('express');
const router = Router();
const groupController = require('../controllers/groupsController');

// router.get("/members/:group_id", groupController.getMembers);

// router.get("/messages/:group_id", groupController.getMessages);

router.post('/create', groupController.createGroup);

module.exports = router;
