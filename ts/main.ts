/// <reference path="lzss2.ts" />
/// <reference path="gfx.ts"/>
/// <reference path="imgbroker.ts"/>
/// <reference path="images.ts"/>

declare var TextureHouse : any;

function drawImageOnCanvasRGB(ic : ImageBroker) {
	
	//GraphicsContext.ClearCanvas();
  
	let size : Vector2 = new Vector2(canvas.clientWidth, canvas.clientHeight);
	
	// calculate x and y offset in relation to the canvas size
	let ox : number = ic.width / size.x;
	let oy : number = ic.height / size.y;
  
  let x_scale : number = 1/ox; // pixels per cell in the canvas
  let y_scale : number = 1/oy; // scale the y to 3x the normal size
  
  //console.log(ox, oy);
  //console.log(x_scale, y_scale);
  
  let pixel_queue : number = 0;
  
  for(let y : number = 0;y < ic.height;y++) {
    let placed_pixels : number = 0;
    for(let x : number = 0;x < ic.width;x++) {
      let cycle : Vector4 = ic.GetPixelAt(new Vector2(x, y));
      
      pixel_queue += x_scale;
      
      if(Math.floor(pixel_queue) >= 1) {
        for(let i : number = 0;i < Math.floor(pixel_queue);i++) {
          
          switch(placed_pixels) {
            case 0:
              GraphicsContext.PutPixel(new Vector2(Math.floor(x * x_scale + placed_pixels), Math.floor(y * y_scale)), new Vector4(cycle.x, 0, 0, 255));
              placed_pixels++;
            break;
            case 1:
              GraphicsContext.PutPixel(new Vector2(Math.floor(x * x_scale + placed_pixels), Math.floor(y * y_scale)), new Vector4(0, cycle.y, 0, 255));
              placed_pixels++;
            break;
            case 2:
              GraphicsContext.PutPixel(new Vector2(Math.floor(x * x_scale + placed_pixels), Math.floor(y * y_scale)), new Vector4(0, 0, cycle.z, 255));
              placed_pixels = 0;
            break;
          }
          
        }
        
        pixel_queue -= Math.floor(pixel_queue);
      }
      
      
    }
  }
  
  GraphicsContext.FinishDrawing();
  //console.log("DONE");
}

function updateCanvasRes(val : string) {
	canvas.width = Math.pow(2, parseFloat(val));
	//canvas.width = parseFloat(val);
	canvas.height = Math.pow(2, parseFloat(val));
	//canvas.height = parseFloat(val);
  GraphicsContext.FillCanvas(); // remove the default transparent background
  GraphicsContext.StartDrawing();
	drawImageOnCanvasRGB(ImageContext);
}

function updateTextInput(val : string) {
	(<HTMLInputElement>document.getElementById("zoomOutputId")).value = val;
	updateCanvasRes(val);
}

function load_texture_by_name(name : string) {
  let full_texture_text : string = TextureHouse[name];
  
  let full_texture_text_split : string[] = full_texture_text.split(':');
  
  let texture_attributes = full_texture_text_split[0].split('_');
  
  if(texture_attributes[2] != 'RGB') {
    console.error(`Don't know how to use this texture : ${texture_attributes[2]}`);
    return;
  }
  
  let texture_width = parseFloat(texture_attributes[0]);
  let texture_height = parseFloat(texture_attributes[1]);
  
  let texture_decompressed = DEFLATE2.DECOMPRESS(full_texture_text_split[1]);
  
  return [texture_width, texture_height, texture_decompressed];
}

let loaded_texture : any[] = load_texture_by_name('kingpenguin');

console.log(loaded_texture);
console.log(loaded_texture[2].length);

let canvas : HTMLCanvasElement = <HTMLCanvasElement>document.getElementById("mainCanvas");

let ctx : CanvasRenderingContext2D = canvas.getContext("2d");

let GraphicsContext : gfx = new gfx(ctx);

GraphicsContext.FillCanvas(); // remove the default transparent background

let imgBlobs : Images = new Images();

/*let ImageContext : ImageBroker = new ImageBroker(imgBlobs.img1, () => {
  GraphicsContext.StartDrawing();
	drawImageOnCanvasRGB(ImageContext);
  //let val = (<HTMLInputElement>document.getElementById("zoomOutputId")).value;
  //updateCanvasRes(val);
});*/

let ImageContext : ImageBroker = new ImageBroker(loaded_texture);

GraphicsContext.StartDrawing();
drawImageOnCanvasRGB(ImageContext);