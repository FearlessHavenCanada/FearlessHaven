class RectTool extends Tool {
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

        var width = mouseX - this.startX;
        var height = mouseY - this.startY;

        var x = this.startX;
        var y = this.startY;
        var w = width;
        var h = height;
        
        //This needs to be split into two conditions for the x and y axis
        if(width < 0){
            x = this.startX + width;
            w = width * -1;
        }
        if(height < 0) {
            y = this.startY + height;
            h = height * -1;
        }

        graphics.drawRect(x, y, w, h);



        graphics.endFill();
    }
}