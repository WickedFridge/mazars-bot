const { getFlavourSingleton } = require('./flavourSingleton');
const flavourSingleton = getFlavourSingleton();

function getFlavourService(req, res) {
    const flavour = req.params.flavour;
    const result = flavour ? flavourSingleton.get(flavour) : flavourSingleton.value;
    res.json(result);
}

function updateFlavourService(req, res) {
    const key = req.params.flavour;
    const data = req.body;
    flavourSingleton.update(key, data);
    res.json("OK");
}

module.exports = {
    getFlavourService,
    updateFlavourService,
};
