const getListProductsFilterModel = require('../../models/products/getListProductsFilterModel.js');

const getListProductsFilterController = async (req, res, next) => {
    try {
        const params = {
            name: req.query.name,
            category: req.query.category,
            place: req.query.place,
            minPrice: req.query.minPrice,
            maxPrice: req.query.maxPrice,
            state: req.query.state,
        };

        const products = await getListProductsFilterModel(params);

        res.send({
            status: 'ok',
            data:
                products.length > 0
                    ? products
                    : 'No hay ningún resultado con esos filtros',
        });
    } catch (error) {
        next(error);
    }
};

module.exports = getListProductsFilterController;
