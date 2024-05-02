import express from 'express';
import * as notesController from '../controllers/notes.controller';
import { userAuth} from '../middlewares/auth.middleware';

const router = express.Router();

// route to create note
router.post('', userAuth , notesController.createNote);

// route to archive
router.post('/archive', userAuth , notesController.archiveNote)

// route to trash
router.post('/trash', userAuth ,notesController.isTrashedNote)

export default router;