/// <reference path="gfx.ts"/>

class ImageBroker {
	private imgCanvas : HTMLCanvasElement;
	public width : number;
	public height : number;
	
	constructor(imguri : string, callback : any) {
		let img : HTMLImageElement = new Image();
		img.src = imguri;
		
		img.onload = () => {this.LoadImageIntoCanvas(img, callback)};
	}
	
	private LoadImageIntoCanvas(img : HTMLImageElement, callback : any) : void {
		this.width = img.width;
		this.height = img.height;
		
		this.imgCanvas = document.createElement('canvas');
		this.imgCanvas.width = img.width;
		this.imgCanvas.height = img.height;
		this.imgCanvas.getContext('2d').drawImage(img, 0, 0, img.width, img.height);
		
		callback();
	}
	
	public GetPixelAt(Pos : Vector2) : Vector4 {
		let raw_data : Uint8ClampedArray = this.imgCanvas.getContext('2d').getImageData(Pos.x, Pos.y, 1, 1).data;
		return new Vector4(raw_data[0], raw_data[1], raw_data[2], raw_data[3]);
	}
}