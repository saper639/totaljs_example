exports.install = function() {
    ROUTE('/*', 'index');
    F.file('/cam/stream.jpg',  stream_cam);    
}

function stream_cam(req, res) {
    var fs = require('fs');    
    var mimeType = 'image/jpeg'; // will be overwritten by caps
    const boundary='boundarydonotcross'; // designator for html boundry
    var appsink;   
    function pull() {
        appsink.pull(function(buf, caps) {
            if (caps) {                
                mimeType = caps['name'];
            }
            if (buf) {                
                res.write('--'+boundary+'\r\n');
		res.write('Content-Type: ' + mimeType + '\r\n' + 'Content-Length: ' + buf.length + '\r\n');
                res.write('\r\n');                
                res.write(buf, 'binary');                
                res.write('\r\n');                
                pull();                
            } else {
                setTimeout(pull, 500);
            }            
        })    
    } 
    var Cam = MODULE('Cam');
    var pipeline = Cam.pipeline();
    appsink = pipeline.findChild('sink');    
    pipeline.play();           
    pull();                

    res.writeHead(200, {
        'Server': 'Node-GStreamer-MPEGStreamer',
        'Connection': 'close',
        'Expires': 'Fri, 01 Jan 2000 00:00:00 GMT',
        'Cache-Control': 'no-cache, no-store, max-age=0, must-revalidate',
        'Pragma': 'no-cache',
        'Content-Type': 'multipart/x-mixed-replace; boundary=' + boundary
    });  

    res.on('close', function() {
        pipeline.stop();           
        Cam.pipeline_remove();             
    });    
}