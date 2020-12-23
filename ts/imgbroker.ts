/// <reference path="gfx.ts"/>

class Pixel {
  constructor(
    public x : number,
    public y : number,
    public color : Vector4
    ) {}
}

class ImageBroker {
	public width : number;
	public height : number;
  
  private Pixel_Array : Vector4[][] = [];
	
	constructor(img_attribs : any[]) {    
    // get ready to draw the decompressed loaded image onto it
    
    this.width = img_attribs[0];
		this.height = img_attribs[1];
    
    let image_filling : string = img_attribs[2];
    
    // draw the image into the virtual pixel array variable
    
    // multiply by 9 because pixels are in format rrrgggbbb, 9 characters repeated in a big string
    
    for(let y : number = 0;y < this.height;y++) {
      for(let x : number = 0;x < this.width;x++) {
        let real_position : number = (x + y * this.width) * 9;
        
        let red : number = parseInt(image_filling.substring(real_position, real_position + 3));
        let green : number = parseInt(image_filling.substring(real_position + 3, real_position + 6));
        let blue : number = parseInt(image_filling.substring(real_position + 6, real_position + 9));
        
        if(this.Pixel_Array[x] === undefined) {
          this.Pixel_Array[x] = [];
        }
        
        this.Pixel_Array[x][y] = new Vector4(red, green, blue, 255);
      }
    }
	}
	
	public GetPixelAt(Pos : Vector2) : Vector4 {
    return this.Pixel_Array[Pos.x][Pos.y];
    
		//let raw_data : Uint8ClampedArray = this.imgCanvas.getContext('2d').getImageData(Pos.x, Pos.y, 1, 1).data;
		//return new Vector4(raw_data[0], raw_data[1], raw_data[2], raw_data[3]);
	}
}