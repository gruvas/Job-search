const { Router } = require('express')

const User = require('../models/User.js')
const Reception_unemployed = require('../models/Reception_unemployed.js')

const router = Router()


// /api/reception_unemployed/time
router.post('/time',
    async(req, res) => {
        try{
            const time = await Reception_unemployed.find()

            res.json(time)
        }catch(e){
            res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'})
        }
    }
)

router.post('/session_creation',
    async (req, res) => {
    try {
        const {date, localStr_id} = req.body

        const admin = await User.findOne({type: 'admin'})
        const reception_unemployed = new Reception_unemployed({date, employee: admin._id, unemployed: localStr_id})
        await reception_unemployed.save()

        await User.updateOne(
            {type: 'admin'},
            {
                $push: {links_time_receipt: reception_unemployed._id}
            }
        )

        await User.updateOne(
            {_id: localStr_id},
            {
                $push: { links_time_receipt: reception_unemployed._id }
            }

        )

        res.status(201).json({ message: 'Время для посещения создано' })
    } catch (e) {
        res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'})
    }
})

router.post('/delete',
    async(req, res) => {
        try{
            const {_id} = req.body

            await Reception_unemployed.deleteOne({_id})

            res.status(201).json({message: 'Удаление завершено'})
        }catch(e){
            res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'})
        }
    }
)

router.post('/user_delete_link',
    async(req, res) => {
        try{
            const {unemployed_id, reception_unemployed_id} = req.body

            await User.updateOne(
                {_id: unemployed_id},

                {$pull:
                    {links_time_receipt: {$eq: reception_unemployed_id}}
                }
            )

            await User.updateOne(
                {type: 'admin'},

                {$pull:
                    {links_time_receipt: {$eq: reception_unemployed_id}}
                }
            )


            res.status(201).json({message: 'Удаление ссылок завершено'})
        }catch(e){
            res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'})
        }
    }
)



module.exports = router