import BetModel from "../models/BetModel";
import Account from "../models/Account";
import { Request, Response } from "express";

export class BetController {
  
  // Get all bets for a user
  static async getUserBets(userId: string) {
    try {
      const bets = await BetModel.find({ 
        users: userId 
      }).sort({ createdAt: -1 })
        .populate('users', 'username email')
        .populate('winner', 'username email');
      
      return bets;
    } catch (error) {
      throw error;
    }
  }

  // Get active bets for a user
  static async getUserActiveBets(userId: string) {
    try {
      const bets = await BetModel.find({ 
        users: userId,
        status: 'active',
        startDate: { $lte: new Date() },
        endDate: { $gte: new Date() }
      }).sort({ createdAt: -1 })
        .populate('users', 'username email');
      
      return bets;
    } catch (error) {
      throw error;
    }
  }

  // Create a new bet
  static async createBet(betData: any) {
    try {
      // Validate that users exist
      const users = await Account.find({ _id: { $in: betData.users } });
      if (users.length !== betData.users.length) {
        throw new Error('One or more users do not exist');
      }

      const bet = await BetModel.create(betData);
      const populatedBet = await BetModel.findById(bet._id)
        .populate('users', 'username email');
      
      return populatedBet;
    } catch (error) {
      throw error;
    }
  }

  // Complete a bet and set winner
  static async completeBet(betId: string, winnerId: string) {
    try {
      const bet = await BetModel.findById(betId);
      if (!bet) {
        throw new Error('Bet not found');
      }

      if (bet.status !== 'active') {
        throw new Error('Bet is not active');
      }

      // Verify winner is one of the bet participants
      if (!bet.users.includes(winnerId as any)) {
        throw new Error('Winner must be one of the bet participants');
      }

      const updatedBet = await BetModel.findByIdAndUpdate(
        betId,
        { 
          status: 'completed',
          winner: winnerId 
        },
        { new: true }
      ).populate('users', 'username email').populate('winner', 'username email');

      return updatedBet;
    } catch (error) {
      throw error;
    }
  }

  // Get bet statistics for a user
  static async getUserBetStats(userId: string) {
    try {
      const totalBets = await BetModel.countDocuments({ users: userId });
      const wonBets = await BetModel.countDocuments({ winner: userId });
      const activeBets = await BetModel.countDocuments({ 
        users: userId, 
        status: 'active' 
      });
      
      const totalAmountWon = await BetModel.aggregate([
        { $match: { winner: userId } },
        { $group: { _id: null, total: { $sum: "$amount" } } }
      ]);

      const totalAmountBet = await BetModel.aggregate([
        { $match: { users: userId } },
        { $group: { _id: null, total: { $sum: "$amount" } } }
      ]);

      return {
        totalBets,
        wonBets,
        activeBets,
        winRate: totalBets > 0 ? (wonBets / totalBets * 100).toFixed(2) : 0,
        totalAmountWon: totalAmountWon[0]?.total || 0,
        totalAmountBet: totalAmountBet[0]?.total || 0
      };
    } catch (error) {
      throw error;
    }
  }
}