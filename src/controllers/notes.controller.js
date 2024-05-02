import HttpStatus from 'http-status-codes';
import * as NoteService from '../services/notes.service';

// Displays the status of note creation
export const createNote = async (req, res) => {
  try {
    const data = await NoteService.createNote(req,res);
    res.status(HttpStatus.CREATED).json({
      code: HttpStatus.CREATED,
      data: data,
      message: 'Note created successfully'
    });
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).json({
      code: HttpStatus.BAD_REQUEST,
      message: error.message
    });
  }
};

// Displays the status of note archive
export const archiveNote = async (req, res) => {
  try {
    const data = await NoteService.archiveNote(req,res);
    res.status(HttpStatus.CREATED).json({
      code: HttpStatus.CREATED,
      data: data,
      message: 'Note Archived successfully'
    });
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).json({
      code: HttpStatus.BAD_REQUEST,
      message: error.message
    });
  }
};

// Displays the status of note trash
export const isTrashedNote = async (req, res) => {
  try {
    const data = await NoteService.isTrashedNote(req,res);
    res.status(HttpStatus.CREATED).json({
      code: HttpStatus.CREATED,
      data: data,
      message: 'Note Trached successfully'
    });
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).json({
      code: HttpStatus.BAD_REQUEST,
      message: error.message
    });
  }
};