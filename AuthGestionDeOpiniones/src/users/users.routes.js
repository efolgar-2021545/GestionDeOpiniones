import { Router } from 'express'
import { validateJWT } from '../../middlewares/validate-jwt.js'
import { validateRole } from '../../middlewares/validate-role.js'
import { updateMyPassword } from './users.controller.js'

const router = Router()

router.patch(
    '/change-password',
    validateJWT,
    validateRole('ADMIN_GENERAL', 'USUARIO'),
    updateMyPassword
)

export default router