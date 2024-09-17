const userRoutes = require('./user.route');
const classRoutes = require('./class.route');
const slotRoutes = require('./slot.route');

module.exports = (app) => {

    const version = "/v1";

    app.use(version + "/users", userRoutes);

    app.use(version + "/classes", classRoutes);

    app.use(version + "/slots", slotRoutes);


};