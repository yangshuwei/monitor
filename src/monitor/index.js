import perf from './lib/performance';
import injectJsError from './lib/jsError';
import resourceData from './lib/resource';
import injectXHR from './lib/xhr'
// injectJsError.init((data)=>{
//     // console.log(data)
// });
// perf.init((data)=>{
//   // console.log(data)
// })
// injectXHR.init((data)=>{
//   console.log(data)
// })
// resourceData.init((data)=>{
//     console.log(data)
// })
injectXHR.init((data)=>{
    console.log(data)
})