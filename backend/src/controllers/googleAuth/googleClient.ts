import { google } from 'googleapis';
import dotenv from "dotenv";

// Load environment variables from .env
dotenv.config();

const oAuth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
	process.env.GOOGLE_REDIRECT_URI,
);

console.log("Google OAuth2 Client initialized with redirect URI:", process.env.GOOGLE_REDIRECT_URI);
console.log("Google Client ID:", process.env.GOOGLE_CLIENT_ID ? "Loaded" : "Not Loaded");
console.log("Google Client Secret:", process.env.GOOGLE_CLIENT_SECRET ? "Loaded" : "Not Loaded");

export default oAuth2Client;
