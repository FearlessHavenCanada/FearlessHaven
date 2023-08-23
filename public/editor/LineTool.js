class LineTool extends Tool {
    constructor(toolOverlay, graphics){
        super(toolOverlay, graphics);
        this.startX = null;
        this.startY = null;
        this.endX = null;
        this.endY = null;
    }

    mouseDown(mouseX, mouseY){
        this.startX = mouseX;
        this.startY = mouseY;
    }
    mouseUp(mouseX, mouseY){
        this.endX = mouseX;
        this.endY = mouseY;

        this.draw(this.graphics, mouseX, mouseY)
        this.toolOverlay.clear()
    }
    mouseMove(mouseX, mouseY){
        this.toolOverlay.clear()
        this.draw(this.toolOverlay, mouseX, mouseY)
    }

    draw(graphics, mouseX, mouseY){



        graphics.beginFill(0x000000);

        graphics.lineStyle({
            width: 15 * 2,
            color: this.color,
            cap: PIXI.LINE_CAP.ROUND,
            join: PIXI.LINE_JOIN.ROUND
        });
        
        graphics.moveTo(this.startX, this.startY);
        graphics.lineTo(mouseX, mouseY);
        graphics.endFill();
    }
}