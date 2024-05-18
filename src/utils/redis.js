const Redis = require("ioredis");
const redis = new Redis();

export async function clearRedisUser (userId){
    await redis.del(`userId:${userId}`)
}

export async function addToRedis(userId,notes){
  console.log("note added to redis");
  await redis.sadd(`userId:${userId}`,JSON.stringify(notes));
}

export async function getRedisAllNotes(userId){
  console.log("getting all notes from redis");
  const rData = await redis.smembers(`userId:${userId}`);
  const data = rData.map(jsonString => JSON.parse(jsonString));
  return data;
}
export async function getRedisNote(userId,noteId){
  console.log("getting note from redis");
  const getAllNotes = await getRedisAllNotes(userId);
  const notes = Object.values(getAllNotes)
  return notes.find((note)=>{
    return note._id===noteId;
  })
}
export async function delNoteRedis(userId,noteId){
  console.log("deleting note in redis");
  const note = await getRedisNote(userId,noteId);
  await redis.srem(`userId:${userId}`,JSON.stringify(note));
}