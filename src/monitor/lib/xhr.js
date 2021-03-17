export default{
  init(cb){
    let xhr = window.XMLHttpRequest;
    let oldOpen = xhr.prototype.open;
    xhr.prototype.open = function(method,url,async,username="",password=""){
      this.info = {
        method,url,async,username,password
      }
      return oldOpen.apply(this,arguments)
    }
    let oldSend = xhr.prototype.send;
    xhr.prototype.send = function(value){
      let start = new Date();
      let handle = (type) => ()=>{
        this.info.time = new Date() - start;
        this.info.requestSize = value?value.length:0;
        this.info.responseSize = this.responseText.length;
        this.info.type = type;
        cb(this.info)
      }
      this.addEventListener('load',handle('load'),false);
      this.addEventListener('error',handle('error'),false);
      this.addEventListener('abort',handle('abort'),false);
      return oldSend.apply(this,arguments)
    }
  }
}