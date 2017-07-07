import { LayoutColumn } from "./layoutColumn";
import { EntityLayout } from "./entityLayout";
import { ILayoutRow } from "./interfaces/ILayoutRow";
export declare class LayoutRow {
    columns: Array<LayoutColumn>;
    div: HTMLDivElement;
    private el;
    constructor(el: EntityLayout);
    getColumn(): LayoutColumn[];
    addColumn(): LayoutColumn;
    destroy(): void;
    render(): HTMLDivElement;
    clear(): void;
    serializer(): ILayoutRow;
    parser(object: ILayoutRow): void;
}
