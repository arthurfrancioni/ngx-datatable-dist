import { Component, Input, ElementRef, Output, EventEmitter, Renderer2, NgZone, HostBinding, ChangeDetectionStrategy } from '@angular/core';
export class ScrollerComponent {
    constructor(ngZone, element, renderer) {
        this.ngZone = ngZone;
        this.renderer = renderer;
        this.scrollbarV = false;
        this.scrollbarH = false;
        this.scroll = new EventEmitter();
        this.scrollYPos = 0;
        this.scrollXPos = 0;
        this.prevScrollYPos = 0;
        this.prevScrollXPos = 0;
        this._scrollEventListener = null;
        this.element = element.nativeElement;
    }
    ngOnInit() {
        // manual bind so we don't always listen
        if (this.scrollbarV || this.scrollbarH) {
            const renderer = this.renderer;
            this.parentElement = renderer.parentNode(renderer.parentNode(this.element));
            this._scrollEventListener = this.onScrolled.bind(this);
            this.parentElement.addEventListener('scroll', this._scrollEventListener);
        }
    }
    ngOnDestroy() {
        if (this._scrollEventListener) {
            this.parentElement.removeEventListener('scroll', this._scrollEventListener);
            this._scrollEventListener = null;
        }
    }
    setOffset(offsetY) {
        if (this.parentElement) {
            this.parentElement.scrollTop = offsetY;
        }
    }
    onScrolled(event) {
        const dom = event.currentTarget;
        requestAnimationFrame(() => {
            this.scrollYPos = dom.scrollTop;
            this.scrollXPos = dom.scrollLeft;
            this.updateOffset();
        });
    }
    updateOffset() {
        let direction;
        if (this.scrollYPos < this.prevScrollYPos) {
            direction = 'down';
        }
        else if (this.scrollYPos > this.prevScrollYPos) {
            direction = 'up';
        }
        this.scroll.emit({
            direction,
            scrollYPos: this.scrollYPos,
            scrollXPos: this.scrollXPos
        });
        this.prevScrollYPos = this.scrollYPos;
        this.prevScrollXPos = this.scrollXPos;
    }
}
ScrollerComponent.decorators = [
    { type: Component, args: [{
                selector: 'datatable-scroller',
                template: ` <ng-content></ng-content> `,
                host: {
                    class: 'datatable-scroll'
                },
                changeDetection: ChangeDetectionStrategy.OnPush
            },] }
];
ScrollerComponent.ctorParameters = () => [
    { type: NgZone },
    { type: ElementRef },
    { type: Renderer2 }
];
ScrollerComponent.propDecorators = {
    scrollbarV: [{ type: Input }],
    scrollbarH: [{ type: Input }],
    scrollHeight: [{ type: HostBinding, args: ['style.height.px',] }, { type: Input }],
    scrollWidth: [{ type: HostBinding, args: ['style.width.px',] }, { type: Input }],
    scroll: [{ type: Output }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2Nyb2xsZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvc3dpbWxhbmUvbmd4LWRhdGF0YWJsZS9zcmMvbGliL2NvbXBvbmVudHMvYm9keS9zY3JvbGxlci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUNMLFNBQVMsRUFDVCxLQUFLLEVBQ0wsVUFBVSxFQUNWLE1BQU0sRUFDTixZQUFZLEVBQ1osU0FBUyxFQUNULE1BQU0sRUFHTixXQUFXLEVBQ1gsdUJBQXVCLEVBQ3hCLE1BQU0sZUFBZSxDQUFDO0FBWXZCLE1BQU0sT0FBTyxpQkFBaUI7SUF3QjVCLFlBQW9CLE1BQWMsRUFBRSxPQUFtQixFQUFVLFFBQW1CO1FBQWhFLFdBQU0sR0FBTixNQUFNLENBQVE7UUFBK0IsYUFBUSxHQUFSLFFBQVEsQ0FBVztRQXZCM0UsZUFBVSxHQUFZLEtBQUssQ0FBQztRQUM1QixlQUFVLEdBQVksS0FBSyxDQUFDO1FBVTNCLFdBQU0sR0FBc0IsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUV6RCxlQUFVLEdBQVcsQ0FBQyxDQUFDO1FBQ3ZCLGVBQVUsR0FBVyxDQUFDLENBQUM7UUFDdkIsbUJBQWMsR0FBVyxDQUFDLENBQUM7UUFDM0IsbUJBQWMsR0FBVyxDQUFDLENBQUM7UUFLbkIseUJBQW9CLEdBQVEsSUFBSSxDQUFDO1FBR3ZDLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDLGFBQWEsQ0FBQztJQUN2QyxDQUFDO0lBRUQsUUFBUTtRQUNOLHdDQUF3QztRQUN4QyxJQUFJLElBQUksQ0FBQyxVQUFVLElBQUksSUFBSSxDQUFDLFVBQVUsRUFBRTtZQUN0QyxNQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDO1lBQy9CLElBQUksQ0FBQyxhQUFhLEdBQUcsUUFBUSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1lBQzVFLElBQUksQ0FBQyxvQkFBb0IsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUN2RCxJQUFJLENBQUMsYUFBYSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsb0JBQW9CLENBQUMsQ0FBQztTQUMxRTtJQUNILENBQUM7SUFFRCxXQUFXO1FBQ1QsSUFBSSxJQUFJLENBQUMsb0JBQW9CLEVBQUU7WUFDN0IsSUFBSSxDQUFDLGFBQWEsQ0FBQyxtQkFBbUIsQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLG9CQUFvQixDQUFDLENBQUM7WUFDNUUsSUFBSSxDQUFDLG9CQUFvQixHQUFHLElBQUksQ0FBQztTQUNsQztJQUNILENBQUM7SUFFRCxTQUFTLENBQUMsT0FBZTtRQUN2QixJQUFJLElBQUksQ0FBQyxhQUFhLEVBQUU7WUFDdEIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxTQUFTLEdBQUcsT0FBTyxDQUFDO1NBQ3hDO0lBQ0gsQ0FBQztJQUVELFVBQVUsQ0FBQyxLQUFpQjtRQUMxQixNQUFNLEdBQUcsR0FBcUIsS0FBSyxDQUFDLGFBQWEsQ0FBQztRQUNsRCxxQkFBcUIsQ0FBQyxHQUFHLEVBQUU7WUFDekIsSUFBSSxDQUFDLFVBQVUsR0FBRyxHQUFHLENBQUMsU0FBUyxDQUFDO1lBQ2hDLElBQUksQ0FBQyxVQUFVLEdBQUcsR0FBRyxDQUFDLFVBQVUsQ0FBQztZQUNqQyxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7UUFDdEIsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQsWUFBWTtRQUNWLElBQUksU0FBaUIsQ0FBQztRQUN0QixJQUFJLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLGNBQWMsRUFBRTtZQUN6QyxTQUFTLEdBQUcsTUFBTSxDQUFDO1NBQ3BCO2FBQU0sSUFBSSxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxjQUFjLEVBQUU7WUFDaEQsU0FBUyxHQUFHLElBQUksQ0FBQztTQUNsQjtRQUVELElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDO1lBQ2YsU0FBUztZQUNULFVBQVUsRUFBRSxJQUFJLENBQUMsVUFBVTtZQUMzQixVQUFVLEVBQUUsSUFBSSxDQUFDLFVBQVU7U0FDNUIsQ0FBQyxDQUFDO1FBRUgsSUFBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDO1FBQ3RDLElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQztJQUN4QyxDQUFDOzs7WUFwRkYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxvQkFBb0I7Z0JBQzlCLFFBQVEsRUFBRSw2QkFBNkI7Z0JBQ3ZDLElBQUksRUFBRTtvQkFDSixLQUFLLEVBQUUsa0JBQWtCO2lCQUMxQjtnQkFDRCxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTthQUNoRDs7O1lBaEJDLE1BQU07WUFKTixVQUFVO1lBR1YsU0FBUzs7O3lCQW1CUixLQUFLO3lCQUNMLEtBQUs7MkJBRUwsV0FBVyxTQUFDLGlCQUFpQixjQUM3QixLQUFLOzBCQUdMLFdBQVcsU0FBQyxnQkFBZ0IsY0FDNUIsS0FBSztxQkFHTCxNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcclxuICBDb21wb25lbnQsXHJcbiAgSW5wdXQsXHJcbiAgRWxlbWVudFJlZixcclxuICBPdXRwdXQsXHJcbiAgRXZlbnRFbWl0dGVyLFxyXG4gIFJlbmRlcmVyMixcclxuICBOZ1pvbmUsXHJcbiAgT25Jbml0LFxyXG4gIE9uRGVzdHJveSxcclxuICBIb3N0QmluZGluZyxcclxuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneVxyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuaW1wb3J0IHsgTW91c2VFdmVudCB9IGZyb20gJy4uLy4uL2V2ZW50cyc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ2RhdGF0YWJsZS1zY3JvbGxlcicsXHJcbiAgdGVtcGxhdGU6IGAgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PiBgLFxyXG4gIGhvc3Q6IHtcclxuICAgIGNsYXNzOiAnZGF0YXRhYmxlLXNjcm9sbCdcclxuICB9LFxyXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBTY3JvbGxlckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcclxuICBASW5wdXQoKSBzY3JvbGxiYXJWOiBib29sZWFuID0gZmFsc2U7XHJcbiAgQElucHV0KCkgc2Nyb2xsYmFySDogYm9vbGVhbiA9IGZhbHNlO1xyXG5cclxuICBASG9zdEJpbmRpbmcoJ3N0eWxlLmhlaWdodC5weCcpXHJcbiAgQElucHV0KClcclxuICBzY3JvbGxIZWlnaHQ6IG51bWJlcjtcclxuXHJcbiAgQEhvc3RCaW5kaW5nKCdzdHlsZS53aWR0aC5weCcpXHJcbiAgQElucHV0KClcclxuICBzY3JvbGxXaWR0aDogbnVtYmVyO1xyXG5cclxuICBAT3V0cHV0KCkgc2Nyb2xsOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuXHJcbiAgc2Nyb2xsWVBvczogbnVtYmVyID0gMDtcclxuICBzY3JvbGxYUG9zOiBudW1iZXIgPSAwO1xyXG4gIHByZXZTY3JvbGxZUG9zOiBudW1iZXIgPSAwO1xyXG4gIHByZXZTY3JvbGxYUG9zOiBudW1iZXIgPSAwO1xyXG4gIGVsZW1lbnQ6IGFueTtcclxuICBwYXJlbnRFbGVtZW50OiBhbnk7XHJcbiAgb25TY3JvbGxMaXN0ZW5lcjogYW55O1xyXG5cclxuICBwcml2YXRlIF9zY3JvbGxFdmVudExpc3RlbmVyOiBhbnkgPSBudWxsO1xyXG5cclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIG5nWm9uZTogTmdab25lLCBlbGVtZW50OiBFbGVtZW50UmVmLCBwcml2YXRlIHJlbmRlcmVyOiBSZW5kZXJlcjIpIHtcclxuICAgIHRoaXMuZWxlbWVudCA9IGVsZW1lbnQubmF0aXZlRWxlbWVudDtcclxuICB9XHJcblxyXG4gIG5nT25Jbml0KCk6IHZvaWQge1xyXG4gICAgLy8gbWFudWFsIGJpbmQgc28gd2UgZG9uJ3QgYWx3YXlzIGxpc3RlblxyXG4gICAgaWYgKHRoaXMuc2Nyb2xsYmFyViB8fCB0aGlzLnNjcm9sbGJhckgpIHtcclxuICAgICAgY29uc3QgcmVuZGVyZXIgPSB0aGlzLnJlbmRlcmVyO1xyXG4gICAgICB0aGlzLnBhcmVudEVsZW1lbnQgPSByZW5kZXJlci5wYXJlbnROb2RlKHJlbmRlcmVyLnBhcmVudE5vZGUodGhpcy5lbGVtZW50KSk7XHJcbiAgICAgIHRoaXMuX3Njcm9sbEV2ZW50TGlzdGVuZXIgPSB0aGlzLm9uU2Nyb2xsZWQuYmluZCh0aGlzKTtcclxuICAgICAgdGhpcy5wYXJlbnRFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIHRoaXMuX3Njcm9sbEV2ZW50TGlzdGVuZXIpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XHJcbiAgICBpZiAodGhpcy5fc2Nyb2xsRXZlbnRMaXN0ZW5lcikge1xyXG4gICAgICB0aGlzLnBhcmVudEVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgdGhpcy5fc2Nyb2xsRXZlbnRMaXN0ZW5lcik7XHJcbiAgICAgIHRoaXMuX3Njcm9sbEV2ZW50TGlzdGVuZXIgPSBudWxsO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgc2V0T2Zmc2V0KG9mZnNldFk6IG51bWJlcik6IHZvaWQge1xyXG4gICAgaWYgKHRoaXMucGFyZW50RWxlbWVudCkge1xyXG4gICAgICB0aGlzLnBhcmVudEVsZW1lbnQuc2Nyb2xsVG9wID0gb2Zmc2V0WTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIG9uU2Nyb2xsZWQoZXZlbnQ6IE1vdXNlRXZlbnQpOiB2b2lkIHtcclxuICAgIGNvbnN0IGRvbTogRWxlbWVudCA9IDxFbGVtZW50PmV2ZW50LmN1cnJlbnRUYXJnZXQ7XHJcbiAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4ge1xyXG4gICAgICB0aGlzLnNjcm9sbFlQb3MgPSBkb20uc2Nyb2xsVG9wO1xyXG4gICAgICB0aGlzLnNjcm9sbFhQb3MgPSBkb20uc2Nyb2xsTGVmdDtcclxuICAgICAgdGhpcy51cGRhdGVPZmZzZXQoKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgdXBkYXRlT2Zmc2V0KCk6IHZvaWQge1xyXG4gICAgbGV0IGRpcmVjdGlvbjogc3RyaW5nO1xyXG4gICAgaWYgKHRoaXMuc2Nyb2xsWVBvcyA8IHRoaXMucHJldlNjcm9sbFlQb3MpIHtcclxuICAgICAgZGlyZWN0aW9uID0gJ2Rvd24nO1xyXG4gICAgfSBlbHNlIGlmICh0aGlzLnNjcm9sbFlQb3MgPiB0aGlzLnByZXZTY3JvbGxZUG9zKSB7XHJcbiAgICAgIGRpcmVjdGlvbiA9ICd1cCc7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5zY3JvbGwuZW1pdCh7XHJcbiAgICAgIGRpcmVjdGlvbixcclxuICAgICAgc2Nyb2xsWVBvczogdGhpcy5zY3JvbGxZUG9zLFxyXG4gICAgICBzY3JvbGxYUG9zOiB0aGlzLnNjcm9sbFhQb3NcclxuICAgIH0pO1xyXG5cclxuICAgIHRoaXMucHJldlNjcm9sbFlQb3MgPSB0aGlzLnNjcm9sbFlQb3M7XHJcbiAgICB0aGlzLnByZXZTY3JvbGxYUG9zID0gdGhpcy5zY3JvbGxYUG9zO1xyXG4gIH1cclxufVxyXG4iXX0=