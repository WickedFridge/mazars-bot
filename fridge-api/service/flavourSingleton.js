let flavourSingleton = null;

const defaultResponse = {
    available: false,
    promotion: false,
};

class Flavour {
    constructor() {
        this.flavour = {};
    }

    get value () {
        const available = [];
        const promotion = [];
        Object.entries(this.flavour).forEach(([key, val]) => {
            if (val.available) {
                available.push(key);
            }
            if (val.promotion) {
                promotion.push(key);
            }
        });
        return { available, promotion };
    }

    get(key) {
        return this.flavour[key] || defaultResponse;
    }

    update(key, data) {
        if (!this.flavour[key]) {
            this.flavour[key] = {};
        }
        Object.entries(data).forEach(([subkey, value]) => {
            this.flavour[key][subkey] = value;
        });
    }
}

function getFlavourSingleton() {
    if (!flavourSingleton) {
        flavourSingleton = new Flavour();
    }
    return flavourSingleton;
}

module.exports = {
    getFlavourSingleton,
};
