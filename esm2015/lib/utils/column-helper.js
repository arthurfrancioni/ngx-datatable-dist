import { camelCase, deCamelCase } from './camel-case';
import { id } from './id';
import { getterForProp } from './column-prop-getters';
/**
 * Sets the column defaults
 */
export function setColumnDefaults(columns) {
    if (!columns)
        return;
    // Only one column should hold the tree view
    // Thus if multiple columns are provided with
    // isTreeColumn as true we take only the first one
    let treeColumnFound = false;
    for (const column of columns) {
        if (!column.$$id) {
            column.$$id = id();
        }
        // prop can be numeric; zero is valid not a missing prop
        // translate name => prop
        if (isNullOrUndefined(column.prop) && column.name) {
            column.prop = camelCase(column.name);
        }
        if (!column.$$valueGetter) {
            column.$$valueGetter = getterForProp(column.prop);
        }
        // format props if no name passed
        if (!isNullOrUndefined(column.prop) && isNullOrUndefined(column.name)) {
            column.name = deCamelCase(String(column.prop));
        }
        if (isNullOrUndefined(column.prop) && isNullOrUndefined(column.name)) {
            column.name = ''; // Fixes IE and Edge displaying `null`
        }
        if (!column.hasOwnProperty('resizeable')) {
            column.resizeable = true;
        }
        if (!column.hasOwnProperty('sortable')) {
            column.sortable = true;
        }
        if (!column.hasOwnProperty('draggable')) {
            column.draggable = true;
        }
        if (!column.hasOwnProperty('canAutoResize')) {
            column.canAutoResize = true;
        }
        if (!column.hasOwnProperty('width')) {
            column.width = 150;
        }
        if (!column.hasOwnProperty('isTreeColumn')) {
            column.isTreeColumn = false;
        }
        else {
            if (column.isTreeColumn && !treeColumnFound) {
                // If the first column with isTreeColumn is true found
                // we mark that treeCoulmn is found
                treeColumnFound = true;
            }
            else {
                // After that isTreeColumn property for any other column
                // will be set as false
                column.isTreeColumn = false;
            }
        }
    }
}
export function isNullOrUndefined(value) {
    return value === null || value === undefined;
}
/**
 * Translates templates definitions to objects
 */
