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
	constructor(ctx : CanvasRenderingContext2D) {
		this.myCtx = ctx;
		//this.myCtx.globalCompositeOperation = "lighter";
	}
	
	public ClearCanvas() : void {
		//this.myCtx.globalCompositeOperation = "source-over";
		this.myCtx.clearRect(0, 0, this.myCtx.canvas.clientWidth, this.myCtx.canvas.clientHeight);
		//this.myCtx.globalCompositeOperation = "lighter";
	}
	
	public PutPixel(Pos : Vector2, Color : Vector4) {
		this.myCtx.fillStyle = "rgba("+Color.x+","+Color.y+","+Color.z+","+(Color.w/255)+")";
		this.myCtx.fillRect( Pos.x, Pos.y, 1, 1 );
	}
	
	public GetPixelAt(Pos : Vector2) : Vector4 {
		let raw_data : Uint8ClampedArray = this.myCtx.getImageData(Pos.x, Pos.y, 1, 1).data;
		return new Vector4(raw_data[0], raw_data[1], raw_data[2], raw_data[3]);
	}
}