var canvas

onmessage = async (evt) => {


    switch(evt.data.work) {
        case "init":
          // code block
          console.log("initializing...")
          break;
        case y:
          // code block
          break;
        default:
          // code block
      }

    if(evt.data.work == "init"){
        console.log("initialized offline canvas")
        canvas = evt.data.canvas
        return
    }

    
    self.postMessage("right back at you cheif")

}