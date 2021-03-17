
function processData(p) {
  let data = {
    prevPage: p.fetchStart - p.navigationStart,//上一个页面到这个页面的时长
    redircet: p.redirectEnd - p.redirectStart,//页面重定向时长
    dns: p.domainLookupEnd - p.domainLookupStart,//dns解析时长
    connect: p.connectEnd - p.connectStart,//tcp链接时长
    send: p.responseEnd - p.requestStart,//从请求到得到响应结束时长
    ttfb: p.responseStart - p.navigationStart,//首字节接收到的时长
    domready: p.domInteractive - p.domLoading,//dom准备时长
    whiteScreen:p.domLoading - p.navigationStart,//白屏时间
    dom:p.domComplete - p.domLoading,//dom解析时间
    load:p.loadEventEnd - p.loadEventStart,//onload执行时间，
    total:p.loadEventEnd - p.navigationStart,
    firstScreen:p.domContentLoadedEventEnd - p.fetchStart//第一屏所有资源完整展示资源
  }
  return data
}
/**loadEventEnd：load事件执行完毕的是时间戳
 * 页面开始加载的时候，load事件还没有被触发，loadEventEnd==0
 * 开启定时器没100ms检查一次，直到load事件被触发
 * @param {*} cb 
 */
let load = (cb) =>{
  let timer = null;
  let check =()=>{
    if(performance.timing.loadEventEnd){
      clearTimeout(timer);
      cb()
    }else{
      timer = setTimeout(check, 100);
    }
  }
  window.addEventListener('load',check,false)
}
export default {
  init(cb) {
    load(()=>{
      let perfData = performance.timing;
      let data = processData(perfData)
      cb(data)
    })
    
  }
}