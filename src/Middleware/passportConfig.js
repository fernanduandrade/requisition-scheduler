import { Admin } from '../Models/Admin.js';
import AdminService from '../Services/AdminService.js';

import { Strategy as LocalStrategy} from 'passport-local';
import passport from 'passport';

import bcrypt from 'bcrypt';

function initPassport(app) {
    
    passport.use(new LocalStrategy({
        usernameField: 'name',
        passwordField: 'password'
        },
        async (name, password, done) => {
    
            try {
                const user = await AdminService.getByName(name);
                console.log({user})
    
                if (!user) { return done(null, false) }
    
                const isValid = bcrypt.compareSync(password, user.password);
    
                if (!isValid) return done(null, false)
     
                return done(null, user)
    
            } catch (err) {
                done(err, false);
            }
        }
    ));
    
    passport.serializeUser(function(user, done) {
      done(null, user.id);
    });
    
    passport.deserializeUser((id, done) => {
        Admin.findById(id)
          .then((user) => {
              done(null, user);
        })
        .catch(err => done(err)) 
    });
}

export default initPassport;