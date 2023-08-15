class CircleTool extends Tool {
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
        graphics.beginFill(this.color);
        graphics.lineStyle(1, this.color, 1);
        graphics.drawCircle(this.startX, this.startY, MathUtil.distance(this.startX, this.startY, mouseX, mouseY));
        graphics.endFill();
    }


}