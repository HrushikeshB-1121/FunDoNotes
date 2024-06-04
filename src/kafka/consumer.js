import kafka from './client';
import { EventEmitter } from 'events';

export async function consumerInit() {
  const consumer = kafka.consumer({ groupId: 'user-1' });
  const emitter = new EventEmitter();
  
  await consumer.connect();
  await consumer.subscribe({ topics: ['User'], fromBeginning: false });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      const data = {
        value: message.value.toString(),
        topic,
        partition
      };
      logger.info(`[${topic}] : PART:${partition}: ${message.value.toString()}`);
      logger.info('Received message:', data);
      emitter.emit('data', data);
    }
  });

  return new Promise((resolve, reject) => {
    emitter.once('data', (data) => {
      resolve(data);
    });
    // Set timeout to reject promise if no data received after 10 seconds
    setTimeout(() => {
      reject(new Error('No data received'));
    }, 10000);
  });
}
