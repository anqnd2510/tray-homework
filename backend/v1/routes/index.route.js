const userRoutes = require('./user.route');
const classRoutes = require('./class.route');
const slotRoutes = require('./slot.route');
const questionRoutes = require('./question.route');
const answerRoutes = require('./answer.route');
const authRoutes = require('./auth.route');
const feedbackRoutes = require('./feedback.route');
const paymentRoutes = require('./payment.route');
const transactionRoutes = require('./transaction.route');

module.exports = (app) => {

    const version = "/v1";

    app.use(version + "/users", userRoutes);

    app.use(version + "/classes", classRoutes);

    app.use(version + "/slots", slotRoutes);

    app.use(version + "/questions", questionRoutes);

    app.use(version + "/answers", answerRoutes);

    app.use(version + "/auth", authRoutes);

    app.use(version + "/feedbacks", feedbackRoutes);

    app.use(version + "/payments", paymentRoutes);

    app.use(version + "/transactions", transactionRoutes);
};