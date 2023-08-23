class ArtworkEditor {
    constructor(){

		console.log("Welcome to FearlessHaven!")

    	this.app = new PIXI.Application({ width: window.screen.width, height: window.screen.height, backgroundColor: 0xFFFFFF, antialias: true})
      	this.graphics = new PIXI.Graphics();
      	this.app.stage.addChild(this.graphics);
      
      	this.toolOverlay = new PIXI.Graphics();
      	this.app.stage.addChild(this.toolOverlay);

      	document.body.appendChild(this.app.view);

		this.currentTool = new LineTool(this.toolOverlay, this.graphics);
		this.mouseDown = false;
    }

	submit(response, index){


		const imageData = this.app.renderer.extract.base64(this.graphics);

		imageData.then(
			result => {
				console.log(imageData)

				fetch("/submitArtwork", {
					method: 'POST',
					headers: {
						'Content-Type': 'text/plain', 
						'Challenge-Response': response,
						'Challenge-Index': index
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

