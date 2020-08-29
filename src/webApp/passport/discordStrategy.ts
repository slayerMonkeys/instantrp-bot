const Strategy = require("passport-discord").Strategy;
module.exports = (passport) => {

    passport.serializeUser(function(user, done) {
        done(null, user);
    });
    passport.deserializeUser(function(obj, done) {
        done(null, obj);
    });

    passport.use(new Strategy({
            clientID: "536616272595779584",
            clientSecret: "En0_9qdW5iEJPdw7qJj5WDNmyMW4CWKG",
            callbackURL: "http://127.0.0.1:5000/callback",
            scope: ["identify", "guilds"],
            prompt: 'consent'
        },
        (accessToken, refreshToken, profile, done) => {
            process.nextTick(() => {
                return done(null, profile);
            })
        }
        )
    );
}
