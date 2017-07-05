import {EntityLayout} from "./entityLayout";
import {Entity} from "./entity";

export class LayoutColumn {

    public div: HTMLDivElement;
    private ent: Entity;
    private el: EntityLayout;
    private dim: number;

    constructor(el: EntityLayout) {
        let self = this;
        this.div = document.createElement("div");
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
    }

    destroy() {
        this.div = null;
    }

    getEntity(){
        return this.ent;
    }

    deleteEntity(){
        this.ent = null;
        this.div.textContent = "";
    }
    setEntity(ent: Entity){
        this.ent = ent;
        this.div.textContent = ent.id.toString();
    }
    render(): HTMLDivElement {
        let div_rep = document.createElement("div");
        let div_inner = document.createElement("div");
        div_inner.classList.add("sledge-hammer-inner");
        div_rep.className = "flexChild sledge-hammer";
        div_rep.appendChild(div_inner);
        div_inner.appendChild(this.ent.render());
        div_rep.style.flex = this.dim + " " + this.dim + " " +  "0px";
        return div_rep;
    };
}