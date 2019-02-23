/// <reference path="gfx.ts"/>
/// <reference path="imgbroker.ts"/>
/// <reference path="images.ts"/>

function drawImageOnCanvasRGB(ic : ImageBroker) {
	
	GraphicsContext.ClearCanvas();
	
	let cycle : Vector4 = new Vector4(0, 0, 0, 255);
	
	let size : Vector2 = new Vector2(canvas.clientWidth, canvas.clientHeight);
	
	let render_res : Vector2 = new Vector2(512, 512);
	
	// calculate x and y offset in relation to the canvas size
	let ox : number = ic.width / size.x;
	let oy : number = ic.height / size.y;
	
	for(let y : number = 0;y < size.y;y+=size.y / render_res.y) {
		for(let x : number = 0;x < size.x;x+=size.x / render_res.x) {
			
			if(x % 3 == 0) { // red
				cycle.x = ic.GetPixelAt(new Vector2(Math.round(x * ox), Math.round(y * oy))).x;
				cycle.z = GraphicsContext.GetPixelAt(new Vector2(Math.round(x), Math.round(y))).z;
				cycle.y = GraphicsContext.GetPixelAt(new Vector2(Math.round(x), Math.round(y))).y;
			} else if(x % 3 == 1) { // green
				cycle.y = ic.GetPixelAt(new Vector2(Math.round(x * ox), Math.round(y * oy))).y;
				cycle.x = GraphicsContext.GetPixelAt(new Vector2(Math.round(x), Math.round(y))).x;
				cycle.z = GraphicsContext.GetPixelAt(new Vector2(Math.round(x), Math.round(y))).z;
			} else if(x % 3 == 2) { // blue
				cycle.z = ic.GetPixelAt(new Vector2(Math.round(x * ox), Math.round(y * oy))).z;
				cycle.y = GraphicsContext.GetPixelAt(new Vector2(Math.round(x), Math.round(y))).y;
				cycle.x = GraphicsContext.GetPixelAt(new Vector2(Math.round(x), Math.round(y))).x;
			}
			
			GraphicsContext.PutPixel(new Vector2(Math.round(x), Math.round(y)), cycle);
		}
	}
}

function updateCanvasRes(val : string) {
	canvas.width = Math.pow(2, parseFloat(val));
	canvas.height = Math.pow(2, parseFloat(val));
	drawImageOnCanvasRGB(ImageContext);
}

function updateTextInput(val : string) {
	(<HTMLInputElement>document.getElementById("ageOutputId")).value = val;
	updateCanvasRes(val);
}

let canvas : HTMLCanvasElement = <HTMLCanvasElement>document.getElementById("mainCanvas");

let ctx : CanvasRenderingContext2D = canvas.getContext("2d");

let GraphicsContext : gfx = new gfx(ctx);

let img : HTMLImageElement = <HTMLImageElement>document.getElementById("the_image");

let imgBlobs : Images = new Images();

let ImageContext : ImageBroker = new ImageBroker(imgBlobs.img1, () => {
	drawImageOnCanvasRGB(ImageContext);
});