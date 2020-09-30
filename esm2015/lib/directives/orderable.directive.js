import { Directive, Output, EventEmitter, ContentChildren, KeyValueDiffers, Inject } from '@angular/core';
import { DraggableDirective } from './draggable.directive';
import { DOCUMENT } from '@angular/common';
export class OrderableDirective {
    constructor(differs, document) {
        this.document = document;
        this.reorder = new EventEmitter();
        this.targetChanged = new EventEmitter();
        this.differ = differs.find({}).create();
    }
    ngAfterContentInit() {
        // HACK: Investigate Better Way
        this.updateSubscriptions();
        this.draggables.changes.subscribe(this.updateSubscriptions.bind(this));
    }
    ngOnDestroy() {
        this.draggables.forEach(d => {
            d.dragStart.unsubscribe();
            d.dragging.unsubscribe();
            d.dragEnd.unsubscribe();
        });
    }
    updateSubscriptions() {
        const diffs = this.differ.diff(this.createMapDiffs());
        if (diffs) {
            const subscribe = ({ currentValue, previousValue }) => {
                unsubscribe({ previousValue });
                if (currentValue) {
                    currentValue.dragStart.subscribe(this.onDragStart.bind(this));
                    currentValue.dragging.subscribe(this.onDragging.bind(this));
                    currentValue.dragEnd.subscribe(this.onDragEnd.bind(this));
                }
            };
            const unsubscribe = ({ previousValue }) => {
                if (previousValue) {
                    previousValue.dragStart.unsubscribe();
                    previousValue.dragging.unsubscribe();
                    previousValue.dragEnd.unsubscribe();
                }
            };
            diffs.forEachAddedItem(subscribe);
            // diffs.forEachChangedItem(subscribe.bind(this));
            diffs.forEachRemovedItem(unsubscribe);
        }
    }
    onDragStart() {
        this.positions = {};
        let i = 0;
        for (const dragger of this.draggables.toArray()) {
            const elm = dragger.element;
            const left = parseInt(elm.offsetLeft.toString(), 0);
            this.positions[dragger.dragModel.prop] = {
                left,
                right: left + parseInt(elm.offsetWidth.toString(), 0),
                index: i++,
                element: elm
            };
        }
    }
    onDragging({ element, model, event }) {
        const prevPos = this.positions[model.prop];
        const target = this.isTarget(model, event);
        if (target) {
            if (this.lastDraggingIndex !== target.i) {
                this.targetChanged.emit({
                    prevIndex: this.lastDraggingIndex,
                    newIndex: target.i,
                    initialIndex: prevPos.index
                });
                this.lastDraggingIndex = target.i;
            }
        }
        else if (this.lastDraggingIndex !== prevPos.index) {
            this.targetChanged.emit({
                prevIndex: this.lastDraggingIndex,
                initialIndex: prevPos.index
            });
            this.lastDraggingIndex = prevPos.index;
        }
    }
    onDragEnd({ element, model, event }) {
        const prevPos = this.positions[model.prop];
        const target = this.isTarget(model, event);
        if (target) {
            this.reorder.emit({
                prevIndex: prevPos.index,
                newIndex: target.i,
                model
            });
        }
        this.lastDraggingIndex = undefined;
        element.style.left = 'auto';
    }
    isTarget(model, event) {
        let i = 0;
        const x = event.x || event.clientX;
        const y = event.y || event.clientY;
        const targets = this.document.elementsFromPoint(x, y);
        for (const prop in this.positions) {
            // current column position which throws event.
            const pos = this.positions[prop];
            // since we drag the inner span, we need to find it in the elements at the cursor
            if (model.prop !== prop && targets.find((el) => el === pos.element)) {
                return {
                    pos,
                    i
                };
            }
            i++;
        }
    }
    createMapDiffs() {
        return this.draggables.toArray().reduce((acc, curr) => {
            acc[curr.dragModel.$$id] = curr;
            return acc;
        }, {});
    }
}
OrderableDirective.decorators = [
    { type: Directive, args: [{ selector: '[orderable]' },] }
];
OrderableDirective.ctorParameters = () => [
    { type: KeyValueDiffers },
    { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] }] }
];
OrderableDirective.propDecorators = {
    reorder: [{ type: Output }],
    targetChanged: [{ type: Output }],
    draggables: [{ type: ContentChildren, args: [DraggableDirective, { descendants: true },] }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3JkZXJhYmxlLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL3N3aW1sYW5lL25neC1kYXRhdGFibGUvc3JjL2xpYi9kaXJlY3RpdmVzL29yZGVyYWJsZS5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUNMLFNBQVMsRUFDVCxNQUFNLEVBQ04sWUFBWSxFQUNaLGVBQWUsRUFFZixlQUFlLEVBR2YsTUFBTSxFQUNQLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQzNELE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUczQyxNQUFNLE9BQU8sa0JBQWtCO0lBVzdCLFlBQVksT0FBd0IsRUFBNEIsUUFBYTtRQUFiLGFBQVEsR0FBUixRQUFRLENBQUs7UUFWbkUsWUFBTyxHQUFzQixJQUFJLFlBQVksRUFBRSxDQUFDO1FBQ2hELGtCQUFhLEdBQXNCLElBQUksWUFBWSxFQUFFLENBQUM7UUFVOUQsSUFBSSxDQUFDLE1BQU0sR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDO0lBQzFDLENBQUM7SUFFRCxrQkFBa0I7UUFDaEIsK0JBQStCO1FBQy9CLElBQUksQ0FBQyxtQkFBbUIsRUFBRSxDQUFDO1FBQzNCLElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsbUJBQW1CLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7SUFDekUsQ0FBQztJQUVELFdBQVc7UUFDVCxJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBRTtZQUMxQixDQUFDLENBQUMsU0FBUyxDQUFDLFdBQVcsRUFBRSxDQUFDO1lBQzFCLENBQUMsQ0FBQyxRQUFRLENBQUMs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LENBQUMsQ0FBQyxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUM7UUFDbkMsTUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFFdEQsS0FBSyxNQUFNLElBQUksSUFBSSxJQUFJLENBQUMsU0FBUyxFQUFFO1lBQ2pDLDhDQUE4QztZQUM5QyxNQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBRWpDLGlGQUFpRjtZQUNqRixJQUFJLEtBQUssQ0FBQyxJQUFJLEtBQUssSUFBSSxJQUFJLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFPLEVBQUUsRUFBRSxDQUFDLEVBQUUsS0FBSyxHQUFHLENBQUMsT0FBTyxDQUFDLEVBQUU7Z0JBQ3hFLE9BQU87b0JBQ0wsR0FBRztvQkFDSCxDQUFDO2lCQUNGLENBQUM7YUFDSDtZQUVELENBQUMsRUFBRSxDQUFDO1NBQ0w7SUFDSCxDQUFDO0lBRU8sY0FBYztRQUNwQixPQUFPLElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUMsR0FBRyxFQUFFLElBQUksRUFBRSxFQUFFO1lBQ3BELEdBQUcsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQztZQUNoQyxPQUFPLEdBQUcsQ0FBQztRQUNiLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQztJQUNULENBQUM7OztZQTNJRixTQUFTLFNBQUMsRUFBRSxRQUFRLEVBQUUsYUFBYSxFQUFFOzs7WUFScEMsZUFBZTs0Q0FvQndCLE1BQU0sU0FBQyxRQUFROzs7c0JBVnJELE1BQU07NEJBQ04sTUFBTTt5QkFFTixlQUFlLFNBQUMsa0JBQWtCLEVBQUUsRUFBRSxXQUFXLEVBQUUsSUFBSSxFQUFFIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcclxuICBEaXJlY3RpdmUsXHJcbiAgT3V0cHV0LFxyXG4gIEV2ZW50RW1pdHRlcixcclxuICBDb250ZW50Q2hpbGRyZW4sXHJcbiAgUXVlcnlMaXN0LFxyXG4gIEtleVZhbHVlRGlmZmVycyxcclxuICBBZnRlckNvbnRlbnRJbml0LFxyXG4gIE9uRGVzdHJveSxcclxuICBJbmplY3RcclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgRHJhZ2dhYmxlRGlyZWN0aXZlIH0gZnJvbSAnLi9kcmFnZ2FibGUuZGlyZWN0aXZlJztcclxuaW1wb3J0IHsgRE9DVU1FTlQgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xyXG5cclxuQERpcmVjdGl2ZSh7IHNlbGVjdG9yOiAnW29yZGVyYWJsZV0nIH0pXHJcbmV4cG9ydCBjbGFzcyBPcmRlcmFibGVEaXJlY3RpdmUgaW1wbGVtZW50cyBBZnRlckNvbnRlbnRJbml0LCBPbkRlc3Ryb3kge1xyXG4gIEBPdXRwdXQoKSByZW9yZGVyOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuICBAT3V0cHV0KCkgdGFyZ2V0Q2hhbmdlZDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcblxyXG4gIEBDb250ZW50Q2hpbGRyZW4oRHJhZ2dhYmxlRGlyZWN0aXZlLCB7IGRlc2NlbmRhbnRzOiB0cnVlIH0pXHJcbiAgZHJhZ2dhYmxlczogUXVlcnlMaXN0PERyYWdnYWJsZURpcmVjdGl2ZT47XHJcblxyXG4gIHBvc2l0aW9uczogYW55O1xyXG4gIGRpZmZlcjogYW55O1xyXG4gIGxhc3REcmFnZ2luZ0luZGV4OiBudW1iZXI7XHJcblxyXG4gIGNvbnN0cnVjdG9yKGRpZmZlcnM6IEtleVZhbHVlRGlmZmVycywgQEluamVjdChET0NVTUVOVCkgcHJpdmF0ZSBkb2N1bWVudDogYW55KSB7XHJcbiAgICB0aGlzLmRpZmZlciA9IGRpZmZlcnMuZmluZCh7fSkuY3JlYXRlKCk7XHJcbiAgfVxyXG5cclxuICBuZ0FmdGVyQ29udGVudEluaXQoKTogdm9pZCB7XHJcbiAgICAvLyBIQUNLOiBJbnZlc3RpZ2F0ZSBCZXR0ZXIgV2F5XHJcbiAgICB0aGlzLnVwZGF0ZVN1YnNjcmlwdGlvbnMoKTtcclxuICAgIHRoaXMuZHJhZ2dhYmxlcy5jaGFuZ2VzLnN1YnNjcmliZSh0aGlzLnVwZGF0ZVN1YnNjcmlwdGlvbnMuYmluZCh0aGlzKSk7XHJcbiAgfVxyXG5cclxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcclxuICAgIHRoaXMuZHJhZ2dhYmxlcy5mb3JFYWNoKGQgPT4ge1xyXG4gICAgICBkLmRyYWdTdGFydC51bnN1YnNjcmliZSgpO1xyXG4gICAgICBkLmRyYWdnaW5nLnVuc3Vic2NyaWJlKCk7XHJcbiAgICAgIGQuZHJhZ0VuZC51bnN1YnNjcmliZSgpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICB1cGRhdGVTdWJzY3JpcHRpb25zKCk6IHZvaWQge1xyXG4gICAgY29uc3QgZGlmZnMgPSB0aGlzLmRpZmZlci5kaWZmKHRoaXMuY3JlYXRlTWFwRGlmZnMoKSk7XHJcblxyXG4gICAgaWYgKGRpZmZzKSB7XHJcbiAgICAgIGNvbnN0IHN1YnNjcmliZSA9ICh7IGN1cnJlbnRWYWx1ZSwgcHJldmlvdXNWYWx1ZSB9OiBhbnkpID0+IHtcclxuICAgICAgICB1bnN1YnNjcmliZSh7IHByZXZpb3VzVmFsdWUgfSk7XHJcblxyXG4gICAgICAgIGlmIChjdXJyZW50VmFsdWUpIHtcclxuICAgICAgICAgIGN1cnJlbnRWYWx1ZS5kcmFnU3RhcnQuc3Vic2NyaWJlKHRoaXMub25EcmFnU3RhcnQuYmluZCh0aGlzKSk7XHJcbiAgICAgICAgICBjdXJyZW50VmFsdWUuZHJhZ2dpbmcuc3Vic2NyaWJlKHRoaXMub25EcmFnZ2luZy5iaW5kKHRoaXMpKTtcclxuICAgICAgICAgIGN1cnJlbnRWYWx1ZS5kcmFnRW5kLnN1YnNjcmliZSh0aGlzLm9uRHJhZ0VuZC5iaW5kKHRoaXMpKTtcclxuICAgICAgICB9XHJcbiAgICAgIH07XHJcblxyXG4gICAgICBjb25zdCB1bnN1YnNjcmliZSA9ICh7IHByZXZpb3VzVmFsdWUgfTogYW55KSA9PiB7XHJcbiAgICAgICAgaWYgKHByZXZpb3VzVmFsdWUpIHtcclxuICAgICAgICAgIHByZXZpb3VzVmFsdWUuZHJhZ1N0YXJ0LnVuc3Vic2NyaWJlKCk7XHJcbiAgICAgICAgICBwcmV2aW91c1ZhbHVlLmRyYWdnaW5nLnVuc3Vic2NyaWJlKCk7XHJcbiAgICAgICAgICBwcmV2aW91c1ZhbHVlLmRyYWdFbmQudW5zdWJzY3JpYmUoKTtcclxuICAgICAgICB9XHJcbiAgICAgIH07XHJcblxyXG4gICAgICBkaWZmcy5mb3JFYWNoQWRkZWRJdGVtKHN1YnNjcmliZSk7XHJcbiAgICAgIC8vIGRpZmZzLmZvckVhY2hDaGFuZ2VkSXRlbShzdWJzY3JpYmUuYmluZCh0aGlzKSk7XHJcbiAgICAgIGRpZmZzLmZvckVhY2hSZW1vdmVkSXRlbSh1bnN1YnNjcmliZSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBvbkRyYWdTdGFydCgpOiB2b2lkIHtcclxuICAgIHRoaXMucG9zaXRpb25zID0ge307XHJcblxyXG4gICAgbGV0IGkgPSAwO1xyXG4gICAgZm9yIChjb25zdCBkcmFnZ2VyIG9mIHRoaXMuZHJhZ2dhYmxlcy50b0FycmF5KCkpIHtcclxuICAgICAgY29uc3QgZWxtID0gZHJhZ2dlci5lbGVtZW50O1xyXG4gICAgICBjb25zdCBsZWZ0ID0gcGFyc2VJbnQoZWxtLm9mZnNldExlZnQudG9TdHJpbmcoKSwgMCk7XHJcbiAgICAgIHRoaXMucG9zaXRpb25zW2RyYWdnZXIuZHJhZ01vZGVsLnByb3BdID0ge1xyXG4gICAgICAgIGxlZnQsXHJcbiAgICAgICAgcmlnaHQ6IGxlZnQgKyBwYXJzZUludChlbG0ub2Zmc2V0V2lkdGgudG9TdHJpbmcoKSwgMCksXHJcbiAgICAgICAgaW5kZXg6IGkrKyxcclxuICAgICAgICBlbGVtZW50OiBlbG1cclxuICAgICAgfTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIG9uRHJhZ2dpbmcoeyBlbGVtZW50LCBtb2RlbCwgZXZlbnQgfTogYW55KTogdm9pZCB7XHJcbiAgICBjb25zdCBwcmV2UG9zID0gdGhpcy5wb3NpdGlvbnNbbW9kZWwucHJvcF07XHJcbiAgICBjb25zdCB0YXJnZXQgPSB0aGlzLmlzVGFyZ2V0KG1vZGVsLCBldmVudCk7XHJcblxyXG4gICAgaWYgKHRhcmdldCkge1xyXG4gICAgICBpZiAodGhpcy5sYXN0RHJhZ2dpbmdJbmRleCAhPT0gdGFyZ2V0LmkpIHtcclxuICAgICAgICB0aGlzLnRhcmdldENoYW5nZWQuZW1pdCh7XHJcbiAgICAgICAgICBwcmV2SW5kZXg6IHRoaXMubGFzdERyYWdnaW5nSW5kZXgsXHJcbiAgICAgICAgICBuZXdJbmRleDogdGFyZ2V0LmksXHJcbiAgICAgICAgICBpbml0aWFsSW5kZXg6IHByZXZQb3MuaW5kZXhcclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLmxhc3REcmFnZ2luZ0luZGV4ID0gdGFyZ2V0Lmk7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSBpZiAodGhpcy5sYXN0RHJhZ2dpbmdJbmRleCAhPT0gcHJldlBvcy5pbmRleCkge1xyXG4gICAgICB0aGlzLnRhcmdldENoYW5nZWQuZW1pdCh7XHJcbiAgICAgICAgcHJldkluZGV4OiB0aGlzLmxhc3REcmFnZ2luZ0luZGV4LFxyXG4gICAgICAgIGluaXRpYWxJbmRleDogcHJldlBvcy5pbmRleFxyXG4gICAgICB9KTtcclxuICAgICAgdGhpcy5sYXN0RHJhZ2dpbmdJbmRleCA9IHByZXZQb3MuaW5kZXg7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBvbkRyYWdFbmQoeyBlbGVtZW50LCBtb2RlbCwgZXZlbnQgfTogYW55KTogdm9pZCB7XHJcbiAgICBjb25zdCBwcmV2UG9zID0gdGhpcy5wb3NpdGlvbnNbbW9kZWwucHJvcF07XHJcblxyXG4gICAgY29uc3QgdGFyZ2V0ID0gdGhpcy5pc1RhcmdldChtb2RlbCwgZXZlbnQpO1xyXG4gICAgaWYgKHRhcmdldCkge1xyXG4gICAgICB0aGlzLnJlb3JkZXIuZW1pdCh7XHJcbiAgICAgICAgcHJldkluZGV4OiBwcmV2UG9zLmluZGV4LFxyXG4gICAgICAgIG5ld0luZGV4OiB0YXJnZXQuaSxcclxuICAgICAgICBtb2RlbFxyXG4gICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLmxhc3REcmFnZ2luZ0luZGV4ID0gdW5kZWZpbmVkO1xyXG4gICAgZWxlbWVudC5zdHlsZS5sZWZ0ID0gJ2F1dG8nO1xyXG4gIH1cclxuXHJcbiAgaXNUYXJnZXQobW9kZWw6IGFueSwgZXZlbnQ6IGFueSk6IGFueSB7XHJcbiAgICBsZXQgaSA9IDA7XHJcbiAgICBjb25zdCB4ID0gZXZlbnQueCB8fCBldmVudC5jbGllbnRYO1xyXG4gICAgY29uc3QgeSA9IGV2ZW50LnkgfHwgZXZlbnQuY2xpZW50WTtcclxuICAgIGNvbnN0IHRhcmdldHMgPSB0aGlzLmRvY3VtZW50LmVsZW1lbnRzRnJvbVBvaW50KHgsIHkpO1xyXG5cclxuICAgIGZvciAoY29uc3QgcHJvcCBpbiB0aGlzLnBvc2l0aW9ucykge1xyXG4gICAgICAvLyBjdXJyZW50IGNvbHVtbiBwb3NpdGlvbiB3aGljaCB0aHJvd3MgZXZlbnQuXHJcbiAgICAgIGNvbnN0IHBvcyA9IHRoaXMucG9zaXRpb25zW3Byb3BdO1xyXG5cclxuICAgICAgLy8gc2luY2Ugd2UgZHJhZyB0aGUgaW5uZXIgc3Bhbiwgd2UgbmVlZCB0byBmaW5kIGl0IGluIHRoZSBlbGVtZW50cyBhdCB0aGUgY3Vyc29yXHJcbiAgICAgIGlmIChtb2RlbC5wcm9wICE9PSBwcm9wICYmIHRhcmdldHMuZmluZCgoZWw6IGFueSkgPT4gZWwgPT09IHBvcy5lbGVtZW50KSkge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICBwb3MsXHJcbiAgICAgICAgICBpXHJcbiAgICAgICAgfTtcclxuICAgICAgfVxyXG5cclxuICAgICAgaSsrO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBjcmVhdGVNYXBEaWZmcygpOiB7IFtrZXk6IHN0cmluZ106IERyYWdnYWJsZURpcmVjdGl2ZSB9IHtcclxuICAgIHJldHVybiB0aGlzLmRyYWdnYWJsZXMudG9BcnJheSgpLnJlZHVjZSgoYWNjLCBjdXJyKSA9PiB7XHJcbiAgICAgIGFjY1tjdXJyLmRyYWdNb2RlbC4kJGlkXSA9IGN1cnI7XHJcbiAgICAgIHJldHVybiBhY2M7XHJcbiAgICB9LCB7fSk7XHJcbiAgfVxyXG59XHJcbiJdfQ==