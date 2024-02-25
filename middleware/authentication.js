const clearSessionOnLogin = (req, res, next) => {
    req.session.destroy((err) => {
        if (err) {
            console.error('Error destroying session:', err);
        }
        next();
    });
};

const isAuthenticated = (req, res, next) => {
    if (req.session.user) {
        if (req.session.user.isAdmin != true){
          next();
        } else {
          res.redirect('/admin');
        }
    } else {
        res.redirect('/');
    }
};

const isAuthenticatedAdmin = (req, res, next) => {
    if (req.session.user) {
        if (req.session.user.isAdmin == true){
          next();
        } else {
          res.redirect('/coin');
        }
    } else {
        res.redirect('/');
    }
};

module.exports = { 
    clearSessionOnLogin,
    isAuthenticated,
    isAuthenticatedAdmin
};