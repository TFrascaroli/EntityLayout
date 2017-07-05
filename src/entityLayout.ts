import {LayoutRow} from "./layoutRow";
import {IEntity} from "./IEntity";
import {LayoutColumn} from "./layoutColumn";

export class EntityLayout {

    private availableEntities: Array<IEntity>;
    private rows: Array<LayoutRow>;
    private currentColumn: LayoutColumn;
    private popup: HTMLDivElement;
    private popupSelectArea: HTMLSelectElement;
    private div: HTMLDivElement;

    constructor() {
        this.availableEntities = [];
        this.rows = [];
        this.currentColumn = null;
        this.div = document.createElement("div");
        this.div.className = "entity-layout";
        this.popup = document.createElement("div");
        this.popupSelectArea = document.createElement("select");
    }

    openPopup(col: LayoutColumn) {
        this.currentColumn = col;
        this.popup.classList.remove("visible");
        this.popup.classList.add("EL-popup");
        let popupLayer = document.createElement("div");
        popupLayer.classList.add("layer");
        let popupContent = document.createElement("div");
        popupContent.classList.add("content");
        let popupWraper = document.createElement("div");
        popupWraper.classList.add("wraper");
        let popupSelectArea = document.createElement("select");
        this.popupSelectArea = popupSelectArea;

        this.popup.appendChild(popupLayer);
        this.popup.appendChild(popupWraper);
        popupWraper.appendChild(popupContent);
        popupContent.appendChild(popupSelectArea);
        document.body.appendChild(this.popup);
    }

    addEntities(ents: Array<IEntity>) {
        let self = this;

        ents.forEach( ent =>{
            this.availableEntities.push(ent);
            let popupOption = document.createElement("option");
            popupOption.textContent = ent.id;
            popupOption.addEventListener("click", function () {
                if (self.currentColumn !== null) {
                    self.currentColumn.setEntity(ent);
                }
                self.popup.classList.remove("visible");
            });
            this.popupSelectArea.appendChild(popupOption);
        });
        
        this.availableEntities = ents;
    }
    addRow(){
        let r = new LayoutRow(this);
        this.rows.push(r);
        this.div.appendChild(r.div);
        return r;
    }
    clear() {
        this.availableEntities = [];
        this.rows = [];
    }
    render() {
        let div_rows = document.createElement("div");
        div_rows.style.width = "21cm";
        div_rows.style.padding = "1cm";
        div_rows.style.backgroundColor = "#bebebe";
        this.rows.forEach(r => {
           div_rows.appendChild(r.render());
        });
        // Cambiar!!
        return "<html><head><style type=\"text/css\"><\/style><\/head><body>" + div_rows.outerHTML + "<\/body><\/html>";

    };
}