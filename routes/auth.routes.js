const { Router } = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { check, validationResult } = require('express-validator')

const User = require('../models/User.js')
const router = Router()


// /api/auth/register
router.post(
    '/register', 
    [
        // check('email', 'Некорректный email').isEmail,
        check('password', 'Минимальная длина пароля 6 символов')
            .isLength({min: 6})
    ],
    async (req, res) => {
    try {

        const errors = validationResult(req)

        if(!errors.isEmpty()){
            return res.status(400).json({
                errors: errors.array(),
                message: 'Некорректные данные при регистрации'
            })
        }

        const {email, password, name, phone, about_me, type} = req.body

        const candidate = await User.findOne({email})

        if(candidate) {
            return res.status(400).json({message: 'Такой пользователь уже существует'})
        }

        const hashedPassword = await bcrypt.hash(password, 12)
        const user = new User({ email, password: hashedPassword, name, phone, about_me, type })

        await user.save()

        res.status(201).json({ message: 'Пользователь создан' })

    } catch (e) {
        res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'})
    }
})

router.post('/login',
    [],
    async(req, res) => {
        try{
            const errors = validationResult(req)

            if(!errors.isEmpty()){
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Некорректные данные при входе в систему'
                })
            }

            const {email, password} = req.body

            const user = await User.findOne({email})

            if(!user){
                return res.status(400).json({message: 'Неверное имя пользователя или пароль'})
            }

            const isMatch = await bcrypt.compare(password, user.password)

            if(!isMatch){
                return res.status(400).json({message: 'Неверное имя пользователя или пароль'})
            }            

            const token = jwt.sign(
                {userId: user.id},
                'secret',
                {expiresIn: '1h'}
            )

            res.json({token, userId: user.id, type: user.type})
        }catch(e){
            res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'})
        }
    }
)

router.post('/check',
    [],
    async(req, res) => {
        try{
            const {id} = req.body

            let check = await User.findOne({_id: id})

            res.json(check)
        } catch(e) {

        }
    }
)


module.exports = router