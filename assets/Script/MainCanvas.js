const CollectedMaterial = require("./CollectedMaterial");
import {foodMaterialList, foodList} from "./config";

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
        orderPrefab:{
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
        orderInterval: null,
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
        this.loadPics(foodMaterialList);
        this.loadPics(foodList);
    },

    update(dt) {

    },

    loadPics(list) {
        list.forEach(picName => {
            cc.loader.loadRes(`imgs/${picName}`, (err, texture) => {
                if(err) {
                    console.log(`pic: ${picName} not found`);
                    return;
                }
                this[picName] = texture;
            });
        });
    },

    gameStart() {
        console.log('game start.');
        if (this.buttonLabel.string == "start") {
            this.buttonLabel.string = "pause";
            this.fallInterval = setInterval(() => this.newMaterial(this.foodMaterialPrefab), 1500);
            this.orderInterval = setInterval(() => this.newOrder(this.orderPrefab), 3000);

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
        if (this.collectedMaterial.material.hasOwnProperty(materialName)) {
            this.node.getChildByName("background").getChildByName("collectedMaterialList").getChildByName("view").getChildByName("content").children.forEach(child => {
                if (child.getComponent('MaterialListComponent').getTexture() == materialName) {
                    child.getComponent('MaterialListComponent').numberOfMaterial += 1;
                    let number = child.getComponent('MaterialListComponent').numberOfMaterial;
                    child.getChildByName('number').getComponent(cc.Label).string = `x${number}`;
                }
            });
        } else {
            let newMaterialListComponent = cc.instantiate(material);
            newMaterialListComponent.getComponent('MaterialListComponent').mainCanvas = this;
            newMaterialListComponent.getComponent('MaterialListComponent').setTexture(materialName);
            this.node.getChildByName("background").getChildByName("collectedMaterialList").getChildByName("view").getChildByName("content").addChild(newMaterialListComponent);
        }
    },

    newOrder(order) {
        let newOrder = cc.instantiate(order);
        newOrder.getComponent('Order').mainCanvas = this;
        newOrder.getComponent('Order').setTexture();
        this.node.getChildByName("background").getChildByName("orderList").getChildByName("view").getChildByName("content").addChild(newOrder);
    }
});
