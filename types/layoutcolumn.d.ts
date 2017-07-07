import { EntityLayout } from "./entitylayout";
import { Entity } from "./entity";
import { ILayoutColumn } from "./interfaces/ILayoutColumn";
import { LayoutRow } from "./layoutrow";
export declare class LayoutColumn {
    div: HTMLDivElement;
    private ent;
    private el;
    private dim;
    private div_content;
    private row;
    constructor(el: EntityLayout, row: LayoutRow);
    destroy(): void;
    getEntity(): Entity;
    deleteEntity(): void;
    setEntity(ent: Entity): void;
    render(): HTMLDivElement;
    serializer(): ILayoutColumn;
    clear(): void;
    setDim(dim: number): void;
    parser(object: ILayoutColumn): void;
}
