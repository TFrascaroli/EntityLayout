"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var layoutColumn_1 = require("./layoutColumn");
var LayoutRow = (function () {
    function LayoutRow(el) {
        this.div = document.createElement("div");
        this.div.className = "row";
        this.columns = new Array();
        this.el = el;
        // Per defecte tenim una columna
        this.addColumn();
    }
    LayoutRow.prototype.addColumn = function () {
        var c = new layoutColumn_1.LayoutColumn(this.el);
        this.columns.push(c);
        this.div.appendChild(c.div);
        return c;
    };
    LayoutRow.prototype.destroy = function () {
        var self = this;
        this.columns.forEach(function (c) {
            self.div.removeChild(c.div);
            c.destroy();
        });
        this.columns = [];
    };
    LayoutRow.prototype.render = function () {
        var div_row = document.createElement("div");
        div_row.className = "flexRoot rowParent flexChild";
        this.columns.forEach(function (c) {
            div_row.appendChild(c.render());
        });
        return div_row;
    };
    ;
    return LayoutRow;
}());
exports.LayoutRow = LayoutRow;

//# sourceMappingURL=layoutRow.js.map
