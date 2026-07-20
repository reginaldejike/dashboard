const express = require('express');
const router = express.Router();
const staffController = require('../controller/staffController');
const ROLE_LIST = require('../config/roleList');
const varifyRoles = require('../middleware/verifyRoles');

router
  .route('/')
  .get(staffController.getAllUsers)
  .post(verifyRoles(ROLE_LIST.admin), staffController.createNewUser)
  .patch(verifyRoles(ROLE_LIST.admin), staffController.updateUser)
  .delete(verifyRoles(ROLE_LIST.admin), staffController.deleteUsers);

module.exports = router;
