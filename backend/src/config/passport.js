import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import * as userRepository from '../repositories/user.repository.js';

// Configure the Google OAuth 2.0 strategy for Passport
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: `${process.env.BACKEND_URL}/api/v1/users/google/callback`,
      scope: ['profile', 'email'],
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // 1. Check if a user already exists with this Google ID
        let user = await userRepository.findUserByGoogleId(profile.id);
        if (user) {
          return done(null, user);
        }

        // 2. If not, check if a user exists with the same email address
        user = await userRepository.findUserByEmail(profile.emails[0].value);

        if (user) {
          // If user exists but is not linked to a Google account, link them
          const updatedUser = await userRepository.updateUserById(user._id, { googleId: profile.id });
          return done(null, updatedUser);
        }

        // 3. If no user exists, create a new user account
        const newUser = await userRepository.createUser({
          googleId: profile.id,
          fullname: profile.displayName,
          email: profile.emails[0].value,
          image: profile.photos[0].value,
          is_verified: true, // Email from Google is considered verified
          // A random password is created as the field is required, but it won't be used for login
          password: Math.random().toString(36).slice(-8),
        });

        return done(null, newUser);
      } catch (error) {
        return done(error, false, { message: 'Error during Google authentication.' });
      }
    }
  )
);

// Serializes the user to decide which data of the user object should be stored in the session
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Deserializes the user from the key stored in the session
passport.deserializeUser(async (id, done) => {
  try {
    const user = await userRepository.findUserById(id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});
