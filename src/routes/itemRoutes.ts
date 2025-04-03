import { Router, Request, Response } from 'express';
import { itemController } from '../controllers/itemController';

const router = Router();

router.post('/post', (req: Request, res: Response) => itemController.create(req, res));
router.get('/posts', (req: Request, res: Response) => itemController.getAll(req, res));
router.get('/post/:id', (req: Request, res: Response) => itemController.getById(req, res));
router.put('/post/:id', (req: Request, res: Response) => itemController.update(req, res));
router.delete('/post/:id', (req: Request, res: Response) => itemController.delete(req, res));

export default router;