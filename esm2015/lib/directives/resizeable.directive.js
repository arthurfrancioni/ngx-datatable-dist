import { Directive, ElementRef, HostListener, Input, Output, EventEmitter, Renderer2 } from '@angular/core';
import { fromEvent } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
export class ResizeableDirective {
    constructor(element, renderer) {
        this.renderer = renderer;
        this.resizeEnabled = true;
        this.resize = new EventEmitter();
        this.resizing = false;
        this.element = element.nativeElement;
    }
    ngAfterViewInit() {
        const renderer2 = this.renderer;
        this.resizeHandle = renderer2.createElement('span');
        if (this.resizeEnabled) {
            renderer2.addClass(this.resizeHandle, 'resize-handle');
        }
        else {
            renderer2.addClass(this.resizeHandle, 'resize-handle--not-resizable');
        }
        renderer2.appendChild(this.element, this.resizeHandle);
    }
    ngOnDestroy() {
        this._destroySubscription();
        if (this.renderer.destroyNode) {
            this.renderer.destroyNode(this.resizeHandle);
        }
        else if (this.resizeHandle) {
            this.renderer.removeChild(this.renderer.parentNode(this.resizeHandle), this.resizeHandle);
        }
    }
    onMouseup() {
        this.resizing = false;
        if (this.subscription && !this.subscription.closed) {
            this._destroySubscription();
            this.resize.emit(this.element.clientWidth);
        }
    }
    onMousedown(event) {
        const isHandle = event.target.classList.contains('resize-handle');
        const initialWidth = this.element.clientWidth;
        const mouseDownScreenX = event.screenX;
        if (isHandle) {
            event.stopPropagation();
            this.resizing = true;
            const mouseup = fromEvent(document, 'mouseup');
            this.subscription = mouseup.subscribe((ev) => this.onMouseup());
            const mouseMoveSub = fromEvent(document, 'mousemove')
                .pipe(takeUntil(mouseup))
                .subscribe((e) => this.move(e, initialWidth, mouseDownScreenX));
            this.subscription.add(mouseMoveSub);
        }
    }
    move(event, initialWidth, mouseDownScreenX) {
        const movementX = event.screenX - mouseDownScreenX;
        const newWidth = initialWidth + movementX;
        const overMinWidth = !this.minWidth || newWidth >= this.minWidth;
        const underMaxWidth = !this.maxWidth || newWidth <= this.maxWidth;
        if (overMinWidth && underMaxWidth) {
            this.element.style.width = `${newWidth}px`;
        }
    }
    _destroySubscription() {
        if (this.subscription) {
            this.subscription.unsubscribe();
            this.subscription = undefined;
        }
    }
}
ResizeableDirective.decorators = [
    { type: Directive, args: [{
                selector: '[resizeable]',
                host: {
                    '[class.resizeable]': 'resizeEnabled'
                }
            },] }
];
ResizeableDirective.ctorParameters = () => [
    { type: ElementRef },
    { type: Renderer2 }
];
ResizeableDirective.propDecorators = {
    resizeEnabled: [{ type: Input }],
    minWidth: [{ type: Input }],
    maxWidth: [{ type: Input }],
    resize: [{ type: Output }],
    onMousedown: [{ type: HostListener, args: ['mousedown', ['$event'],] }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzaXplYWJsZS5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9zd2ltbGFuZS9uZ3gtZGF0YXRhYmxlL3NyYy9saWIvZGlyZWN0aXZlcy9yZXNpemVhYmxlLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUNULFVBQVUsRUFDVixZQUFZLEVBQ1osS0FBSyxFQUNMLE1BQU0sRUFDTixZQUFZLEVBR1osU0FBUyxFQUNWLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBZ0IsU0FBUyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQy9DLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQVEzQyxNQUFNLE9BQU8sbUJBQW1CO0lBWTlCLFlBQVksT0FBbUIsRUFBVSxRQUFtQjtRQUFuQixhQUFRLEdBQVIsUUFBUSxDQUFXO1FBWG5ELGtCQUFhLEdBQVksSUFBSSxDQUFDO1FBSTdCLFdBQU0sR0FBc0IsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUl6RCxhQUFRLEdBQVksS0FBSyxDQUFDO1FBSXhCLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDLGFBQWEsQ0FBQztJQUN2QyxDQUFDO0lBRUQsZUFBZTtRQUNiLE1BQU0sU0FBUyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUM7UUFDaEMsSUFBSSxDQUFDLFlBQVksR0FBRyxTQUFTLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3BELElBQUksSUFBSSxDQUFDLGFBQWEsRUFBRTtZQUN0QixTQUFTLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUUsZUFBZSxDQUFDLENBQUM7U0FDeEQ7YUFBTTtZQUNMLFNBQVMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRSw4QkFBOEIsQ0FBQyxDQUFDO1NBQ3ZFO1FBQ0QsU0FBUyxDQUFDLFdB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SUFBSSxDQUFDLFlBQVksR0FBRyxTQUFTLENBQUM7U0FDL0I7SUFDSCxDQUFDOzs7WUF6RkYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxjQUFjO2dCQUN4QixJQUFJLEVBQUU7b0JBQ0osb0JBQW9CLEVBQUUsZUFBZTtpQkFDdEM7YUFDRjs7O1lBakJDLFVBQVU7WUFPVixTQUFTOzs7NEJBWVIsS0FBSzt1QkFDTCxLQUFLO3VCQUNMLEtBQUs7cUJBRUwsTUFBTTswQkF3Q04sWUFBWSxTQUFDLFdBQVcsRUFBRSxDQUFDLFFBQVEsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XHJcbiAgRGlyZWN0aXZlLFxyXG4gIEVsZW1lbnRSZWYsXHJcbiAgSG9zdExpc3RlbmVyLFxyXG4gIElucHV0LFxyXG4gIE91dHB1dCxcclxuICBFdmVudEVtaXR0ZXIsXHJcbiAgT25EZXN0cm95LFxyXG4gIEFmdGVyVmlld0luaXQsXHJcbiAgUmVuZGVyZXIyXHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiwgZnJvbUV2ZW50IH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7IHRha2VVbnRpbCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcclxuXHJcbkBEaXJlY3RpdmUoe1xyXG4gIHNlbGVjdG9yOiAnW3Jlc2l6ZWFibGVdJyxcclxuICBob3N0OiB7XHJcbiAgICAnW2NsYXNzLnJlc2l6ZWFibGVdJzogJ3Jlc2l6ZUVuYWJsZWQnXHJcbiAgfVxyXG59KVxyXG5leHBvcnQgY2xhc3MgUmVzaXplYWJsZURpcmVjdGl2ZSBpbXBsZW1lbnRzIE9uRGVzdHJveSwgQWZ0ZXJWaWV3SW5pdCB7XHJcbiAgQElucHV0KCkgcmVzaXplRW5hYmxlZDogYm9vbGVhbiA9IHRydWU7XHJcbiAgQElucHV0KCkgbWluV2lkdGg6IG51bWJlcjtcclxuICBASW5wdXQoKSBtYXhXaWR0aDogbnVtYmVyO1xyXG5cclxuICBAT3V0cHV0KCkgcmVzaXplOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuXHJcbiAgZWxlbWVudDogSFRNTEVsZW1lbnQ7XHJcbiAgc3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XHJcbiAgcmVzaXppbmc6IGJvb2xlYW4gPSBmYWxzZTtcclxuICBwcml2YXRlIHJlc2l6ZUhhbmRsZTogSFRNTEVsZW1lbnQ7XHJcblxyXG4gIGNvbnN0cnVjdG9yKGVsZW1lbnQ6IEVsZW1lbnRSZWYsIHByaXZhdGUgcmVuZGVyZXI6IFJlbmRlcmVyMikge1xyXG4gICAgdGhpcy5lbGVtZW50ID0gZWxlbWVudC5uYXRpdmVFbGVtZW50O1xyXG4gIH1cclxuXHJcbiAgbmdBZnRlclZpZXdJbml0KCk6IHZvaWQge1xyXG4gICAgY29uc3QgcmVuZGVyZXIyID0gdGhpcy5yZW5kZXJlcjtcclxuICAgIHRoaXMucmVzaXplSGFuZGxlID0gcmVuZGVyZXIyLmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcclxuICAgIGlmICh0aGlzLnJlc2l6ZUVuYWJsZWQpIHtcclxuICAgICAgcmVuZGVyZXIyLmFkZENsYXNzKHRoaXMucmVzaXplSGFuZGxlLCAncmVzaXplLWhhbmRsZScpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgcmVuZGVyZXIyLmFkZENsYXNzKHRoaXMucmVzaXplSGFuZGxlLCAncmVzaXplLWhhbmRsZS0tbm90LXJlc2l6YWJsZScpO1xyXG4gICAgfVxyXG4gICAgcmVuZGVyZXIyLmFwcGVuZENoaWxkKHRoaXMuZWxlbWVudCwgdGhpcy5yZXNpemVIYW5kbGUpO1xyXG4gIH1cclxuXHJcbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XHJcbiAgICB0aGlzLl9kZXN0cm95U3Vic2NyaXB0aW9uKCk7XHJcbiAgICBpZiAodGhpcy5yZW5kZXJlci5kZXN0cm95Tm9kZSkge1xyXG4gICAgICB0aGlzLnJlbmRlcmVyLmRlc3Ryb3lOb2RlKHRoaXMucmVzaXplSGFuZGxlKTtcclxuICAgIH0gZWxzZSBpZiAodGhpcy5yZXNpemVIYW5kbGUpIHtcclxuICAgICAgdGhpcy5yZW5kZXJlci5yZW1vdmVDaGlsZCh0aGlzLnJlbmRlcmVyLnBhcmVudE5vZGUodGhpcy5yZXNpemVIYW5kbGUpLCB0aGlzLnJlc2l6ZUhhbmRsZSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBvbk1vdXNldXAoKTogdm9pZCB7XHJcbiAgICB0aGlzLnJlc2l6aW5nID0gZmFsc2U7XHJcblxyXG4gICAgaWYgKHRoaXMuc3Vic2NyaXB0aW9uICYmICF0aGlzLnN1YnNjcmlwdGlvbi5jbG9zZWQpIHtcclxuICAgICAgdGhpcy5fZGVzdHJveVN1YnNjcmlwdGlvbigpO1xyXG4gICAgICB0aGlzLnJlc2l6ZS5lbWl0KHRoaXMuZWxlbWVudC5jbGllbnRXaWR0aCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBASG9zdExpc3RlbmVyKCdtb3VzZWRvd24nLCBbJyRldmVudCddKVxyXG4gIG9uTW91c2Vkb3duKGV2ZW50OiBNb3VzZUV2ZW50KTogdm9pZCB7XHJcbiAgICBjb25zdCBpc0hhbmRsZSA9ICg8SFRNTEVsZW1lbnQ+ZXZlbnQudGFyZ2V0KS5jbGFzc0xpc3QuY29udGFpbnMoJ3Jlc2l6ZS1oYW5kbGUnKTtcclxuICAgIGNvbnN0IGluaXRpYWxXaWR0aCA9IHRoaXMuZWxlbWVudC5jbGllbnRXaWR0aDtcclxuICAgIGNvbnN0IG1vdXNlRG93blNjcmVlblggPSBldmVudC5zY3JlZW5YO1xyXG5cclxuICAgIGlmIChpc0hhbmRsZSkge1xyXG4gICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgdGhpcy5yZXNpemluZyA9IHRydWU7XHJcblxyXG4gICAgICBjb25zdCBtb3VzZXVwID0gZnJvbUV2ZW50KGRvY3VtZW50LCAnbW91c2V1cCcpO1xyXG4gICAgICB0aGlzLnN1YnNjcmlwdGlvbiA9IG1vdXNldXAuc3Vic2NyaWJlKChldjogTW91c2VFdmVudCkgPT4gdGhpcy5vbk1vdXNldXAoKSk7XHJcblxyXG4gICAgICBjb25zdCBtb3VzZU1vdmVTdWIgPSBmcm9tRXZlbnQoZG9jdW1lbnQsICdtb3VzZW1vdmUnKVxyXG4gICAgICAgIC5waXBlKHRha2VVbnRpbChtb3VzZXVwKSlcclxuICAgICAgICAuc3Vic2NyaWJlKChlOiBNb3VzZUV2ZW50KSA9PiB0aGlzLm1vdmUoZSwgaW5pdGlhbFdpZHRoLCBtb3VzZURvd25TY3JlZW5YKSk7XHJcblxyXG4gICAgICB0aGlzLnN1YnNjcmlwdGlvbi5hZGQobW91c2VNb3ZlU3ViKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIG1vdmUoZXZlbnQ6IE1vdXNlRXZlbnQsIGluaXRpYWxXaWR0aDogbnVtYmVyLCBtb3VzZURvd25TY3JlZW5YOiBudW1iZXIpOiB2b2lkIHtcclxuICAgIGNvbnN0IG1vdmVtZW50WCA9IGV2ZW50LnNjcmVlblggLSBtb3VzZURvd25TY3JlZW5YO1xyXG4gICAgY29uc3QgbmV3V2lkdGggPSBpbml0aWFsV2lkdGggKyBtb3ZlbWVudFg7XHJcblxyXG4gICAgY29uc3Qgb3Zlck1pbldpZHRoID0gIXRoaXMubWluV2lkdGggfHwgbmV3V2lkdGggPj0gdGhpcy5taW5XaWR0aDtcclxuICAgIGNvbnN0IHVuZGVyTWF4V2lkdGggPSAhdGhpcy5tYXhXaWR0aCB8fCBuZXdXaWR0aCA8PSB0aGlzLm1heFdpZHRoO1xyXG5cclxuICAgIGlmIChvdmVyTWluV2lkdGggJiYgdW5kZXJNYXhXaWR0aCkge1xyXG4gICAgICB0aGlzLmVsZW1lbnQuc3R5bGUud2lkdGggPSBgJHtuZXdXaWR0aH1weGA7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIF9kZXN0cm95U3Vic2NyaXB0aW9uKCkge1xyXG4gICAgaWYgKHRoaXMuc3Vic2NyaXB0aW9uKSB7XHJcbiAgICAgIHRoaXMuc3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XHJcbiAgICAgIHRoaXMuc3Vic2NyaXB0aW9uID0gdW5kZWZpbmVkO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG4iXX0=