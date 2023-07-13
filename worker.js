onmessage = async (evt) => {

    console.log("recieved message from worker")
    self.postMessage("right back at you cheif")

}