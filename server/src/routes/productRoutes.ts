import { Router } from "express";
import {exampleShopItems} from "./exampleShopItems"

const router = Router()

router.get('/', (req, res) => {
    // get all products from database
    // convert into json
    // return
    res.json(JSON.stringify(
        //example
        exampleShopItems
    ))
})

router.post('/', (req, res) => {
    // validate request to check user is admin
    // put into database
    // return json of put
})

export default router