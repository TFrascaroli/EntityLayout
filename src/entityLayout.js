"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var layoutRow_1 = require("./layoutRow");
var EntityLayout = (function () {
    function EntityLayout(numberColumns) {
        var self = this;
        this.availableEntities = [];
        this.rows = [];
        this.currentColumn = null;
        this.numberColumns = numberColumns;
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
    EntityLayout.prototype.openPopup = function (col) {
        var _this = this;
        var self = this;
        this.currentColumn = col;
        if (this.currentColumn.getEntity()) {
            var ent = this.currentColumn.getEntity();
            this.availableEntities.push(ent);
        }
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
        this.availableEntities.forEach(function (ent) {
            var popupOption = document.createElement("div");
            popupOption.className = "options-entity";
            popupOption.textContent = ent.id;
            popupOption.addEventListener("click", function () {
                if (self.currentColumn !== null) {
                    self.currentColumn.setEntity(ent);
                    self.availableEntities.splice(self.availableEntities.indexOf(ent), 1);
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
        var r = new layoutRow_1.LayoutRow(this);
        this.rows.push(r);
        this.div_container.appendChild(r.div);
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
    EntityLayout.prototype.serializer = function () {
        var rows = [];
        this.rows.forEach(function (r) {
            return rows.push(r.serializer());
        });
        var objectJSON = {
            rows: rows
        };
        return objectJSON;
    };
    EntityLayout.prototype.parser = function (object) {
        this.rows = object.rows;
    };
    EntityLayout.prototype.getEntities = function () {
        return this.availableEntities;
    };
    EntityLayout.prototype.getNumberColumns = function () {
        return this.numberColumns;
    };
    return EntityLayout;
}());
exports.EntityLayout = EntityLayout;

//# sourceMappingURL=entityLayout.js.map
