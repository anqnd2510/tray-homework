require('dotenv').config();
module.exports = {
    momo: {
        partnerCode: process.env.PARTNER_CODE,
        accessKey: process.env.ACCESS_KEY,
        secretKey: process.env.SECRET_KEY,
        endpoint: process.env.ENDPOINT,
    }
};