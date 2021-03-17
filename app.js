const http = require('http');

let server = http.createServer(function(req,res){
  if(req.url == '/api/success'){
    res.writeHead(200, {
      "Content-Type": "application/json", "Access-Control-Allow-Origin": "*"
   });
    let data = JSON.stringify({ msg: 'success' })
    res.end(data)
  }
  if (req.url == '/api/fail') {
    res.end({msg:'fail'})
  }
})
server.listen(3000,function(){
  console.log('server start 3000')
})