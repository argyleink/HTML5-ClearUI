$(function(){
    //setup scrolling
    $(document)
	.bind('touchmove', function(e){
		if (window.inAction || window.editing || window.draggingDown || document.height <= 356) {
			e.preventDefault();
		} else {
			window.globalDrag = true;
		}
	})
	.bind('touchend touchcancel', function(e){
		window.globalDrag = false;
	});
    
    nerdList();
});