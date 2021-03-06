import { Router } from 'express'
import multer from 'multer'

import OrphanagesController from './controllers/OrphanagesController'
import uploadConfig from './config/upload'

const router = Router()
const upload = multer(uploadConfig)

router.get('/orphanages/:id', OrphanagesController.show)
router.get('/orphanages', OrphanagesController.index)
router.post('/orphanages', upload.array('images'), OrphanagesController.create)
router.delete('/orphanages/:id', OrphanagesController.delete)

export default router