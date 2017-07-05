import {LayoutColumn} from "./layoutColumn";
import {EntityLayout} from "./entityLayout";

export class LayoutRow {
    
    private columns: Array<LayoutColumn>;
    public div: HTMLDivElement;
    private el: EntityLayout;
    
    constructor(el: EntityLayout) {
        this.div = document.createElement("div");
        this.div.className = "row";
        this.columns = new Array<LayoutColumn>();
        this.el = el;
        // Per defecte tenim una columna
        this.addColumn();
    }

    addColumn() {
        let c = new LayoutColumn(this.el);
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
}