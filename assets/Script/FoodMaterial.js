var FoodMaterial = cc.Class({
    extends: cc.Component,
    properties: {
        fallDuration: 5,
        fallDistance: 500,
        texture: {
            default: null,
            type: cc.Texture2D
        }
    },

    onLoad: function () {
        this.getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(this.texture);
    },


    setFallDownAction: function () {
        var fallDown = cc.moveBy(this.fallDuration, cc.v2(0, -this.fallDistance));
        return fallDown;
    },

    setFallDownDistance: function (distance) {
        this.fallDistance = distance;
    },

    startFalling: function() {
        this.fallAction = this.setFallDownAction();
        this.node.runAction(this.fallAction);
    }


});
