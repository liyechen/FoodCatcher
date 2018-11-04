const CollectedMaterial = require("./CollectedMaterial");
const picNames = ["burger_bread1", "burger_bread2", "burger_meat", "burger_vege"];

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
        foodMaterialPrefab: {
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
        },
        materialListComponent: {
            default: null,
            type: cc.Prefab
        },

    },

    onLoad() {
        this.collectedMaterial = new CollectedMaterial();
        cc.director.getCollisionManager().enabled = true; 
        picNames.forEach(picName => {
            cc.loader.loadRes(`imgs/${picName}`, (err, texture) => {
                this[picName] = texture;
            });
        });
    },

    update(dt) {

    },

    gameStart() {
        console.log('game start.');
        if (this.buttonLabel.string == "start") {
            this.buttonLabel.string = "pause";
            this.fallInterval = setInterval(() => this.newMaterial(this.foodMaterialPrefab), 1500);
        } else {
            this.buttonLabel.string = "start";
            this.gamePause();
        }

    },

    gamePause() {
        clearInterval(this.fallInterval);
        this.fallInterval = null;
    },

    newMaterial(material) {
        let newMaterial = cc.instantiate(material);
        this.node.addChild(newMaterial);
        newMaterial.setPosition(this.getNewMaterialPosition());
        newMaterial.getComponent('FoodMaterial').mainCanvas = this;
        newMaterial.getComponent('FoodMaterial').setTexture();
        newMaterial.getComponent('FoodMaterial').setFallDownDistance(- this.ground.y + this.ceiling.y - 30);
        newMaterial.getComponent('FoodMaterial').startFalling();

    },

    getNewMaterialPosition() {
        let randX = this.ceiling.x + this.ceiling.width * (Math.random() - 0.5) * 0.8;
        let randY = this.ceiling.y;
        return cc.v2(randX, randY);
    },

    materialCaught(materialName) {
        this.newMaterialListComponent(this.materialListComponent, materialName);
        this.collectedMaterial.addMaterial(materialName);
    },

    newMaterialListComponent(material, materialName) {
        if(this.collectedMaterial.material.hasOwnProperty(materialName)) {
            return;
        }
        let newMaterialListComponent = cc.instantiate(material);
        newMaterialListComponent.getComponent('MaterialListComponent').mainCanvas = this;
        newMaterialListComponent.getComponent('MaterialListComponent').setTexture(materialName);
        this.node.getChildByName("scrollview").getChildByName("view").getChildByName("content").addChild(newMaterialListComponent);
    }
});
