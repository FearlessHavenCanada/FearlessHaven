class ArtworkEditor {
    constructor(){

		console.log("Welcome to FearlessHaven!")

    	this.app = new PIXI.Application({ width: window.screen.width, height: window.screen.height, backgroundColor: 0xFFFFFF})
      	this.graphics = new PIXI.Graphics();
      	this.app.stage.addChild(this.graphics);
      
      	this.toolOverlay = new PIXI.Graphics();
      	this.app.stage.addChild(this.toolOverlay);

      	document.body.appendChild(this.app.view);

		this.currentTool = new LineTool(this.toolOverlay, this.graphics);
		this.mouseDown = false;
    }

	submit(){

		alert("TODO: This needs a CAPTCHA! Those bots aren't going to stop themselves...");

		const imageData = this.app.renderer.extract.base64(this.graphics);

		imageData.then(
			result => {
				console.log(imageData)

				fetch("/submitArtwork", {
					method: 'POST',
					headers: {
						'Content-Type': 'text/plain', 
					},
					body: result,
				})
					.then(response => response.json())
					.then(data => {
						console.log('Response from server:', data);
					})
					.catch(error => {
						console.error('Error:', error);
					});
			},
			error => console.log(error)

		)
	}

    run(){


		var self = this;
		function onKeyDown(event) {
			if (event.key === 'd') {
				self.currentTool = new DrawTool(self.toolOverlay, self.graphics)
			} 
			else if (event.key === 'r') {
				self.currentTool = new RectTool(self.toolOverlay, self.graphics)
			}
			else if (event.key === 'l') {
				self.currentTool = new LineTool(self.toolOverlay, self.graphics)
			}
			else if (event.key === 'c') {
				self.currentTool = new CircleTool(self.toolOverlay, self.graphics)
			}
			else if (event.key === 's') {
				self.submit()
			}
		
			console.log(self.toolOverlay)
			self.toolOverlay.clear()


		
		}
		  
		window.addEventListener('keydown', onKeyDown);
		  

		this.app.view.addEventListener('mousedown', event => { 
			const mouseX = event.clientX - this.app.view.getBoundingClientRect().left;
			const mouseY = event.clientY - this.app.view.getBoundingClientRect().top;
		
			this.currentTool.mouseDown(mouseX, mouseY);
		
			this.mouseDown = true; 
		});
		this.app.view.addEventListener('mouseup', event => { 
		
			const mouseX = event.clientX - this.app.view.getBoundingClientRect().left;
			const mouseY = event.clientY - this.app.view.getBoundingClientRect().top;
		
			this.currentTool.mouseUp(mouseX, mouseY);
		
			this.mouseDown = false;
		});
		this.app.view.addEventListener('mousemove', event => {
			if(this.mouseDown){
				const mouseX = event.clientX - this.app.view.getBoundingClientRect().left;
				const mouseY = event.clientY - this.app.view.getBoundingClientRect().top;
		
				this.currentTool.mouseMove(mouseX, mouseY);
		
			}
		
			
		});
    }
}

let app = new ArtworkEditor();
app.run()

function setTool(index){

	if (index == 0) {
		app.currentTool = new DrawTool(app.toolOverlay, app.graphics)
	} 
	else if (index == 1) {
		app.currentTool = new RectTool(app.toolOverlay, app.graphics)
	}
	else if (index == 2) {
		app.currentTool = new LineTool(app.toolOverlay, app.graphics)
	}
	else if (index == 3) {
		app.currentTool = new CircleTool(app.toolOverlay, app.graphics)
	}
}

function submit(){
	app.submit();
}