'use strict';

// The Package is past automatically as first parameter
module.exports = function(Translate, app, auth, database) {

    app.get('/mean-translate/example/anyone', function(req, res, next) {
        res.send('Anyone can access this');
    });

    app.get('/mean-translate/example/auth', auth.requiresLogin, function(req, res, next) {
        res.send('Only authenticated users can access this');
    });

    app.get('/mean-translate/example/admin', auth.requiresAdmin, function(req, res, next) {
        res.send('Only users with Admin role can access this');
    });

    app.get('/mean-translate/example/render', function(req, res, next) {
        Translate.render('index', {
            package: 'mean-translate'
        }, function(err, html) {
            //Rendering a view from the Package server/views
            res.send(html);
        })
    });

    app.get('/translate/all/langs', function(req, res) {
        Translate.all(function(languages) {
            res.send(languages);
        });
    });

    Translate.all(function(languages) {
        languages.forEach(function(language) {
            app.get('/' + language.identifier, function(req, res) {
                res.render('index', {
                    user: req.user ? JSON.stringify(req.user.name) : 'null',
                    roles: req.user ? JSON.stringify(req.user.roles) : JSON.stringify(['annonymous'])
                });
            });
        })
    });

    // app.post('/languages/add', function (req,res) {
    //     var body = req.body;

    //     Translate.settings.get(function(settings) {
    //         settings.languages.push(body);
    //         settings.save();
    //     });

    // });

};