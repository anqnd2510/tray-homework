const userRoutes = require('./user.route');
const classRoutes = require('./class.route');
const slotRoutes = require('./slot.route');
const questionRoutes = require('./question.route');

module.exports = (app) => {

    const version = "/v1";

    app.use(version + "/users", userRoutes);

    app.use(version + "/classes", classRoutes);

    app.use(version + "/slots", slotRoutes);

    app.use(version + "/questions", questionRoutes);

};