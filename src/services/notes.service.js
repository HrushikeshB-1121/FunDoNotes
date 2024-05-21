import { Error } from 'mongoose';
import Note from '../models/notes.model';
import { addToRedis,getRedisAllNotes,getRedisNote,delNoteRedis } from '../utils/redis';

// creates note
export const createNote=async (noteDetails)=>{
    const data = await Note.create(noteDetails);
    await addToRedis(noteDetails.createdBy,data);
    return data._id;
}

// archive note 
export const archiveNote=async (userId,_id)=>{
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

export const getAllNote=async (userId)=>{
    return await getRedisAllNotes(userId);
}

export const isTrashedNote=async (userId,_id)=>{
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

export const deleteNote=async (userId,_id)=>{
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

export const updateNote=async (userId,_id,updatedNotes)=>{
    let note = await getRedisNote(userId,_id);
    if(note===null)
        throw new Error('Note not found')
    note = await Note.findOneAndUpdate(
        {
            _id, createdBy: userId
        },
        updatedNotes,
        {
            new: true
        }
    )
    await delNoteRedis(userId,_id);
    await addToRedis(userId,note);
}

