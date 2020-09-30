import { getterForProp } from './column-prop-getters';
import { SortType } from '../types/sort.type';
import { SortDirection } from '../types/sort-direction.type';
/**
 * Gets the next sort direction
 */
export function nextSortDir(sortType, current) {
    if (sortType === SortType.single) {
        if (current === SortDirection.asc) {
            return SortDirection.desc;
        }
        else {
            return SortDirection.asc;
        }
    }
    else {
        if (!current) {
            return SortDirection.asc;
        }
        else if (current === SortDirection.asc) {
            return SortDirection.desc;
        }
        else if (current === SortDirection.desc) {
            return undefined;
        }
        // avoid TS7030: Not all code paths return a value.
        return undefined;
    }
}
/**
 * Adapted from fueld-ui on 6/216
 * https://github.com/FuelInteractive/fuel-ui/tree/master/src/pipes/OrderBy
 */
export function orderByComparator(a, b) {
    if (a === null || typeof a === 'undefined')
        a = 0;
    if (b === null || typeof b === 'undefined')
        b = 0;
    if (a instanceof Date && b instanceof Date) {
        if (a < b)
            return -1;
        if (a > b)
            return 1;
    }
    else if (isNaN(parseFloat(a)) || !isFinite(a) || isNaN(parseFloat(b)) || !isFinite(b)) {
        // Convert to string in case of a=0 or b=0
        a = String(a);
        b = String(b);
        // Isn't a number so lowercase the string to properly compare
        if (a.toLowerCase() < b.toLowerCase())
            return -1;
        if (a.toLowerCase() > b.toLowerCase())
            return 1;
    }
    else {
        // Parse strings as numbers to compare properly
        if (parseFloat(a) < parseFloat(b))
            return -1;
        if (parseFloat(a) > parseFloat(b))
            return 1;
    }
    // equal each other
    return 0;
}
/**
 * creates a shallow copy of the `rows` input and returns the sorted copy. this function
 * does not sort the `rows` argument in place
 */
