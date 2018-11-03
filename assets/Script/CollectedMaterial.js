class CollectedMaterial {

    constructor() {
        this.material = [];
    }

    addMaterial(materialNo) {
        this.material.push(materialNo);
        console.log(this.material);
    }

}

module.exports = CollectedMaterial
