import { columnsByPin, columnsTotalWidth } from './column';
/**
 * Calculates the Total Flex Grow
 */
export function getTotalFlexGrow(columns) {
    let totalFlexGrow = 0;
    for (const c of columns) {
        totalFlexGrow += c.flexGrow || 0;
    }
    return totalFlexGrow;
}
/**
 * Adjusts the column widths.
 * Inspired by: https://github.com/facebook/fixed-data-table/blob/master/src/FixedDataTableWidthHelper.js
 */
export function adjustColumnWidths(allColumns, expectedWidth) {
    const columnsWidth = columnsTotalWidth(allColumns);
    const totalFlexGrow = getTotalFlexGrow(allColumns);
    const colsByGroup = columnsByPin(allColumns);
    if (columnsWidth !== expectedWidth) {
        scaleColumns(colsByGroup, expectedWidth, totalFlexGrow);
    }
}
/**
 * Resizes columns based on the flexGrow property, while respecting manually set widths
 */
function scaleColumns(colsByGroup, maxWidth, totalFlexGrow) {
    // calculate total width and flexgrow points for coulumns that can be resized
    for (const attr in colsByGroup) {
        for (const column of colsByGroup[attr]) {
            if (!column.canAutoResize) {
                maxWidth -= column.width;
                totalFlexGrow -= column.flexGrow ? column.flexGrow : 0;
            }
            else {
                column.width = 0;
            }
        }
    }
    const hasMinWidth = {};
    let remainingWidth = maxWidth;
    // resize columns until no width is left to be distributed
    do {
        const widthPerFlexPoint = remainingWidth / totalFlexGrow;
        remainingWidth = 0;
        for (const attr in colsByGroup) {
            for (const column of colsByGroup[attr]) {
                // if the column can be resize and it hasn't reached its minimum width yet
                if (column.canAutoResize && !hasMinWidth[column.prop]) {
                    const newWidth = column.width + column.flexGrow * widthPerFlexPoint;
                    if (column.minWidth !== undefined && newWidth < column.minWidth) {
                        remainingWidth += newWidth - column.minWidth;
                        column.width = column.minWidth;
                        hasMinWidth[column.prop] = true;
                    }
                    else {
                        column.width = newWidth;
                    }
                }
            }
        }
    } while (remainingWidth !== 0);
}
/**
 * Forces the width of the columns to
 * distribute equally but overflowing when necessary
 *
 * Rules:
 *
 *  - If combined withs are less than the total width of the grid,
 *    proportion the widths given the min / max / normal widths to fill the width.
 *
 *  - If the combined widths, exceed the total width of the grid,
 *    use the standard widths.
 *
 *  - If a column is resized, it should always use that width
 *
 *  - The proportional widths should never fall below min size if specified.
 *
 *  - If the grid starts off small but then becomes greater than the size ( + / - )
 *    the width should use the original width; not the newly proportioned widths.
 */
export function forceFillColumnWidths(allColumns, expectedWidth, startIdx, allowBleed, defaultColWidth = 300) {
    const columnsToResize = allColumns.slice(startIdx + 1, allColumns.length).filter(c => {
        return c.canAutoResize !== false;
    });
    for (const column of columnsToResize) {
        if (!column.$$oldWidth) {
            column.$$oldWidth = column.width;
        }
    }
    let additionWidthPerColumn = 0;
    let exceedsWindow = false;
    let contentWidth = getContentWidth(allColumns, defaultColWidth);
    let remainingWidth = expectedWidth - contentWidth;
    const columnsProcessed = [];
    const remainingWidthLimit = 1; // when to stop
    // This loop takes care of the
    do {
        additionWidthPerColumn = remainingWidth / columnsToResize.length;
        exceedsWindow = contentWidth >= expectedWidth;
        for (const column of columnsToResize) {
            if (exceedsWindow && allowBleed) {
                column.width = column.$$oldWidth || column.width || defaultColWidth;
            }
            else {
                const newSize = (column.width || defaultColWidth) + additionWidthPerColumn;
                if (column.minWidth && newSize < column.minWidth) {
                    column.width = column.minWidth;
                    columnsProcessed.push(column);
                }
                else if (column.maxWidth && newSize > column.maxWidth) {
                    column.width = column.maxWidth;
                    columnsProcessed.push(column);
                }
                else {
                    column.width = newSize;
                }
            }
            column.width = Math.max(0, column.width);
        }
        contentWidth = getContentWidth(allColumns);
        remainingWidth = expectedWidth - contentWidth;
        removeProcessedColumns(columnsToResize, columnsProcessed);
    } while (remainingWidth > remainingWidthLimit && columnsToResize.length !== 0);
}
/**
 * Remove the processed columns from the current active columns.
 */
