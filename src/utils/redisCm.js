const Redis = require("ioredis");

const redis = new Redis();

async function main() {

  // value as string
  redis.set("key", "value"); 

  redis.get("key", (err, result) => {
      if (err) {
        console.error(err);
      } else {
        console.log(result); // value
      }
  });
  
  redis.get("key").then((result) => {
      console.log(result); // value
  });
  
  //value as json 
  const user = {
      name: "varshab",
      age: "23",
      description: "I am a programmer",
  };
  
  await redis.mset(user);
  
  const name = await redis.get("name");
  console.log(name); // varshab
  
  const age = await redis.get("age");
  console.log(age); // 23
  
  const all = await redis.mget("name", "age", "description");
  console.log(all); // [ 'varshab', '23', 'I am a programmer' ]

  await redis.del("name");
  const exists = await redis.exists("name");
  console.log(exists); // 0 

  await redis.incr("age");
  await redis.incrby("age", 1);
  const newAge = await redis.get("age");
  console.log(newAge); // 25

  // value as list
  const listNum = [1, 3, 5, 7, 9, 3];
  await redis.del("userList");
  await redis.lpush("userList", listNum );

  const popped = await redis.lpop("userList");
  console.log(popped); // 3

  const allList = await redis.lrange("userList", 0, -1);
  console.log(allList); // [ '9', '7', '5', '3', '1' ]

  const position = await redis.lpos("userList", 5);
  console.log(position); // 2

  // value is set
  const setNum = [1, 3, 5, 7, 9,3];
  await redis.sadd("userSet",  setNum); 

  const elementCount = await redis.smembers("userSet");
  console.log(elementCount); // [ '1', '3', '5', '7', '9' ]
}

main();