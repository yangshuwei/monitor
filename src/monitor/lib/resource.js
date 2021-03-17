let processData = (d) =>{
    let data = {
        name:d.name,
        initiatorType:d.initiatorType,
        duration:d.duration
    }
    return data;
}
export default {
    init(cb){
        if(window.PerformanceObserver){ //IE不支持
            let observer = new PerformanceObserver(list=>{
                let data = list.getEntries().filter(type=>type.initiatorType!=="xmlhttprequest")
                data.length!=0 && cb(processData(data[0]))
            });
            observer.observe({entryTypes:['resource']})
        }else{
            window.addEventListener('load',()=>{
                let resourceData = performance.getEntriesByType('resource');
                let data = resourceData.map((d)=>processData(d))
                cb(data)
            })
        }
        
    }
}