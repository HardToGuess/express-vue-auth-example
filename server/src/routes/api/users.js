import { Router } from 'express'
import { User } from '../../models/User'
import bcrypt from 'bcrypt'
const router = Router()

router.post('/sign_in', async (req, res, next) => {
    let { username, password } = req.body
    if (!username || !password) return next({ statusCode: 400 })
    const findUser = () => {
        return new Promise((resolve, reject) => {
            User.findOne({ username }, (err, user) => {
                if (err) {
                    return reject(err)
                }
                resolve(user)
            })
        })
    }
    try {
        const user = await findUser()
        if (!user) return next({ statusCode: 401 })
        // Compares provided password with hash
        const comparePassword = (candidatePassword, hash) => {
            return new Promise((resolve, reject) => {
              bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
                if (err) return reject(err);
                resolve(isMatch)
              })
            })
        }
        // Check is password correct
        const validatePassword = await comparePassword(password, user.password)
        if (!validatePassword) return next({ statusCode: 401 })
        res.status(200).json({user: { username: user.username }})
    } catch (err) {
        next(err)
    }
})

router.post('/sign_up', async (req, res, next) => {
    const { username, password } = req.body
    if (!username || !password) return next({ statusCode: 400 })
    // Generate hash from provided password
    const hashPassword = (password) => {
        return new Promise((resolve, reject) => {
            const SALT_WORK_FACTOR = 10
            bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
                if (err) return reject(err);
                bcrypt.hash(password, salt, (err, hash) => {
                    if (err) return reject(err);
                    resolve(hash)
                })
            })
        })
    }
    const hashedPassword = await hashPassword(password)
    const user = new User({username, password: hashedPassword})
    user.save(error => {
        if (error) {
            console.log(error)
            // Mongo error 11000 means that entry with some unique key (username in our case) already exists
            if (error.code === 11000) {
                error.statusCode = 409
                error.message = 'User with this username already exists'
            }
            next(error)
        } else {
            res.status(200).json({user: { username: user.username }})
        }
    })
})

export default router
