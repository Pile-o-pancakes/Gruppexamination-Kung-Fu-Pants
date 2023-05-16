const { Router } = require('express')
const router = Router()
const groupController = require('../controllers/groupsController')

// router.get("/members", groupController.getMembers);

// router.get("/messages", groupController.getMessages);

router.post('/create', groupController.createGroup)

module.exports = router
