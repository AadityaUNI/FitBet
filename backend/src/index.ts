import dotenv from 'dotenv';
dotenv.config();

import app from './utils/app';
import mongo from './utils/mongo';
import { PORT } from './constants/index';

import authRoutes from './routes/auth';
import googleAuthRoutes from './routes/google'; // <--- our new module
import { withGoogleAuth } from './middlewares/google';
import oAuth2Client from './controllers/googleAuth/googleClient';
import { google } from 'googleapis';
import { Express } from 'express';
import Account from './models/Account';
import { expression } from 'joi';

const bootstrap = async () => {
  try {
    await mongo.connect();
    console.log('✅ MongoDB connected');
  } catch (err) {
    console.error('❌ MongoDB failed', err);
    return;
  }
  const express = require('express');
  const betRoutes = require('./routes/bets');
  app.use(express.json());
  app.get('/healthz', (req, res) => res.status(204).end());

  app.use('/auth', authRoutes);
  app.use('/oauth', googleAuthRoutes); 
  app.use('/bet', betRoutes);
  app.get('/get-token', async (req, res, next) => {
	try {
		const { code } = req.query;
		const { tokens } = await oAuth2Client.getToken(code as string);
		res.json({ token: tokens.access_token });
	} catch (error) {
		next(error);
	}
});

	// const user = await Account.findOne({ _id: "64a7f0c4c8f1b2b1a5e4d3c2" });

// check if we can find user in db
// const user = await Account.findOne({ _id: "64a7f0c4c8f1b2b1a5e4d3c2" });

// if (user) {
//   console.log("User found:", user);
// } else {
//   console.log("No user with that ID");
// }
	
	// app.get('/testdb', async (req, res, next) => {
	// 	console.log("Test DB route hit");
	
	// 	console.log(Account.findOne({ _id: "64a7f0c4c8f1b2b1a5e4d3c2" }));
	// });
		
//   app.get('/steps', withGoogleAuth, async (req, res, next) => {
//     try {
//       const fitness = google.fitness({ version: 'v1', auth: req.oAuth2Client });

//       const result = await fitness.users.dataset.aggregate({
//         userId: 'me',
//         requestBody: {
//           aggregateBy: [{
//             dataTypeName: 'com.google.step_count.delta',
//             dataSourceId: 'derived:com.google.step_count.delta:com.google.android.gms:estimated_steps',
//           }],
//           bucketByTime: { durationMillis: 24 * 60 * 60 * 1000 },
//           startTimeMillis: Date.now() - 20 * 24 * 60 * 60 * 1000,
//           endTimeMillis: Date.now(),
//         },
//       });

//       res.json(result.data);
//     } catch (err) {
//       next(err);
//     }
//   });

  app.listen(PORT, () => console.log(`✅ Server running on ${PORT}`));
};

bootstrap();
