'use strict';
module.exports = function(app) {
    app.route('/upload')
        .post(function(req, res){

        var form = new formidable.IncomingForm();
        form.multiples = true;
        form.uploadDir = path.join(__dirname, '/uploads');

        // rename it to it's orignal name
        form.on('file', function(field, file) {
            fs.rename(file.path, path.join(form.uploadDir, file.name));
        });


        form.on('error', function(err) {
            console.log('An error has occured: \n' + err);
        });


        form.on('end', function() {
            res.end('success');
        });


        form.parse(req);

    });
}