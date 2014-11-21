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

        var index = require(process.cwd() + '/packages/system/server/controllers/index');
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

    app.put('/languages/add', auth.requiresAdmin, function(req, res) {
        Translate.settings(function(err, data) {
            Translate.languages.list.push({'identifier': req.query.lang});
            Translate.settings(Translate.languages);
            res.send(Translate.languages.list);
         });      
    });

    app.put('/languages/setDefault', auth.requiresAdmin, function(req, res) {
        Translate.settings(function(err, data) {
            Translate.languages.list.forEach(function(lang) {
                if (lang['identifier'] == req.query.lang)
                    lang['default'] = true;
                else if (lang['default'])
                    lang['default'] = false;
            });
            Translate.settings(Translate.languages);
            res.send(Translate.languages.list);
        });      
    });




    // app.post('/languages/add', function (req,res) {
    //     var body = req.body;

    //     Translate.settings.get(function(settings) {
    //         settings.languages.push(body);
    //         settings.save();
    //     });

    // });

};
