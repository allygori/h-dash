import { GetTableOfContentIndexFunction, GetTableOfContentLevelFunction, TableOfContentDataItem } from './types';
export declare const getLastHeadingOnLevel: (headings: TableOfContentDataItem[], level: number) => TableOfContentDataItem | undefined;
export declare const getHeadlineLevel: GetTableOfContentLevelFunction;
export declare const getLinearIndexes: GetTableOfContentIndexFunction;
export declare const getHierarchicalIndexes: GetTableOfContentIndexFunction;
