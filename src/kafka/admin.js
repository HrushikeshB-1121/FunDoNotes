const {kafka} = require("./config.js")
import logger from '../config/logger.js';

async function init(){
    const admin = kafka.admin();
    logger.info("connecting Admin....");
    admin.connect();
    logger.info("Admin connected success...");

    logger.info("creating topics.....");
    await admin.createTopics({
        topics: [
          {
            topic: 'User',
            numPartitions: 1
          },
          {
            topic: 'Note',
            numPartitions: 1
          }
        ]
    });
    logger.info("topics creation success... ");
    logger.info("admin disconnecting....");
    await admin.disconnect();
}

init();