const { Router } = require('express')

const User = require('../models/User.js')
const Vacancy = require('../models/Vacancy.js')

const router = Router()


// /api/vacancy/vacancy_search
router.post('/active_vacancy_search',
    [],
    async(req, res) => {
        try{
            const vacancy = await Vacancy.find({status: true})

            res.json(vacancy)
        }catch(e){
            res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'})
        }
    }
)

router.post('/vacancy_search',
    [],
    async(req, res) => {
        try{            
            const {user_id} = req.body

            const vacancy = await Vacancy.find({links_creator: user_id})

            res.json(vacancy)
        }catch(e){
            res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'})
        }
    }
)

router.post('/created_vacancies_search',
    [],
    async(req, res) => {
        try{            
            const {user_id} = req.body

            const vacancy = await Vacancy.find({links_created_vacancies: user_id})

            res.json(vacancy)
        }catch(e){
            res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'})
        }
    }
)

router.post('/vacancyid_search',
    [],
    async(req, res) => {
        try{            
            const {id} = req.body

            const vacancy = await Vacancy.findOne({_id: id})

            res.json(vacancy)
        }catch(e){
            res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'})
        }
    }
)


router.post('/status_change',
    [],
    async(req, res) => {
        try{            
            const {id, status} = req.body

            let s = await Vacancy.updateOne(
                {_id: id},

                {
                    status: status
                }
            )

            res.status(200).json({message: 'Статус обновлен'})
        }catch(e){
            res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'})
        }
    }
)


router.post('/session_creation',
    async (req, res) => {
    try {
        const {id, name_organization, name,
            salary, experience, employment, 
            description, responsibilities,
            requirements, terms, contacts,
            status, address} = req.body

        const vacancy = new Vacancy({
            name_organization: name_organization,
            name: name,
            address: address,
            salary: salary,
            experience: experience,
            employment: employment,
            description: description,
            responsibilities: responsibilities,
            requirements: requirements,
            terms: terms,
            contacts: contacts,
            status: status,
            links_creator: id
        })

        await vacancy.save()

        await User.updateOne(
            {_id: id},
            {
                $push: { links_created_vacancies: vacancy._id }
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
            const {id} = req.body
            
            await Vacancy.deleteOne({_id: id})

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

router.post('/respond',
    async(req, res) => {
        try{
            const {id, userId} = req.body

            await User.updateOne(
                {_id: userId},

                {
                    $push: {links_vacancy: id}
                }
                
            )

            await Vacancy.updateOne(
                {_id: id},

                {
                    $push: {links_user: userId}
                }
            )

            res.status(201).json({message: 'Удаление ссылок завершено'})
        }catch(e){
            res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'})
        }
    }
)

router.post('/user_search',
    [],
    async(req, res) => {
        try{
            const {id} = req.body

            const user = await User.find({links_vacancy: id})

            res.json(user)
        }catch(e){
            res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'})
        }
    }
)

router.post('/deleting_links',
    [],
    async(req, res) => {
        try{
            const {userId, vacancyId} = req.body

            await User.updateOne(
                {_id: userId},

                {$pull:
                    {links_vacancy: {$eq: vacancyId}}
                }
            )

            await Vacancy.updateOne(
                {_id: vacancyId},

                {$pull:
                    {links_user: {$eq: userId}}
                }
            )

            res.status(201).json({message: 'Удаление ссылок завершено'})
        }catch(e){
            res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'})
        }
    }
)

router.post('/one_user_delete_link',
    async(req, res) => {
        try{
            const {vacancyId, userId} = req.body

            await User.updateOne(
                {_id: userId},

                {$pull:
                    {links_vacancy: {$eq: vacancyId}}
                }
            )

            res.status(201).json({message: 'Удаление ссылок завершено'})
        }catch(e){
            res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'})
        }
    }
)

router.post('/one_creator_delete_link',
    async(req, res) => {
        try{
            const {vacancyId, creatorId} = req.body

            await User.updateOne(
                {_id: creatorId},

                {$pull:
                    {links_created_vacancies: {$eq: vacancyId}}
                }
            )

            res.status(201).json({message: 'Удаление ссылок завершено'})
        }catch(e){
            res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'})
        }
    }
)

router.post('/vacancy_search_salary',
    [],
    async(req, res) => {
        const {salary} = req.body

        try{
            const vacancy = await Vacancy.find({status: true, salary: {$gte: salary}})

            res.json(vacancy)
        }catch(e){
            res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'})
        }
    }
)

router.post('/vacancy_search_salary_experience',
    [],
    async(req, res) => {
        const {salary, experience} = req.body

        try{
            const vacancy = await Vacancy.find({status: true, salary: {$gt: salary}, experience: {$eq: experience}})

            res.json(vacancy)
        }catch(e){
            res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'})
        }
    }
)

router.post('/vacancy_search_name',
    [],
    async(req, res) => {
        const {text} = req.body

        try{
            const vacancy = await Vacancy.find({status: true, name: {$regex: '.*' + text + '.*', '$options' : 'i'}})
            
            res.json(vacancy)
        }catch(e){
            res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'})
        }
    }
)

module.exports = router