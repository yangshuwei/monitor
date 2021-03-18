import perf from './lib/performance';
import injectJsError from './lib/jsError';
import resourceData from './lib/resource';
import injectXHR from './lib/xhr';
import injectScript from './lib/script';
import lastEvent from './util/getLastEvent'
injectJsError.init((data)=>{
    console.log(lastEvent)
});
// injectScript.init((data)=>{
//     console.log(data)
// })
// perf.init((data)=>{
//   // console.log(data)
// })
// injectXHR.init((data)=>{
//   console.log(data)
// })
// resourceData.init((data)=>{
//     console.log(data)
// })
// injectXHR.init((data)=>{
//     console.log(data)
// })