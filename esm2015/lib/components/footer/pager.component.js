import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
export class DataTablePagerComponent {
    constructor() {
        this.change = new EventEmitter();
        this._count = 0;
        this._page = 1;
        this._size = 0;
    }
    set size(val) {
        this._size = val;
        this.pages = this.calcPages();
    }
    get size() {
        return this._size;
    }
    set count(val) {
        this._count = val;
        this.pages = this.calcPages();
    }
    get count() {
        return this._count;
    }
    set page(val) {
        this._page = val;
        this.pages = this.calcPages();
    }
    get page() {
        return this._page;
    }
    get totalPages() {
        const count = this.size < 1 ? 1 : Math.ceil(this.count / this.size);
        return Math.max(count || 0, 1);
    }
    canPrevious() {
        return this.page > 1;
    }
    canNext() {
        return this.page < this.totalPages;
    }
    prevPage() {
        this.selectPage(this.page - 1);
    }
    nextPage() {
        this.selectPage(this.page + 1);
    }
    selectPage(page) {
        if (page > 0 && page <= this.totalPages && page !== this.page) {
            this.page = page;
            this.change.emit({
                page
            });
        }
    }
    calcPages(page) {
        const pages = [];
        let startPage = 1;
        let endPage = this.totalPages;
        const maxSize = 5;
        const isMaxSized = maxSize < this.totalPages;
        page = page || this.page;
        if (isMaxSized) {
            startPage = page - Math.floor(maxSize / 2);
            endPage = page + Math.floor(maxSize / 2);
            if (startPage < 1) {
                startPage = 1;
                endPage = Math.min(startPage + maxSize - 1, this.totalPages);
            }
            else if (endPage > this.totalPages) {
                startPage = Math.max(this.totalPages - maxSize + 1, 1);
                endPage = this.totalPages;
            }
        }
        for (let num = startPage; num <= endPage; num++) {
            pages.push({
                number: num,
                text: num
            });
        }
        return pages;
    }
}
DataTablePagerComponent.decorators = [
    { type: Component, args: [{
                selector: 'datatable-pager',
                template: `
    <ul class="pager">
      <li [class.disabled]="!canPrevious()">
        <a role="button" aria-label="go to first page" href="javascript:void(0)" (click)="selectPage(1)">
          <i class="{{ pagerPreviousIcon }}"></i>
        </a>
      </li>
      <li [class.disabled]="!canPrevious()">
        <a role="button" aria-label="go to previous page" href="javascript:void(0)" (click)="prevPage()">
          <i class="{{ pagerLeftArrowIcon }}"></i>
        </a>
      </li>
      <li
        role="button"
        [attr.aria-label]="'page ' + pg.number"
        class="pages"
        *ngFor="let pg of pages"
        [class.active]="pg.number === page"
      >
        <a href="javascript:void(0)" (click)="selectPage(pg.number)">
          {{ pg.text }}
        </a>
      </li>
      <li [class.disabled]="!canNext()">
        <a role="button" aria-label="go to next page" href="javascript:void(0)" (click)="nextPage()">
          <i class="{{ pagerRightArrowIcon }}"></i>
        </a>
      </li>
      <li [class.disabled]="!canNext()">
        <a role="button" aria-label="go to last page" href="javascript:void(0)" (click)="selectPage(totalPages)">
          <i class="{{ pagerNextIcon }}"></i>
        </a>
      </li>
    </ul>
  `,
                host: {
                    class: 'datatable-pager'
                },
                changeDetection: ChangeDetectionStrategy.OnPush
            },] }
];
DataTablePagerComponent.propDecorators = {
    pagerLeftArrowIcon: [{ type: Input }],
    pagerRightArrowIcon: [{ type: Input }],
    pagerPreviousIcon: [{ type: Input }],
    pagerNextIcon: [{ type: Input }],
    size: [{ type: Input }],
    count: [{ type: Input }],
    page: [{ type: Input }],
    change: [{ type: Output }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFnZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvc3dpbWxhbmUvbmd4LWRhdGF0YWJsZS9zcmMvbGliL2NvbXBvbmVudHMvZm9vdGVyL3BhZ2VyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUFFLHVCQUF1QixFQUFFLE1BQU0sZUFBZSxDQUFDO0FBNENoRyxNQUFNLE9BQU8sdUJBQXVCO0lBMUNwQztRQW1GWSxXQUFNLEdBQXNCLElBQUksWUFBWSxFQUFFLENBQUM7UUFFekQsV0FBTSxHQUFXLENBQUMsQ0FBQztRQUNuQixVQUFLLEdBQVcsQ0FBQyxDQUFDO1FBQ2xCLFVBQUssR0FBVyxDQUFDLENBQUM7SUE0RHBCLENBQUM7SUFuR0MsSUFDSSxJQUFJLENBQUMsR0FBVztRQUNsQixJQUFJLENBQUMsS0FBSyxHQUFHLEdBQUcsQ0FBQztRQUNqQixJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztJQUNoQyxDQUFDO0lBRUQsSUFBSSxJQUFJO1FBQ04sT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDO0lBQ3BCLENBQUM7SUFFRCxJQUNJLEtBQUssQ0FBQyxHQUFXO1FBQ25CLElBQUksQ0FBQyxNQUFNLEdBQUcsR0FBRyxDQUFDO1FBQ2xCLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO0lBQ2hDLENBQUM7SUFFRCxJQUFJLEtBQUs7UUFDUCxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUM7SUFDckIsQ0FBQztJQUVELElBQ0ksSUFBSSxDQUFDLEdBQVc7UUFDbEIsSUFBSSxDQUFDLEtBQUssR0FBRyxHQUFHLENBQUM7UUFDakIsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsU0FBUyxFQUFFLENB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QUFpQjtnQkFDM0IsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBa0NUO2dCQUNELElBQUksRUFBRTtvQkFDSixLQUFLLEVBQUUsaUJBQWlCO2lCQUN6QjtnQkFDRCxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTthQUNoRDs7O2lDQUVFLEtBQUs7a0NBQ0wsS0FBSztnQ0FDTCxLQUFLOzRCQUNMLEtBQUs7bUJBRUwsS0FBSztvQkFVTCxLQUFLO21CQVVMLEtBQUs7cUJBZUwsTUFBTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIE91dHB1dCwgRXZlbnRFbWl0dGVyLCBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdkYXRhdGFibGUtcGFnZXInLFxyXG4gIHRlbXBsYXRlOiBgXHJcbiAgICA8dWwgY2xhc3M9XCJwYWdlclwiPlxyXG4gICAgICA8bGkgW2NsYXNzLmRpc2FibGVkXT1cIiFjYW5QcmV2aW91cygpXCI+XHJcbiAgICAgICAgPGEgcm9sZT1cImJ1dHRvblwiIGFyaWEtbGFiZWw9XCJnbyB0byBmaXJzdCBwYWdlXCIgaHJlZj1cImphdmFzY3JpcHQ6dm9pZCgwKVwiIChjbGljayk9XCJzZWxlY3RQYWdlKDEpXCI+XHJcbiAgICAgICAgICA8aSBjbGFzcz1cInt7IHBhZ2VyUHJldmlvdXNJY29uIH19XCI+PC9pPlxyXG4gICAgICAgIDwvYT5cclxuICAgICAgPC9saT5cclxuICAgICAgPGxpIFtjbGFzcy5kaXNhYmxlZF09XCIhY2FuUHJldmlvdXMoKVwiPlxyXG4gICAgICAgIDxhIHJvbGU9XCJidXR0b25cIiBhcmlhLWxhYmVsPVwiZ28gdG8gcHJldmlvdXMgcGFnZVwiIGhyZWY9XCJqYXZhc2NyaXB0OnZvaWQoMClcIiAoY2xpY2spPVwicHJldlBhZ2UoKVwiPlxyXG4gICAgICAgICAgPGkgY2xhc3M9XCJ7eyBwYWdlckxlZnRBcnJvd0ljb24gfX1cIj48L2k+XHJcbiAgICAgICAgPC9hPlxyXG4gICAgICA8L2xpPlxyXG4gICAgICA8bGlcclxuICAgICAgICByb2xlPVwiYnV0dG9uXCJcclxuICAgICAgICBbYXR0ci5hcmlhLWxhYmVsXT1cIidwYWdlICcgKyBwZy5udW1iZXJcIlxyXG4gICAgICAgIGNsYXNzPVwicGFnZXNcIlxyXG4gICAgICAgICpuZ0Zvcj1cImxldCBwZyBvZiBwYWdlc1wiXHJcbiAgICAgICAgW2NsYXNzLmFjdGl2ZV09XCJwZy5udW1iZXIgPT09IHBhZ2VcIlxyXG4gICAgICA+XHJcbiAgICAgICAgPGEgaHJlZj1cImphdmFzY3JpcHQ6dm9pZCgwKVwiIChjbGljayk9XCJzZWxlY3RQYWdlKHBnLm51bWJlcilcIj5cclxuICAgICAgICAgIHt7IHBnLnRleHQgfX1cclxuICAgICAgICA8L2E+XHJcbiAgICAgIDwvbGk+XHJcbiAgICAgIDxsaSBbY2xhc3MuZGlzYWJsZWRdPVwiIWNhbk5leHQoKVwiPlxyXG4gICAgICAgIDxhIHJvbGU9XCJidXR0b25cIiBhcmlhLWxhYmVsPVwiZ28gdG8gbmV4dCBwYWdlXCIgaHJlZj1cImphdmFzY3JpcHQ6dm9pZCgwKVwiIChjbGljayk9XCJuZXh0UGFnZSgpXCI+XHJcbiAgICAgICAgICA8aSBjbGFzcz1cInt7IHBhZ2VyUmlnaHRBcnJvd0ljb24gfX1cIj48L2k+XHJcbiAgICAgICAgPC9hPlxyXG4gICAgICA8L2xpPlxyXG4gICAgICA8bGkgW2NsYXNzLmRpc2FibGVkXT1cIiFjYW5OZXh0KClcIj5cclxuICAgICAgICA8YSByb2xlPVwiYnV0dG9uXCIgYXJpYS1sYWJlbD1cImdvIHRvIGxhc3QgcGFnZVwiIGhyZWY9XCJqYXZhc2NyaXB0OnZvaWQoMClcIiAoY2xpY2spPVwic2VsZWN0UGFnZSh0b3RhbFBhZ2VzKVwiPlxyXG4gICAgICAgICAgPGkgY2xhc3M9XCJ7eyBwYWdlck5leHRJY29uIH19XCI+PC9pPlxyXG4gICAgICAgIDwvYT5cclxuICAgICAgPC9saT5cclxuICAgIDwvdWw+XHJcbiAgYCxcclxuICBob3N0OiB7XHJcbiAgICBjbGFzczogJ2RhdGF0YWJsZS1wYWdlcidcclxuICB9LFxyXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBEYXRhVGFibGVQYWdlckNvbXBvbmVudCB7XHJcbiAgQElucHV0KCkgcGFnZXJMZWZ0QXJyb3dJY29uOiBzdHJpbmc7XHJcbiAgQElucHV0KCkgcGFnZXJSaWdodEFycm93SWNvbjogc3RyaW5nO1xyXG4gIEBJbnB1dCgpIHBhZ2VyUHJldmlvdXNJY29uOiBzdHJpbmc7XHJcbiAgQElucHV0KCkgcGFnZXJOZXh0SWNvbjogc3RyaW5nO1xyXG5cclxuICBASW5wdXQoKVxyXG4gIHNldCBzaXplKHZhbDogbnVtYmVyKSB7XHJcbiAgICB0aGlzLl9zaXplID0gdmFsO1xyXG4gICAgdGhpcy5wYWdlcyA9IHRoaXMuY2FsY1BhZ2VzKCk7XHJcbiAgfVxyXG5cclxuICBnZXQgc2l6ZSgpOiBudW1iZXIge1xyXG4gICAgcmV0dXJuIHRoaXMuX3NpemU7XHJcbiAgfVxyXG5cclxuICBASW5wdXQoKVxyXG4gIHNldCBjb3VudCh2YWw6IG51bWJlcikge1xyXG4gICAgdGhpcy5fY291bnQgPSB2YWw7XHJcbiAgICB0aGlzLnBhZ2VzID0gdGhpcy5jYWxjUGFnZXMoKTtcclxuICB9XHJcblxyXG4gIGdldCBjb3VudCgpOiBudW1iZXIge1xyXG4gICAgcmV0dXJuIHRoaXMuX2NvdW50O1xyXG4gIH1cclxuXHJcbiAgQElucHV0KClcclxuICBzZXQgcGFnZSh2YWw6IG51bWJlcikge1xyXG4gICAgdGhpcy5fcGFnZSA9IHZhbDtcclxuICAgIHRoaXMucGFnZXMgPSB0aGlzLmNhbGNQYWdlcygpO1xyXG4gIH1cclxuXHJcbiAgZ2V0IHBhZ2UoKTogbnVtYmVyIHtcclxuICAgIHJldHVybiB0aGlzLl9wYWdlO1xyXG4gIH1cclxuXHJcbiAgZ2V0IHRvdGFsUGFnZXMoKTogbnVtYmVyIHtcclxuICAgIGNvbnN0IGNvdW50ID0gdGhpcy5zaXplIDwgMSA/IDEgOiBNYXRoLmNlaWwodGhpcy5jb3VudCAvIHRoaXMuc2l6ZSk7XHJcbiAgICByZXR1cm4gTWF0aC5tYXgoY291bnQgfHwgMCwgMSk7XHJcbiAgfVxyXG5cclxuICBAT3V0cHV0KCkgY2hhbmdlOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuXHJcbiAgX2NvdW50OiBudW1iZXIgPSAwO1xyXG4gIF9wYWdlOiBudW1iZXIgPSAxO1xyXG4gIF9zaXplOiBudW1iZXIgPSAwO1xyXG4gIHBhZ2VzOiBhbnk7XHJcblxyXG4gIGNhblByZXZpb3VzKCk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIHRoaXMucGFnZSA+IDE7XHJcbiAgfVxyXG5cclxuICBjYW5OZXh0KCk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIHRoaXMucGFnZSA8IHRoaXMudG90YWxQYWdlcztcclxuICB9XHJcblxyXG4gIHByZXZQYWdlKCk6IHZvaWQge1xyXG4gICAgdGhpcy5zZWxlY3RQYWdlKHRoaXMucGFnZSAtIDEpO1xyXG4gIH1cclxuXHJcbiAgbmV4dFBhZ2UoKTogdm9pZCB7XHJcbiAgICB0aGlzLnNlbGVjdFBhZ2UodGhpcy5wYWdlICsgMSk7XHJcbiAgfVxyXG5cclxuICBzZWxlY3RQYWdlKHBhZ2U6IG51bWJlcik6IHZvaWQge1xyXG4gICAgaWYgKHBhZ2UgPiAwICYmIHBhZ2UgPD0gdGhpcy50b3RhbFBhZ2VzICYmIHBhZ2UgIT09IHRoaXMucGFnZSkge1xyXG4gICAgICB0aGlzLnBhZ2UgPSBwYWdlO1xyXG5cclxuICAgICAgdGhpcy5jaGFuZ2UuZW1pdCh7XHJcbiAgICAgICAgcGFnZVxyXG4gICAgICB9KTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGNhbGNQYWdlcyhwYWdlPzogbnVtYmVyKTogYW55W10ge1xyXG4gICAgY29uc3QgcGFnZXMgPSBbXTtcclxuICAgIGxldCBzdGFydFBhZ2UgPSAxO1xyXG4gICAgbGV0IGVuZFBhZ2UgPSB0aGlzLnRvdGFsUGFnZXM7XHJcbiAgICBjb25zdCBtYXhTaXplID0gNTtcclxuICAgIGNvbnN0IGlzTWF4U2l6ZWQgPSBtYXhTaXplIDwgdGhpcy50b3RhbFBhZ2VzO1xyXG5cclxuICAgIHBhZ2UgPSBwYWdlIHx8IHRoaXMucGFnZTtcclxuXHJcbiAgICBpZiAoaXNNYXhTaXplZCkge1xyXG4gICAgICBzdGFydFBhZ2UgPSBwYWdlIC0gTWF0aC5mbG9vcihtYXhTaXplIC8gMik7XHJcbiAgICAgIGVuZFBhZ2UgPSBwYWdlICsgTWF0aC5mbG9vcihtYXhTaXplIC8gMik7XHJcblxyXG4gICAgICBpZiAoc3RhcnRQYWdlIDwgMSkge1xyXG4gICAgICAgIHN0YXJ0UGFnZSA9IDE7XHJcbiAgICAgICAgZW5kUGFnZSA9IE1hdGgubWluKHN0YXJ0UGFnZSArIG1heFNpemUgLSAxLCB0aGlzLnRvdGFsUGFnZXMpO1xyXG4gICAgICB9IGVsc2UgaWYgKGVuZFBhZ2UgPiB0aGlzLnRvdGFsUGFnZXMpIHtcclxuICAgICAgICBzdGFydFBhZ2UgPSBNYXRoLm1heCh0aGlzLnRvdGFsUGFnZXMgLSBtYXhTaXplICsgMSwgMSk7XHJcbiAgICAgICAgZW5kUGFnZSA9IHRoaXMudG90YWxQYWdlcztcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGZvciAobGV0IG51bSA9IHN0YXJ0UGFnZTsgbnVtIDw9IGVuZFBhZ2U7IG51bSsrKSB7XHJcbiAgICAgIHBhZ2VzLnB1c2goe1xyXG4gICAgICAgIG51bWJlcjogbnVtLFxyXG4gICAgICAgIHRleHQ6IDxzdHJpbmc+KDxhbnk+bnVtKVxyXG4gICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gcGFnZXM7XHJcbiAgfVxyXG59XHJcbiJdfQ==