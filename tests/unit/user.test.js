import request from 'supertest';
import mongoose from 'mongoose';
import app from '../../src/index';
import logger from '../../src/config/logger';

// import logger from '../../src/config/logger';

describe('User APIs Test', () => {
  beforeAll(async () => {
    const clearCollections = async () => {
      for (const collection in mongoose.connection.collections) {
        await mongoose.connection.collections[collection].deleteOne();
      }
    };
    
    const mongooseConnect = async () => {
      await mongoose.connect(process.env.DATABASE_TEST, { useNewUrlParser: true});
      await clearCollections();
    };

    if (mongoose.connection.readyState === 0) {
      await mongooseConnect();
    } else {
      await clearCollections();
    } 
  });
  
  describe('Create User', () => {
    it('Should return user created successfully', async () => {
      const res = await request(app)
        .post('/api/v1/users')
        .send({
          "firstName": "vishal",
          "lastName": "sharma",
          "email": "viiishal12@gmail.com",
          "password" : "Vishal@123"
        });
      expect(res.statusCode).toBe(201);
      expect(res.body.data).toBeInstanceOf(Object);
    });
  });

  describe('Login User', () => {
    it('Should return login successfully', async () => {
      const res = await request(app)
        .post('/api/v1/users/login')
        .send({
          "email": "viiishal12@gmail.com",
          "password" : "Vishal@123"
        });
      expect(res.statusCode).toBe(200);
      expect(res.body.data).toBeInstanceOf(Object);
    });
  });

  // describe('Forgot Password', () => {
  //   it('Should return mail sent successfully', async () => {
  //     const res = await request(app)
  //       .post('/api/v1/users/forgetpassword')
  //       .send({
  //         email: "viiishal12@gmail.com"
  //       });
  //       logger.error(res)
  //     expect(res.statusCode).toBe(200);
  //   });
  // });
});