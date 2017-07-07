import { LayoutRow } from "./layoutRow";
import { Entity } from "./entity";
import { LayoutColumn } from "./layoutColumn";
import { IEntityLayout } from "./interfaces/IEntityLayout";
export declare class EntityLayout {
    private availableEntities;
    rows: Array<LayoutRow>;
    private currentColumn;
    private popup;
    private popupSelectArea;
    private div;
    private div_container;
    private numberColumns;
    private copyAvailableEntities;
    constructor(numberColumns: number);
    openPopup(col: LayoutColumn): void;
    addEntities(ents: Array<Entity>): void;
    addRow(): LayoutRow;
    render(): string;
    serializer(): IEntityLayout;
    reset(): void;
    clear(): void;
    parser(object: IEntityLayout): void;
    getEntities(): Entity[];
    getNumberColumns(): number;
    assignEntity(id: string, col: LayoutColumn): void;
    getUI(): HTMLDivElement;
    get_entity(): Entity[];
}
