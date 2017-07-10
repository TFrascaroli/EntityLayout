(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.entitylayout = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var layoutrow_1 = require("./layoutrow");
var entitylayoutinlinecss_1 = require("./entitylayoutinlinecss");
var EntityLayout = (function () {
    function EntityLayout(maxColumns) {
        var self = this;
        this.availableEntities = [];
        this.rows = [];
        this.currentColumn = null;
        this.numberColumns = maxColumns;
        this.div = document.createElement("div");
        this.div.className = "entity-layout";
        this.div_container = document.createElement("div");
        this.div_container.className = "content-rows";
        this.div.appendChild(this.div_container);
        // Button Add rows
        var add_row_btn = document.createElement("div");
        add_row_btn.className = "button-add-row";
        add_row_btn.addEventListener("click", function () {
            self.addRow();
        });
        this.div_container.appendChild(add_row_btn);
        this.popup = document.createElement("div");
        this.popup.classList.add("EL-popup");
        var popupLayer = document.createElement("div");
        popupLayer.classList.add("layer");
        popupLayer.addEventListener("click", function () {
            self.popup.classList.remove("visible");
        });
        var popupContent = document.createElement("div");
        popupContent.classList.add("content");
        var popupWraper = document.createElement("div");
        popupWraper.classList.add("wraper");
        var popupSelectArea = document.createElement("div");
        popupSelectArea.classList.add("selectArea");
        this.popupSelectArea = popupSelectArea;
        this.popup.appendChild(popupLayer);
        this.popup.appendChild(popupWraper);
        popupWraper.appendChild(popupContent);
        popupContent.appendChild(this.popupSelectArea);
        document.body.appendChild(this.popup);
    }
    EntityLayout.prototype.getUsedEntities = function (col) {
        var ents = [];
        this.rows.forEach(function (r) {
            r.columns.forEach(function (c) {
                var ent = c.getEntity();
                if (ent !== null && c !== col)
                    ents.push(ent);
            });
        });
        return ents;
    };
    EntityLayout.prototype.openPopup = function (col) {
        var _this = this;
        var self = this;
        this.currentColumn = col;
        var usedEnts = this.getUsedEntities(this.currentColumn);
        var ents = this.availableEntities.filter(function (e) {
            return usedEnts.indexOf(e) === -1;
        });
        this.popupSelectArea.innerHTML = "";
        var popupOption = document.createElement("div");
        popupOption.className = "options-entity";
        popupOption.textContent = "Delete entity...";
        popupOption.classList.add("delete");
        popupOption.addEventListener("click", function () {
            self.currentColumn.deleteEntity();
            self.popup.classList.remove("visible");
        });
        this.popupSelectArea.appendChild(popupOption);
        ents.forEach(function (ent) {
            var popupOption = document.createElement("div");
            popupOption.className = "options-entity";
            popupOption.textContent = ent.id;
            popupOption.addEventListener("click", function () {
                if (self.currentColumn !== null) {
                    self.currentColumn.setEntity(ent);
                }
                self.popup.classList.remove("visible");
            });
            _this.popupSelectArea.appendChild(popupOption);
        });
        this.popup.classList.add("visible");
    };
    EntityLayout.prototype.addEntities = function (ents) {
        this.rows.forEach(function (r) {
            var columns = r.getColumn();
            columns.forEach(function (c) {
                if (c.getEntity()) {
                    var found = ents.some(function (ent) {
                        return c.getEntity().id === ent.id;
                    });
                    if (!found) {
                        c.deleteEntity();
                    }
                }
            });
        });
        var self = this;
        self.availableEntities = ents;
    };
    EntityLayout.prototype.addRow = function () {
        var r = new layoutrow_1.LayoutRow(this);
        this.rows.push(r);
        this.div_container.appendChild(r.div);
        return r;
    };
    EntityLayout.prototype.render = function () {
        var div_rows = document.createElement("div");
        var style = document.createElement("style");
        style.type = "text/css";
        style.innerText = entitylayoutinlinecss_1.inlineCss;
        div_rows.style.width = "21cm";
        div_rows.style.padding = "1cm";
        div_rows.style.backgroundColor = "#bebebe";
        this.rows.forEach(function (r) {
            div_rows.appendChild(r.render());
        });
<<<<<<< HEAD
        // Cambiar!!
        return div_rows.outerHTML;
=======
        return style.outerHTML + div_rows.outerHTML;
>>>>>>> fe66b673541e2bcdce73ac04a19392d95d1fcbdb
    };
    ;
    EntityLayout.prototype.serializer = function () {
        return {
            rows: this.rows.map(function (r) {
                return r.serializer();
            })
        };
    };
    EntityLayout.prototype.reset = function () {
        var self = this;
        this.rows.forEach(function (r) {
            self.div_container.removeChild(r.div);
            r.clear();
        });
        this.rows = [];
    };
    EntityLayout.prototype.clear = function () {
        this.reset();
        this.availableEntities = [];
        this.addRow();
    };
    EntityLayout.prototype.parser = function (object) {
        var _this = this;
        this.reset();
        this.rows = object.rows.map(function (r) {
            var row = new layoutrow_1.LayoutRow(_this);
            row.clear();
            row.parser(r);
            _this.div_container.appendChild(row.div);
            return row;
        });
    };
    EntityLayout.prototype.getEntities = function () {
        return this.availableEntities;
    };
    EntityLayout.prototype.getNumberColumns = function () {
        return this.numberColumns;
    };
    EntityLayout.prototype.assignEntity = function (id, col) {
        if (id) {
            var ent = this.availableEntities.filter(function (e) { return e.id === id; })[0];
            col.setEntity(ent);
        }
    };
    EntityLayout.prototype.getUI = function () {
        return this.div;
    };
    return EntityLayout;
}());
exports.EntityLayout = EntityLayout;

},{"./entitylayoutinlinecss":2,"./layoutrow":4}],2:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.inlineCss = ".flexRoot{width:calc(100% + 16px);height:calc(100% + 16px);background-color:#dedede}.columnParent,.rowParent{display:-webkit-box;display:-ms-flexbox;display:-webkit-flex;display:flex;-webkit-box-direction:normal;-webkit-box-orient:horizontal;-webkit-flex-direction:row;-ms-flex-direction:row;flex-direction:row;-webkit-flex-wrap:nowrap;-ms-flex-wrap:nowrap;flex-wrap:nowrap;-webkit-box-pack:start;-ms-flex-pack:start;justify-content:flex-start;-ms-flex-line-pack:stretch;align-content:stretch;-webkit-box-align:stretch;-ms-flex-align:stretch;align-items:stretch;max-height:100%;max-width:100%}.columnParent{-webkit-box-orient:vertical;-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column}.flexChild{-ms-flex-item-align:auto;align-self:auto;position:relative!important;bottom:auto!important;top:auto!important;overflow:hidden}.sledge-hammer-inner{position:absolute}.button_export{width:20px;height:20px}";

},{}],3:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var LayoutColumn = (function () {
    function LayoutColumn(el, row) {
        var self = this;
        this.row = row;
        this.ent = null;
        this.div = document.createElement("div");
        this.div_content = document.createElement("div");
        this.div_content.className = "content-column";
        this.div.appendChild(this.div_content);
        this.dim = 1;
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
        div_inner.classList.add("entity-layout-inner");
        div_rep.className = "flexChild entity-layout-child";
        div_rep.appendChild(div_inner);
        if (this.ent) {
            div_inner.appendChild(this.ent.render());
        }
        div_rep.style.flex = this.dim.toString() + " " + this.dim.toString() + " " + "auto";
<<<<<<< HEAD
=======
        if (this.el.afterRender instanceof Function)
            this.el.afterRender("column", div_rep);
>>>>>>> fe66b673541e2bcdce73ac04a19392d95d1fcbdb
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

},{}],4:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var layoutcolumn_1 = require("./layoutcolumn");
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
            self.div.remove();
            self.el.rows.splice(self.el.rows.indexOf(self), 1);
            remove_row_btn.remove();
            if (self.el.rows.length === 0)
                self.el.addRow();
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
        var c = new layoutcolumn_1.LayoutColumn(this.el, this);
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
        if (this.el.afterRender instanceof Function)
            this.el.afterRender("row", div_row);
        return div_row;
    };
    ;
    LayoutRow.prototype.clear = function () {
        var self = this;
        this.columns.forEach(function (c) {
            self.div.removeChild(c.div);
            c.clear();
        });
        this.columns = [];
    };
    LayoutRow.prototype.serializer = function () {
        return {
            columns: this.columns.map(function (c) {
                return c.serializer();
            })
        };
    };
    LayoutRow.prototype.parser = function (object) {
        var _this = this;
        this.columns = object.columns.map(function (c) {
            var col = new layoutcolumn_1.LayoutColumn(_this.el, _this);
            col.parser(c);
            _this.div.appendChild(col.div);
            return col;
        });
    };
    return LayoutRow;
}());
exports.LayoutRow = LayoutRow;

},{"./layoutcolumn":3}]},{},[1])(1)
});