class DrawTool extends Tool {
    constructor(toolOverlay, graphics){
        super(toolOverlay, graphics);
        this.lastX = null;
        this.lastY = null;
        this.radius = 15
        
    }

    mouseDown(mouseX, mouseY){

    }
    mouseUp(mouseX, mouseY){
        this.lastX = null;
        this.lastY = null;
    }

    
    mouseMove(mouseX, mouseY){
        
        this.graphics.beginFill(this.color);
        this.graphics.drawCircle(mouseX, mouseY, this.radius);

        this.graphics.lineStyle(this.radius * 2, this.color, 1);


        if(this.lastX != null && this.lastY != null && MathUtil.distanceSqr(mouseX, mouseY, this.lastX, this.lastY) >= this.radius * this.radius){

            this.graphics.moveTo(mouseX, mouseY);
            this.graphics.lineTo(this.lastX, this.lastY);
        }

        this.graphics.lineStyle(1, this.color, 1);
        
        this.graphics.endFill();

        this.lastX = mouseX;
        this.lastY = mouseY;
    }
}