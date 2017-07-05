import {IEntity} from "./IEntity";

export class Entity implements IEntity {

    public id: string;
    

    constructor(id: string) {
        this.id = id;
    };

    render(): HTMLDivElement {
        return null;
    }
}