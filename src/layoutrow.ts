import {LayoutColumn} from "./layoutcolumn";
import {EntityLayout} from "./entitylayout";
import {ILayoutRow} from "./interfaces/ILayoutRow";


export class LayoutRow {
    
    public columns: Array<LayoutColumn>;
    public div: HTMLDivElement;
    private el: EntityLayout;
    
    constructor(el: EntityLayout) {
        let self = this;
        this.div = document.createElement("div");
        this.div.className = "row";

        // Button Add Columns
        let div_addColumn_btn = document.createElement("div");
        div_addColumn_btn.className = "button-add-column";
        div_addColumn_btn.addEventListener("click", function(){
            let childrensRows = self.div.children;
            let count = 0;
            for (let i = 0; i < childrensRows.length; i++) {
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
        let remove_row_btn = document.createElement("div");
        remove_row_btn.className = "button-remove-row";
        remove_row_btn.addEventListener("click",function(){
            let columns = self.getColumn();
            self.div.remove();
            self.el.rows.splice(self.el.rows.indexOf(self), 1);
            remove_row_btn.remove();
            if (self.el.rows.length === 0) self.el.addRow();
        });
        this.div.appendChild(remove_row_btn);
        this.columns = new Array<LayoutColumn>();
        this.el = el;
        // Per defecte tenim una columna
        this.addColumn();
    }

    getColumn(){
        return this.columns;
    }

    addColumn() {
        let c = new LayoutColumn(this.el, this);
        this.columns.push(c);
        this.div.appendChild(c.div);
        return c;
    }

    destroy() {
        var self = this;
        this.columns.forEach(function (c) {
            self.div.removeChild(c.div);
            c.destroy();
        });
        this.columns = [];
    }

    render(): HTMLDivElement {
        let div_row = document.createElement("div");
        div_row.className = "flexRoot rowParent flexChild";
        this.columns.forEach(c => {
            div_row.appendChild(c.render());
        });
        return div_row;
    };

    clear() {
        let self = this;
        this.columns.forEach(function (c) {
            self.div.removeChild(c.div);
            c.clear();
        });
        this.columns = [];
    }


    serializer(): ILayoutRow {
        return {
            columns: this.columns.map(c =>{
                return c.serializer();
            })
        }
    }
    parser(object: ILayoutRow) {
        this.columns = object.columns.map(c => {
            let col = new LayoutColumn(this.el, this);
            col.parser(c);
            this.div.appendChild(col.div);
            return col;
        });
    }
}