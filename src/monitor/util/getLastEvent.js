
let lastEvent;
['click','pointerdown','touchstart','mousedown','keydown','mouseover'].forEach(event=>{
  document.addEventListener(event,(targetEvent)=>{
    lastEvent = targetEvent;
  },{
    capture:true,//控制监听器是在捕获阶段还是冒泡阶段执行
    passive:true
  })
})
export default function () {
  return lastEvent
}