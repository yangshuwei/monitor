import getSelector from "../util/getSelector";
import getLastEvent from '../util/getLastEvent';
export default{
  init(cb){
    window.addEventListener('error',(e)=>{
      // console.log(e)
      let lastEvent = getLastEvent()
      console.log(lastEvent)
      if(e.target&&(e.target.src||e.target.href)){
        let log = {
          kind: "stability",
          type: 'error',
          errorType: 'resourceError',
          filename: e.target.src||e.target.href,
          tagName:e.target.tagName,
          selecTor: getSelector(e.path || e.target)
        }
        cb(log)
      }else{
        let log = {
          kind: "stability",
          type: 'error',
          errorType: 'jsError',
          message: e.message,
          filename: e.filename,
          position: `${e.lineno}:${e.colno}`,
          stack: getLines(e.error.stack),
          selecTor: lastEvent ? getSelector(lastEvent.path || lastEvent.target) : ''
        }
        cb(log)
      }
      
    },true);
    window.addEventListener('unhandledrejection', (e) => {
  
      // e.preventDefault();
      let lastEvent = getLastEvent();
      let message = "";
      let line = 0;
      let column = 0;
      let stack = '';
      let filename = '';
      if (typeof e.reason === 'string') {
        message = e.reason;
      } else if (typeof e.reason === 'object') {
        message = e.reason.message
      }
      let reason = e.reason;
      if (typeof reason === 'object') {
        if (reason.stack) {
          let matchResult = reason.stack.match(/at\s+(.+):(\d+):(\d+)/);
          if (matchResult) {
            filename = matchResult[1];
            line = matchResult[2]
            collumn = matchResult[3]
          }
          stack = getLines(reason.stack)
        }
      }
      let log = {
        kind: "stability",
        type: 'error',
        errorType: 'promiseError',
        message,
        position: line + ':' + column,
        filename,
        stack,
        selector: lastEvent ? getSelector(lastEvent.path || lastEvent.target) : ''
      }
      cb(log)
    },true)
    function getLines(stack) {
      if (!stack) {
        return ''
      }
      //TypeError: Cannot set property 'error' of undefined↵    at btnClick (http://localhost:8080/:18:39
      return stack.split('\n').slice(1).map(item => item.replace(/^\s+at\s+/g, '')).join('^');
      // return stack.split('\n').slice(1).map(item=>item.replace(/^\s+at\s+/g,'').join('^'))
    }
  }
  
}