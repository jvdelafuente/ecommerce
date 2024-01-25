// Importamos el modelo
const setFavModel = require('../../models/favorites/setFavModel.js');

const setFavController = async (req, res) => {
    try {
        const userId = req.user;
        const productId = req.body.idProduct;

        const fav = await setFavModel(userId, productId);

        res.send({
            status: 'ok',
            message: fav,
        });
    } catch (err) {
        res.send(err);
    }
};

module.exports = setFavController;
