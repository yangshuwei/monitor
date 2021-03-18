export default{
  init(cb){
    window.onerror = function(message,source,lineno,colno,error){
      let info = {
        message:error.message,
        name:error.name
      }
      cb(info)
    }
  }
}