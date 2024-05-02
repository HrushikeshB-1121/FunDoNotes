import Joi from '@hapi/joi';
import HttpStatus from 'http-status-codes';

  export const noteDetailsValidator = (req,res,next)=>{
    const schema = Joi.object({
        title: Joi.string().min(1).required(),
        description: Joi.string()
    });
    const { error, value } = schema.validate(req.body);
    if (error) {
      res.status(HttpStatus.BAD_REQUEST).json({
        code: HttpStatus.BAD_REQUEST,
        message: error.message
      });
    } else {
      req.validatedBody = value;
      next()
    }
  }