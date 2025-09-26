import { Router } from 'express';
import oAuth2Client from '../controllers/googleAuth/googleClient';
import Account from '../models/Account';
import express from 'express'

const router = express.Router();

// Step 1: Generate Google login URL
router.get('/google', (req, res) => {
  const url = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: process.env.GOOGLE_SCOPE?.split(','),
    prompt: 'consent' // ensures refresh_token comes back
  });
  res.json({ url });
});


// when we have userId from frontend we will use this 
// router.get('/google', (req, res) => {
//   const { userId } = req.query; // frontend passes this in
//   if (!userId) return res.status(400).json({ error: 'Missing userId' });

//   const url = oAuth2Client.generateAuthUrl({
//     access_type: 'offline',
//     scope: process.env.GOOGLE_SCOPE?.split(','),
//     prompt: 'consent',
//     state: String(userId) // 👈 store your own userId here
//   });

//   res.json({ url });
// });

// Step 2: Exchange code for tokens and save to user
router.get('/google/callback', async (req, res, next) => {
	try {
		let { code, userId } = req.query;
		if (!userId) userId = "64a7f0c4c8f1b2b1a5e4d3c2" // for testing, remove this line in production
    if (!code) return res.status(400).json({ error: 'Missing code or userId' });

    const { tokens } = await oAuth2Client.getToken(code as string);

    await Account.findByIdAndUpdate(
      userId,
      {
        googleAccessToken: tokens.access_token,
        googleRefreshToken: tokens.refresh_token,
        googleTokenExpiry: tokens.expiry_date ? new Date(tokens.expiry_date) : null,
      },
      { upsert: true }
    );

    res.json({ message: 'Google tokens saved' });
  } catch (err) {
    next(err);
  }
});

// router.get('/google/callback', async (req, res, next) => {
// 	try {
// 		console.log("Callback hit");
// 		console.log(req);
//     const { code } = req.query;
//     if (!code) return res.status(400).json({ error: 'Missing code or userId' });

//     const { tokens } = await oAuth2Client.getToken(code as string);

//     await Account.findByIdAndUpdate(
//       userId,
//       {
//         googleAccessToken: tokens.access_token,
//         googleRefreshToken: tokens.refresh_token,
//         googleTokenExpiry: tokens.expiry_date ? new Date(tokens.expiry_date) : null,
//       },
//       { upsert: true }
//     );

//     res.json({ message: 'Google tokens saved' });
//   } catch (err) {
//     next(err);
//   }
// });

export default router;
