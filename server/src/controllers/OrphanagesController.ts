import { Request, Response } from 'express'
import { getRepository } from 'typeorm'
import { schema } from './OrphanagesValidationSchema'

import orphanageView from '../views/orphanages_view'
import Orphanage from '../models/Orphanage'

export default {
    async create(req: Request, res: Response) {
        const reqImages = req.files as Express.Multer.File[]

        const images = reqImages.map(image => {
            return { path: image.filename }
        })

        const data = { ...req.body, images }
        await schema.validate(data, {
            abortEarly: false
        })

        const orphanagesRepository = getRepository(Orphanage)
        const orphanage = orphanagesRepository.create(data)

        await orphanagesRepository.save(orphanage)

        return res.status(201).json(orphanage)
    },

    async index(res: Response) {
        const orphanagesRepository = getRepository(Orphanage)
        const orphanages = await orphanagesRepository.find({
            relations: ['images']
        })

        return res.json(orphanageView.renderMany(orphanages))
    },

    async show(req: Request, res: Response) {

        const { id } = req.params

        const orphanagesRepository = getRepository(Orphanage)

        try {
            const orphanage = await orphanagesRepository.findOneOrFail(id, {
                relations: ['images']
            })

            return res.json(orphanageView.render(orphanage))

        } catch (error) {
            console.log(error)
            return res.status(400).json(error)
        }
    },
}