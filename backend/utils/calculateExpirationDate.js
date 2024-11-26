module.exports = function calculateExpirationDate(package) {
    const currentDate = new Date();
    switch (package) {
        case 'weekly':
            currentDate.setDate(currentDate.getDate() + 7);
            break;
        case 'monthly':
            currentDate.setMonth(currentDate.getMonth() + 1);
            break;
        case 'yearly':
            currentDate.setFullYear(currentDate.getFullYear() + 1);
            break;
        default:
            throw new Error('Invalid package type');
    }
    return currentDate;
};