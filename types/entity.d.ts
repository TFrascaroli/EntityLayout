import { IEntity } from "./interfaces/IEntity";
export declare class Entity implements IEntity {
    id: string;
    constructor(id: string);
    render(): HTMLDivElement;
}
