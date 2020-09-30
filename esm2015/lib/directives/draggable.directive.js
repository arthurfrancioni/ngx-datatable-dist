import { Directive, ElementRef, Input, Output, EventEmitter } from '@angular/core';
import { fromEvent } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
/**
 * Draggable Directive for Angular2
 *
 * Inspiration:
 *   https://github.com/AngularClass/angular2-examples/blob/master/rx-draggable/directives/draggable.ts
 *   http://stackoverflow.com/questions/35662530/how-to-implement-drag-and-drop-in-angular2
 *
 */
export class DraggableDirective {
    constructor(element) {
        this.dragX = true;
        this.dragY = true;
        this.dragStart = new EventEmitter();
        this.dragging = new EventEmitter();
        this.dragEnd = new EventEmitter();
        this.isDragging = false;
        this.element = element.nativeElement;
    }
    ngOnChanges(changes) {
        if (changes['dragEventTarget'] && changes['dragEventTarget'].currentValue && this.dragModel.dragging) {
            this.onMousedown(changes['dragEventTarget'].currentValue);
        }
    }
    ngOnDestroy() {
        this._destroySubscription();
    }
    onMouseup(event) {
        if (!this.isDragging)
            return;
        this.isDragging = false;
        this.element.classList.remove('dragging');
        if (this.subscription) {
            this._destroySubscription();
            this.dragEnd.emit({
                event,
                element: this.element,
                model: this.dragModel
            });
        }
    }
    onMousedown(event) {
        // we only want to drag the inner header text
        const isDragElm = event.target.classList.contains('draggable');
        if (isDragElm && (this.dragX || this.dragY)) {
            event.preventDefault();
            this.isDragging = true;
            const mouseDownPos = { x: event.clientX, y: event.clientY };
            const mouseup = fromEvent(document, 'mouseup');
            this.subscription = mouseup.subscribe((ev) => this.onMouseup(ev));
            const mouseMoveSub = fromEvent(document, 'mousemove')
                .pipe(takeUntil(mouseup))
                .subscribe((ev) => this.move(ev, mouseDownPos));
            this.subscription.add(mouseMoveSub);
            this.dragStart.emit({
                event,
                element: this.element,
                model: this.dragModel
            });
        }
    }
    move(event, mouseDownPos) {
        if (!this.isDragging)
            return;
        const x = event.clientX - mouseDownPos.x;
        const y = event.clientY - mouseDownPos.y;
        if (this.dragX)
            this.element.style.left = `${x}px`;
        if (this.dragY)
            this.element.style.top = `${y}px`;
        this.element.classList.add('dragging');
        this.dragging.emit({
            event,
            element: this.element,
            model: this.dragModel
        });
    }
    _destroySubscription() {
        if (this.subscription) {
            this.subscription.unsubscribe();
            this.subscription = undefined;
        }
    }
}
DraggableDirective.decorators = [
    { type: Directive, args: [{ selector: '[draggable]' },] }
];
DraggableDirective.ctorParameters = () => [
    { type: ElementRef }
];
DraggableDirective.propDecorators = {
    dragEventTarget: [{ type: Input }],
    dragModel: [{ type: Input }],
    dragX: [{ type: Input }],
    dragY: [{ type: Input }],
    dragStart: [{ type: Output }],
    dragging: [{ type: Output }],
    dragEnd: [{ type: Output }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHJhZ2dhYmxlLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL3N3aW1sYW5lL25neC1kYXRhdGFibGUvc3JjL2xpYi9kaXJlY3RpdmVzL2RyYWdnYWJsZS5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxZQUFZLEVBQXVDLE1BQU0sZUFBZSxDQUFDO0FBQ3hILE9BQU8sRUFBZ0IsU0FBUyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQy9DLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUUzQzs7Ozs7OztHQU9HO0FBRUgsTUFBTSxPQUFPLGtCQUFrQjtJQWM3QixZQUFZLE9BQW1CO1FBWHRCLFVBQUssR0FBWSxJQUFJLENBQUM7UUFDdEIsVUFBSyxHQUFZLElBQUksQ0FBQztRQUVyQixjQUFTLEdBQXNCLElBQUksWUFBWSxFQUFFLENBQUM7UUFDbEQsYUFBUSxHQUFzQixJQUFJLFlBQVksRUFBRSxDQUFDO1FBQ2pELFlBQU8sR0FBc0IsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUcxRCxlQUFVLEdBQVksS0FBSyxDQUFDO1FBSTFCLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDLGFBQWEsQ0FBQztJQUN2QyxDQUFDO0lBRUQsV0FBVyxDQUFDLE9BQXNCO1FBQ2hDLElBQUksT0FBTyxDQUFDLGlCQUFpQixDQUFDLElBQUksT0FBTyxDQUFDLGlCQUFpQixDQUFDLENBQUMsWUFBWSxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxFQUFFO1lBQ3BHLElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLGlCQUFpQixDQUFDLENBQUMsWUFBWSxDQUFDLENBQUM7U0FDM0Q7SUFDSCxDQUFDO0lBRUQsV0FBVztRQUNULElBQUksQ0FBQyxvQkFBb0Is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RSxJQUFJLENBQUMsU0FBUztTQUN0QixDQUFDLENBQUM7SUFDTCxDQUFDO0lBRU8sb0JBQW9CO1FBQzFCLElBQUksSUFBSSxDQUFDLFlBQVksRUFBRTtZQUNyQixJQUFJLENBQUMsWUFBWSxDQUFDLFdBQVcsRUFBRSxDQUFDO1lBQ2hDLElBQUksQ0FBQyxZQUFZLEdBQUcsU0FBUyxDQUFDO1NBQy9CO0lBQ0gsQ0FBQzs7O1lBL0ZGLFNBQVMsU0FBQyxFQUFFLFFBQVEsRUFBRSxhQUFhLEVBQUU7OztZQVpsQixVQUFVOzs7OEJBYzNCLEtBQUs7d0JBQ0wsS0FBSztvQkFDTCxLQUFLO29CQUNMLEtBQUs7d0JBRUwsTUFBTTt1QkFDTixNQUFNO3NCQUNOLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEaXJlY3RpdmUsIEVsZW1lbnRSZWYsIElucHV0LCBPdXRwdXQsIEV2ZW50RW1pdHRlciwgT25EZXN0cm95LCBPbkNoYW5nZXMsIFNpbXBsZUNoYW5nZXMgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgU3Vic2NyaXB0aW9uLCBmcm9tRXZlbnQgfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHsgdGFrZVVudGlsIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xyXG5cclxuLyoqXHJcbiAqIERyYWdnYWJsZSBEaXJlY3RpdmUgZm9yIEFuZ3VsYXIyXHJcbiAqXHJcbiAqIEluc3BpcmF0aW9uOlxyXG4gKiAgIGh0dHBzOi8vZ2l0aHViLmNvbS9Bbmd1bGFyQ2xhc3MvYW5ndWxhcjItZXhhbXBsZXMvYmxvYi9tYXN0ZXIvcngtZHJhZ2dhYmxlL2RpcmVjdGl2ZXMvZHJhZ2dhYmxlLnRzXHJcbiAqICAgaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy8zNTY2MjUzMC9ob3ctdG8taW1wbGVtZW50LWRyYWctYW5kLWRyb3AtaW4tYW5ndWxhcjJcclxuICpcclxuICovXHJcbkBEaXJlY3RpdmUoeyBzZWxlY3RvcjogJ1tkcmFnZ2FibGVdJyB9KVxyXG5leHBvcnQgY2xhc3MgRHJhZ2dhYmxlRGlyZWN0aXZlIGltcGxlbWVudHMgT25EZXN0cm95LCBPbkNoYW5nZXMge1xyXG4gIEBJbnB1dCgpIGRyYWdFdmVudFRhcmdldDogYW55O1xyXG4gIEBJbnB1dCgpIGRyYWdNb2RlbDogYW55O1xyXG4gIEBJbnB1dCgpIGRyYWdYOiBib29sZWFuID0gdHJ1ZTtcclxuICBASW5wdXQoKSBkcmFnWTogYm9vbGVhbiA9IHRydWU7XHJcblxyXG4gIEBPdXRwdXQoKSBkcmFnU3RhcnQ6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG4gIEBPdXRwdXQoKSBkcmFnZ2luZzogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcbiAgQE91dHB1dCgpIGRyYWdFbmQ6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG5cclxuICBlbGVtZW50OiBIVE1MRWxlbWVudDtcclxuICBpc0RyYWdnaW5nOiBib29sZWFuID0gZmFsc2U7XHJcbiAgc3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XHJcblxyXG4gIGNvbnN0cnVjdG9yKGVsZW1lbnQ6IEVsZW1lbnRSZWYpIHtcclxuICAgIHRoaXMuZWxlbWVudCA9IGVsZW1lbnQubmF0aXZlRWxlbWVudDtcclxuICB9XHJcblxyXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpOiB2b2lkIHtcclxuICAgIGlmIChjaGFuZ2VzWydkcmFnRXZlbnRUYXJnZXQnXSAmJiBjaGFuZ2VzWydkcmFnRXZlbnRUYXJnZXQnXS5jdXJyZW50VmFsdWUgJiYgdGhpcy5kcmFnTW9kZWwuZHJhZ2dpbmcpIHtcclxuICAgICAgdGhpcy5vbk1vdXNlZG93bihjaGFuZ2VzWydkcmFnRXZlbnRUYXJnZXQnXS5jdXJyZW50VmFsdWUpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XHJcbiAgICB0aGlzLl9kZXN0cm95U3Vic2NyaXB0aW9uKCk7XHJcbiAgfVxyXG5cclxuICBvbk1vdXNldXAoZXZlbnQ6IE1vdXNlRXZlbnQpOiB2b2lkIHtcclxuICAgIGlmICghdGhpcy5pc0RyYWdnaW5nKSByZXR1cm47XHJcblxyXG4gICAgdGhpcy5pc0RyYWdnaW5nID0gZmFsc2U7XHJcbiAgICB0aGlzLmVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZSgnZHJhZ2dpbmcnKTtcclxuXHJcbiAgICBpZiAodGhpcy5zdWJzY3JpcHRpb24pIHtcclxuICAgICAgdGhpcy5fZGVzdHJveVN1YnNjcmlwdGlvbigpO1xyXG4gICAgICB0aGlzLmRyYWdFbmQuZW1pdCh7XHJcbiAgICAgICAgZXZlbnQsXHJcbiAgICAgICAgZWxlbWVudDogdGhpcy5lbGVtZW50LFxyXG4gICAgICAgIG1vZGVsOiB0aGlzLmRyYWdNb2RlbFxyXG4gICAgICB9KTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIG9uTW91c2Vkb3duKGV2ZW50OiBNb3VzZUV2ZW50KTogdm9pZCB7XHJcbiAgICAvLyB3ZSBvbmx5IHdhbnQgdG8gZHJhZyB0aGUgaW5uZXIgaGVhZGVyIHRleHRcclxuICAgIGNvbnN0IGlzRHJhZ0VsbSA9ICg8SFRNTEVsZW1lbnQ+ZXZlbnQudGFyZ2V0KS5jbGFzc0xpc3QuY29udGFpbnMoJ2RyYWdnYWJsZScpO1xyXG5cclxuICAgIGlmIChpc0RyYWdFbG0gJiYgKHRoaXMuZHJhZ1ggfHwgdGhpcy5kcmFnWSkpIHtcclxuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgdGhpcy5pc0RyYWdnaW5nID0gdHJ1ZTtcclxuXHJcbiAgICAgIGNvbnN0IG1vdXNlRG93blBvcyA9IHsgeDogZXZlbnQuY2xpZW50WCwgeTogZXZlbnQuY2xpZW50WSB9O1xyXG5cclxuICAgICAgY29uc3QgbW91c2V1cCA9IGZyb21FdmVudChkb2N1bWVudCwgJ21vdXNldXAnKTtcclxuICAgICAgdGhpcy5zdWJzY3JpcHRpb24gPSBtb3VzZXVwLnN1YnNjcmliZSgoZXY6IE1vdXNlRXZlbnQpID0+IHRoaXMub25Nb3VzZXVwKGV2KSk7XHJcblxyXG4gICAgICBjb25zdCBtb3VzZU1vdmVTdWIgPSBmcm9tRXZlbnQoZG9jdW1lbnQsICdtb3VzZW1vdmUnKVxyXG4gICAgICAgIC5waXBlKHRha2VVbnRpbChtb3VzZXVwKSlcclxuICAgICAgICAuc3Vic2NyaWJlKChldjogTW91c2VFdmVudCkgPT4gdGhpcy5tb3ZlKGV2LCBtb3VzZURvd25Qb3MpKTtcclxuXHJcbiAgICAgIHRoaXMuc3Vic2NyaXB0aW9uLmFkZChtb3VzZU1vdmVTdWIpO1xyXG5cclxuICAgICAgdGhpcy5kcmFnU3RhcnQuZW1pdCh7XHJcbiAgICAgICAgZXZlbnQsXHJcbiAgICAgICAgZWxlbWVudDogdGhpcy5lbGVtZW50LFxyXG4gICAgICAgIG1vZGVsOiB0aGlzLmRyYWdNb2RlbFxyXG4gICAgICB9KTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIG1vdmUoZXZlbnQ6IE1vdXNlRXZlbnQsIG1vdXNlRG93blBvczogeyB4OiBudW1iZXI7IHk6IG51bWJlciB9KTogdm9pZCB7XHJcbiAgICBpZiAoIXRoaXMuaXNEcmFnZ2luZykgcmV0dXJuO1xyXG5cclxuICAgIGNvbnN0IHggPSBldmVudC5jbGllbnRYIC0gbW91c2VEb3duUG9zLng7XHJcbiAgICBjb25zdCB5ID0gZXZlbnQuY2xpZW50WSAtIG1vdXNlRG93blBvcy55O1xyXG5cclxuICAgIGlmICh0aGlzLmRyYWdYKSB0aGlzLmVsZW1lbnQuc3R5bGUubGVmdCA9IGAke3h9cHhgO1xyXG4gICAgaWYgKHRoaXMuZHJhZ1kpIHRoaXMuZWxlbWVudC5zdHlsZS50b3AgPSBgJHt5fXB4YDtcclxuXHJcbiAgICB0aGlzLmVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnZHJhZ2dpbmcnKTtcclxuXHJcbiAgICB0aGlzLmRyYWdnaW5nLmVtaXQoe1xyXG4gICAgICBldmVudCxcclxuICAgICAgZWxlbWVudDogdGhpcy5lbGVtZW50LFxyXG4gICAgICBtb2RlbDogdGhpcy5kcmFnTW9kZWxcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBfZGVzdHJveVN1YnNjcmlwdGlvbigpOiB2b2lkIHtcclxuICAgIGlmICh0aGlzLnN1YnNjcmlwdGlvbikge1xyXG4gICAgICB0aGlzLnN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xyXG4gICAgICB0aGlzLnN1YnNjcmlwdGlvbiA9IHVuZGVmaW5lZDtcclxuICAgIH1cclxuICB9XHJcbn1cclxuIl19