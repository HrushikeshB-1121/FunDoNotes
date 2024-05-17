const Redis = require("ioredis");
const { error } = require("winston");
import HttpStatus from 'http-status-codes';
const redis = new Redis();

// userId = "sai@gnail.com";
export const  getAllNotes = async function (req,res,next){

  try {

    const rData = await redis.smembers(`userId:${res.locals.userId}`);
    redis.exists(`userId:${res.locals.userId}`,(err,reply)=>{
      if(err){
          console.error('Error:', err);
          return;
      }
  
      if (reply === 1) {
            console.log('Data fetched from redis');
            res.status(HttpStatus.OK).json({
              code: HttpStatus.OK,
              data: rData.map(jsonString => JSON.parse(jsonString)),
              message: 'Displayed all notes successfully from redis'
            });
        } else {
          console.log('data not exist in redis, fetching from database.......');
          next();
        }
  
    })
  }

  catch(err){
    console.log(err);
  }
}

// getAllNotes();