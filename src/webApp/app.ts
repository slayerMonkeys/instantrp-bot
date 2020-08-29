import * as express from 'express'
import * as passport from 'passport'
import * as morgan from 'morgan';
import * as path from "path";
import * as bodyParser from 'body-parser';
import * as session from 'express-session';
import {WebhookClient} from "discord.js";
const expressStatic = require("express-static-search");

module.exports = (client) => {
    const app: any = express();
    require('./passport/discordStrategy')(passport)
    app.bot = client;
    app.set('view engine', 'ejs');
    app.set('views', path.resolve(__dirname, 'views'));
    app.use(expressStatic(path.resolve(__dirname, 'public')));
    app.use(morgan('dev'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: false}));
    app.use(session({
        secret: 'keyboardcat',
        resave: false,
        saveUninitialized: true
    }));
    app.use(passport.initialize());
    app.use(passport.session());
//                         MIDDELWARE
    function ensureAuthenticated(req, res, next) {
        if (req.isAuthenticated()) {
            const isInGuild = req.user.guilds.find(g => g.id === '716019522183757936')
            if (isInGuild) {
                const guild = client.guilds.cache.find(g => g.id === isInGuild.id);
                const member = guild.members.cache.find(mem => mem.id === req.user.id);
                if(member.hasPermission('ADMINISTRATOR', { checkAdmin: true })) {
                    return next();
                }
            }
        }
        res.status(401).render('401');
    }


    const indexRouter = express.Router()
    indexRouter.get('/', (req: any, res) => {
        res.render('index', {
            title: 'dashboard',
            bot: app.bot,
            path: req.path,
            user: req.isAuthenticated() ? req.user : null
        });
    })

    indexRouter.get('/commands', (req: any, res) => {
        let x = "";
        const categoryList = []
        client.commands.array().sort((a, b) => a.help.category - b.help.category).forEach(cmd => {
            const cat = cmd.help.category;
            if(x !== cat) {
                categoryList.push(cat)
                x = cat
            }
        });

        res.render('commands', {
            title: 'dashboard - commandes',
            bot: app.bot,
            path: req.path,
            user: req.isAuthenticated() ? req.user : null,
            categorys: categoryList
        });
    })

    indexRouter.get('/home', ensureAuthenticated, (req: any, res) => {
        res.render('home', {
            title: 'dashboard',
            bot: app.bot,
            path: req.path,
            user: req.isAuthenticated() ? req.user : null
        });
    })

    indexRouter.get('/patch-note/add', ensureAuthenticated, (req: any, res) => {
        res.render('patch-note-add', {
            title: 'dashboard',
            bot: app.bot,
            path: req.path,
            user: req.isAuthenticated() ? req.user : null
        });
    })

    indexRouter.post('/patch-note/add', (req: any, res) => {
        const patchNoteWebHook = new WebhookClient('745647965158375486', 'MVi5ixkvdYfFzYN2wVeucFt8onbjZYH-V9of1CONvhT8FJXOX_tQ-Bv27pYQlqvE8lyA')
        console.log(req.body)
        if(req.body.content_patch_note.length < 1 ) {
            console.log('test')
            return res.status(405).redirect('/patch-note/add')
        }
        patchNoteWebHook.send(req.body.content_patch_note, { code: true })
        return res.status(200).redirect('/patch-note/add')
    })
    indexRouter.get('/login', passport.authenticate("discord", { scope: ["identify", "guilds"], prompt: 'consent' }), (req: any, res) => {
            req.session.backURL = "/home";
        }
    );

    indexRouter.get('/callback', passport.authenticate("discord", { failureRedirect: '/' }), (req, res) => {
        res.redirect('/home');
    });
    indexRouter.get('/logout', (req: any, res) => {
        req.session.destroy(() => {
            req.logout()
            res.redirect('/')
        });
    });
    app.use('/', indexRouter);

    app.environement = require('./env');
    app.environement(true);

    return app
}



