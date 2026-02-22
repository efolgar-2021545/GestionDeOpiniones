import { User, Role } from '../models/index.js'
import { hashPassword } from '../../helpers/hash-password.js'

export const seedAdminGeneral = async () => {
    const adminRole = await Role.findOne({
        where: { name: 'ADMIN_GENERAL' }
    })

    const exists = await User.findOne({
        where: { email: 'folgar@gmail.com' }
    })

    if (!exists) {
        const hashedPassword = await hashPassword('Admin2021545')

        await User.create({
            name: 'Super Admin',
            email: 'folgar@gmail.com',
            password: hashedPassword,
            roleId: adminRole.id,
            isActive: true
        })

        console.log('ADMIN_GENERAL se ha creado automáticamente ;D')
    }
}