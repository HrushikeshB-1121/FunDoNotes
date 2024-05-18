import request from 'supertest';
import mongoose from 'mongoose';
import {app,server} from '../../src/index';
import dotenv from 'dotenv';
dotenv.config();

let loginToken;
// let resetToken;
// let userId;
let noteId;

describe('User APIs Testing', () => {
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
  
  afterAll(async () => {
    await mongoose.connection.close();
    server.close();
  });


  // we use Supertest to make a http request to the /api/v1/users endpoint of our Express.js server. 

  describe(`New User`,()=>{

    it('Should return user created successfully', async () => {
      const res = await request(app)
        .post('/api/v1/users')
        .send({
          "firstName": "vishal",
          "lastName": "sharma",
          "email": "vishal@gmail.com",
          "password" : "Vishal@123"
        });
      expect(res.statusCode).toBe(201);
    });
    
    it(`Should return user not created`,async()=>{
      const res = await request(app)
      .post(`/api/v1/users`)
      .send({
        "firstName": "vishal",
        "lastName": "",
        "email": "vishal@gmail.com",
        "password" : "Vishal@123"
      })
      expect(res.statusCode).toBe(400)
    });
  })

  describe('Login User', () => {
    it('Should return login successfully', async () => {
      const res = await request(app)
        .post('/api/v1/users/login')
        .send({
          "email": "vishal@gmail.com",
          "password" : "Vishal@123"
        })
        loginToken = res.body.data.token
      expect(res.statusCode).toBe(200);
      // console.log(res);
      // // userId = res.text.userId
    });

    it(`Should return user login failed`,async()=>{
      const res = await request(app)
        .post(`/api/v1/users/login`)
        .send({
          "email": "vishal@gmail.com",
          "password" : "Vishal@12"
        })
        expect(res.statusCode).toBe(400)
    });
  });

  // describe(`Forget Passward`, () => {

  //   // it(`Should return email sent`,async()=>{
  //   //   const res = await request(app)
  //   //     .post(`/api/v1/forgetpassword`)
  //   //     .send({
  //   //       email: "vishal@gmail.com"
  //   //     })
  //   //     expect(res.statusCode).toBe(200)
  //   //     resetToken = res.body.token
  //   // });

  //   it(`should retun mail not sent`,async()=>{
  //     const res = await request(app)
  //       .post(`/api/v1/forgetpassword`)
  //       .send({
  //         email : "vishal123@gmail.com"
  //       })
  //       expect(res.statusCode).toBe(404)
  //   });
  // });

  // describe(`Reset Password`,()=>{
  //   it(`should return reset password successfully`,async()=>{
  //     const res = await request(app)
  //       .put(`/api/v1/users/resetPassword`)
  //       .set('Authorization', `Bearer ${resetToken}`)
  //       .send({
  //         "password" : "Vishal@123456"
  //       })
  //       expect(res.statusCode).toBe(200);
  //   })

  //   it(`should return reset password unsuccessfull`,async()=>{
  //     const res = await request(app)
  //       .put(`/api/v1/users/resetPassword`)
  //       .set('Authorization', `Bearer ${resetToken}`)
  //       .send({
  //         "password" : ""
  //       })
  //       expect(res.statusCode).toBe(400);
  //   })
  // });


  describe(`Create Note`,()=>{
    it(`should return created a note`,async()=>{
      const res = await request(app)
        .post(`/api/v1/notes`)
        .set('Authorization', `Bearer ${loginToken}`)
        .send({
          title: `today`,
          description : `Today our meeting is at 12`,
          colour : `black`
        });
        expect(res.statusCode).toBe(201);
        noteId = res.body._id
      })

    it(`should return note was not created`,async()=>{
      const res = await request(app)
        .post(`/api/v1/notes`)
        .set('Authorization',`Bearer ${loginToken}`)
        .send({
          title: '',
          description: `yesterday it was sunday`,
          colour: `yellow`
        });
        expect(res.statusCode).toBe(400);
    })
  });

  describe(`Get AllNotes`,()=>{
    it(`should return all notes`,async()=>{
      const res = await request(app)
        .get(`/api/v1/notes`)
        .set(`Authorization`,`Bearer ${loginToken}`)
      expect(res.statusCode).toBe(200);
    })

    it(`should return failed to get all notes`,async()=>{
      const res = await request(app)
        .get(`/api/v1/notes`)
        .set(`Authorization`,`Bearer ${loginToken}[0]`)
      expect(res.statusCode).toBe(500)
    })
  })

  describe(`Update Note`,()=>{
    it(`should return note updated`,async()=>{
      const res = await request(app)
        .put(`/api/v1/notes/${noteId}`)
        .set(`Authorization`,`Bearer ${loginToken}`)
        .send({
          title: `todayyyy`,
          description: `yesterday it was funday`,
          colour: `blue`
        })
      expect(res.statusCode).toBe(200)
    })

    it(`should return note updated even without title and description`,async()=>{
      const res = await request(app)
        .put(`/api/v1/notes/${noteId}`)
        .set(`Authorization`,`Bearer ${loginToken}`)
        .send({
          title: '',
          description: '',
          color: 'red',
        })
      expect(res.statusCode).toBe(200)
    })
  });

  describe('Archive Note',()=>{
    it(`should return archive successful`,async()=>{
      const res = await request(app)
        .put(`/api/v1/notes/archive/${noteId}`)
        .set(`Authorization`,`Bearer ${loginToken}`)
      expect(res.statusCode).toBe(200)
    })
  });

  describe(`Trash Note`,()=>{
    it(`should return trash successful`,async()=>{
      const res = await request(app)
        .put(`/api/v1/notes/trash/${noteId}`)
        .set(`Authorization`,`Bearer ${loginToken}`)
      expect(res.statusCode).toBe(200)
    })
  });

  describe(`Delete a Note`,()=>{
    it(`should return note deleted`,async()=>{
      const res = await request(app)
        .delete(`/api/v1/notes/${noteId}`)
        .set(`Authorization`,`Bearer ${loginToken}`)
      expect(res.statusCode).toBe(200)
    })
  })
});