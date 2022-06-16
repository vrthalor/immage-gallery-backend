
module.exports = (app) =>{
    //initialization of local login
    app.use('/dashboard', require('../api/dashboard'));
};