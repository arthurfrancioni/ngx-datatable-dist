import { Component, Input, Output, EventEmitter, HostListener, ChangeDetectionStrategy, ChangeDetectorRef, KeyValueDiffers } from '@angular/core';
export class DataTableRowWrapperComponent {
    constructor(cd, differs) {
        this.cd = cd;
        this.differs = differs;
        this.rowContextmenu = new EventEmitter(false);
        this.groupContext = {
            group: this.row,
            expanded: this.expanded,
            rowIndex: this.rowIndex
        };
        this.rowContext = {
            row: this.row,
            expanded: this.expanded,
            rowIndex: this.rowIndex
        };
        this._expanded = false;
        this.rowDiffer = differs.find({}).create();
    }
    set rowIndex(val) {
        this._rowIndex = val;
        this.rowContext.rowIndex = val;
        this.groupContext.rowIndex = val;
        this.cd.markForCheck();
    }
    get rowIndex() {
        return this._rowIndex;
    }
    set expanded(val) {
        this._expanded = val;
        this.groupContext.expanded = val;
        this.rowContext.expanded = val;
        this.cd.markForCheck();
    }
    get expanded() {
        return this._expanded;
    }
    ngDoCheck() {
        if (this.rowDiffer.diff(this.row)) {
            this.rowContext.row = this.row;
            this.groupContext.group = this.row;
            this.cd.markForCheck();
        }
    }
    onContextmenu($event) {
        this.rowContextmenu.emit({ event: $event, row: this.row });
    }
    getGroupHeaderStyle() {
        const styles = {};
        styles['transform'] = 'translate3d(' + this.offsetX + 'px, 0px, 0px)';
        styles['backface-visibility'] = 'hidden';
        styles['width'] = this.innerWidth;
        return styles;
    }
}
DataTableRowWrapperComponent.decorators = [
    { type: Component, args: [{
                selector: 'datatable-row-wrapper',
                changeDetection: ChangeDetectionStrategy.OnPush,
                template: `
    <div *ngIf="groupHeader && groupHeader.template" class="datatable-group-header" [ngStyle]="getGroupHeaderStyle()">
      <ng-template
        *ngIf="groupHeader && groupHeader.template"
        [ngTemplateOutlet]="groupHeader.template"
        [ngTemplateOutletContext]="groupContext"
      >
      </ng-template>
    </div>
    <ng-content *ngIf="(groupHeader && groupHeader.template && expanded) || !groupHeader || !groupHeader.template">
    </ng-content>
    <div
      *ngIf="rowDetail && rowDetail.template && expanded"
      [style.height.px]="detailRowHeight"
      class="datatable-row-detail"
    >
      <ng-template
        *ngIf="rowDetail && rowDetail.template"
        [ngTemplateOutlet]="rowDetail.template"
        [ngTemplateOutletContext]="rowContext"
      >
      </ng-template>
    </div>
  `,
                host: {
                    class: 'datatable-row-wrapper'
                }
            },] }
];
DataTableRowWrapperComponent.ctorParameters = () => [
    { type: ChangeDetectorRef },
    { type: KeyValueDiffers }
];
DataTableRowWrapperComponent.propDecorators = {
    innerWidth: [{ type: Input }],
    rowDetail: [{ type: Input }],
    groupHeader: [{ type: Input }],
    offsetX: [{ type: Input }],
    detailRowHeight: [{ type: Input }],
    row: [{ type: Input }],
    groupedRows: [{ type: Input }],
    rowContextmenu: [{ type: Output }],
    rowIndex: [{ type: Input }],
    expanded: [{ type: Input }],
    onContextmenu: [{ type: HostListener, args: ['contextmenu', ['$event'],] }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYm9keS1yb3ctd3JhcHBlci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9zd2ltbGFuZS9uZ3gtZGF0YXRhYmxlL3NyYy9saWIvY29tcG9uZW50cy9ib2R5L2JvZHktcm93LXdyYXBwZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFDTCxTQUFTLEVBQ1QsS0FBSyxFQUNMLE1BQU0sRUFDTixZQUFZLEVBQ1osWUFBWSxFQUVaLHVCQUF1QixFQUV2QixpQkFBaUIsRUFDakIsZUFBZSxFQUNoQixNQUFNLGVBQWUsQ0FBQztBQWlDdkIsTUFBTSxPQUFPLDRCQUE0QjtJQWdEdkMsWUFBb0IsRUFBcUIsRUFBVSxPQUF3QjtRQUF2RCxPQUFFLEdBQUYsRUFBRSxDQUFtQjtRQUFVLFlBQU8sR0FBUCxPQUFPLENBQWlCO1FBeENqRSxtQkFBYyxHQUFHLElBQUksWUFBWSxDQUFrQyxLQUFLLENBQUMsQ0FBQztRQXdCcEYsaUJBQVksR0FBUTtZQUNsQixLQUFLLEVBQUUsSUFBSSxDQUFDLEdBQUc7WUFDZixRQUFRLEVBQUUsSUFBSSxDQUFDLFFBQVE7WUFDdkIsUUFBUSxFQUFFLElBQUksQ0FBQyxRQUFRO1NBQ3hCLENBQUM7UUFFRixlQUFVLEdBQVE7WUFDaEIsR0FBRyxFQUFFLElBQUksQ0FBQyxHQUFHO1lBQ2IsUUFBUSxFQUFFLElBQUksQ0FBQyxRQUFRO1lBQ3ZCLFFBQVEsRUFBRSxJQUFJLENBQUMsUUFBUTtTQUN4QixDQUFDO1FBR00sY0FBUyxHQUFZLEtBQUssQ0FBQztRQUlqQyxJQUFJLENBQUMsU0FBUyxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUM7SUFDN0MsQ0FBQztJQXhDRCxJQUFhLFFBQVEsQ0FBQyxHQUFXO1FBQy9CLElBQUksQ0FBQyxTQUFTLEdBQUcsR0FBRyxDQUFDO1FBQ3JCLElBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxHQUFHLEdBQUcsQ0FBQztRQUMvQixJQUFJLENBQUMsWUFBWSxDQUFDLFFBQVEsR0FBRyxHQUFHLENBQUM7UUFDakMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQUN6QixDQUFDO0lBRUQsSUFBSSxRQUFRO1FBQ1YsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDO0lBQ3hCLENBQUM7SUFFRCxJQUFhLFFBQVEsQ0FBQyxHQUFZO1FBQ2hDLElBQUksQ0FBQyxTQUFTLEdBQUcsR0FBRyxDQUFDO1FBQ3JCLElBQUksQ0FBQyxZQUFZLENBQUMsUUFBUSxHQUFHLEdBQUcsQ0FBQztRQUNqQyxJQUFJLENBQUMsVUFBVSxDQUFDLFFBQVEsR0FBRyxHQUFHLENBQUM7UUFDL0IsSUFBSSxDQUFDLEVBQUUsQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQUN6QixDQUFDO0lBRUQsSUFBSSxRQUFRO1FBQ1YsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDO0lBQ3hCLENBQUM7SUFzQkQsU0FBUztRQUNQLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFO1lBQ2pDLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUM7WUFDL0IsSUFBSSxDQUFDLFlBQVksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQztZQUNuQyxJQUFJLENBQUMsRUFBRSxDQUFDLFlBQVksRUFBRSxDQUFDO1NBQ3hCO0lBQ0gsQ0FBQztJQUdELGFBQWEsQ0FBQyxNQUFrQjtRQUM5QixJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFFLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDO0lBQzdELENBQUM7SUFFRCxtQkFBbUI7UUFDakIsTUFBTSxNQUFNLEdBQUcsRUFBRSxDQUFDO1FBRWxCLE1BQU0sQ0FBQyxXQUFXLENBQUMsR0FBRyxjQUFjLEdBQUcsSUFBSSxDQUFDLE9BQU8sR0FBRyxlQUFlLENBQUM7UUFDdEUsTUFBTSxDQUFDLHFCQUFxQixDQUFDLEdBQUcsUUFBUSxDQUFDO1FBQ3pDLE1BQU0sQ0FBQyxPQUFPLENBQUMsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDO1FBRWxDLE9BQU8sTUFBTSxDQUFDO0lBQ2hCLENBQUM7OztZQXhHRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLHVCQUF1QjtnQkFDakMsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07Z0JBQy9DLFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0F1QlQ7Z0JBQ0QsSUFBSSxFQUFFO29CQUNKLEtBQUssRUFBRSx1QkFBdUI7aUJBQy9CO2FBQ0Y7OztZQWxDQyxpQkFBaUI7WUFDakIsZUFBZTs7O3lCQW1DZCxLQUFLO3dCQUNMLEtBQUs7MEJBQ0wsS0FBSztzQkFDTCxLQUFLOzhCQUNMLEtBQUs7a0JBQ0wsS0FBSzswQkFDTCxLQUFLOzZCQUNMLE1BQU07dUJBRU4sS0FBSzt1QkFXTCxLQUFLOzRCQXVDTCxZQUFZLFNBQUMsYUFBYSxFQUFFLENBQUMsUUFBUSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcclxuICBDb21wb25lbnQsXHJcbiAgSW5wdXQsXHJcbiAgT3V0cHV0LFxyXG4gIEV2ZW50RW1pdHRlcixcclxuICBIb3N0TGlzdGVuZXIsXHJcbiAgRG9DaGVjayxcclxuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcclxuICBLZXlWYWx1ZURpZmZlcixcclxuICBDaGFuZ2VEZXRlY3RvclJlZixcclxuICBLZXlWYWx1ZURpZmZlcnNcclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnZGF0YXRhYmxlLXJvdy13cmFwcGVyJyxcclxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcclxuICB0ZW1wbGF0ZTogYFxyXG4gICAgPGRpdiAqbmdJZj1cImdyb3VwSGVhZGVyICYmIGdyb3VwSGVhZGVyLnRlbXBsYXRlXCIgY2xhc3M9XCJkYXRhdGFibGUtZ3JvdXAtaGVhZGVyXCIgW25nU3R5bGVdPVwiZ2V0R3JvdXBIZWFkZXJTdHlsZSgpXCI+XHJcbiAgICAgIDxuZy10ZW1wbGF0ZVxyXG4gICAgICAgICpuZ0lmPVwiZ3JvdXBIZWFkZXIgJiYgZ3JvdXBIZWFkZXIudGVtcGxhdGVcIlxyXG4gICAgICAgIFtuZ1RlbXBsYXRlT3V0bGV0XT1cImdyb3VwSGVhZGVyLnRlbXBsYXRlXCJcclxuICAgICAgICBbbmdUZW1wbGF0ZU91dGxldENvbnRleHRdPVwiZ3JvdXBDb250ZXh0XCJcclxuICAgICAgPlxyXG4gICAgICA8L25nLXRlbXBsYXRlPlxyXG4gICAgPC9kaXY+XHJcbiAgICA8bmctY29udGVudCAqbmdJZj1cIihncm91cEhlYWRlciAmJiBncm91cEhlYWRlci50ZW1wbGF0ZSAmJiBleHBhbmRlZCkgfHwgIWdyb3VwSGVhZGVyIHx8ICFncm91cEhlYWRlci50ZW1wbGF0ZVwiPlxyXG4gICAgPC9uZy1jb250ZW50PlxyXG4gICAgPGRpdlxyXG4gICAgICAqbmdJZj1cInJvd0RldGFpbCAmJiByb3dEZXRhaWwudGVtcGxhdGUgJiYgZXhwYW5kZWRcIlxyXG4gICAgICBbc3R5bGUuaGVpZ2h0LnB4XT1cImRldGFpbFJvd0hlaWdodFwiXHJcbiAgICAgIGNsYXNzPVwiZGF0YXRhYmxlLXJvdy1kZXRhaWxcIlxyXG4gICAgPlxyXG4gICAgICA8bmctdGVtcGxhdGVcclxuICAgICAgICAqbmdJZj1cInJvd0RldGFpbCAmJiByb3dEZXRhaWwudGVtcGxhdGVcIlxyXG4gICAgICAgIFtuZ1RlbXBsYXRlT3V0bGV0XT1cInJvd0RldGFpbC50ZW1wbGF0ZVwiXHJcbiAgICAgICAgW25nVGVtcGxhdGVPdXRsZXRDb250ZXh0XT1cInJvd0NvbnRleHRcIlxyXG4gICAgICA+XHJcbiAgICAgIDwvbmctdGVtcGxhdGU+XHJcbiAgICA8L2Rpdj5cclxuICBgLFxyXG4gIGhvc3Q6IHtcclxuICAgIGNsYXNzOiAnZGF0YXRhYmxlLXJvdy13cmFwcGVyJ1xyXG4gIH1cclxufSlcclxuZXhwb3J0IGNsYXNzIERhdGFUYWJsZVJvd1dyYXBwZXJDb21wb25lbnQgaW1wbGVtZW50cyBEb0NoZWNrIHtcclxuICBASW5wdXQoKSBpbm5lcldpZHRoOiBudW1iZXI7XHJcbiAgQElucHV0KCkgcm93RGV0YWlsOiBhbnk7XHJcbiAgQElucHV0KCkgZ3JvdXBIZWFkZXI6IGFueTtcclxuICBASW5wdXQoKSBvZmZzZXRYOiBudW1iZXI7XHJcbiAgQElucHV0KCkgZGV0YWlsUm93SGVpZ2h0OiBhbnk7XHJcbiAgQElucHV0KCkgcm93OiBhbnk7XHJcbiAgQElucHV0KCkgZ3JvdXBlZFJvd3M6IGFueTtcclxuICBAT3V0cHV0KCkgcm93Q29udGV4dG1lbnUgPSBuZXcgRXZlbnRFbWl0dGVyPHsgZXZlbnQ6IE1vdXNlRXZlbnQ7IHJvdzogYW55IH0+KGZhbHNlKTtcclxuXHJcbiAgQElucHV0KCkgc2V0IHJvd0luZGV4KHZhbDogbnVtYmVyKSB7XHJcbiAgICB0aGlzLl9yb3dJbmRleCA9IHZhbDtcclxuICAgIHRoaXMucm93Q29udGV4dC5yb3dJbmRleCA9IHZhbDtcclxuICAgIHRoaXMuZ3JvdXBDb250ZXh0LnJvd0luZGV4ID0gdmFsO1xyXG4gICAgdGhpcy5jZC5tYXJrRm9yQ2hlY2soKTtcclxuICB9XHJcblxyXG4gIGdldCByb3dJbmRleCgpOiBudW1iZXIge1xyXG4gICAgcmV0dXJuIHRoaXMuX3Jvd0luZGV4O1xyXG4gIH1cclxuXHJcbiAgQElucHV0KCkgc2V0IGV4cGFuZGVkKHZhbDogYm9vbGVhbikge1xyXG4gICAgdGhpcy5fZXhwYW5kZWQgPSB2YWw7XHJcbiAgICB0aGlzLmdyb3VwQ29udGV4dC5leHBhbmRlZCA9IHZhbDtcclxuICAgIHRoaXMucm93Q29udGV4dC5leHBhbmRlZCA9IHZhbDtcclxuICAgIHRoaXMuY2QubWFya0ZvckNoZWNrKCk7XHJcbiAgfVxyXG5cclxuICBnZXQgZXhwYW5kZWQoKTogYm9vbGVhbiB7XHJcbiAgICByZXR1cm4gdGhpcy5fZXhwYW5kZWQ7XHJcbiAgfVxyXG5cclxuICBncm91cENvbnRleHQ6IGFueSA9IHtcclxuICAgIGdyb3VwOiB0aGlzLnJvdyxcclxuICAgIGV4cGFuZGVkOiB0aGlzLmV4cGFuZGVkLFxyXG4gICAgcm93SW5kZXg6IHRoaXMucm93SW5kZXhcclxuICB9O1xyXG5cclxuICByb3dDb250ZXh0OiBhbnkgPSB7XHJcbiAgICByb3c6IHRoaXMucm93LFxyXG4gICAgZXhwYW5kZWQ6IHRoaXMuZXhwYW5kZWQsXHJcbiAgICByb3dJbmRleDogdGhpcy5yb3dJbmRleFxyXG4gIH07XHJcblxyXG4gIHByaXZhdGUgcm93RGlmZmVyOiBLZXlWYWx1ZURpZmZlcjx7fSwge30+O1xyXG4gIHByaXZhdGUgX2V4cGFuZGVkOiBib29sZWFuID0gZmFsc2U7XHJcbiAgcHJpdmF0ZSBfcm93SW5kZXg6IG51bWJlcjtcclxuXHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBjZDogQ2hhbmdlRGV0ZWN0b3JSZWYsIHByaXZhdGUgZGlmZmVyczogS2V5VmFsdWVEaWZmZXJzKSB7XHJcbiAgICB0aGlzLnJvd0RpZmZlciA9IGRpZmZlcnMuZmluZCh7fSkuY3JlYXRlKCk7XHJcbiAgfVxyXG5cclxuICBuZ0RvQ2hlY2soKTogdm9pZCB7XHJcbiAgICBpZiAodGhpcy5yb3dEaWZmZXIuZGlmZih0aGlzLnJvdykpIHtcclxuICAgICAgdGhpcy5yb3dDb250ZXh0LnJvdyA9IHRoaXMucm93O1xyXG4gICAgICB0aGlzLmdyb3VwQ29udGV4dC5ncm91cCA9IHRoaXMucm93O1xyXG4gICAgICB0aGlzLmNkLm1hcmtGb3JDaGVjaygpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgQEhvc3RMaXN0ZW5lcignY29udGV4dG1lbnUnLCBbJyRldmVudCddKVxyXG4gIG9uQ29udGV4dG1lbnUoJGV2ZW50OiBNb3VzZUV2ZW50KTogdm9pZCB7XHJcbiAgICB0aGlzLnJvd0NvbnRleHRtZW51LmVtaXQoeyBldmVudDogJGV2ZW50LCByb3c6IHRoaXMucm93IH0pO1xyXG4gIH1cclxuXHJcbiAgZ2V0R3JvdXBIZWFkZXJTdHlsZSgpOiBhbnkge1xyXG4gICAgY29uc3Qgc3R5bGVzID0ge307XHJcblxyXG4gICAgc3R5bGVzWyd0cmFuc2Zvcm0nXSA9ICd0cmFuc2xhdGUzZCgnICsgdGhpcy5vZmZzZXRYICsgJ3B4LCAwcHgsIDBweCknO1xyXG4gICAgc3R5bGVzWydiYWNrZmFjZS12aXNpYmlsaXR5J10gPSAnaGlkZGVuJztcclxuICAgIHN0eWxlc1snd2lkdGgnXSA9IHRoaXMuaW5uZXJXaWR0aDtcclxuXHJcbiAgICByZXR1cm4gc3R5bGVzO1xyXG4gIH1cclxufVxyXG4iXX0=