function removeProcessedColumns(columnsToResize, columnsProcessed) {
    for (const column of columnsProcessed) {
        const index = columnsToResize.indexOf(column);
        columnsToResize.splice(index, 1);
    }
}
/**
 * Gets the width of the columns
 */
function getContentWidth(allColumns, defaultColWidth = 300) {
    let contentWidth = 0;
    for (const column of allColumns) {
        contentWidth += column.width || defaultColWidth;
    }
    return contentWidth;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWF0aC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL3N3aW1sYW5lL25neC1kYXRhdGFibGUvc3JjL2xpYi91dGlscy9tYXRoLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxZQUFZLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxVQUFVLENBQUM7QUFFM0Q7O0dBRUc7QUFDSCxNQUFNLFVBQVUsZ0JBQWdCLENBQUMsT0FBYztJQUM3QyxJQUFJLGFBQWEsR0FBRyxDQUFDLENBQUM7SUFFdEIsS0FBSyxNQUFNLENBQUMsSUFBSSxPQUFPLEVBQUU7UUFDdkIsYUFBYSxJQUFJLENBQUMsQ0FBQyxRQUFRLElBQUksQ0FBQyxDQUFDO0tBQ2xDO0lBRUQsT0FBTyxhQUFhLENBQUM7QUFDdkIsQ0FBQztBQUVEOzs7R0FHRztBQUNILE1BQU0sVUFBVSxrQkFBa0IsQ0FBQyxVQUFlLEVBQUUsYUFBa0I7SUFDcEUsTUFBTSxZQUFZLEdBQUcsaUJBQWlCLENBQUMsVUFBVSxDQUFDLENBQUM7SUFDbkQsTUFBTSxhQUFhLEdBQUcsZ0JBQWdCLENBQUMsVUFBVSxDQUFDLENBQUM7SUFDbkQsTUFBTSxXQUFXLEdBQUcsWUFBWSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBRTdDLElBQUksWUFBWSxLQUFLLGFBQWEsRUFBRTtRQUNsQyxZQUFZLENBQUMsV0FBVyxFQUFFLGFBQWEsRUFBRSxhQUFhLENBQUMsQ0FBQztLQUN6RDtBQUNILENBQUM7QUFFRDs7R0FFRztBQUNILFNBQVMsWUFBWSxDQUFDLFdBQWdCLEVBQUUsUUFBYSxFQUFFLGFBQWtCO0lBQ3ZFLDZFQUE2RTtJQUM3RSxLQUFLLE1BQU0sSUFBSSxJQUFJLFdBQVcsRUFBRTtRQUM5QixLQUFLLE1BQU0sTUFBTSxJQUFJLFdBQVcsQ0FBQyxJQUFJLENBQUMsRUFBRTtZQUN0QyxJQUFJLENBQUMsTUFBTSxDQUFDLGFBQWEsRUFBRTtnQkFDekIsUUFB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OUMsZUFBZSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUM7S0FDbEM7QUFDSCxDQUFDO0FBRUQ7O0dBRUc7QUFDSCxTQUFTLGVBQWUsQ0FBQyxVQUFlLEVBQUUsa0JBQTBCLEdBQUc7SUFDckUsSUFBSSxZQUFZLEdBQUcsQ0FBQyxDQUFDO0lBRXJCLEtBQUssTUFBTSxNQUFNLElBQUksVUFBVSxFQUFFO1FBQy9CLFlBQVksSUFBSSxNQUFNLENBQUMsS0FBSyxJQUFJLGVBQWUsQ0FBQztLQUNqRDtJQUVELE9BQU8sWUFBWSxDQUFDO0FBQ3RCLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBjb2x1bW5zQnlQaW4sIGNvbHVtbnNUb3RhbFdpZHRoIH0gZnJvbSAnLi9jb2x1bW4nO1xyXG5cclxuLyoqXHJcbiAqIENhbGN1bGF0ZXMgdGhlIFRvdGFsIEZsZXggR3Jvd1xyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGdldFRvdGFsRmxleEdyb3coY29sdW1uczogYW55W10pIHtcclxuICBsZXQgdG90YWxGbGV4R3JvdyA9IDA7XHJcblxyXG4gIGZvciAoY29uc3QgYyBvZiBjb2x1bW5zKSB7XHJcbiAgICB0b3RhbEZsZXhHcm93ICs9IGMuZmxleEdyb3cgfHwgMDtcclxuICB9XHJcblxyXG4gIHJldHVybiB0b3RhbEZsZXhHcm93O1xyXG59XHJcblxyXG4vKipcclxuICogQWRqdXN0cyB0aGUgY29sdW1uIHdpZHRocy5cclxuICogSW5zcGlyZWQgYnk6IGh0dHBzOi8vZ2l0aHViLmNvbS9mYWNlYm9vay9maXhlZC1kYXRhLXRhYmxlL2Jsb2IvbWFzdGVyL3NyYy9GaXhlZERhdGFUYWJsZVdpZHRoSGVscGVyLmpzXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gYWRqdXN0Q29sdW1uV2lkdGhzKGFsbENvbHVtbnM6IGFueSwgZXhwZWN0ZWRXaWR0aDogYW55KSB7XHJcbiAgY29uc3QgY29sdW1uc1dpZHRoID0gY29sdW1uc1RvdGFsV2lkdGgoYWxsQ29sdW1ucyk7XHJcbiAgY29uc3QgdG90YWxGbGV4R3JvdyA9IGdldFRvdGFsRmxleEdyb3coYWxsQ29sdW1ucyk7XHJcbiAgY29uc3QgY29sc0J5R3JvdXAgPSBjb2x1bW5zQnlQaW4oYWxsQ29sdW1ucyk7XHJcblxyXG4gIGlmIChjb2x1bW5zV2lkdGggIT09IGV4cGVjdGVkV2lkdGgpIHtcclxuICAgIHNjYWxlQ29sdW1ucyhjb2xzQnlHcm91cCwgZXhwZWN0ZWRXaWR0aCwgdG90YWxGbGV4R3Jvdyk7XHJcbiAgfVxyXG59XHJcblxyXG4vKipcclxuICogUmVzaXplcyBjb2x1bW5zIGJhc2VkIG9uIHRoZSBmbGV4R3JvdyBwcm9wZXJ0eSwgd2hpbGUgcmVzcGVjdGluZyBtYW51YWxseSBzZXQgd2lkdGhzXHJcbiAqL1xyXG5mdW5jdGlvbiBzY2FsZUNvbHVtbnMoY29sc0J5R3JvdXA6IGFueSwgbWF4V2lkdGg6IGFueSwgdG90YWxGbGV4R3JvdzogYW55KSB7XHJcbiAgLy8gY2FsY3VsYXRlIHRvdGFsIHdpZHRoIGFuZCBmbGV4Z3JvdyBwb2ludHMgZm9yIGNvdWx1bW5zIHRoYXQgY2FuIGJlIHJlc2l6ZWRcclxuICBmb3IgKGNvbnN0IGF0dHIgaW4gY29sc0J5R3JvdXApIHtcclxuICAgIGZvciAoY29uc3QgY29sdW1uIG9mIGNvbHNCeUdyb3VwW2F0dHJdKSB7XHJcbiAgICAgIGlmICghY29sdW1uLmNhbkF1dG9SZXNpemUpIHtcclxuICAgICAgICBtYXhXaWR0aCAtPSBjb2x1bW4ud2lkdGg7XHJcbiAgICAgICAgdG90YWxGbGV4R3JvdyAtPSBjb2x1bW4uZmxleEdyb3cgPyBjb2x1bW4uZmxleEdyb3cgOiAwO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGNvbHVtbi53aWR0aCA9IDA7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIGNvbnN0IGhhc01pbldpZHRoID0ge307XHJcbiAgbGV0IHJlbWFpbmluZ1dpZHRoID0gbWF4V2lkdGg7XHJcblxyXG4gIC8vIHJlc2l6ZSBjb2x1bW5zIHVudGlsIG5vIHdpZHRoIGlzIGxlZnQgdG8gYmUgZGlzdHJpYnV0ZWRcclxuICBkbyB7XHJcbiAgICBjb25zdCB3aWR0aFBlckZsZXhQb2ludCA9IHJlbWFpbmluZ1dpZHRoIC8gdG90YWxGbGV4R3JvdztcclxuICAgIHJlbWFpbmluZ1dpZHRoID0gMDtcclxuXHJcbiAgICBmb3IgKGNvbnN0IGF0dHIgaW4gY29sc0J5R3JvdXApIHtcclxuICAgICAgZm9yIChjb25zdCBjb2x1bW4gb2YgY29sc0J5R3JvdXBbYXR0cl0pIHtcclxuICAgICAgICAvLyBpZiB0aGUgY29sdW1uIGNhbiBiZSByZXNpemUgYW5kIGl0IGhhc24ndCByZWFjaGVkIGl0cyBtaW5pbXVtIHdpZHRoIHlldFxyXG4gICAgICAgIGlmIChjb2x1bW4uY2FuQXV0b1Jlc2l6ZSAmJiAhaGFzTWluV2lkdGhbY29sdW1uLnByb3BdKSB7XHJcbiAgICAgICAgICBjb25zdCBuZXdXaWR0aCA9IGNvbHVtbi53aWR0aCArIGNvbHVtbi5mbGV4R3JvdyAqIHdpZHRoUGVyRmxleFBvaW50O1xyXG4gICAgICAgICAgaWYgKGNvbHVtbi5taW5XaWR0aCAhPT0gdW5kZWZpbmVkICYmIG5ld1dpZHRoIDwgY29sdW1uLm1pbldpZHRoKSB7XHJcbiAgICAgICAgICAgIHJlbWFpbmluZ1dpZHRoICs9IG5ld1dpZHRoIC0gY29sdW1uLm1pbldpZHRoO1xyXG4gICAgICAgICAgICBjb2x1bW4ud2lkdGggPSBjb2x1bW4ubWluV2lkdGg7XHJcbiAgICAgICAgICAgIGhhc01pbldpZHRoW2NvbHVtbi5wcm9wXSA9IHRydWU7XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBjb2x1bW4ud2lkdGggPSBuZXdXaWR0aDtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9IHdoaWxlIChyZW1haW5pbmdXaWR0aCAhPT0gMCk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBGb3JjZXMgdGhlIHdpZHRoIG9mIHRoZSBjb2x1bW5zIHRvXHJcbiAqIGRpc3RyaWJ1dGUgZXF1YWxseSBidXQgb3ZlcmZsb3dpbmcgd2hlbiBuZWNlc3NhcnlcclxuICpcclxuICogUnVsZXM6XHJcbiAqXHJcbiAqICAtIElmIGNvbWJpbmVkIHdpdGhzIGFyZSBsZXNzIHRoYW4gdGhlIHRvdGFsIHdpZHRoIG9mIHRoZSBncmlkLFxyXG4gKiAgICBwcm9wb3J0aW9uIHRoZSB3aWR0aHMgZ2l2ZW4gdGhlIG1pbiAvIG1heCAvIG5vcm1hbCB3aWR0aHMgdG8gZmlsbCB0aGUgd2lkdGguXHJcbiAqXHJcbiAqICAtIElmIHRoZSBjb21iaW5lZCB3aWR0aHMsIGV4Y2VlZCB0aGUgdG90YWwgd2lkdGggb2YgdGhlIGdyaWQsXHJcbiAqICAgIHVzZSB0aGUgc3RhbmRhcmQgd2lkdGhzLlxyXG4gKlxyXG4gKiAgLSBJZiBhIGNvbHVtbiBpcyByZXNpemVkLCBpdCBzaG91bGQgYWx3YXlzIHVzZSB0aGF0IHdpZHRoXHJcbiAqXHJcbiAqICAtIFRoZSBwcm9wb3J0aW9uYWwgd2lkdGhzIHNob3VsZCBuZXZlciBmYWxsIGJlbG93IG1pbiBzaXplIGlmIHNwZWNpZmllZC5cclxuICpcclxuICogIC0gSWYgdGhlIGdyaWQgc3RhcnRzIG9mZiBzbWFsbCBidXQgdGhlbiBiZWNvbWVzIGdyZWF0ZXIgdGhhbiB0aGUgc2l6ZSAoICsgLyAtIClcclxuICogICAgdGhlIHdpZHRoIHNob3VsZCB1c2UgdGhlIG9yaWdpbmFsIHdpZHRoOyBub3QgdGhlIG5ld2x5IHByb3BvcnRpb25lZCB3aWR0aHMuXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gZm9yY2VGaWxsQ29sdW1uV2lkdGhzKFxyXG4gIGFsbENvbHVtbnM6IGFueVtdLFxyXG4gIGV4cGVjdGVkV2lkdGg6IG51bWJlcixcclxuICBzdGFydElkeDogbnVtYmVyLFxyXG4gIGFsbG93QmxlZWQ6IGJvb2xlYW4sXHJcbiAgZGVmYXVsdENvbFdpZHRoOiBudW1iZXIgPSAzMDBcclxuKSB7XHJcbiAgY29uc3QgY29sdW1uc1RvUmVzaXplID0gYWxsQ29sdW1ucy5zbGljZShzdGFydElkeCArIDEsIGFsbENvbHVtbnMubGVuZ3RoKS5maWx0ZXIoYyA9PiB7XHJcbiAgICByZXR1cm4gYy5jYW5BdXRvUmVzaXplICE9PSBmYWxzZTtcclxuICB9KTtcclxuXHJcbiAgZm9yIChjb25zdCBjb2x1bW4gb2YgY29sdW1uc1RvUmVzaXplKSB7XHJcbiAgICBpZiAoIWNvbHVtbi4kJG9sZFdpZHRoKSB7XHJcbiAgICAgIGNvbHVtbi4kJG9sZFdpZHRoID0gY29sdW1uLndpZHRoO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgbGV0IGFkZGl0aW9uV2lkdGhQZXJDb2x1bW4gPSAwO1xyXG4gIGxldCBleGNlZWRzV2luZG93ID0gZmFsc2U7XHJcbiAgbGV0IGNvbnRlbnRXaWR0aCA9IGdldENvbnRlbnRXaWR0aChhbGxDb2x1bW5zLCBkZWZhdWx0Q29sV2lkdGgpO1xyXG4gIGxldCByZW1haW5pbmdXaWR0aCA9IGV4cGVjdGVkV2lkdGggLSBjb250ZW50V2lkdGg7XHJcbiAgY29uc3QgY29sdW1uc1Byb2Nlc3NlZDogYW55W10gPSBbXTtcclxuICBjb25zdCByZW1haW5pbmdXaWR0aExpbWl0ID0gMTsgLy8gd2hlbiB0byBzdG9wXHJcblxyXG4gIC8vIFRoaXMgbG9vcCB0YWtlcyBjYXJlIG9mIHRoZVxyXG4gIGRvIHtcclxuICAgIGFkZGl0aW9uV2lkdGhQZXJDb2x1bW4gPSByZW1haW5pbmdXaWR0aCAvIGNvbHVtbnNUb1Jlc2l6ZS5sZW5ndGg7XHJcbiAgICBleGNlZWRzV2luZG93ID0gY29udGVudFdpZHRoID49IGV4cGVjdGVkV2lkdGg7XHJcblxyXG4gICAgZm9yIChjb25zdCBjb2x1bW4gb2YgY29sdW1uc1RvUmVzaXplKSB7XHJcbiAgICAgIGlmIChleGNlZWRzV2luZG93ICYmIGFsbG93QmxlZWQpIHtcclxuICAgICAgICBjb2x1bW4ud2lkdGggPSBjb2x1bW4uJCRvbGRXaWR0aCB8fCBjb2x1bW4ud2lkdGggfHwgZGVmYXVsdENvbFdpZHRoO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGNvbnN0IG5ld1NpemUgPSAoY29sdW1uLndpZHRoIHx8IGRlZmF1bHRDb2xXaWR0aCkgKyBhZGRpdGlvbldpZHRoUGVyQ29sdW1uO1xyXG5cclxuICAgICAgICBpZiAoY29sdW1uLm1pbldpZHRoICYmIG5ld1NpemUgPCBjb2x1bW4ubWluV2lkdGgpIHtcclxuICAgICAgICAgIGNvbHVtbi53aWR0aCA9IGNvbHVtbi5taW5XaWR0aDtcclxuICAgICAgICAgIGNvbHVtbnNQcm9jZXNzZWQucHVzaChjb2x1bW4pO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoY29sdW1uLm1heFdpZHRoICYmIG5ld1NpemUgPiBjb2x1bW4ubWF4V2lkdGgpIHtcclxuICAgICAgICAgIGNvbHVtbi53aWR0aCA9IGNvbHVtbi5tYXhXaWR0aDtcclxuICAgICAgICAgIGNvbHVtbnNQcm9jZXNzZWQucHVzaChjb2x1bW4pO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBjb2x1bW4ud2lkdGggPSBuZXdTaXplO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG5cclxuICAgICAgY29sdW1uLndpZHRoID0gTWF0aC5tYXgoMCwgY29sdW1uLndpZHRoKTtcclxuICAgIH1cclxuXHJcbiAgICBjb250ZW50V2lkdGggPSBnZXRDb250ZW50V2lkdGgoYWxsQ29sdW1ucyk7XHJcbiAgICByZW1haW5pbmdXaWR0aCA9IGV4cGVjdGVkV2lkdGggLSBjb250ZW50V2lkdGg7XHJcbiAgICByZW1vdmVQcm9jZXNzZWRDb2x1bW5zKGNvbHVtbnNUb1Jlc2l6ZSwgY29sdW1uc1Byb2Nlc3NlZCk7XHJcbiAgfSB3aGlsZSAocmVtYWluaW5nV2lkdGggPiByZW1haW5pbmdXaWR0aExpbWl0ICYmIGNvbHVtbnNUb1Jlc2l6ZS5sZW5ndGggIT09IDApO1xyXG59XHJcblxyXG4vKipcclxuICogUmVtb3ZlIHRoZSBwcm9jZXNzZWQgY29sdW1ucyBmcm9tIHRoZSBjdXJyZW50IGFjdGl2ZSBjb2x1bW5zLlxyXG4gKi9cclxuZnVuY3Rpb24gcmVtb3ZlUHJvY2Vzc2VkQ29sdW1ucyhjb2x1bW5zVG9SZXNpemU6IGFueVtdLCBjb2x1bW5zUHJvY2Vzc2VkOiBhbnlbXSkge1xyXG4gIGZvciAoY29uc3QgY29sdW1uIG9mIGNvbHVtbnNQcm9jZXNzZWQpIHtcclxuICAgIGNvbnN0IGluZGV4ID0gY29sdW1uc1RvUmVzaXplLmluZGV4T2YoY29sdW1uKTtcclxuICAgIGNvbHVtbnNUb1Jlc2l6ZS5zcGxpY2UoaW5kZXgsIDEpO1xyXG4gIH1cclxufVxyXG5cclxuLyoqXHJcbiAqIEdldHMgdGhlIHdpZHRoIG9mIHRoZSBjb2x1bW5zXHJcbiAqL1xyXG5mdW5jdGlvbiBnZXRDb250ZW50V2lkdGgoYWxsQ29sdW1uczogYW55LCBkZWZhdWx0Q29sV2lkdGg6IG51bWJlciA9IDMwMCk6IG51bWJlciB7XHJcbiAgbGV0IGNvbnRlbnRXaWR0aCA9IDA7XHJcblxyXG4gIGZvciAoY29uc3QgY29sdW1uIG9mIGFsbENvbHVtbnMpIHtcclxuICAgIGNvbnRlbnRXaWR0aCArPSBjb2x1bW4ud2lkdGggfHwgZGVmYXVsdENvbFdpZHRoO1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIGNvbnRlbnRXaWR0aDtcclxufVxyXG4iXX0=