(function( $, window, document, undefined ) {

	$.fn.uploadBase64 = function(op) {
		
		var t = this;
		var fn = $.extend({
			defaultype: ['jpg','png','jpeg','gif'],
			isLoaded: function(e) {
				if($(".preview-list").length == 0){
					$(t).parent().parent().append($("<div/>",{
						class:"preview-list"
					}))
				}
				var th = this;
				//this.object.getfile(e.target.result);
				$(".preview-list").append($("<div/>", {
					id: 'img-'+e.target.id,
					style: "display:none"
				}).append($("<div/>", {
					class: "data transition-cubic"
				})
				.append($("<a/>", {
					href: '#',
					class: 'fa fa-close transition-cubic'
				}).click(function(event){
					event.preventDefault();
					$(this).parent().parent().fadeOut("fast",function() {
						$(this).remove();
						th.object.countfile(parseInt(op.limit),parseInt($(".preview-list > div").length-1));
					});
					
				}))
				.append($("<a/>", {
					href: '#',
					class: 'fa fa-info transition-cubic'
				}).click(function(event){
					event.preventDefault();
					$(this).parent().toggleClass("info");
				}))
				.append($("<div/>", {
					class: 'dat-inf transition-cubic',
				})
				.append($("<a/>", {
					href: '#',
					class: 'fa fa-chevron-left'
				}).click(function(event){
					event.preventDefault();
					$(this).parent().parent().toggleClass("info");
				}))
				.append($("<div/>", {
					html: "<mark>"+e.target.file.name+"<br/>"+(parseInt(e.target.file.size/1000))+"kb"+"<br/>"+e.target.file.type+"</mark>"
				}))))
				.append($("<img/>", {
					src: e.target.result,
					alt: 'image',
					class: "transition-cubic"
				})).fadeIn("slow"));
				
				
			},
			getfile: function(data){
				var th = this,
			    reader = new FileReader();
			    reader.onload = function (event) {
			        var save = document.createElement('a');
			        save.href = event.target.result;
			        save.target = '_blank';
			        save.download = "text.txt" || 'archivo.dat';
			        var clicEvent = new MouseEvent('click', {
			            'view': window,
			                'bubbles': false,
			                'cancelable': true
			        });
			        save.dispatchEvent(clicEvent);
			        //window.webkitRequestFileSystem(window.TEMPORARY, 1024*1024, save.href);
			        (window.URL || window.webkitURL).revokeObjectURL(save.href);
			    };
			    reader.readAsDataURL(th.getfiledata(data));
			},
			getfiledata: function(data){
			    var texto = [];
			    texto.push(data);
			    return new Blob(texto, {
			        type: 'text/plain'
			    });
			},
			countfile: function(i,e){
				var result = true;
				var num = function(n){
					if(n==-1){
						return 0;
					}
					return n;
				}
				if(op.limit!=undefined){
					$(".count-file").text(num((i-1)-e));
					if(e >= i)
						result = false;
				}
				return result;
			},
			validation: function(d){
				var result = true,
				typefile = d.type.split("/");
				if(typeof op.filetype == "object" && op.filetype.length > 0)
					this.defaultype = op.filetype;
				
				if(this.defaultype.indexOf(typefile[1]) == -1){
					var result = false;
					
					alert("The file format is not valid, please charge format "+JSON.stringify(this.defaultype).replace(/\"|\[|\]/gi,"").toUpperCase().replace(/\,/gi,", "));
				}
				if(op.maxsize!=undefined){
					var size = (parseFloat(op.maxsize)*1000);
					if(size < d.size && result == true){
						result = false;
						alert("The file size exceeds the limit "+op.maxsize+"KB");
					}
				}
				return result;
			},
			loop: function(){
				var th = this,
				fi = t[0],
				lim = parseInt(op.limit),
				count = parseInt($(".preview-list > div").length);
				for (i = 0; i < fi.files.length; i++) { 
					if(th.validation(fi.files[i])== true && th.countfile(lim,count)==true){
						var reader = new FileReader();
						reader.object = th;
						reader.file = fi.files[i];
						reader.onload = th.isLoaded;
						reader.readAsDataURL(fi.files[i]);
						count++;
					}
				}
			},
			load: function(){
				var th = this;
				t.on('change', function(){th.loop();});
				if(op.limit!=undefined){
					t.parent().append($("<span/>",{
						class: "count-file",
						text: parseInt(op.limit)
					}));
				}
			}
		}, op);
		fn.load();
		
	}
		
})( jQuery, window, document );

$(document).ready(function(){
	$('#file').uploadBase64({limit:5, maxsize:20024, filetype:['jpg','jpeg','png']});
});

