import { Router } from "express";
import jwt from 'jsonwebtoken'

const router = Router()

router.get('/', (req, res) => {
    // destructure to get token
    const {token} = req.body

    const verified = jwt.verify(token, process.env.JWT_SECRET as string)

    if (!token || !verified) {
        res.sendStatus(403)
        return
    }

    const decoded = jwt.decode(token)
    res.json(decoded)
})
export default router