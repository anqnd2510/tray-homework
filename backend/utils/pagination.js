module.exports.paginate = async (model, page, limit) => {
    const skip = (page - 1) * limit;
    const data = await model.find().skip(skip).limit(limit);
    const total = await model.countDocuments();

    return {
        data,
        meta: {
            total,
            page,
            last_page: Math.ceil(total / limit),
        }
    }
}