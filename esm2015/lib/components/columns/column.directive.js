import { Directive, TemplateRef, ContentChild, Input } from '@angular/core';
import { DataTableColumnHeaderDirective } from './column-header.directive';
import { DataTableColumnCellDirective } from './column-cell.directive';
import { DataTableColumnCellTreeToggle } from './tree.directive';
import { ColumnChangesService } from '../../services/column-changes.service';
export class DataTableColumnDirective {
    constructor(columnChangesService) {
        this.columnChangesService = columnChangesService;
        this.isFirstChange = true;
    }
    get cellTemplate() {
        return this._cellTemplateInput || this._cellTemplateQuery;
    }
    get headerTemplate() {
        return this._headerTemplateInput || this._headerTemplateQuery;
    }
    get treeToggleTemplate() {
        return this._treeToggleTemplateInput || this._treeToggleTemplateQuery;
    }
    ngOnChanges() {
        if (this.isFirstChange) {
            this.isFirstChange = false;
        }
        else {
            this.columnChangesService.onInputChange();
        }
    }
}
DataTableColumnDirective.decorators = [
    { type: Directive, args: [{ selector: 'ngx-datatable-column' },] }
];
DataTableColumnDirective.ctorParameters = () => [
    { type: ColumnChangesService }
];
DataTableColumnDirective.propDecorators = {
    name: [{ type: Input }],
    prop: [{ type: Input }],
    frozenLeft: [{ type: Input }],
    frozenRight: [{ type: Input }],
    flexGrow: [{ type: Input }],
    resizeable: [{ type: Input }],
    comparator: [{ type: Input }],
    pipe: [{ type: Input }],
    sortable: [{ type: Input }],
    draggable: [{ type: Input }],
    canAutoResize: [{ type: Input }],
    minWidth: [{ type: Input }],
    width: [{ type: Input }],
    maxWidth: [{ type: Input }],
    checkboxable: [{ type: Input }],
    headerCheckboxable: [{ type: Input }],
    headerClass: [{ type: Input }],
    cellClass: [{ type: Input }],
    isTreeColumn: [{ type: Input }],
    treeLevelIndent: [{ type: Input }],
    summaryFunc: [{ type: Input }],
    summaryTemplate: [{ type: Input }],
    _cellTemplateInput: [{ type: Input, args: ['cellTemplate',] }],
    _cellTemplateQuery: [{ type: ContentChild, args: [DataTableColumnCellDirective, { read: TemplateRef, static: true },] }],
    _headerTemplateInput: [{ type: Input, args: ['headerTemplate',] }],
    _headerTemplateQuery: [{ type: ContentChild, args: [DataTableColumnHeaderDirective, { read: TemplateRef, static: true },] }],
    _treeToggleTemplateInput: [{ type: Input, args: ['treeToggleTemplate',] }],
    _treeToggleTemplateQuery: [{ type: ContentChild, args: [DataTableColumnCellTreeToggle, { read: TemplateRef, static: true },] }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29sdW1uLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL3N3aW1sYW5lL25neC1kYXRhdGFibGUvc3JjL2xpYi9jb21wb25lbnRzL2NvbHVtbnMvY29sdW1uLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFdBQVcsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUE0QixNQUFNLGVBQWUsQ0FBQztBQUN0RyxPQUFPLEVBQUUsOEJBQThCLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUMzRSxPQUFPLEVBQUUsNEJBQTRCLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUN2RSxPQUFPLEVBQUUsNkJBQTZCLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUNqRSxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSx1Q0FBdUMsQ0FBQztBQUk3RSxNQUFNLE9BQU8sd0JBQXdCO0lBd0RuQyxZQUFvQixvQkFBMEM7UUFBMUMseUJBQW9CLEdBQXBCLG9CQUFvQixDQUFzQjtRQUZ0RCxrQkFBYSxHQUFHLElBQUksQ0FBQztJQUVvQyxDQUFDO0lBMUJsRSxJQUFJLFlBQVk7UUFDZCxPQUFPLElBQUksQ0FBQyxrQkFBa0IsSUFBSSxJQUFJLENBQUMsa0JBQWtCLENBQUM7SUFDNUQsQ0FBQztJQVFELElBQUksY0FBYztRQUNoQixPQUFPLElBQUksQ0FBQyxvQkFBb0IsSUFBSSxJQUFJLENBQUMsb0JBQW9CLENBQUM7SUFDaEUsQ0FBQztJQVFELElBQUksa0JBQWtCO1FBQ3BCLE9BQU8sSUFBSSxDQUFDLHdCQUF3QixJQUFJLElBQUksQ0FBQyx3QkFBd0IsQ0FBQztJQUN4RSxDQUFDO0lBTUQsV0FBVztRQUNULElBQUksSUFBSSxDQUFDLGFBQWEsRUFBRTtZQUN0QixJQUFJLENBQUMsYUFBYSxHQUFHLEtBQUssQ0FBQztTQUM1QjthQUFNO1lBQ0wsSUFBSSxDQUFDLG9CQUFvQixDQUFDLGFBQWEsRUFBRSxDQUFDO1NBQzNDO0lBQ0gsQ0FBQzs7O1lBakVGLFNBQVMsU0FBQyxFQUFFLFFBQVEsRUFBRSxzQkFBc0IsRUFBRTs7O1lBSHRDLG9CQUFvQjs7O21CQUsxQixLQUFLO21CQUNMLEtBQUs7eUJBQ0wsS0FBSzswQkFDTCxLQUFLO3VCQUNMLEtBQUs7eUJBQ0wsS0FBSzt5QkFDTCxLQUFLO21CQUNMLEtBQUs7dUJBQ0wsS0FBSzt3QkFDTCxLQUFLOzRCQUNMLEtBQUs7dUJBQ0wsS0FBSztvQkFDTCxLQUFLO3VCQUNMLEtBQUs7MkJBQ0wsS0FBSztpQ0FDTCxLQUFLOzBCQUNMLEtBQUs7d0JBQ0wsS0FBSzsyQkFDTCxLQUFLOzhCQUNMLEtBQUs7MEJBQ0wsS0FBSzs4QkFDTCxLQUFLO2lDQUVMLEtBQUssU0FBQyxjQUFjO2lDQUdwQixZQUFZLFNBQUMsNEJBQTRCLEVBQUUsRUFBRSxJQUFJLEVBQUUsV0FBVyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUU7bUNBTzlFLEtBQUssU0FBQyxnQkFBZ0I7bUNBR3RCLFlBQVksU0FBQyw4QkFBOEIsRUFBRSxFQUFFLElBQUksRUFBRSxXQUFXLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRTt1Q0FPaEYsS0FBSyxTQUFDLG9CQUFvQjt1Q0FHMUIsWUFBWSxTQUFDLDZCQUE2QixFQUFFLEVBQUUsSUFBSSxFQUFFLFdBQVcsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGlyZWN0aXZlLCBUZW1wbGF0ZVJlZiwgQ29udGVudENoaWxkLCBJbnB1dCwgT25DaGFuZ2VzLCBTaW1wbGVDaGFuZ2VzIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IERhdGFUYWJsZUNvbHVtbkhlYWRlckRpcmVjdGl2ZSB9IGZyb20gJy4vY29sdW1uLWhlYWRlci5kaXJlY3RpdmUnO1xyXG5pbXBvcnQgeyBEYXRhVGFibGVDb2x1bW5DZWxsRGlyZWN0aXZlIH0gZnJvbSAnLi9jb2x1bW4tY2VsbC5kaXJlY3RpdmUnO1xyXG5pbXBvcnQgeyBEYXRhVGFibGVDb2x1bW5DZWxsVHJlZVRvZ2dsZSB9IGZyb20gJy4vdHJlZS5kaXJlY3RpdmUnO1xyXG5pbXBvcnQgeyBDb2x1bW5DaGFuZ2VzU2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL2NvbHVtbi1jaGFuZ2VzLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBUYWJsZUNvbHVtblByb3AgfSBmcm9tICcuLi8uLi90eXBlcy90YWJsZS1jb2x1bW4udHlwZSc7XHJcblxyXG5ARGlyZWN0aXZlKHsgc2VsZWN0b3I6ICduZ3gtZGF0YXRhYmxlLWNvbHVtbicgfSlcclxuZXhwb3J0IGNsYXNzIERhdGFUYWJsZUNvbHVtbkRpcmVjdGl2ZSBpbXBsZW1lbnRzIE9uQ2hhbmdlcyB7XHJcbiAgQElucHV0KCkgbmFtZTogc3RyaW5nO1xyXG4gIEBJbnB1dCgpIHByb3A6IFRhYmxlQ29sdW1uUHJvcDtcclxuICBASW5wdXQoKSBmcm96ZW5MZWZ0OiBhbnk7XHJcbiAgQElucHV0KCkgZnJvemVuUmlnaHQ6IGFueTtcclxuICBASW5wdXQoKSBmbGV4R3JvdzogbnVtYmVyO1xyXG4gIEBJbnB1dCgpIHJlc2l6ZWFibGU6IGJvb2xlYW47XHJcbiAgQElucHV0KCkgY29tcGFyYXRvcjogYW55O1xyXG4gIEBJbnB1dCgpIHBpcGU6IGFueTtcclxuICBASW5wdXQoKSBzb3J0YWJsZTogYm9vbGVhbjtcclxuICBASW5wdXQoKSBkcmFnZ2FibGU6IGJvb2xlYW47XHJcbiAgQElucHV0KCkgY2FuQXV0b1Jlc2l6ZTogYm9vbGVhbjtcclxuICBASW5wdXQoKSBtaW5XaWR0aDogbnVtYmVyO1xyXG4gIEBJbnB1dCgpIHdpZHRoOiBudW1iZXI7XHJcbiAgQElucHV0KCkgbWF4V2lkdGg6IG51bWJlcjtcclxuICBASW5wdXQoKSBjaGVja2JveGFibGU6IGJvb2xlYW47XHJcbiAgQElucHV0KCkgaGVhZGVyQ2hlY2tib3hhYmxlOiBib29sZWFuO1xyXG4gIEBJbnB1dCgpIGhlYWRlckNsYXNzOiBzdHJpbmcgfCAoKGRhdGE6IGFueSkgPT4gc3RyaW5nIHwgYW55KTtcclxuICBASW5wdXQoKSBjZWxsQ2xhc3M6IHN0cmluZyB8ICgoZGF0YTogYW55KSA9PiBzdHJpbmcgfCBhbnkpO1xyXG4gIEBJbnB1dCgpIGlzVHJlZUNvbHVtbjogYm9vbGVhbjtcclxuICBASW5wdXQoKSB0cmVlTGV2ZWxJbmRlbnQ6IG51bWJlcjtcclxuICBASW5wdXQoKSBzdW1tYXJ5RnVuYzogKGNlbGxzOiBhbnlbXSkgPT4gYW55O1xyXG4gIEBJbnB1dCgpIHN1bW1hcnlUZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PjtcclxuXHJcbiAgQElucHV0KCdjZWxsVGVtcGxhdGUnKVxyXG4gIF9jZWxsVGVtcGxhdGVJbnB1dDogVGVtcGxhdGVSZWY8YW55PjtcclxuXHJcbiAgQENvbnRlbnRDaGlsZChEYXRhVGFibGVDb2x1bW5DZWxsRGlyZWN0aXZlLCB7IHJlYWQ6IFRlbXBsYXRlUmVmLCBzdGF0aWM6IHRydWUgfSlcclxuICBfY2VsbFRlbXBsYXRlUXVlcnk6IFRlbXBsYXRlUmVmPGFueT47XHJcblxyXG4gIGdldCBjZWxsVGVtcGxhdGUoKTogVGVtcGxhdGVSZWY8YW55PiB7XHJcbiAgICByZXR1cm4gdGhpcy5fY2VsbFRlbXBsYXRlSW5wdXQgfHwgdGhpcy5fY2VsbFRlbXBsYXRlUXVlcnk7XHJcbiAgfVxyXG5cclxuICBASW5wdXQoJ2hlYWRlclRlbXBsYXRlJylcclxuICBfaGVhZGVyVGVtcGxhdGVJbnB1dDogVGVtcGxhdGVSZWY8YW55PjtcclxuXHJcbiAgQENvbnRlbnRDaGlsZChEYXRhVGFibGVDb2x1bW5IZWFkZXJEaXJlY3RpdmUsIHsgcmVhZDogVGVtcGxhdGVSZWYsIHN0YXRpYzogdHJ1ZSB9KVxyXG4gIF9oZWFkZXJUZW1wbGF0ZVF1ZXJ5OiBUZW1wbGF0ZVJlZjxhbnk+O1xyXG5cclxuICBnZXQgaGVhZGVyVGVtcGxhdGUoKTogVGVtcGxhdGVSZWY8YW55PiB7XHJcbiAgICByZXR1cm4gdGhpcy5faGVhZGVyVGVtcGxhdGVJbnB1dCB8fCB0aGlzLl9oZWFkZXJUZW1wbGF0ZVF1ZXJ5O1xyXG4gIH1cclxuXHJcbiAgQElucHV0KCd0cmVlVG9nZ2xlVGVtcGxhdGUnKVxyXG4gIF90cmVlVG9nZ2xlVGVtcGxhdGVJbnB1dDogVGVtcGxhdGVSZWY8YW55PjtcclxuXHJcbiAgQENvbnRlbnRDaGlsZChEYXRhVGFibGVDb2x1bW5DZWxsVHJlZVRvZ2dsZSwgeyByZWFkOiBUZW1wbGF0ZVJlZiwgc3RhdGljOiB0cnVlIH0pXHJcbiAgX3RyZWVUb2dnbGVUZW1wbGF0ZVF1ZXJ5OiBUZW1wbGF0ZVJlZjxhbnk+O1xyXG5cclxuICBnZXQgdHJlZVRvZ2dsZVRlbXBsYXRlKCk6IFRlbXBsYXRlUmVmPGFueT4ge1xyXG4gICAgcmV0dXJuIHRoaXMuX3RyZWVUb2dnbGVUZW1wbGF0ZUlucHV0IHx8IHRoaXMuX3RyZWVUb2dnbGVUZW1wbGF0ZVF1ZXJ5O1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBpc0ZpcnN0Q2hhbmdlID0gdHJ1ZTtcclxuXHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBjb2x1bW5DaGFuZ2VzU2VydmljZTogQ29sdW1uQ2hhbmdlc1NlcnZpY2UpIHt9XHJcblxyXG4gIG5nT25DaGFuZ2VzKCkge1xyXG4gICAgaWYgKHRoaXMuaXNGaXJzdENoYW5nZSkge1xyXG4gICAgICB0aGlzLmlzRmlyc3RDaGFuZ2UgPSBmYWxzZTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuY29sdW1uQ2hhbmdlc1NlcnZpY2Uub25JbnB1dENoYW5nZSgpO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG4iXX0=