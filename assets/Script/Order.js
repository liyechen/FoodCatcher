

var Order = cc.Class({
    extends: cc.Component,

    properties: {
        texture: {
            default: null,
            type: cc.Texture2D
        }
    },

    onLoad() {

    },

    update(dt) {

    },

    setTexture(picName) {
        let self = this;
        self.texture = picName;
        self.getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(self.mainCanvas[picName]);
    },

    getTexture() {
        return this.texture;
    }


});
