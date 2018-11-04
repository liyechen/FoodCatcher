class CollectedMaterial {

    constructor() {
        this.material = {};
    }

    addMaterial(materialName) {
        
        if (this.material.hasOwnProperty(materialName)) {
            this.material[materialName] += 1;
        } else {
            this.material[materialName] = 1;
        }
        console.log(this.material);
    }

}

module.exports = CollectedMaterial
