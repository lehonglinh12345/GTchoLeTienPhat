import { Router } from 'express';
import { getComments, createComment, updateComment, deleteComment, reactToComment } from '../controllers/comments.controller';

const router = Router();

router.get('/:projectId', getComments);
router.post('/', createComment);
router.put('/:id', updateComment);
router.delete('/:id', deleteComment);
router.post('/:id/react', reactToComment);

export default router;
