import type { Request, Response, NextFunction } from 'express';
const { z } = require("zod");

const personalInfoSchema = z.object({
  name: z.string().min(1, "Name is required").max(150),
  email: z.string().email("Invalid Email").max(150),
  phone: z.string().max(30).optional(),
  linkedin: z
    .string()
    .url("Invalid LinkedIn URL")
    .max(255)
    .optional()
    .or(z.literal("")),
  github: z
    .string()
    .url("Invalid GitHub URL")
    .max(255)
    .optional()
    .or(z.literal("")),
  website: z
    .string()
    .url("Invalid website URL")
    .max(255)
    .optional()
    .or(z.literal("")),
  address: z.string().max(500).optional(),
});

const validate = (schema: z.ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try{
        schema.parse(req.body);
        next();
    }catch(err){
        
    }
  };
};

module.exports = { validate };
