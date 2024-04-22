// set up middleware to check user permissions
function checkRole(roles) {
    return function(req, res, next) {
        if (!req.session.user || !roles.includes(req.session.user.role)) {
            return res.status(403).send('Access Denied!');
        }
        next();
    }
}

module.exports = checkRole;