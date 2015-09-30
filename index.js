module.exports = {
    'pre-commit': function(next){
        var stagedFiles = this.stagedFilesSync('ACM'),
            jscs = __dirname  + '/node_modules/jscs/bin/jscs -x',
            jsTest = /\.js$/,
            Uppercode = this;

        stagedFiles.forEach(function(file){
            if(jsTest.test(file)){
                console.log('JSCS: ' + file);
                Uppercode.exec(jscs + ' ' + file, function(err, data){
                    if(!err){
                        Uppercode.exec('git', ['add', file]);
                    }
                });
            }
        });

        next();
    }
};