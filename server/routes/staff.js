const express = require('express');
const router = express.Router();
const staffController = require('../controller/staffController');
const ROLE_LIST = require('../config/roleList');
const varifyRoles = require('../middleware/verifyRoles');

router
  .route('/')
  .get(staffController.getAllUsers)
  .post(verifyRoles(ROLE_LIST.user), staffController.createNewUser)
  .patch(verifyRoles(ROLE_LIST.user), staffController.updateUser)
  .delete(verifyRoles(ROLE_LIST.user), staffController.deleteUsers);

module.exports = router;
