const delay = ms => new Promise(res => setTimeout(res, ms));
var canvas

onmessage = async (evt) => {

  console.log("worker is messaged")


  switch (evt.data.work) {
    case "init":
      console.log("initialized offline canvas")
      canvas = evt.data.canvas
      break;
    case "resize-canvas":
      canvas.height = evt.data.canvasHeight / 2
      canvas.width = evt.data.canvasHeight
      break;
    case "stereo":
      console.log("crop-resize-stereo")
      let imageURLS = evt.data.imageURLS;
      CropResizeStereo(canvas, imageURLS)
      break;

    case "mono":
      console.log("mono")
      resize2(canvas, evt.data.imageURLS)
      // resize(canvas, evt.data.imageURLS)
      break;

    case "crop-resize-stereo-L|R":
      console.log("crop-resize-stereo")
      break;

    case "crop-resize-stereo-R|L":
      console.log("crop-resize-stereo")
      break;


    case "crop-resize-stereo-R/L":
      console.log("crop-resize-stereo")
      break;

    case "fuck":
      console.log("fuck")
      break;

      console.log("done")
    // self.postMessage("right back at you cheif")

  }
}






async function CropResizeStereo(canvas, imageURLS) {
  let ctx = canvas.getContext("2d");

  for (let i = 0; i < imageURLS.length; i++) {

    const imgblob = await fetch(imageURLS[i])
      .then(r => r.blob());
    const img = await createImageBitmap(imgblob)


    let scaleFactor = Math.max(canvas.width / img.width, canvas.height / img.height);

    let newWidth = img.width * scaleFactor;
    let newHeight = img.height * scaleFactor;



    // console.log("before message")
    ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, newWidth, newHeight);
    await delay(4000);

    self.postMessage("done with first image")
    await delay(4000);

    ctx.drawImage(img, 0, img.height / 2, img.width, img.height, 0, 0, newWidth, newHeight);
    console.log("done with first image")

    await delay(4000);
    self.postMessage("done with second")
    await delay(4000);
  }

}


async function resize(canvas, imageURLS) {
  let ctx = canvas.getContext("2d");

  for (let i = 0; i < imageURLS.length; i++) {
    const imgblob = await fetch(imageURLS[i])
      .then(r => r.blob());
    const img = await createImageBitmap(imgblob)



    let scaleFactor = Math.max(canvas.width / img.width, canvas.height / img.height);
    console.log(scaleFactor)

    let newWidth = img.width * scaleFactor;
    let newHeight = img.height * scaleFactor;

    let x = (canvas.width / 2) - (newWidth / 2);
    let y = (canvas.height / 2) - (newHeight / 2);

    // ctx.drawImage(img, x, y, newWidth, newHeight);
    ctx.drawImage(img, x, y, canvas.width, canvas.height);

    // ctx.drawImage(img, 0, 0);

    // await delay(4000);

    // postMessage({blob: canvas.convertToBlob()})
    await delay(4000);
    self.postMessage("done mono")
    // canvas.convertToBlob().then((blob) => {
    //   postMessage({blob})

    //   // optional: add the fillrect to clear the canvas.
    // })

    await delay(2000);

  }



};





async function drawFitToCanvas(canvas, imageUrl) {



  let ctx = canvas.getContext("2d");

  const imgblob = await fetch(imageUrl)
    .then(r => r.blob());
  const img = await createImageBitmap(imgblob)


  let scaleFactor = Math.max(canvas.width / img.width, canvas.height / img.height);

  let newWidth = img.width * scaleFactor;
  let newHeight = img.height * scaleFactor;

  // let x = (canvas.width / 2) - (newWidth / 2);
  // let y = (canvas.height / 2) - (newHeight / 2);    

  // ctx.drawImage(img, x , y, newWidth, newHeight * 2); 
  // ctx.drawImage(img, x , y, newWidth, newHeight * 2 ); 

  // console.log("before message")
  ctx.drawImage(img, 0, 0, img.width, img.height / 2, 0, 0, newWidth, newHeight);
  await delay(4000);

  self.postMessage("done dsd sdf sdf sdf sdf sd")
  await delay(4000);

  ctx.drawImage(img, 0, img.height / 2, img.width, img.height / 2, 0, 0, newWidth, newHeight);
  console.log("after message")

  await delay(4000);
  self.postMessage("done dsd sdf sdf sdf sdf sd")

  // self.postMessage({work: "fuck"})
  // console.log("after message")

  // await delay(4000);
  // console.log("after message2 ")
  // ctx.drawImage(img, 0 , img.height/2, img.width, img.height/2, 0, 0, newWidth, newHeight); 
  // await delay(3000);
  // self.postMessage("done dsd sdf sdf sdf sdf sd")



  // ctx.drawImage(img, 0 , img.height/2, img.width, img.height/2, 0, 0, newWidth, newHeight); 





}



// console.log(img.height == img.width/2)
// console.log(canvas.height, canvas.width)

// if(img.height == img.width/2 && img.height % 1024 == 0){

//     console.log("good")



// }else{
//   console.log("not good")
// }

// canvas.width = img.width
// canvas.height = img.height

async function resize2(canvas, imageURLS) {
  let ctx = canvas.getContext("2d");

  for (let i = 0; i < imageURLS.length; i++) {
    const imgblob = await fetch(imageURLS[i])
      .then(r => r.blob());
    const img = await createImageBitmap(imgblob)



    let scaleFactor = Math.max(canvas.width / img.width, canvas.height / img.height);
    console.log(scaleFactor)

    let newWidth = img.width * scaleFactor;
    let newHeight = img.height * scaleFactor;

    let x = (canvas.width / 2) - (newWidth / 2);
    let y = (canvas.height / 2) - (newHeight / 2);

    // ctx.drawImage(img, x, y, newWidth, newHeight);
    ctx.drawImage(img, x, y, canvas.width / 4, canvas.height);

    // ctx.drawImage(img, 0, 0);

    // await delay(4000);
    // self.postMessage("done mono")
    // postMessage({blob: canvas.convertToBlob()})

    canvas.convertToBlob().then((blob) => {
      postMessage({ blob })
      ctx.clearRect(0, 0, canvas.width, canvas.height);


      // optional: add the fillrect to clear the canvas.
    })

    // await delay(1000);


  }



};
