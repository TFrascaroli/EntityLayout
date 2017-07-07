import {LayoutRow} from "./layoutRow";
import {IEntity} from "./interfaces/IEntity";
import {Entity} from "./entity";
import {LayoutColumn} from "./layoutColumn";
import {IEntityLayout} from "./interfaces/IEntityLayout";


export class EntityLayout {

    private availableEntities: Array<Entity>;
    public rows: Array<LayoutRow>;
    private currentColumn: LayoutColumn;
    private popup: HTMLDivElement;
    private popupSelectArea: HTMLDivElement;
    private div: HTMLDivElement;
    private div_container: HTMLDivElement;
    private numberColumns: number;
    private copyAvailableEntities: Array<Entity>;

    constructor(numberColumns: number) {
        let self = this;
        this.availableEntities = [];
        this.copyAvailableEntities = [];
        this.rows = [];
        this.currentColumn = null;
        this.numberColumns = numberColumns;
        this.div = document.createElement("div");
        this.div.className = "entity-layout";
        this.div_container = document.createElement("div");
        this.div_container.className = "content-rows";
        this.div.appendChild(this.div_container);
        
        // Button Add rows
        let add_row_btn = document.createElement("div"); 
        add_row_btn.className = "button-add-row";
        add_row_btn.addEventListener("click", function() {
              self.addRow();
        });
        this.div_container.appendChild(add_row_btn);

        this.popup = document.createElement("div");
        this.popup.classList.add("EL-popup");
        let popupLayer = document.createElement("div");
        popupLayer.classList.add("layer");
        popupLayer.addEventListener("click", function () {
            self.popup.classList.remove("visible");
        });
        let popupContent = document.createElement("div");
        popupContent.classList.add("content");
        let popupWraper = document.createElement("div");
        popupWraper.classList.add("wraper");
        let popupSelectArea = document.createElement("div");
        popupSelectArea.classList.add("selectArea");
        this.popupSelectArea = popupSelectArea;
        this.popup.appendChild(popupLayer);
        this.popup.appendChild(popupWraper);
        popupWraper.appendChild(popupContent);
        popupContent.appendChild(this.popupSelectArea);
        document.body.appendChild(this.popup);
    }

    openPopup(col: LayoutColumn) {
        let self = this;
        this.currentColumn = col;
        if (this.currentColumn.getEntity()) {
            let ent = this.currentColumn.getEntity();
            this.availableEntities.push(ent);
        }
        this.popupSelectArea.innerHTML = "";
        let popupOption = document.createElement("div");
            popupOption.className = "options-entity";
            popupOption.textContent = "Delete entity...";
            popupOption.classList.add("delete");
            popupOption.addEventListener("click", function () {
                self.currentColumn.deleteEntity();
                self.popup.classList.remove("visible");
            });
            this.popupSelectArea.appendChild(popupOption);
            this.availableEntities.forEach( ent =>{
                let popupOption = document.createElement("div");
                popupOption.className = "options-entity";
                popupOption.textContent = ent.id;
                popupOption.addEventListener("click", function () {
                    if (self.currentColumn !== null) {
                        self.currentColumn.setEntity(ent);
                        self.availableEntities.splice(self.availableEntities.indexOf(ent), 1);
                        self.copyAvailableEntities.push(ent);
                    }
                    self.popup.classList.remove("visible");
                });
                this.popupSelectArea.appendChild(popupOption);
            });
        this.popup.classList.add("visible");
    }

    addEntities(ents: Array<Entity>) {
        this.rows.forEach( r => {
            let columns =  r.getColumn();
            columns.forEach( c => {
                if (c.getEntity()) {
                    let found = ents.some((ent):boolean => {
                        return c.getEntity().id === ent.id;
                    });
                    if (!found) {
                        c.deleteEntity();
                    }
                }
            });
        });
        let self = this;
        self.availableEntities = ents;
    }
    addRow(){

        let r = new LayoutRow(this);
        this.rows.push(r);
        this.div_container.appendChild(r.div);
        return r;
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

    serializer(): IEntityLayout {
        return {
            rows: this.rows.map(r => {
                return r.serializer();
            })
        }
    }

    reset() {
        let self = this;
        this.rows.forEach(function (r) {
            self.div_container.removeChild(r.div);
            r.clear();
        });
        this.rows = [];
    }
    
    clear() {
        this.reset();
        this.availableEntities = [];
        this.copyAvailableEntities = [];
        this.addRow();
    }

    parser(object: IEntityLayout) {
        this.reset();
        this.rows = object.rows.map(r => {
            let row = new LayoutRow(this);
            row.clear();
            row.parser(r);
            this.div_container.appendChild(row.div);
            return row;
        });
    }

    getEntities() {
        return this.availableEntities;
    }

    getNumberColumns(){
        return this.numberColumns;
    }

    assignEntity(id: string, col: LayoutColumn) {
        if (id) {
            let ent = this.availableEntities.filter(e => {return e.id === id})[0];
            col.setEntity(ent);
            this.availableEntities.splice(this.availableEntities.indexOf(ent), 1);
            this.copyAvailableEntities.push(ent);
        }
    }

    getUI(): HTMLDivElement {
        return this.div;
    }

    get_entity(){
        return this.copyAvailableEntities;
    }
}