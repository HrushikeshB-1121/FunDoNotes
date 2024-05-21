import HttpStatus from 'http-status-codes';
import * as NoteService from '../services/notes.service';
import logger from '../config/logger';


// Displays the status of note creation
export const createNote = async (req, res) => {
  try {
    const data = await NoteService.createNote(req.body);
    logger.info('Note created successfully');
    res.status(HttpStatus.CREATED).json({
        code: HttpStatus.CREATED,
        message: 'Note created successfully',
        _id:data
    });
} catch (error) {
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
    const data = await NoteService.archiveNote(req.body.createdBy,req.params._id);
    logger.info('Note Archive changed successfully')
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      message: 'Note Archive changed successfully'
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
    const data = await NoteService.isTrashedNote(req.body.createdBy,req.params._id);
    logger.info('Note Trash changed successfully');
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      message: 'Note Trash changed successfully'
    });
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).json({
      code: HttpStatus.BAD_REQUEST,
      message: error.message
    });
  }
};

export const updateNote = async (req, res) => {
  try {
    const data = await NoteService.updateNote(req.body.createdBy,req.params._id,req.body);
    logger.info('Note updated successfully');
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
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
    const data = await NoteService.deleteNote(req.body.createdBy,req.params._id);
    logger.info('Note Deleted successfully');
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      message: 'Note Deleted successfully'
    });
  } catch (error) {
    res.status(HttpStatus.NOT_FOUND).json({
      code: HttpStatus.NOT_FOUND,
      message: error.message
    });
  }
};


export const getAllNote = async (req, res) => {
    try {
      const data = await NoteService.getAllNote(req.body.createdBy);
      const text = data.map(item => ({
        title: item.title,
        description: item.description,
        colour: item.colour,
        archived: item.archived,
        trashed: item.trashed
      }))
      logger.info( 'Displayed all notes successfully');
      res.status(HttpStatus.OK).json({
        code: HttpStatus.OK,
        data: text,
        message: 'Displayed all notes successfully'
      });
    } catch (error) {
      res.status(HttpStatus.BAD_REQUEST).json({
        code: HttpStatus.BAD_REQUEST,
        message: error.message
      });
    }
  };
