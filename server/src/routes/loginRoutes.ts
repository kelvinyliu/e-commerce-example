import { Router } from "express";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

const router = Router()


router.post('/', async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            res.status(400).json({ error: 'Email and password are required' });
            return
        }

        const hash = await bcrypt.hash(password, 10);

        //debug
        console.log(`password: ${password}, hashed: ${hash}`)
        
        res.json(hash);
    } catch (error) {
        res.sendStatus(500)
    }

})


export default router