// [POST] /api/v1/users/register
module.exports.register = async (req, res) => {
    console.log(req.body);

    res.json({
        code: 200
    });
}