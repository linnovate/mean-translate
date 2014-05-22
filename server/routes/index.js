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
        });
    });

    app.get('/translate/all/langs', function(req, res) {                
        res.send(Translate.languages.list);       
    });
    
    app.get('/:language', function(req, res, next) {

        var language = req.params.language;

        if (!isLanguage(language)) return next();

        var index = require(process.cwd() + '/server/controllers/index');
        index.render(req, res);    

    });

    function isLanguage(identifier) {
        var list = Translate.languages.list;
        var found = false;
        list.forEach(function(lang){
            if (lang.identifier === identifier) {
                found = true;
            }
        });

        return (found?identifier:false);
    }

    // Translate.all(function(languages) {
    //     languages.forEach(function(language) {
    //         app.get('/:language', function(req, res) {

    //             var language = req.params['language'];

    //             console.log(language);
    //             var index = require(process.cwd() + '/server/controllers/index');
    //             index.render(req, res);
    //         });
    //     });
    // });



    // app.post('/languages/add', function (req,res) {
    //     var body = req.body;

    //     Translate.settings.get(function(settings) {
    //         settings.languages.push(body);
    //         settings.save();
    //     });

    // });

};
