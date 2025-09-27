import BetModel from "../models/BetModel";
import { Request, Response } from "express";
import { validateCreateBet, validateUpdateBet } from "../middlewares/validateBet";
import { BetController } from "../controllers/betController";

const express = require("express");
const mongoose = require("mongoose");

const router = express.Router();

// Get all bets
router.get("/", async (req: Request, res: Response) => {
  try {
    const allbets = await BetModel.find({}).sort({ createdAt: -1 });
    res.status(200).json(allbets);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

// Get a single bet by ID
router.get("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Invalid bet ID" });
  }

  try {
    const bet = await BetModel.findById(id).populate('winner', 'username email');
    
    if (!bet) {
      return res.status(404).json({ error: "Bet not found" });
    }
    
    res.status(200).json(bet);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

// Get bets for a specific user
router.get("/user/:userId", async (req: Request, res: Response) => {
  const { userId } = req.params;
  
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(404).json({ error: "Invalid user ID" });
  }

  try {
    const userBets = await BetController.getUserBets(userId);
    res.status(200).json(userBets);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

// Get active bets for a specific user
router.get("/user/:userId/active", async (req: Request, res: Response) => {
  const { userId } = req.params;
  
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(404).json({ error: "Invalid user ID" });
  }

  try {
    const activeBets = await BetController.getUserActiveBets(userId);
    res.status(200).json(activeBets);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

// Get bet statistics for a user
router.get("/user/:userId/stats", async (req: Request, res: Response) => {
  const { userId } = req.params;
  
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(404).json({ error: "Invalid user ID" });
  }

  try {
    const stats = await BetController.getUserBetStats(userId);
    res.status(200).json(stats);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

// Complete a bet and set winner
router.patch("/:id/complete", async (req: Request, res: Response) => {
  const { id } = req.params;
  const { winnerId } = req.body;
  
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Invalid bet ID" });
  }
  
  if (!winnerId || !mongoose.Types.ObjectId.isValid(winnerId)) {
    return res.status(400).json({ error: "Valid winner ID is required" });
  }

  try {
    const completedBet = await BetController.completeBet(id, winnerId);
    res.status(200).json(completedBet);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

// Create a new bet
router.post("/", validateCreateBet, async (req: Request, res: Response) => {
  const { startDate, endDate, amount, users, description, cooldown } = req.body;
  
  try {
    // Convert string dates to Date objects
    const startDateObj = new Date(startDate);
    const endDateObj = new Date(endDate);
    
    // For now, create a placeholder user array (you'll need to handle user lookup later)
    
    const betData = {
      startDate: startDateObj,
      endDate: endDateObj,
      amount: Number(amount),
      users: users,
      description,
      coolDown: cooldown || 0
    };

    const bet = await BetController.createBet(betData);
    res.status(201).json(bet);
  } catch (error: any) {
    console.error("Create bet error:", error.message);
    res.status(400).json({ error: error.message });
  }
});

// Delete a bet
router.delete("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Invalid bet ID" });
  }

  try {
    const bet = await BetModel.findOneAndDelete({ _id: id });

    if (!bet) {
      return res.status(404).json({ error: "Bet not found" });
    }
    
    res.status(200).json({ message: "Bet deleted successfully", bet });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

// Update a bet
router.patch("/:id", validateUpdateBet, async (req: Request, res: Response) => {
  const { id } = req.params;
  
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Invalid bet ID" });
  }

  try {
    const bet = await BetModel.findOneAndUpdate(
      { _id: id }, 
      { ...req.body }, 
      { new: true, runValidators: true }
    ).populate('winner', 'username email');
    
    if (!bet) {
      return res.status(404).json({ error: "Bet not found" });
    }
    
    res.status(200).json(bet);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
