const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const config = require('../config/server');
const User = require('../domains/users/models/User');

// Google OAuth Strategy
passport.use(new GoogleStrategy({
  clientID: config.googleClientId,
  clientSecret: config.googleClientSecret,
  callbackURL: `${config.clientUrl}/api/auth/google/callback`
},
async (accessToken, refreshToken, profile, done) => {
  try {
    let user = await User.findOne({ googleId: profile.id });

    if (!user) {
      user = await User.create({
        googleId: profile.id,
        name: profile.displayName,
        email: profile.emails[0].value,
        avatar: profile.photos[0].value,
        isVerified: true
      });
    }

    return done(null, user);
  } catch (err) {
    return done(err, null);
  }
}));

// Facebook OAuth Strategy
passport.use(new FacebookStrategy({
  clientID: config.facebookAppId,
  clientSecret: config.facebookAppSecret,
  callbackURL: `${config.clientUrl}/api/auth/facebook/callback`,
  profileFields: ['id', 'displayName', 'photos', 'email']
},
async (accessToken, refreshToken, profile, done) => {
  try {
    let user = await User.findOne({ facebookId: profile.id });

    if (!user) {
      user = await User.create({
        facebookId: profile.id,
        name: profile.displayName,
        email: profile.emails ? profile.emails[0].value : `${profile.id}@facebook.com`,
        avatar: profile.photos ? profile.photos[0].value : '',
        isVerified: true
      });
    }

    return done(null, user);
  } catch (err) {
    return done(err, null);
  }
}));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});