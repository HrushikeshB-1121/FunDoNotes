import { Error } from 'mongoose';
import Note from '../models/notes.model';


// creates note
export const createNote=async (req,res)=>{
    // adding the userid to note
    const {body}=req
    body.createdBy=res.locals.userId;
    const data = await Note.create(body);
    return data
}

// archive note 
export const archiveNote=async (req,res)=>{
    const note = await Note.findById(req.params._id)
    if(!note){
        throw new Error('User Id is Invalid');
    }
    note.archived= !note.archived;
    return await note.save();
}

export const getAllNote=async (req,res)=>{
    const note = await Note.find({createdBy:res.locals.userId})
    if(!note){
        throw new Error('User Id is Invalid');
    }
    return await note;
}

export const isTrashedNote=async (req,res)=>{
    const note = await Note.findById(req.params._id)
    if(!note){
        throw new Error('User Id is Invalid');
    }
    note.trashed=!note.trashed;
    return await note.save();
}

export const deleteNote=async (req,res)=>{
    // const note = await Note.deleteNoteById(req.params._id)
    const note = await Note.findById(req.params._id);
    if (note && note.trashed) {
        return Note.findByIdAndDelete(req.params._id);
    } else {
        throw new Error("Note is not trashed");
    }
    // if(!note){
    //     throw new Error('User Id is Invalid');
    // }
    // return await note;
}

export const updateDesc=async (req,res)=>{
    const {description}=req.body;
    const note = await Note.findById(req.params._id)
    if(!note){
        throw new Error('User Id is Invalid');
    }
    note.description=description;
    return await note.save();
}

