const Redis = require("ioredis");

const redis = new Redis();

async function main() {

  // value as string
  redis.set("key", "value"); 

  redis.get("key", (err, result) => {
      if (err) {
        console.error(err);
      } else {
        console.log(result); 
      }
  });
  
  redis.get("key").then((result) => {
      console.log(result); 
  });
  
  
  

  // const name =//value as json 
  const user = {
        name: "varshab",
        age: "23",
        description: "I am a programmer",
      }; 
      await redis.mset(user);
    // await redis.get("name");
    // console.log(name); 
  
  const age = await redis.get("age");
  console.log(age); 
  
  const all = await redis.mget("name", "age", "description");
  console.log(all);

  await redis.del("name");
  const exists = await redis.exists("name");
  console.log(exists);

  await redis.incr("age");
  await redis.incrby("age", 1);
  const newAge = await redis.get("age");
  console.log(newAge); 

  // value as list
  const listNum = [1, 3, 5, 7, 9, 3,8];
  await redis.lpush("userList", listNum );

  const popped = await redis.lpop("userList");
  console.log(popped);

  const allList = await redis.lrange("userList", 0, -1);
  console.log(allList);

  const position = await redis.lpos("userList", 5);
  console.log(position); 

//   // value is set
  const setNum = [1, 3, 5, 7, 9, 3];
  await redis.sadd("userSet",  setNum);

  const elementCount = await redis.smembers("userSet");
  console.log(elementCount); 
}

main();