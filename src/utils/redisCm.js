const Redis = require("ioredis");

const redis = new Redis();

async function main() {
    const setNum = ["abc", "a", "b", "c", "d","e"];
  await redis.sadd("userSet",  setNum); 

  const elementCount = await redis.smembers("userSet");
  console.log(elementCount); 
  await redis.srem(`userSet`,"b");
  const uelementCount = await redis.smembers("userSet");
  console.log(uelementCount); 
}
main();
// //   // // value as string
// //   // redis.set("key", "value"); 

// //   // redis.get("key", (err, result) => {
// //   //     if (err) {
// //   //       console.error(err);
// //   //     } else {
// //   //       console.log(result); // value
// //   //     }
// //   // });
  
// //   // redis.get("key").then((result) => {
// //   //     console.log(result); // value
// //   // });
  
// //   // //value as json 
// //   // const user = {
// //   //     name: "varshab",
// //   //     age: "23",
// //   //     description: "I am a programmer",
// //   // };
  
// //   // await redis.mset(user);
  
// //   // const name = await redis.get("name");
// //   // console.log(name); // varshab
  
// //   // const age = await redis.get("age");
// //   // console.log(age); // 23
  
// //   // const all = await redis.mget("name", "age", "description");
// //   // console.log(all); // [ 'varshab', '23', 'I am a programmer' ]

// //   // await redis.del("name");
// //   // const exists = await redis.exists("name");
// //   // console.log(exists); // 0 

// //   // await redis.incr("age");
// //   // await redis.incrby("age", 1);
// //   // const newAge = await redis.get("age");
// //   // console.log(newAge); // 25

// //   // value as list
// //   // const listNum = [1, 3, 5, 7, 9, 3];
// //   // await redis.del("userList");
// //   // await redis.lpush("userList", listNum );

// //   // const popped = await redis.lpop("userList");
// //   // console.log(popped); // 3

// //   // const allList = await redis.lrange("userList", 0, -1);
// //   // console.log(allList); // [ '9', '7', '5', '3', '1' ]

// //   // const position = await redis.lpos("userList", 5);
// //   // console.log(position); // 2

// //   // // value is set
// //   // const setNum = [1, 3, 5, 7, 9,3];
// //   // await redis.sadd("userSet",  setNum); 

// //   // const elementCount = await redis.smembers("userSet");
// //   // console.log(elementCount); // [ '1', '3', '5', '7', '9' ]
// // }

// // main();










// // import redis from "ioredis";
// // import dotenv from 'dotenv'
// // dotenv.config()

// // const redisClint = redis.createClient(process.env.REDIS_PORT)

// // export async function clearRedisClint(userId){
// //     await redisClint.del(`user:${userId}`)
// // }

// // export async function setToRedisClint(userId, notes){
// //     const noteList = Array.isArray(notes) ? notes : [notes];
// //     for(let note of noteList){
// //         await redisClint.lpush(`user:${userId}`,JSON.stringify(note))
// //     }
// // }

// // export async function getAllNotesFromRedisClint(userId){
// //     const getAllNotes = await redisClint.lrange(`user:${userId}`,0,-1)
// //     const notesArray = Object.values(getAllNotes).map(JSON.parse);
// //     return notesArray
// // }

// // export async function getNoteFromRedisClint(userId, noteId){
// //     const getAllNotes = await redisClint.lrange(`user:${userId}`,0,-1)
// //     const notesArray = Object.values(getAllNotes).map(JSON.parse);
// //     return notesArray.find((note) => {
// //         return note._id===noteId
// //     })
// // }

// // export async function deleteNoteFromRedisClint(userId, noteId){
// //     const note = await getNoteFromRedisClint(userId, noteId)
// //     await redisClint.lrem(`user:${userId}`, 0, JSON.stringify(note))
// // }



// import Note from '../models/note.model'
// import { deleteNoteFromRedisClint, getAllNotesFromRedisClint, getNoteFromRedisClint, setToRedisClint } from '../utils/redisClint';

// export const createNotes = async(userId, body) => {
//     const note = await Note.create(body);
//     await setToRedisClint(userId, note)
//     return note._id;
// }

// export const getAllNotes = async(_id) => {
//     return await getAllNotesFromRedisClint(_id)
// }

// export const getNote = async(_id, userId) => {
//     const note = await getNoteFromRedisClint(userId, _id);
//     if(note!==null)
//         return note
//     throw new Error('Note not found')
// }

// export const updateNote = async(_id, body, userId) => {
//     let note = await getNoteFromRedisClint(userId, _id);
//     if(note===null)
//         throw new Error('Note not found')
//     note = await Note.findOneAndUpdate(
//         {
//             _id, createdBy: userId
//         },
//         body,
//         {
//             new: true
//         }
//     )
//     await deleteNoteFromRedisClint(userId, _id)
//     await setToRedisClint(userId, note)
// }

// export const deleteNote = async(_id, userId) => {
//     const note = await getNoteFromRedisClint(userId, _id);
//     if(note===null)
//         throw new Error('Note not found')
//     await Note.findOneAndDelete(
//         {
//             _id, createdBy: userId
//         }
//     )
//     await deleteNoteFromRedisClint(userId, _id)
// }

// export const isArchived = async(_id, userId) => {
//     let note = await getNoteFromRedisClint(userId, _id);
//     if(note===null)
//         throw new Error('Note not found')
//     note.isArchived = !note.isArchived
//     note = await Note.findByIdAndUpdate(
//         {
//             _id
//         },
//         note,
//         {
//             new: true
//         }
//     )
//     await deleteNoteFromRedisClint(userId, _id)
//     await setToRedisClint(userId, note)
// }

// export const isTrashed = async(_id, userId) => {
//     let note = await getNoteFromRedisClint(userId, _id);
//     if(note===null)
//         throw new Error('Note not found')
//     note.isTrashed = !note.isTrashed
//     note = await Note.findByIdAndUpdate(
//         {
//             _id
//         },
//         note,
//         {
//             new: true
//         }
//     )
//     await deleteNoteFromRedisClint(userId, _id)
//     await setToRedisClint(userId, note)
// }

// export const getAllNotesForRedis = async(_id) => {
//     return Note.find(
//         {createdBy: _id}
//     )
// }