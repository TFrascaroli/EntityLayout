"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var LayoutColumn = (function () {
    function LayoutColumn(el) {
        var self = this;
        this.div = document.createElement("div");
        this.div.className = "column";
        this.el = el;
        this.div.addEventListener("click", function () {
            self.el.openPopup(self);
        });
    }
    LayoutColumn.prototype.destroy = function () {
        this.div = null;
    };
    LayoutColumn.prototype.getEntity = function () {
        return this.ent;
    };
    LayoutColumn.prototype.deleteEntity = function () {
        this.ent = null;
    };
    LayoutColumn.prototype.setEntity = function (ent) {
        this.ent = ent;
    };
    LayoutColumn.prototype.render = function () {
        var div_rep = document.createElement("div");
        var div_inner = document.createElement("div");
        div_inner.classList.add("sledge-hammer-inner");
        div_rep.className = "flexChild sledge-hammer";
        div_rep.appendChild(div_inner);
        div_inner.appendChild(this.ent.render());
        // div_rep.style.flex = this.dim + " " + this.dim + " " +  "0px";
        return div_rep;
    };
    ;
    return LayoutColumn;
}());
exports.LayoutColumn = LayoutColumn;

//# sourceMappingURL=layoutColumn.js.map
