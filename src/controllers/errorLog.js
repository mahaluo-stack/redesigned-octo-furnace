// this function logs errors, at some point it might do something more useful
// at the time of writing this comment I don't know if there is a case where it will reach render (else)
// to be found out~

function errorLog(err, req, res, next) {
    console.log('\nstatus:', res.statusCode, '\n-------------\nerrorlog: \n');
    if (res.headersSent) {
        return next(err);
    }
    else {
        res.render('error', { errorMessage: 'Something bad happened.. (' + res.statusCode + ').' });
    }
}

module.exports = errorLog;