export function translateTemplates(templates) {
    const result = [];
    for (const temp of templates) {
        const col = {};
        const props = Object.getOwnPropertyNames(temp);
        for (const prop of props) {
            col[prop] = temp[prop];
        }
        if (temp.headerTemplate) {
            col.headerTemplate = temp.headerTemplate;
        }
        if (temp.cellTemplate) {
            col.cellTemplate = temp.cellTemplate;
        }
        if (temp.summaryFunc) {
            col.summaryFunc = temp.summaryFunc;
        }
        if (temp.summaryTemplate) {
            col.summaryTemplate = temp.summaryTemplate;
        }
        result.push(col);
    }
    return result;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29sdW1uLWhlbHBlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL3N3aW1sYW5lL25neC1kYXRhdGFibGUvc3JjL2xpYi91dGlscy9jb2x1bW4taGVscGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsV0FBVyxFQUFFLE1BQU0sY0FBYyxDQUFDO0FBQ3RELE9BQU8sRUFBRSxFQUFFLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDMUIsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBSXREOztHQUVHO0FBQ0gsTUFBTSxVQUFVLGlCQUFpQixDQUFDLE9BQXNCO0lBQ3RELElBQUksQ0FBQyxPQUFPO1FBQUUsT0FBTztJQUVyQiw0Q0FBNEM7SUFDNUMsNkNBQTZDO0lBQzdDLGtEQUFrRDtJQUNsRCxJQUFJLGVBQWUsR0FBWSxLQUFLLENBQUM7SUFFckMsS0FBSyxNQUFNLE1BQU0sSUFBSSxPQUFPLEVBQUU7UUFDNUIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUU7WUFDaEIsTUFBTSxDQUFDLElBQUksR0FBRyxFQUFFLEVBQUUsQ0FBQztTQUNwQjtRQUVELHdEQUF3RDtRQUN4RCx5QkFBeUI7UUFDekIsSUFBSSxpQkFBaUIsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksTUFBTSxDQUFDLElBQUksRUFBRTtZQUNqRCxNQUFNLENBQUMsSUFBSSxHQUFHLFNBQVMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDdEM7UUFFRCxJQUFJLENBQUMsTUFBTSxDQUFDLGFBQWEsRUFBRTtZQUN6QixNQUFNLENBQUMsYUFBYSxHQUFHLGFBQWEsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDbkQ7UUFFRCxpQ0FBaUM7UUFDakMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxp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QztBQUNoQixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgY2FtZWxDYXNlLCBkZUNhbWVsQ2FzZSB9IGZyb20gJy4vY2FtZWwtY2FzZSc7XHJcbmltcG9ydCB7IGlkIH0gZnJvbSAnLi9pZCc7XHJcbmltcG9ydCB7IGdldHRlckZvclByb3AgfSBmcm9tICcuL2NvbHVtbi1wcm9wLWdldHRlcnMnO1xyXG5pbXBvcnQgeyBUYWJsZUNvbHVtbiB9IGZyb20gJy4uL3R5cGVzL3RhYmxlLWNvbHVtbi50eXBlJztcclxuaW1wb3J0IHsgRGF0YVRhYmxlQ29sdW1uRGlyZWN0aXZlIH0gZnJvbSAnLi4vY29tcG9uZW50cy9jb2x1bW5zL2NvbHVtbi5kaXJlY3RpdmUnO1xyXG5cclxuLyoqXHJcbiAqIFNldHMgdGhlIGNvbHVtbiBkZWZhdWx0c1xyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIHNldENvbHVtbkRlZmF1bHRzKGNvbHVtbnM6IFRhYmxlQ29sdW1uW10pIHtcclxuICBpZiAoIWNvbHVtbnMpIHJldHVybjtcclxuXHJcbiAgLy8gT25seSBvbmUgY29sdW1uIHNob3VsZCBob2xkIHRoZSB0cmVlIHZpZXdcclxuICAvLyBUaHVzIGlmIG11bHRpcGxlIGNvbHVtbnMgYXJlIHByb3ZpZGVkIHdpdGhcclxuICAvLyBpc1RyZWVDb2x1bW4gYXMgdHJ1ZSB3ZSB0YWtlIG9ubHkgdGhlIGZpcnN0IG9uZVxyXG4gIGxldCB0cmVlQ29sdW1uRm91bmQ6IGJvb2xlYW4gPSBmYWxzZTtcclxuXHJcbiAgZm9yIChjb25zdCBjb2x1bW4gb2YgY29sdW1ucykge1xyXG4gICAgaWYgKCFjb2x1bW4uJCRpZCkge1xyXG4gICAgICBjb2x1bW4uJCRpZCA9IGlkKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gcHJvcCBjYW4gYmUgbnVtZXJpYzsgemVybyBpcyB2YWxpZCBub3QgYSBtaXNzaW5nIHByb3BcclxuICAgIC8vIHRyYW5zbGF0ZSBuYW1lID0+IHByb3BcclxuICAgIGlmIChpc051bGxPclVuZGVmaW5lZChjb2x1bW4ucHJvcCkgJiYgY29sdW1uLm5hbWUpIHtcclxuICAgICAgY29sdW1uLnByb3AgPSBjYW1lbENhc2UoY29sdW1uLm5hbWUpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICghY29sdW1uLiQkdmFsdWVHZXR0ZXIpIHtcclxuICAgICAgY29sdW1uLiQkdmFsdWVHZXR0ZXIgPSBnZXR0ZXJGb3JQcm9wKGNvbHVtbi5wcm9wKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBmb3JtYXQgcHJvcHMgaWYgbm8gbmFtZSBwYXNzZWRcclxuICAgIGlmICghaXNOdWxsT3JVbmRlZmluZWQoY29sdW1uLnByb3ApICYmIGlzTnVsbE9yVW5kZWZpbmVkKGNvbHVtbi5uYW1lKSkge1xyXG4gICAgICBjb2x1bW4ubmFtZSA9IGRlQ2FtZWxDYXNlKFN0cmluZyhjb2x1bW4ucHJvcCkpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChpc051bGxPclVuZGVmaW5lZChjb2x1bW4ucHJvcCkgJiYgaXNOdWxsT3JVbmRlZmluZWQoY29sdW1uLm5hbWUpKSB7XHJcbiAgICAgIGNvbHVtbi5uYW1lID0gJyc7IC8vIEZpeGVzIElFIGFuZCBFZGdlIGRpc3BsYXlpbmcgYG51bGxgXHJcbiAgICB9XHJcblxyXG4gICAgaWYgKCFjb2x1bW4uaGFzT3duUHJvcGVydHkoJ3Jlc2l6ZWFibGUnKSkge1xyXG4gICAgICBjb2x1bW4ucmVzaXplYWJsZSA9IHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKCFjb2x1bW4uaGFzT3duUHJvcGVydHkoJ3NvcnRhYmxlJykpIHtcclxuICAgICAgY29sdW1uLnNvcnRhYmxlID0gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoIWNvbHVtbi5oYXNPd25Qcm9wZXJ0eSgnZHJhZ2dhYmxlJykpIHtcclxuICAgICAgY29sdW1uLmRyYWdnYWJsZSA9IHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKCFjb2x1bW4uaGFzT3duUHJvcGVydHkoJ2NhbkF1dG9SZXNpemUnKSkge1xyXG4gICAgICBjb2x1bW4uY2FuQXV0b1Jlc2l6ZSA9IHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKCFjb2x1bW4uaGFzT3duUHJvcGVydHkoJ3dpZHRoJykpIHtcclxuICAgICAgY29sdW1uLndpZHRoID0gMTUwO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICghY29sdW1uLmhhc093blByb3BlcnR5KCdpc1RyZWVDb2x1bW4nKSkge1xyXG4gICAgICBjb2x1bW4uaXNUcmVlQ29sdW1uID0gZmFsc2U7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBpZiAoY29sdW1uLmlzVHJlZUNvbHVtbiAmJiAhdHJlZUNvbHVtbkZvdW5kKSB7XHJcbiAgICAgICAgLy8gSWYgdGhlIGZpcnN0IGNvbHVtbiB3aXRoIGlzVHJlZUNvbHVtbiBpcyB0cnVlIGZvdW5kXHJcbiAgICAgICAgLy8gd2UgbWFyayB0aGF0IHRyZWVDb3VsbW4gaXMgZm91bmRcclxuICAgICAgICB0cmVlQ29sdW1uRm91bmQgPSB0cnVlO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIC8vIEFmdGVyIHRoYXQgaXNUcmVlQ29sdW1uIHByb3BlcnR5IGZvciBhbnkgb3RoZXIgY29sdW1uXHJcbiAgICAgICAgLy8gd2lsbCBiZSBzZXQgYXMgZmFsc2VcclxuICAgICAgICBjb2x1bW4uaXNUcmVlQ29sdW1uID0gZmFsc2U7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBpc051bGxPclVuZGVmaW5lZDxUPih2YWx1ZTogVCB8IG51bGwgfCB1bmRlZmluZWQpOiB2YWx1ZSBpcyBudWxsIHwgdW5kZWZpbmVkIHtcclxuICByZXR1cm4gdmFsdWUgPT09IG51bGwgfHwgdmFsdWUgPT09IHVuZGVmaW5lZDtcclxufVxyXG5cclxuLyoqXHJcbiAqIFRyYW5zbGF0ZXMgdGVtcGxhdGVzIGRlZmluaXRpb25zIHRvIG9iamVjdHNcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiB0cmFuc2xhdGVUZW1wbGF0ZXModGVtcGxhdGVzOiBEYXRhVGFibGVDb2x1bW5EaXJlY3RpdmVbXSk6IGFueVtdIHtcclxuICBjb25zdCByZXN1bHQ6IGFueVtdID0gW107XHJcbiAgZm9yIChjb25zdCB0ZW1wIG9mIHRlbXBsYXRlcykge1xyXG4gICAgY29uc3QgY29sOiBhbnkgPSB7fTtcclxuXHJcbiAgICBjb25zdCBwcm9wcyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKHRlbXApO1xyXG4gICAgZm9yIChjb25zdCBwcm9wIG9mIHByb3BzKSB7XHJcbiAgICAgIGNvbFtwcm9wXSA9IHRlbXBbcHJvcF07XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHRlbXAuaGVhZGVyVGVtcGxhdGUpIHtcclxuICAgICAgY29sLmhlYWRlclRlbXBsYXRlID0gdGVtcC5oZWFkZXJUZW1wbGF0ZTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAodGVtcC5jZWxsVGVtcGxhdGUpIHtcclxuICAgICAgY29sLmNlbGxUZW1wbGF0ZSA9IHRlbXAuY2VsbFRlbXBsYXRlO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICh0ZW1wLnN1bW1hcnlGdW5jKSB7XHJcbiAgICAgIGNvbC5zdW1tYXJ5RnVuYyA9IHRlbXAuc3VtbWFyeUZ1bmM7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHRlbXAuc3VtbWFyeVRlbXBsYXRlKSB7XHJcbiAgICAgIGNvbC5zdW1tYXJ5VGVtcGxhdGUgPSB0ZW1wLnN1bW1hcnlUZW1wbGF0ZTtcclxuICAgIH1cclxuXHJcbiAgICByZXN1bHQucHVzaChjb2wpO1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIHJlc3VsdDtcclxufVxyXG4iXX0=