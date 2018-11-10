import {foodList} from "./config";

var Order = cc.Class({
    extends: cc.Component,

    properties: {
        texture: {
            default: null,
            type: cc.Texture2D
        },
        foodNo: 0
    },

    onLoad() {

    },

    update(dt) {

    },
    
    setTexture() {
        let self = this;
        self.foodNo = Math.round(Math.random() * 10000) % foodList.length;
        let foodName = foodList[this.foodNo];
        self.getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(self.mainCanvas[foodName]);
    },

    getTexture() {
        return this.texture;
    }


});
