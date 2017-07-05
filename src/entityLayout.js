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

//# sourceMappingURL=entityLayout.js.map
