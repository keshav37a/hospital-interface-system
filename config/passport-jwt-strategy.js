const passport = require('passport');
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;

const Doctor = require('../models/doctor');

console.log('passport jwt loaded');

let opts = {
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),     //extract token from header
    secretOrKey: 'judgement-day'   //Encryption/Decryption string
}

passport.use(new JWTStrategy(opts, function(jwtPayload, done){
    Doctor.findById(jwtPayload._id, function(err, doctor){
        if(err){console.log(`Error in finding doctor: during passport-jwt-auth: ${err}`)}

        if(doctor){
            return done(null, doctor);
        }
        else{
            console.log(`Doctor not found: during passport-jwt-auth`);
            return done(null, false);
        }
    });
}))

module.exports = passport;