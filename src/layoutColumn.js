"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var LayoutColumn = (function () {
    function LayoutColumn(el) {
        var self = this;
        this.div = document.createElement("div");
        // Dimensions flex
        var div_dim = document.createElement("input");
        div_dim.className = "dim-col";
        div_dim.type = "number";
        div_dim.max = "5";
        div_dim.min = "1";
        div_dim.value = "1";
        div_dim.addEventListener("change", function () {
            var rawVal = parseInt(div_dim.value, 10), val = (10 + rawVal).toString();
            self.dim = rawVal;
            self.div.style.flex = val + " " + val + " auto";
        });
        this.div.appendChild(div_dim);
        this.div.className = "column";
        this.el = el;
        this.div.addEventListener("click", function (evt) {
            if (evt.target !== self.div)
                return;
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
        this.div.textContent = "";
    };
    LayoutColumn.prototype.setEntity = function (ent) {
        this.ent = ent;
        this.div.textContent = ent.id.toString();
    };
    LayoutColumn.prototype.render = function () {
        var div_rep = document.createElement("div");
        var div_inner = document.createElement("div");
        div_inner.classList.add("sledge-hammer-inner");
        div_rep.className = "flexChild sledge-hammer";
        div_rep.appendChild(div_inner);
        div_inner.appendChild(this.ent.render());
        div_rep.style.flex = this.dim + " " + this.dim + " " + "0px";
        return div_rep;
    };
    ;
    return LayoutColumn;
}());
exports.LayoutColumn = LayoutColumn;

//# sourceMappingURL=layoutColumn.js.map
