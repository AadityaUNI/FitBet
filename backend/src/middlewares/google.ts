import oAuth2Client from '../controllers/googleAuth/googleClient';
import Account from '../models/Account';

export const withGoogleAuth = async (req, res, next) => {
  try {
    const { userId } = req.query;
    if (!userId) return res.status(400).json({ error: 'Missing userId' });

    const user = await Account.findById(userId);
    if (!user) return res.status(404).json({ error: 'User not found' });

    oAuth2Client.setCredentials({
      access_token: user.googleAccessToken,
      refresh_token: user.googleRefreshToken,
      expiry_date: user.googleTokenExpiry?.getTime(),
    });

    // Refresh expired tokens
    if (Date.now() >= (user.googleTokenExpiry?.getTime() || 0)) {
      const { credentials } = await oAuth2Client.refreshAccessToken();
      user.googleAccessToken = credentials.access_token;
      user.googleTokenExpiry = credentials.expiry_date ? new Date(credentials.expiry_date) : null;
      await user.save();
      oAuth2Client.setCredentials(credentials);
    }

    req.oAuth2Client = oAuth2Client;
    next();
  } catch (err) {
    next(err);
  }
};
