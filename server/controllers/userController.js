const jwt = require('jsonwebtoken')
const ApiError = require("../Error/ApiError")
const { User, Basket } = require('../models/models')
const bcrypt = require('bcrypt')

const generateJWT = (id, email, role) => {
    return jwt.sign(
        {id, email, role},
        process.env.SECRET_KEY,
        {expiresIn: '24h'}
    )
}

class userController {
    async registration (req, res, next) {
        const { password, email, role } = req.body
        if( !password || !email) {
            return next(ApiError.badRequest('Введите логин или пароль'))
        }
        const condidate = await User.findOne({where: {email}})
        if(condidate) {
            return next(ApiError.badRequest('Пользователь с таким email уже существует'))
        }
    
        const hashPassword = await bcrypt.hash(password, 5)

        const user = await User.create({
            email,
            role,
            password: hashPassword
        })

        const basket = await Basket.create({userId: user.id})
        const token = generateJWT(user.id, user.email, user.role)

        return res.json({token})
    }

    async login(req, res, next) {
        const {email, password} = req.body
        if(!email || !password) {
            return next(ApiError.badRequest('Введите логин или пароль'))
        }

        const user = await User.findOne({where: {email}})

        if (!user) {
            return next(ApiError.internal('Пользователя с таким email не сущестует'))
        }

        const comparePasswod = bcrypt.compareSync(password, user.password)

        if(!comparePasswod) {
            return next(ApiError.badRequest("Вы ввели неправильный пароль"))
        }

        const token = generateJWT(user.id, user.email, user.role)
        return res.json({token})
    } 

    async check(req, res, next) {
        const token = generateJWT(req.user.id, req.user.email, req.user.role)
        return res.json({token})
    }
}

module.exports = new userController()