export function sortRows(rows, columns, dirs) {
    if (!rows)
        return [];
    if (!dirs || !dirs.length || !columns)
        return [...rows];
    /**
     * record the row ordering of results from prior sort operations (if applicable)
     * this is necessary to guarantee stable sorting behavior
     */
    const rowToIndexMap = new Map();
    rows.forEach((row, index) => rowToIndexMap.set(row, index));
    const temp = [...rows];
    const cols = columns.reduce((obj, col) => {
        if (col.comparator && typeof col.comparator === 'function') {
            obj[col.prop] = col.comparator;
        }
        return obj;
    }, {});
    // cache valueGetter and compareFn so that they
    // do not need to be looked-up in the sort function body
    const cachedDirs = dirs.map(dir => {
        const prop = dir.prop;
        return {
            prop,
            dir: dir.dir,
            valueGetter: getterForProp(prop),
            compareFn: cols[prop] || orderByComparator
        };
    });
    return temp.sort(function (rowA, rowB) {
        for (const cachedDir of cachedDirs) {
            // Get property and valuegetters for column to be sorted
            const { prop, valueGetter } = cachedDir;
            // Get A and B cell values from rows based on properties of the columns
            const propA = valueGetter(rowA, prop);
            const propB = valueGetter(rowB, prop);
            // Compare function gets five parameters:
            // Two cell values to be compared as propA and propB
            // Two rows corresponding to the cells as rowA and rowB
            // Direction of the sort for this column as SortDirection
            // Compare can be a standard JS comparison function (a,b) => -1|0|1
            // as additional parameters are silently ignored. The whole row and sort
            // direction enable more complex sort logic.
            const comparison = cachedDir.dir !== SortDirection.desc
                ? cachedDir.compareFn(propA, propB, rowA, rowB, cachedDir.dir)
                : -cachedDir.compareFn(propA, propB, rowA, rowB, cachedDir.dir);
            // Don't return 0 yet in case of needing to sort by next property
            if (comparison !== 0)
                return comparison;
        }
        if (!(rowToIndexMap.has(rowA) && rowToIndexMap.has(rowB)))
            return 0;
        /**
         * all else being equal, preserve original order of the rows (stable sort)
         */
        return rowToIndexMap.get(rowA) < rowToIndexMap.get(rowB) ? -1 : 1;
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic29ydC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL3N3aW1sYW5lL25neC1kYXRhdGFibGUvc3JjL2xpYi91dGlscy9zb3J0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUN0RCxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDOUMsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBRTdEOztHQUVHO0FBQ0gsTUFBTSxVQUFVLFdBQVcsQ0FBQyxRQUFrQixFQUFFLE9BQXNCO0lBQ3BFLElBQUksUUFBUSxLQUFLLFFBQVEsQ0FBQyxNQUFNLEVBQUU7UUFDaEMsSUFBSSxPQUFPLEtBQUssYUFBYSxDQUFDLEdBQUcsRUFBRTtZQUNqQyxPQUFPLGFBQWEsQ0FBQyxJQUFJLENBQUM7U0FDM0I7YUFBTTtZQUNMLE9BQU8sYUFBYSxDQUFDLEdBQUcsQ0FBQztTQUMxQjtLQUNGO1NBQU07UUFDTCxJQUFJLENBQUMsT0FBTyxFQUFFO1lBQ1osT0FBTyxhQUFhLENBQUMsR0FBRyxDQUFDO1NBQzFCO2FBQU0sSUFBSSxPQUFPLEtBQUssYUFBYSxDQUFDLEdBQUcsRUFBRTtZQUN4QyxPQUFPLGFBQWEsQ0FBQyxJQUFJLENBQUM7U0FDM0I7YUFBTSxJQUFJLE9BQU8sS0FBSyxhQUFhLENBQUMsSUFBSSxFQUFFO1lBQ3pDLE9BQU8sU0FBUyxDQUFDO1NBQ2xCO1FBQ0QsbURBQW1EO1FBQ25ELE9BQU8sU0FBUyxDQUFDO0tBQ2xCO0FBQ0gsQ0FBQztBQUVEOzs7R0FHRztBQUNILE1BQU0sVUFBVSxpQkFBaUIsQ0FBQyxDQUFNLEVBQUUsQ0FBTTtJQUM5QyxJQUFJLENBQUMsS0FBSyxJQUFJLElBQUksT0FBTyxDQUFDLEtBQUssV0FBVztRQUFFLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDbEQsSUFB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QUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNwRSxDQUFDLENBQUMsQ0FBQztBQUNMLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBnZXR0ZXJGb3JQcm9wIH0gZnJvbSAnLi9jb2x1bW4tcHJvcC1nZXR0ZXJzJztcclxuaW1wb3J0IHsgU29ydFR5cGUgfSBmcm9tICcuLi90eXBlcy9zb3J0LnR5cGUnO1xyXG5pbXBvcnQgeyBTb3J0RGlyZWN0aW9uIH0gZnJvbSAnLi4vdHlwZXMvc29ydC1kaXJlY3Rpb24udHlwZSc7XHJcbmltcG9ydCB7IFNvcnRQcm9wRGlyIH0gZnJvbSAnLi4vdHlwZXMvc29ydC1wcm9wLWRpci50eXBlJztcclxuLyoqXHJcbiAqIEdldHMgdGhlIG5leHQgc29ydCBkaXJlY3Rpb25cclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBuZXh0U29ydERpcihzb3J0VHlwZTogU29ydFR5cGUsIGN1cnJlbnQ6IFNvcnREaXJlY3Rpb24pOiBTb3J0RGlyZWN0aW9uIHwgdW5kZWZpbmVkIHtcclxuICBpZiAoc29ydFR5cGUgPT09IFNvcnRUeXBlLnNpbmdsZSkge1xyXG4gICAgaWYgKGN1cnJlbnQgPT09IFNvcnREaXJlY3Rpb24uYXNjKSB7XHJcbiAgICAgIHJldHVybiBTb3J0RGlyZWN0aW9uLmRlc2M7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICByZXR1cm4gU29ydERpcmVjdGlvbi5hc2M7XHJcbiAgICB9XHJcbiAgfSBlbHNlIHtcclxuICAgIGlmICghY3VycmVudCkge1xyXG4gICAgICByZXR1cm4gU29ydERpcmVjdGlvbi5hc2M7XHJcbiAgICB9IGVsc2UgaWYgKGN1cnJlbnQgPT09IFNvcnREaXJlY3Rpb24uYXNjKSB7XHJcbiAgICAgIHJldHVybiBTb3J0RGlyZWN0aW9uLmRlc2M7XHJcbiAgICB9IGVsc2UgaWYgKGN1cnJlbnQgPT09IFNvcnREaXJlY3Rpb24uZGVzYykge1xyXG4gICAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG4gICAgfVxyXG4gICAgLy8gYXZvaWQgVFM3MDMwOiBOb3QgYWxsIGNvZGUgcGF0aHMgcmV0dXJuIGEgdmFsdWUuXHJcbiAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG4gIH1cclxufVxyXG5cclxuLyoqXHJcbiAqIEFkYXB0ZWQgZnJvbSBmdWVsZC11aSBvbiA2LzIxNlxyXG4gKiBodHRwczovL2dpdGh1Yi5jb20vRnVlbEludGVyYWN0aXZlL2Z1ZWwtdWkvdHJlZS9tYXN0ZXIvc3JjL3BpcGVzL09yZGVyQnlcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBvcmRlckJ5Q29tcGFyYXRvcihhOiBhbnksIGI6IGFueSk6IG51bWJlciB7XHJcbiAgaWYgKGEgPT09IG51bGwgfHwgdHlwZW9mIGEgPT09ICd1bmRlZmluZWQnKSBhID0gMDtcclxuICBpZiAoYiA9PT0gbnVsbCB8fCB0eXBlb2YgYiA9PT0gJ3VuZGVmaW5lZCcpIGIgPSAwO1xyXG4gIGlmIChhIGluc3RhbmNlb2YgRGF0ZSAmJiBiIGluc3RhbmNlb2YgRGF0ZSkge1xyXG4gICAgaWYgKGEgPCBiKSByZXR1cm4gLTE7XHJcbiAgICBpZiAoYSA+IGIpIHJldHVybiAxO1xyXG4gIH0gZWxzZSBpZiAoaXNOYU4ocGFyc2VGbG9hdChhKSkgfHwgIWlzRmluaXRlKGEpIHx8IGlzTmFOKHBhcnNlRmxvYXQoYikpIHx8ICFpc0Zpbml0ZShiKSkge1xyXG4gICAgLy8gQ29udmVydCB0byBzdHJpbmcgaW4gY2FzZSBvZiBhPTAgb3IgYj0wXHJcbiAgICBhID0gU3RyaW5nKGEpO1xyXG4gICAgYiA9IFN0cmluZyhiKTtcclxuICAgIC8vIElzbid0IGEgbnVtYmVyIHNvIGxvd2VyY2FzZSB0aGUgc3RyaW5nIHRvIHByb3Blcmx5IGNvbXBhcmVcclxuICAgIGlmIChhLnRvTG93ZXJDYXNlKCkgPCBiLnRvTG93ZXJDYXNlKCkpIHJldHVybiAtMTtcclxuICAgIGlmIChhLnRvTG93ZXJDYXNlKCkgPiBiLnRvTG93ZXJDYXNlKCkpIHJldHVybiAxO1xyXG4gIH0gZWxzZSB7XHJcbiAgICAvLyBQYXJzZSBzdHJpbmdzIGFzIG51bWJlcnMgdG8gY29tcGFyZSBwcm9wZXJseVxyXG4gICAgaWYgKHBhcnNlRmxvYXQoYSkgPCBwYXJzZUZsb2F0KGIpKSByZXR1cm4gLTE7XHJcbiAgICBpZiAocGFyc2VGbG9hdChhKSA+IHBhcnNlRmxvYXQoYikpIHJldHVybiAxO1xyXG4gIH1cclxuXHJcbiAgLy8gZXF1YWwgZWFjaCBvdGhlclxyXG4gIHJldHVybiAwO1xyXG59XHJcblxyXG4vKipcclxuICogY3JlYXRlcyBhIHNoYWxsb3cgY29weSBvZiB0aGUgYHJvd3NgIGlucHV0IGFuZCByZXR1cm5zIHRoZSBzb3J0ZWQgY29weS4gdGhpcyBmdW5jdGlvblxyXG4gKiBkb2VzIG5vdCBzb3J0IHRoZSBgcm93c2AgYXJndW1lbnQgaW4gcGxhY2VcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBzb3J0Um93cyhyb3dzOiBhbnlbXSwgY29sdW1uczogYW55W10sIGRpcnM6IFNvcnRQcm9wRGlyW10pOiBhbnlbXSB7XHJcbiAgaWYgKCFyb3dzKSByZXR1cm4gW107XHJcbiAgaWYgKCFkaXJzIHx8ICFkaXJzLmxlbmd0aCB8fCAhY29sdW1ucykgcmV0dXJuIFsuLi5yb3dzXTtcclxuXHJcbiAgLyoqXHJcbiAgICogcmVjb3JkIHRoZSByb3cgb3JkZXJpbmcgb2YgcmVzdWx0cyBmcm9tIHByaW9yIHNvcnQgb3BlcmF0aW9ucyAoaWYgYXBwbGljYWJsZSlcclxuICAgKiB0aGlzIGlzIG5lY2Vzc2FyeSB0byBndWFyYW50ZWUgc3RhYmxlIHNvcnRpbmcgYmVoYXZpb3JcclxuICAgKi9cclxuICBjb25zdCByb3dUb0luZGV4TWFwID0gbmV3IE1hcDxhbnksIG51bWJlcj4oKTtcclxuICByb3dzLmZvckVhY2goKHJvdywgaW5kZXgpID0+IHJvd1RvSW5kZXhNYXAuc2V0KHJvdywgaW5kZXgpKTtcclxuXHJcbiAgY29uc3QgdGVtcCA9IFsuLi5yb3dzXTtcclxuICBjb25zdCBjb2xzID0gY29sdW1ucy5yZWR1Y2UoKG9iaiwgY29sKSA9PiB7XHJcbiAgICBpZiAoY29sLmNvbXBhcmF0b3IgJiYgdHlwZW9mIGNvbC5jb21wYXJhdG9yID09PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgIG9ialtjb2wucHJvcF0gPSBjb2wuY29tcGFyYXRvcjtcclxuICAgIH1cclxuICAgIHJldHVybiBvYmo7XHJcbiAgfSwge30pO1xyXG5cclxuICAvLyBjYWNoZSB2YWx1ZUdldHRlciBhbmQgY29tcGFyZUZuIHNvIHRoYXQgdGhleVxyXG4gIC8vIGRvIG5vdCBuZWVkIHRvIGJlIGxvb2tlZC11cCBpbiB0aGUgc29ydCBmdW5jdGlvbiBib2R5XHJcbiAgY29uc3QgY2FjaGVkRGlycyA9IGRpcnMubWFwKGRpciA9PiB7XHJcbiAgICBjb25zdCBwcm9wID0gZGlyLnByb3A7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBwcm9wLFxyXG4gICAgICBkaXI6IGRpci5kaXIsXHJcbiAgICAgIHZhbHVlR2V0dGVyOiBnZXR0ZXJGb3JQcm9wKHByb3ApLFxyXG4gICAgICBjb21wYXJlRm46IGNvbHNbcHJvcF0gfHwgb3JkZXJCeUNvbXBhcmF0b3JcclxuICAgIH07XHJcbiAgfSk7XHJcblxyXG4gIHJldHVybiB0ZW1wLnNvcnQoZnVuY3Rpb24gKHJvd0E6IGFueSwgcm93QjogYW55KSB7XHJcbiAgICBmb3IgKGNvbnN0IGNhY2hlZERpciBvZiBjYWNoZWREaXJzKSB7XHJcbiAgICAgIC8vIEdldCBwcm9wZXJ0eSBhbmQgdmFsdWVnZXR0ZXJzIGZvciBjb2x1bW4gdG8gYmUgc29ydGVkXHJcbiAgICAgIGNvbnN0IHsgcHJvcCwgdmFsdWVHZXR0ZXIgfSA9IGNhY2hlZERpcjtcclxuICAgICAgLy8gR2V0IEEgYW5kIEIgY2VsbCB2YWx1ZXMgZnJvbSByb3dzIGJhc2VkIG9uIHByb3BlcnRpZXMgb2YgdGhlIGNvbHVtbnNcclxuICAgICAgY29uc3QgcHJvcEEgPSB2YWx1ZUdldHRlcihyb3dBLCBwcm9wKTtcclxuICAgICAgY29uc3QgcHJvcEIgPSB2YWx1ZUdldHRlcihyb3dCLCBwcm9wKTtcclxuXHJcbiAgICAgIC8vIENvbXBhcmUgZnVuY3Rpb24gZ2V0cyBmaXZlIHBhcmFtZXRlcnM6XHJcbiAgICAgIC8vIFR3byBjZWxsIHZhbHVlcyB0byBiZSBjb21wYXJlZCBhcyBwcm9wQSBhbmQgcHJvcEJcclxuICAgICAgLy8gVHdvIHJvd3MgY29ycmVzcG9uZGluZyB0byB0aGUgY2VsbHMgYXMgcm93QSBhbmQgcm93QlxyXG4gICAgICAvLyBEaXJlY3Rpb24gb2YgdGhlIHNvcnQgZm9yIHRoaXMgY29sdW1uIGFzIFNvcnREaXJlY3Rpb25cclxuICAgICAgLy8gQ29tcGFyZSBjYW4gYmUgYSBzdGFuZGFyZCBKUyBjb21wYXJpc29uIGZ1bmN0aW9uIChhLGIpID0+IC0xfDB8MVxyXG4gICAgICAvLyBhcyBhZGRpdGlvbmFsIHBhcmFtZXRlcnMgYXJlIHNpbGVudGx5IGlnbm9yZWQuIFRoZSB3aG9sZSByb3cgYW5kIHNvcnRcclxuICAgICAgLy8gZGlyZWN0aW9uIGVuYWJsZSBtb3JlIGNvbXBsZXggc29ydCBsb2dpYy5cclxuICAgICAgY29uc3QgY29tcGFyaXNvbiA9XHJcbiAgICAgICAgY2FjaGVkRGlyLmRpciAhPT0gU29ydERpcmVjdGlvbi5kZXNjXHJcbiAgICAgICAgICA/IGNhY2hlZERpci5jb21wYXJlRm4ocHJvcEEsIHByb3BCLCByb3dBLCByb3dCLCBjYWNoZWREaXIuZGlyKVxyXG4gICAgICAgICAgOiAtY2FjaGVkRGlyLmNvbXBhcmVGbihwcm9wQSwgcHJvcEIsIHJvd0EsIHJvd0IsIGNhY2hlZERpci5kaXIpO1xyXG5cclxuICAgICAgLy8gRG9uJ3QgcmV0dXJuIDAgeWV0IGluIGNhc2Ugb2YgbmVlZGluZyB0byBzb3J0IGJ5IG5leHQgcHJvcGVydHlcclxuICAgICAgaWYgKGNvbXBhcmlzb24gIT09IDApIHJldHVybiBjb21wYXJpc29uO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICghKHJvd1RvSW5kZXhNYXAuaGFzKHJvd0EpICYmIHJvd1RvSW5kZXhNYXAuaGFzKHJvd0IpKSkgcmV0dXJuIDA7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBhbGwgZWxzZSBiZWluZyBlcXVhbCwgcHJlc2VydmUgb3JpZ2luYWwgb3JkZXIgb2YgdGhlIHJvd3MgKHN0YWJsZSBzb3J0KVxyXG4gICAgICovXHJcbiAgICByZXR1cm4gcm93VG9JbmRleE1hcC5nZXQocm93QSkgPCByb3dUb0luZGV4TWFwLmdldChyb3dCKSA/IC0xIDogMTtcclxuICB9KTtcclxufVxyXG4iXX0=