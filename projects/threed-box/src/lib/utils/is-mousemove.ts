export class IsMousemove {
    private timetick: any;
    constructor(dom: HTMLElement, private onMove: () => void, private onStop: () => void) {

        dom.addEventListener('pointermove', this.onPointerMove.bind(this));
    }

    private onPointerMove() {
        if (this.timetick !== undefined) {
            clearTimeout(this.timetick);
        }

        this.onMove();
        this.timetick = setTimeout(() => {
            this.onStop();
        }, 100);
    }
}