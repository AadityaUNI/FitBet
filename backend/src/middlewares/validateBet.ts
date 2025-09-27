import { Request, Response, NextFunction } from 'express';
import joi from '../utils/joi';

const createBetSchema = {
  startDate: joi.instance.string().required(), // Accept date strings from frontend
  endDate: joi.instance.string().required(),   // Accept date strings from frontend
  amount: joi.instance.number().positive().required(),
  users: joi.instance.string().optional(),
  description: joi.instance.string().max(500).optional(),
  cooldown: joi.instance.number().min(0).optional(),
  betType: joi.instance.string().optional() // Allow betType from form
};

export const validateCreateBet = async (req: Request, res: Response, next: NextFunction) => {
  const validation = await joi.validate(createBetSchema, req.body);
  
  if (validation) {
    return res.status(validation.statusCode).json({ error: validation.message });
  }
  
  next();
};

const updateBetSchema = {
  startDate: joi.instance.date().greater('now').optional(),
  endDate: joi.instance.date().optional(),
  amount: joi.instance.number().positive().optional(),
  status: joi.instance.string().valid('active', 'completed', 'cancelled').optional(),
  winner: joi.instance.string().length(24).optional(),
  description: joi.instance.string().max(500).optional(),
  coolDown: joi.instance.number().min(0).optional()
};

export const validateUpdateBet = async (req: Request, res: Response, next: NextFunction) => {
  const validation = await joi.validate(updateBetSchema, req.body);
  
  if (validation) {
    return res.status(validation.statusCode).json({ error: validation.message });
  }
  
  next();
};