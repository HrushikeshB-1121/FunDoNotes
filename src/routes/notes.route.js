import express from 'express';
import * as notesController from '../controllers/notes.controller';
// import { signinDetailsValidator,loginDetailsValidator} from '../validators/user.validator';
import { noteDetailsValidator } from '../validators/notes.validator.js';
import { userAuth} from '../middlewares/auth.middleware';

const router = express.Router();

// route to create note 
router.post('', userAuth , noteDetailsValidator , notesController.createNote);

// route to print all notes by userId
router.get('', userAuth , notesController.getAllNote);

// route to update description
router.put('/:_id', userAuth ,notesController.updateDesc);

// route to delete notes
router.delete('/:_id', userAuth ,notesController.deleteNote);

// route to archive
router.post('/archive/:_id', userAuth , notesController.archiveNote);

// route to trash
router.post('/trash/:_id', userAuth ,notesController.isTrashedNote);

export default router;