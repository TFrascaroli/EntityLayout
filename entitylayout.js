(function () {
    "use strict";

    var LayoutColumns = function () {
        this.div = document.createElement("div");
    };
    LayoutColumns.prototype.destroy = function () {
        this.div = null;
    };
    

    var LayoutRow = function () {
        this.div = document.createElement("div");
        this.columns = [];
    };
    LayoutRow.prototype.addColumn = function () {

    };
    LayoutRow.prototype.destroy = function () {
        var self = this;
        this.columns.forEach(function (c) {
            self.div.removeChild(c.div);
            c.destroy();
        });
        this.columns = [];
    };

    var EntityLayout = function () {
        this.availableEntities = [];
        this.rows = [];
    };
    EntityLayout.prototype.addEntities = function (ents) {
        this.clear();
        this.availableEntities = ents;
    };
    EntityLayout.prototype.clear = function () {
        this.availableEntities = [];
        this.rows = [];
    };
    


    window.entitylayout = EntityLayout;
});