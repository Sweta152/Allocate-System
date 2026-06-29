const router = require('express').Router()
const { loginHandler, registerHandler } = require('./auth.controller')
const { authenticate } = require('../../middlewares/auth')
const { authorize } = require('../../middlewares/rbac')

router.post('/login', loginHandler)
router.post('/register-employee', authenticate, authorize('MANAGER', 'ADMIN'), registerHandler)

module.exports = router