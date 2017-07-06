"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var layoutColumn_1 = require("./layoutColumn");
var LayoutRow = (function () {
    function LayoutRow(el) {
        var self = this;
        this.div = document.createElement("div");
        this.div.className = "row";
        // Button Add Columns
        var div_addColumn_btn = document.createElement("div");
        div_addColumn_btn.className = "button-add-column";
        div_addColumn_btn.addEventListener("click", function () {
            var childrensRows = self.div.children;
            var count = 0;
            for (var i = 0; i < childrensRows.length; i++) {
                if (childrensRows[i].className === "column") {
                    count += 1;
                }
            }
            if (count < el.getNumberColumns()) {
                self.addColumn();
            }
        });
        this.div.appendChild(div_addColumn_btn);
        // Button Delete rows
        var remove_row_btn = document.createElement("div");
        remove_row_btn.className = "button-remove-row";
        remove_row_btn.addEventListener("click", function () {
            var columns = self.getColumn();
            columns.forEach(function (c) {
                if (c.getEntity()) {
                    el.getEntities().push(c.getEntity());
                }
            });
            self.div.remove();
            remove_row_btn.remove();
        });
        this.div.appendChild(remove_row_btn);
        this.columns = new Array();
        this.el = el;
        // Per defecte tenim una columna
        this.addColumn();
    }
    LayoutRow.prototype.getColumn = function () {
        return this.columns;
    };
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
    LayoutRow.prototype.serializer = function () {
        var propCol = [];
        this.columns.forEach(function (c) {
            return propCol.push(c.serializer());
        });
        var prop = {
            columns: propCol
        };
        return prop;
    };
    LayoutRow.prototype.parser = function (object) {
        this.columns = object.columns;
    };
    return LayoutRow;
}());
exports.LayoutRow = LayoutRow;

//# sourceMappingURL=layoutRow.js.map
