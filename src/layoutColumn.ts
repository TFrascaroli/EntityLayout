import {EntityLayout} from "./entityLayout";
import {Entity} from "./entity";
import {ILayoutColumn} from "./interfaces/ILayoutColumn";
import {LayoutRow} from "./LayoutRow";

export class LayoutColumn {

    public div: HTMLDivElement;
    private ent: Entity;
    private el: EntityLayout;
    private dim: number;
    private div_content: HTMLDivElement;
    private row: LayoutRow;

    constructor(el: EntityLayout, row: LayoutRow) {
        let self = this;
        this.row = row;
        this.div = document.createElement("div");
        this.div_content = document.createElement("div");
        this.div_content.className = "content-column";
        this.div.appendChild(this.div_content);
        // Dimensions flex
        let div_dim = document.createElement("input");
        div_dim.className = "dim-col";
        div_dim.type = "number";
        div_dim.max = "5";
        div_dim.min = "1";
        div_dim.value = "1";
        div_dim.addEventListener("change", function() {
            let rawVal = parseInt(div_dim.value, 10),
                val = (10 + rawVal).toString();
            self.dim = rawVal;
            self.div.style.flex = val + " " + val + " auto";
        });
        this.div.appendChild(div_dim); 

        this.div.className = "column";
        this.el = el;
        this.div.addEventListener("click", function (evt) {
            if (evt.target !== self.div) return;
            self.el.openPopup(self);
        });
        // Button Delete Columns
        let remove_column_btn = document.createElement("div");
        remove_column_btn.className = "button-remove-column";
        remove_column_btn.addEventListener("click", function(){
            let row_div = self.div.parentElement;
            let element = row_div.getElementsByClassName("column");
            if(element.length > 1) {
                if (self.getEntity()) {
                let ent = self.getEntity();
                el.getEntities().push(ent);
            }
             self.div.remove();
             remove_column_btn.remove();
             self.row.columns.splice(self.row.columns.indexOf(self), 1);
            }

        });
        this.div.appendChild(remove_column_btn);
    }

    destroy() {
        this.div = null;
    }

    getEntity(){
        return this.ent;
    }

    deleteEntity(){
        this.ent = null;
        this.div_content.textContent = "";
        // this.div.textContent = "";
    }
    setEntity(ent: Entity){
        let self = this;
        if(ent){
            this.ent = ent;
            self.div_content.textContent = ent.id.toString();
            
        }
    }
    render(): HTMLDivElement {
        let div_rep = document.createElement("div");
        let div_inner = document.createElement("div");
        div_inner.classList.add("sledge-hammer-inner");
        div_rep.className = "flexChild sledge-hammer";
        div_rep.appendChild(div_inner);
        if (this.ent) {
            div_inner.appendChild(this.ent.render());
        }
        div_rep.style.flex = this.dim + " " + this.dim + " " +  "0px";
        return div_rep;
    };

    serializer(): ILayoutColumn {
        let colprop = {
            entID: null,
            dim: this.dim
        };
        if (this.ent) {
            colprop.entID = this.ent.id;
        }
        return colprop;
    }

    clear () {
        this.ent = null;
    }

    setDim(dim: number) {
        this.dim = dim;
        this.div.style.flex = dim + " " + dim + "auto";
    }

    parser(object: ILayoutColumn) {
        this.setDim(object.dim);
        this.el.assignEntity(object.entID, this);
    }
}