const ApiError = require('../error/ApiError');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {User} = require('../models')

const generateJwt = (id, name, email, role) => {
    return jwt.sign(
        {id, name, email, role},
        process.env.SECRET_KEY,
        {expiresIn: '24h'}
    )
}

class UserController {
    async registration(req, res, next) {
        const {name, email, password, role} = req.body
        if (!email || !password) {
            return next(ApiError.badRequest('Некорректный email или password'))
        }
        const candidate = await User.findOne({where: {email}})
        if (candidate) {
            return next(ApiError.badRequest('Пользователь с таким email уже существует'))
        }
        const person = await User.findOne({where: {name}})
        if (person) {
            return next(ApiError.badRequest('Пользователь с таким именем уже существует'))
        }
        const hashPassword = await bcrypt.hash(password, 5)
        const user = await User.create({name, email, role, password: hashPassword})
        const token = generateJwt(user.id, user.name, user.email, user.role)
        return res.json({token})
    }

    async login(req, res, next) {
        const {name, password} = req.body
        const user = await User.findOne({where: {name}})
        if (!user) {
            return next(ApiError.internal('Пользователь не найден'))
        }
        let comparePassword = bcrypt.compareSync(password, user.password)
        if (!comparePassword) {
            return next(ApiError.internal('Указан неверный пароль'))
        }
        const token = generateJwt(user.id, user.name, user.email, user.role)
        return res.json({token})
    }

    async getOne(req, res) {
        const {email} = req.params
        const device = await User.findOne(
            {
                where: {email}
            },
        )
        return res.json(device)
    }

    async check(req, res, next) {
        const token = generateJwt(req.user.id, req.user.name, req.user.email, req.user.role)
        return res.json({token})
    }
}

module.exports = new UserController()