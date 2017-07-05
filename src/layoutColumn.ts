import {EntityLayout} from "./entityLayout";
import {IEntity} from "./IEntity";

export class LayoutColumn {

    public div: HTMLDivElement;
    private ent: IEntity;
    private el: EntityLayout;

    constructor(el: EntityLayout) {
        let self = this;
        this.div = document.createElement("div");
        this.div.className = "column";
        this.el = el;
        this.div.addEventListener("click", function () {
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
    }
    setEntity(ent: IEntity){
        this.ent = ent;
    }
    render(): HTMLDivElement {
        let div_rep = document.createElement("div");
        let div_inner = document.createElement("div");
        div_inner.classList.add("sledge-hammer-inner");
        div_rep.className = "flexChild sledge-hammer";
        div_rep.appendChild(div_inner);
        div_inner.appendChild(this.ent.render());
        // div_rep.style.flex = this.dim + " " + this.dim + " " +  "0px";
        return div_rep;
    };
}