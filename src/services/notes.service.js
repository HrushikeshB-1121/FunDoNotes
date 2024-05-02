import { Error } from 'mongoose';
import Note from '../models/notes.model';
import { log } from 'winston';


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
    const {_id}=req.body;
    const note = await Note.findById((_id))
    if(!note){
        throw new Error('User Id is Invalid');
    }
    note.archived= !note.archived;
    return await note.save();
}

export const isTrashedNote=async (req,res)=>{
    const {_id}=req.body;
    const note = await Note.findById((_id))
    if(!note){
        throw new Error('User Id is Invalid');
    }
    note.trashed=!note.trashed;
    return await note.save();
}