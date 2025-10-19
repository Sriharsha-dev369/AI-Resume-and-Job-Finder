const jwt = require('jsonwebtoken');
const axios = require('axios');
const { OAuth2Client } = require('google-auth-library');
const oauth2Client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const {
  GOOGLE_CLIENT_ID,
  JWT_SECRET,
  FRONTEND_URL,
} = process.env;

async function googleAuthCallback(req: any, res: any) {

  const code = req.query.code;
  try {
    // Exchange code for tokens
    const tokenRes = await axios.post('https://oauth2.googleapis.com/token', new URLSearchParams({
      code,
      client_id: process.env.GOOGLE_CLIENT_ID || "",
      client_secret: process.env.GOOGLE_CLIENT_SECRET || "",
      redirect_uri: process.env.GOOGLE_REDIRECT_URI || "",
      grant_type: "authorization_code",
    }).toString(),
    { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
  );

    const { id_token } = tokenRes.data;

    // Verify token
    const ticket = await oauth2Client.verifyIdToken({
      idToken: id_token,
      audience: GOOGLE_CLIENT_ID
    });
    const payload = ticket.getPayload();

  const appToken = jwt.sign(
    {
      sub: payload.sub,
      email: payload.email,
      name: payload.name,
      picture: payload.picture
    }, JWT_SECRET || '', { expiresIn: '30d' });

    
    res.cookie('token', appToken, {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
      maxAge: 30 * 24 * 60 * 60 * 1000
    });
    res.redirect(`${FRONTEND_URL}`);
  } catch (err:any ) {
    console.error(err.response?.data || err.message);
    res.status(500).send('Login failed');
  }
}

module.exports = { googleAuthCallback };

// Middleware to check auth
