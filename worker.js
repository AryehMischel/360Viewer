const delay = ms => new Promise(res => setTimeout(res, ms));
var canvas

onmessage = async (evt) => {


    switch(evt.data.work) {
        case "init":
          console.log("initialized offline canvas")
          canvas = evt.data.canvas
          break;
        case "resize":
          canvas.height =  evt.data.canvasHeight
          canvas.width =  evt.data.canvasHeight
          break;
        case "crop-resize-stereo":
            let imageURLS = evt.data.imageURLS;
            for(let i = 0; i < imageURLS.length; i++){
              drawFitToCanvas(canvas, imageURLS[i])
             await delay(1000);
             break;
       
          
      }


      console.log("done")
    // self.postMessage("right back at you cheif")

}}

async function drawFitToCanvas(canvas, imageUrl){
  
    
    
    let ctx = canvas.getContext("2d");
  
    const imgblob = await fetch(imageUrl)
     .then(r => r.blob());
    const img = await createImageBitmap(imgblob)
    
  
    let scaleFactor = Math.max(canvas.width / img.width, canvas.height / img.height);
  
    let newWidth = img.width * scaleFactor;
    let newHeight = img.height * scaleFactor;
    
    let x = (canvas.width / 2) - (newWidth / 2);
    let y = (canvas.height / 2) - (newHeight / 2);
    

    ctx.drawImage(img, x, y, newWidth, newHeight * 2); // newHeight * 2
     
    await delay(1000);
    self.postMessage("done")
  
  
}