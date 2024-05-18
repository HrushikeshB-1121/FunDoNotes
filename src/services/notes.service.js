import { Error } from 'mongoose';
import Note from '../models/notes.model';
import { clearRedisUser,addToRedis,getRedisAllNotes,getRedisNote,delNoteRedis } from '../utils/redis';
const Redis = require("ioredis");

const redis = new Redis();


// creates note
export const createNote=async (req,res)=>{
    // adding the userid to note
    const {body}=req
    body.createdBy=res.locals.userId;
    const data = await Note.create(body);
    await addToRedis(res.locals.userId,data);
    return data._id;
}

// archive note 
export const archiveNote=async (req,res)=>{
    const _id = req.params._id;
    const userId = res.locals.userId;
    let note = await getRedisNote(userId,_id);
    if(note===null)
        throw new Error('Note not found')
    note.archived = !note.archived
    note = await Note.findByIdAndUpdate(
        {
            _id
        },
        note,
        {
            new: true
        }
    )
    await delNoteRedis(userId,_id);
    await addToRedis(userId,note);
}

export const getAllNote=async (req,res)=>{
    return await getRedisAllNotes(res.locals.userId);
}

export const isTrashedNote=async (req,res)=>{
    const _id = req.params._id;
    const userId = res.locals.userId;
    let note = await getRedisNote(userId,_id);
    if(note===null)
        throw new Error('Note not found')
    note.trashed=!note.trashed;
    note = await Note.findByIdAndUpdate(
        {
            _id
        },
        note,
        {
            new: true
        }
    )
    await delNoteRedis(userId,_id);
    await addToRedis(userId,note);
}

export const deleteNote=async (req,res)=>{
    const _id = req.params._id;
    const userId = res.locals.userId;
    const note = await getRedisNote(userId,_id);
    if(note===null)
    throw new Error('Note not found')
    await Note.findOneAndDelete(
        {
            _id, createdBy: userId
        }
    )
    await delNoteRedis(userId,_id);
}

export const updateNote=async (req,body,res)=>{
    const _id = req.params._id;
    const userId = res.locals.userId;
    let note = await getRedisNote(userId,_id);
    if(note===null)
        throw new Error('Note not found')
    note = await Note.findOneAndUpdate(
        {
            _id, createdBy: userId
        },
        body,
        {
            new: true
        }
    )
    await delNoteRedis(userId,_id);
    await addToRedis(userId,note);
}

