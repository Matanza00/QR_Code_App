import { ComplexBase } from '@syncfusion/ej2-react-base';
import { GridColumnModel } from '@syncfusion/ej2-grids';
export interface GridColumnDirTypecast {
    template?: string | Function | any;
    headerTemplate?: string | Function | any;
    commandsTemplate?: string | Function | any;
    filter?: any;
    editTemplate?: string | Function | any;
    filterTemplate?: string | Function | any;
}
/**
 * `ColumnDirective` represent a column of the react Grid.
 * It must be contained in a Grid component(`GridComponent`).
 * ```tsx
 * <GridComponent dataSource={data} allowPaging={true} allowSorting={true}>
 * <ColumnsDirective>
 * <ColumnDirective field='ID' width='100'></ColumnDirective>
 * <ColumnDirective field='name' headerText='Name' width='100'></ColumnDirective>
 * <ColumnsDirective>
 * </GridComponent>
 * ```
 */
export declare class ColumnDirective extends ComplexBase<GridColumnModel | GridColumnDirTypecast & {
    children?: React.ReactNode;
}, GridColumnModel | GridColumnDirTypecast> {
    static moduleName: string;
    static complexTemplate: Object;
}
export declare class ColumnsDirective extends ComplexBase<{}, {}> {
    static propertyName: string;
    static moduleName: string;
}
