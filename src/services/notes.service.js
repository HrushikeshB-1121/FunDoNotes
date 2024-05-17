import { Error } from 'mongoose';
import Note from '../models/notes.model';
const Redis = require("ioredis");

const redis = new Redis();


// creates note
export const createNote=async (req,res)=>{
    // adding the userid to note
    const {body}=req
    body.createdBy=res.locals.userId;
    const data = await Note.create(body);
    await redis.sadd(`userId:${res.locals.userId}`,JSON.stringify(data)); 
    return data
}

// archive note 
export const archiveNote=async (req,res)=>{
    const note = await Note.findById(req.params._id)
    if(!note){
        throw new Error('User Id is Invalid');
    }
    note.archived= !note.archived;
    await note.save();
    await getAllNote(req,res);
    return ;
}

export const getAllNote=async (req,res)=>{
    const note = await Note.find({createdBy:res.locals.userId})
    if(!note){
        throw new Error('User Id is Invalid');
    }
    await redis.del(`userId:${res.locals.userId}`);
    await redis.sadd(`userId:${res.locals.userId}`,JSON.stringify(note));
    return await note;
}

export const isTrashedNote=async (req,res)=>{
    const note = await Note.findById(req.params._id)
    if(!note){
        throw new Error('User Id is Invalid');
    }
    note.trashed=!note.trashed;
    await note.save();
    await getAllNote(req,res);
    return ;
}

export const deleteNote=async (req,res)=>{
    // const note = await Note.deleteNoteById(req.params._id)
    const note = await Note.findById(req.params._id);
    if (note && note.trashed) {
        await Note.findByIdAndDelete(req.params._id);
        await redis.del(`userId:${res.locals.userId}`);
        await getAllNote(req,res);
        return;
    } else {
        throw new Error("Note is not trashed or not found");
    }
}

export const updateNote=async (req,res)=>{
    const note = await Note.findById(req.params._id)
    if(!note){
        throw new Error('User Id is Invalid');
    }
    note.title = (req.body.title != "") ?req.body.title : note.title ;
    note.description = (req.body.description!= "") ?req.body.description : note.description ;
    note.colour = (req.body.colour != "") ?req.body.colour : note.colour ;
    await note.save();
    await getAllNote(req,res);
    return ;
}

