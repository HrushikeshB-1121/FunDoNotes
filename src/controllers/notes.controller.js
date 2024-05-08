import HttpStatus from 'http-status-codes';
import * as NoteService from '../services/notes.service';
import logger from '../config/logger';

// Displays the status of note creation
export const createNote = async (req, res) => {
  try {
    const data = await NoteService.createNote(req,res);
    logger.info('Note created successfully');
    res.status(HttpStatus.CREATED).json({
        code: HttpStatus.CREATED,
        data: data,
        message: 'Note created successfully'
    });
} catch (error) {
    // logger.error('Note creattion was unsuccessfully');
    // logger.warn('Note creattion was unsuccessfully');
    logger.error(error.message)
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
    logger.info('Note Archived successfully')
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
    logger.info('Note Trached successfully');
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

export const updateDesc = async (req, res) => {
  try {
    const data = await NoteService.updateDesc(req,res);
    logger.info('Note updated successfully');
    res.status(HttpStatus.CREATED).json({
      code: HttpStatus.CREATED,
      data: data,
      message: 'Note updated successfully'
    });
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).json({
      code: HttpStatus.BAD_REQUEST,
      message: error.message
    });
  }
};

export const deleteNote = async (req, res) => {
  try {
    const data = await NoteService.deleteNote(req,res);
    logger.info('Note Deleted successfully');
    res.status(HttpStatus.CREATED).json({
      code: HttpStatus.CREATED,
      data: data,
      message: 'Note Deleted successfully'
    });
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).json({
      code: HttpStatus.BAD_REQUEST,
      message: error.message
    });
  }
};


export const getAllNote = async (req, res) => {
    try {
      const data = await NoteService.getAllNote(req,res);
      logger.info( 'Displayed all notes successfully');
      res.status(HttpStatus.CREATED).json({
        code: HttpStatus.CREATED,
        data: data,
        message: 'Displayed all notes successfully'
      });
    } catch (error) {
      res.status(HttpStatus.BAD_REQUEST).json({
        code: HttpStatus.BAD_REQUEST,
        message: error.message
      });
    }
  };