(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.entitylayout = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var layoutRow_1 = require("./layoutRow");
var EntityLayout = (function () {
    function EntityLayout() {
        this.availableEntities = [];
        this.rows = [];
        this.currentColumn = null;
        this.div = document.createElement("div");
        this.div.className = "entity-layout";
        this.popup = document.createElement("div");
        this.popupSelectArea = document.createElement("select");
    }
    EntityLayout.prototype.openPopup = function (col) {
        this.currentColumn = col;
        this.popup.classList.remove("visible");
        this.popup.classList.add("EL-popup");
        var popupLayer = document.createElement("div");
        popupLayer.classList.add("layer");
        var popupContent = document.createElement("div");
        popupContent.classList.add("content");
        var popupWraper = document.createElement("div");
        popupWraper.classList.add("wraper");
        var popupSelectArea = document.createElement("select");
        this.popupSelectArea = popupSelectArea;
        this.popup.appendChild(popupLayer);
        this.popup.appendChild(popupWraper);
        popupWraper.appendChild(popupContent);
        popupContent.appendChild(popupSelectArea);
        document.body.appendChild(this.popup);
    };
    EntityLayout.prototype.addEntities = function (ents) {
        var _this = this;
        var self = this;
        ents.forEach(function (ent) {
            _this.availableEntities.push(ent);
            var popupOption = document.createElement("option");
            popupOption.textContent = ent.id;
            popupOption.addEventListener("click", function () {
                if (self.currentColumn !== null) {
                    self.currentColumn.setEntity(ent);
                }
                self.popup.classList.remove("visible");
            });
            _this.popupSelectArea.appendChild(popupOption);
        });
        this.availableEntities = ents;
    };
    EntityLayout.prototype.addRow = function () {
        var r = new layoutRow_1.LayoutRow(this);
        this.rows.push(r);
        this.div.appendChild(r.div);
        return r;
    };
    EntityLayout.prototype.clear = function () {
        this.availableEntities = [];
        this.rows = [];
    };
    EntityLayout.prototype.render = function () {
        var div_rows = document.createElement("div");
        div_rows.style.width = "21cm";
        div_rows.style.padding = "1cm";
        div_rows.style.backgroundColor = "#bebebe";
        this.rows.forEach(function (r) {
            div_rows.appendChild(r.render());
        });
        // Cambiar!!
        return "<html><head><style type=\"text/css\"><\/style><\/head><body>" + div_rows.outerHTML + "<\/body><\/html>";
    };
    ;
    return EntityLayout;
}());
exports.EntityLayout = EntityLayout;



},{"./layoutRow":3}],2:[function(require,module,exports){
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



},{}],3:[function(require,module,exports){
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



},{"./layoutColumn":2}]},{},[1])(1)
});