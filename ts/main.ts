/// <reference path="gfx.ts"/>
/// <reference path="imgbroker.ts"/>
/// <reference path="images.ts"/>

function drawImageOnCanvasRGB(ic : ImageBroker) {

	GraphicsContext.ClearCanvas();
	
	let cycle : Vector4 = new Vector4(0, 0, 0, 255);

	let size : Vector2 = new Vector2(canvas.clientWidth, canvas.clientHeight);

	let max_zoom : Vector2 = new Vector2(512, 512);

	for(let y : number = 0;y < size.y;y+=size.y / max_zoom.y) {
		for(let x : number = 0;x < size.x;x+=size.x / max_zoom.x) {
			if(x % 3 == 0) { // green
				cycle.y = ic.GetPixelAt(new Vector2(Math.floor(x), Math.floor(y))).y;
				cycle.x = GraphicsContext.GetPixelAt(new Vector2(Math.floor(x), Math.floor(y))).x;
				cycle.z = GraphicsContext.GetPixelAt(new Vector2(Math.floor(x), Math.floor(y))).z;
			} else if(x % 3 == 1) { // blue
				cycle.z = ic.GetPixelAt(new Vector2(Math.floor(x), Math.floor(y))).z;
				cycle.y = GraphicsContext.GetPixelAt(new Vector2(Math.floor(x), Math.floor(y))).y;
				cycle.x = GraphicsContext.GetPixelAt(new Vector2(Math.floor(x), Math.floor(y))).x;
			} else if(x % 3 == 2) { // red
				cycle.x = ic.GetPixelAt(new Vector2(Math.floor(x), Math.floor(y))).x;
				cycle.z = GraphicsContext.GetPixelAt(new Vector2(Math.floor(x), Math.floor(y))).z;
				cycle.y = GraphicsContext.GetPixelAt(new Vector2(Math.floor(x), Math.floor(y))).y;
			}
			
			GraphicsContext.PutPixel(new Vector2(x, y), cycle);
		}
	}
}

/*function updateCanvasRes(val : string) {
	canvas.width = parseFloat(val);
	canvas.height = parseFloat(val);
	drawCanvasRGB();
}

function updateTextInput(val : string) {
	(<HTMLInputElement>document.getElementById("ageOutputId")).value = val;
	updateCanvasRes(val);
}*/

let canvas : HTMLCanvasElement = <HTMLCanvasElement>document.getElementById("mainCanvas");

let ctx : CanvasRenderingContext2D = canvas.getContext("2d");

let GraphicsContext : gfx = new gfx(ctx);

let img : HTMLImageElement = <HTMLImageElement>document.getElementById("the_image");

let imgBlobs : Images = new Images();

let ImageContext : ImageBroker = new ImageBroker(imgBlobs.img1, () => {
	drawImageOnCanvasRGB(ImageContext);
});



//drawImageOnCanvasRGB();
