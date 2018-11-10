import {materialPrice} from require("./config");

class Material{
    constructor(name) {
        this.name = name;
        this.price = this.getPrice(name);
    }

    getPrice(name) {
        return materialPrice[name];
    }

    
}

module.exports = Material