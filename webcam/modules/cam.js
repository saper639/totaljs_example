exports.name = 'Cam';
exports.version = '1.0';
//const fs = require('fs');   

var param = { framerate:  "100/1", resolution: "800x640" };
    pipeline = undefined; //видеоканал  
var _this = this;    
//linux
//var init_cmd = 'v4l2src ! videoscale ! clockoverlay halignment=right valignment=bottom text="{0}, {1} " shaded-background=true font-desc="Sans, 18" ! video/x-raw, width={2}, height={3} ! videorate ! video/x-raw, framerate={4} ! jpegenc ! appsink name=sink';
//windows
var init_cmd = 'ksvideosrc device-index=0 ! videoscale ! clockoverlay halignment=right valignment=bottom text="{0}, {1} " shaded-background=true font-desc="Sans, 18" ! video/x-raw, width={2}, height={3} ! videorate ! video/x-raw, framerate={4} ! jpegenc ! appsink name=sink';


exports.pipeline = function() {
    if (pipeline) return pipeline;
    return create_pipeline();    
}

exports.pipeline_remove = function() {
    pipeline = undefined;    
}

function create_pipeline() {
	const GStreamer = require('gstreamer-superficial');
    var resolution = param.resolution.split('x');    
    pipeline = new GStreamer.Pipeline(init_cmd.format('cam is test', new Date().format('dd.MM.yyyy'), resolution[0], resolution[1], param.framerate));          
    return pipeline;
}

