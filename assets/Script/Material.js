const MaterialPrice = require("./config");

class Material{
    constructor(name) {
        this.name = name;
        this.price = this.getPrice(name);
    }

    getPrice(name) {
        return MaterialPrice[name];
    }

    
}

module.exports = Material