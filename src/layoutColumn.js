"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var LayoutColumn = (function () {
    function LayoutColumn(el, row) {
        var self = this;
        this.row = row;
        this.div = document.createElement("div");
        this.div_content = document.createElement("div");
        this.div_content.className = "content-column";
        this.div.appendChild(this.div_content);
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
        // Button Delete Columns
        var remove_column_btn = document.createElement("div");
        remove_column_btn.className = "button-remove-column";
        remove_column_btn.addEventListener("click", function () {
            var row_div = self.div.parentElement;
            var element = row_div.getElementsByClassName("column");
            if (element.length > 1) {
                if (self.getEntity()) {
                    var ent = self.getEntity();
                    el.getEntities().push(ent);
                }
                self.div.remove();
                remove_column_btn.remove();
                self.row.columns.splice(self.row.columns.indexOf(self), 1);
            }
        });
        this.div.appendChild(remove_column_btn);
    }
    LayoutColumn.prototype.destroy = function () {
        this.div = null;
    };
    LayoutColumn.prototype.getEntity = function () {
        return this.ent;
    };
    LayoutColumn.prototype.deleteEntity = function () {
        this.ent = null;
        this.div_content.textContent = "";
        // this.div.textContent = "";
    };
    LayoutColumn.prototype.setEntity = function (ent) {
        var self = this;
        if (ent) {
            this.ent = ent;
            self.div_content.textContent = ent.id.toString();
        }
    };
    LayoutColumn.prototype.render = function () {
        var div_rep = document.createElement("div");
        var div_inner = document.createElement("div");
        div_inner.classList.add("sledge-hammer-inner");
        div_rep.className = "flexChild sledge-hammer";
        div_rep.appendChild(div_inner);
        if (this.ent) {
            div_inner.appendChild(this.ent.render());
        }
        div_rep.style.flex = this.dim + " " + this.dim + " " + "0px";
        return div_rep;
    };
    ;
    LayoutColumn.prototype.serializer = function () {
        var colprop = {
            entID: null,
            dim: this.dim
        };
        if (this.ent) {
            colprop.entID = this.ent.id;
        }
        return colprop;
    };
    LayoutColumn.prototype.clear = function () {
        this.ent = null;
    };
    LayoutColumn.prototype.setDim = function (dim) {
        this.dim = dim;
        this.div.style.flex = dim + " " + dim + "auto";
    };
    LayoutColumn.prototype.parser = function (object) {
        this.setDim(object.dim);
        this.el.assignEntity(object.entID, this);
    };
    return LayoutColumn;
}());
exports.LayoutColumn = LayoutColumn;

//# sourceMappingURL=layoutColumn.js.map
