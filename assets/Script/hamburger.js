cc.Class({
    extends: cc.Component,
    name: "Hamburger",
    properties: {
        fallDuration: 10,
        fallDistance: 500
    },

    ctor (name) {
        console.log("111 " + name);
    },

    onLoad: function () {
        this.fallAction = this.setFallDownAction();
        this.node.runAction(this.fallAction);
    },


    setFallDownAction: function () {
        var fallDown = cc.moveBy(this.fallDuration, cc.v2(0, -this.fallDistance));
        return fallDown;
    }


});
