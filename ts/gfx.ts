class Vector2 {
	constructor(
	public x : number,
	public y : number) {}
}

class Vector4 {
	constructor(
	public x : number,
	public y : number,
	public z : number,
	public w : number) {}
}

class gfx {
	private myCtx : CanvasRenderingContext2D;
  private canvas_image_data;
  private canvas_image_data_pixels;
  
	constructor(ctx : CanvasRenderingContext2D) {
		this.myCtx = ctx;
  }
	
	public ClearCanvas() : void {
		this.myCtx.clearRect(0, 0, this.myCtx.canvas.clientWidth, this.myCtx.canvas.clientHeight);
	}
  
  public FillCanvas() : void {
    this.myCtx.fillStyle = "rgba(0, 0, 0, 1)";
		this.myCtx.fillRect(0, 0, this.myCtx.canvas.clientWidth, this.myCtx.canvas.clientHeight);
  }
  
  public StartDrawing() : void {
    this.canvas_image_data = this.myCtx.getImageData(0, 0, this.myCtx.canvas.clientWidth, this.myCtx.canvas.clientHeight);
    this.canvas_image_data_pixels = this.canvas_image_data.data;
  }
  
  public FinishDrawing() : void {
    this.myCtx.putImageData(this.canvas_image_data, 0, 0);
  }
	
	public PutPixel(Pos : Vector2, Color : Vector4) {
    
    let offset : number = (Pos.y * this.canvas_image_data.width + Pos.x) * 4;
    this.canvas_image_data_pixels[offset + 0] = Color.x;
    this.canvas_image_data_pixels[offset + 1] = Color.y;
    this.canvas_image_data_pixels[offset + 2] = Color.z;
    this.canvas_image_data_pixels[offset + 3] = Color.w;
    
		/*this.myCtx.fillStyle = "rgba("+Color.x+","+Color.y+","+Color.z+","+(Color.w/255)+")";
		this.myCtx.fillRect( Pos.x, Pos.y, 1, 1 );*/
	}
	
	public GetPixelAt(Pos : Vector2) : Vector4 {
		let raw_data : Uint8ClampedArray = this.myCtx.getImageData(Pos.x, Pos.y, 1, 1).data;
		return new Vector4(raw_data[0], raw_data[1], raw_data[2], raw_data[3]);
	}
}