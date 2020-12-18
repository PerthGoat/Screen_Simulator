/// <reference path="gfx.ts"/>
/// <reference path="imgbroker.ts"/>
/// <reference path="images.ts"/>

function drawImageOnCanvasRGB(ic : ImageBroker) {
	
	GraphicsContext.ClearCanvas();
	
	let size : Vector2 = new Vector2(canvas.clientWidth, canvas.clientHeight);
	
	// calculate x and y offset in relation to the canvas size
	let ox : number = ic.width / size.x;
	let oy : number = ic.height / size.y;
  
  let x_scale : number = (1/ox); // pixels per cell in the canvas
  let y_scale : number = 1/oy; // scale the y to 3x the normal size
  
  let leftover_pixels : number = x_scale - 3;
  
  console.log(ox, oy);
  
  console.log(x_scale, y_scale);
  
  let cycle_offset : number = 0;
  
  for(let y : number = 0;y < ic.height;y++) {
    let lastCycle : Vector4 = new Vector4(0, 0, 0, 0);
    for(let x : number = 0;x < ic.width;x++) {
      let cycle : Vector4 = ic.GetPixelAt(new Vector2(x_scale < 1 ? x/x_scale : x, y));
      
      for(let i : number = 0;i < x_scale;i++) {
        switch(i) {
          case 0:
            GraphicsContext.PutPixel(new Vector2(x+cycle_offset, y * y_scale), new Vector4(cycle.x, x_scale <= 1 ? lastCycle.y : 0, x_scale <= 1 ? lastCycle.z : 0, 255));
          break;
          case 1:
            cycle_offset++;
            GraphicsContext.PutPixel(new Vector2(x+cycle_offset, y * y_scale), new Vector4(0, cycle.y, x_scale == 2 ? lastCycle.z : 0, 255));
          break;
          case 2:
            cycle_offset++;
            GraphicsContext.PutPixel(new Vector2(x+cycle_offset, y * y_scale), new Vector4(0, 0, cycle.z, 255));
          break;
        }
      }
      
      if(leftover_pixels > 0) {
        cycle_offset += leftover_pixels;
      }
      
      lastCycle = cycle;
    }
    
    cycle_offset = 0;
  }
  
  console.log("DONE");
}

function updateCanvasRes(val : string) {
	canvas.width = Math.pow(2, parseFloat(val));
	canvas.height = Math.pow(2, parseFloat(val));
	drawImageOnCanvasRGB(ImageContext);
}

function updateTextInput(val : string) {
	(<HTMLInputElement>document.getElementById("zoomOutputId")).value = val;
	updateCanvasRes(val);
}

let canvas : HTMLCanvasElement = <HTMLCanvasElement>document.getElementById("mainCanvas");

let ctx : CanvasRenderingContext2D = canvas.getContext("2d");

let GraphicsContext : gfx = new gfx(ctx);

let imgBlobs : Images = new Images();

let ImageContext : ImageBroker = new ImageBroker(imgBlobs.img1, () => {
  //canvas.width = 64;
  //canvas.height = 64;
	//drawImageOnCanvasRGB(ImageContext);
  let val = (<HTMLInputElement>document.getElementById("zoomOutputId")).value;
  updateCanvasRes(val);
});