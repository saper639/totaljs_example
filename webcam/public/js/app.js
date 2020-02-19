function getScreen(e) {
	var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');
    var image = document.getElementById('stream');
    canvas.width = image.width;
    canvas.height = image.height;
    ctx.width = image.width;
    ctx.height = image.height;
    ctx.drawImage(image, 0, 0, image.width, image.height);
    canvas.toBlob(function(blob) {
      saveAs(blob, (new Date().format('dMyy_Hms'))+"_cam.jpg");
    });    
}