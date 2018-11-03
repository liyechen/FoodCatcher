const CollectedMaterial = require("./CollectedMaterial");

var MainCanvas = cc.Class({
    extends: cc.Component,

    properties: {
        buttonLabel: {
            default: null,
            type: cc.Label
        },
        startButton: {
            default: null,
            type: cc.Button
        },
        FoodMaterialPrefab: {
            default: null,
            type: cc.Prefab
        },
        ceiling: {
            default: null,
            type: cc.Node
        },
        ground: {
            default: null,
            type: cc.Node
        },
        fallInterval: null,
        basket: {
            default: null,
            type: cc.Node
        }
    },

    onLoad () {
        this.collectedMaterial = new CollectedMaterial();   
    },

    update (dt) {

    },

    gameStart () {
        console.log('game start.');
        if (this.buttonLabel.string == "start") {
            this.buttonLabel.string = "pause";
            this.fallInterval = setInterval(() => this.newMaterial(this.FoodMaterialPrefab), 1500);
        } else {
            this.buttonLabel.string = "start";
            this.gamePause();
        }
       
    },

    gamePause () {
        clearInterval(this.fallInterval);
        this.fallInterval = null;
    },

    newMaterial (material) {
        let newMaterial = cc.instantiate(material);
        this.node.addChild(newMaterial);
        newMaterial.setPosition(this.getNewMaterialPosition());
        newMaterial.getComponent('FoodMaterial').setFallDownDistance( - this.ground.y + this.ceiling.y - 30);
        newMaterial.getComponent('FoodMaterial').startFalling();
        newMaterial.getComponent('FoodMaterial').mainCanvas = this;
    },

    getNewMaterialPosition () {
        let randX = this.ceiling.x + this.ceiling.width * (Math.random() - 0.5) * 0.8;
        let randY = this.ceiling.y;
        return cc.v2(randX, randY);
    },

    materialCaught (materialName) {
        this.collectedMaterial.material.push(materialName);
        console.log(this.collectedMaterial.material);
    }
});
