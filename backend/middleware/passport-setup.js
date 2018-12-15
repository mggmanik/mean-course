const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../keys');

passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser((user, done) => {
  done(null, user);
});


passport.use(new GoogleStrategy({
  clientID: keys.google.clientID,
  clientSecret: keys.google.clientSecret,
  callbackURL: '/api/user/oauth/google/redirect',
  accessType: 'offline'
}, (accessToken, refreshToken, profile, done) => {
  const userData = {
    email: profile.emails[0].value,
    userId: profile.id,
    token: accessToken
  };
  done(null, userData);
}));

module.exports = passport;
