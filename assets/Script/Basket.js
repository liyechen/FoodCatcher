var Basket = cc.Class({
    extends: cc.Component,

    properties: {
    },

    onLoad() {
        this.node.on(cc.Node.EventType.TOUCH_MOVE, function (event) {
            var delta = event.touch.getDelta();
            this.x += delta.x;
        }, this.node);
    },

    update(dt) {

    },

});
