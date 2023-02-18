const { Router } = require('express')

const User = require('../models/User.js')
const router = Router()


// /api/users/register
router.post('/user_search',
    [],
    async (req, res) => {
        try {
            const { userId, token } = req.body

            const user = await User.findOne({ _id: userId })

            res.json(user)
        } catch (e) {
            res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
        }
    }
)

router.post('/user_search_active',
    [],
    async (req, res) => {
        try {
            const user = await User.find({ looking_job: true })

            res.json(user)
        } catch (e) {
            res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
        }
    }
)

router.post('/update_vacancy',
    [],
    async (req, res) => {
        try {
            const { user_id, user } = req.body

            await User.updateOne(
                { _id: user_id },
                {
                    name: user.name,
                    phone: user.phone,
                    about_me: user.about_me,
                    profession: user.profession,
                    education: user.education,
                    experience: user.experience,
                    salary: user.salary,
                    contacts: user.contacts,
                    looking_job: true
                }
            )

            res.status(200).json({ message: 'Вакансия обновлена' })
        } catch (e) {
            res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
        }
    }
)

router.post('/status_change',
    [],
    async (req, res) => {
        try {
            const { id, looking_job } = req.body

            await User.updateOne(
                { _id: id },
                {
                    looking_job
                }
            )

            res.status(200).json({ message: 'Статус обновлен' })
        } catch (e) {
            res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
        }
    }
)


router.post('/links_vacancy',
    [],
    async (req, res) => {
        try {
            const { userId } = req.body

            const user = await User.findOne({ _id: userId })

            res.json(user.links_created_vacancies)
        } catch (e) {
            res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
        }
    }
)

router.post('/check_links_vacancy',
    [],
    async (req, res) => {
        try {
            const { id, userId } = req.body

            const user = await User.findOne({ _id: userId, links_vacancy: id })

            res.json(user)
        } catch (e) {
            res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
        }
    }
)

router.post('/user_search_salary',
    [],
    async (req, res) => {
        const { salary } = req.body

        try {
            const user = await User.find({ looking_job: true, salary: { $gte: salary } })

            res.json(user)
        } catch (e) {
            res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
        }
    }
)

router.post('/user_search_salary_experience',
    [],
    async (req, res) => {
        const { salary, experience } = req.body

        try {
            const user = await User.find({ status: true, salary: { $gt: salary }, experience: { $eq: experience } })

            res.json(user)
        } catch (e) {
            res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
        }
    }
)

router.post('/user_search_profession',
    [],
    async (req, res) => {
        const { text } = req.body

        try {
            const user = await User.find({ status: true, profession: { $regex: '.*' + text + '.*', '$options': 'i' } })

            res.json(user)
        } catch (e) {
            res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
        }
    }
)



module.exports = router