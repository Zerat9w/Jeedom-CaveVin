if((!isset(userProfils.doNotAutoHideMenu) || userProfils.doNotAutoHideMenu != 1) && !jQuery.support.touch){
	$('#sd_objectList').hide();
	$('#div_graphiqueDisplay').removeClass('col-xs-10').addClass('col-xs-12');
	$('#bt_displayObjectList').on('mouseenter',function(){
		var timer = setTimeout(function(){
			$('#bt_displayObjectList').find('i').hide();
			$('#div_graphiqueDisplay').addClass('col-xs-10').removeClass('col-xs-12');
			$('#sd_objectList').show();
			$(window).resize();
		}, 100);
		$(this).data('timerMouseleave', timer)
	}).on("mouseleave", function(){
		clearTimeout($(this).data('timerMouseleave'));
	});
	$('#sd_objectList').on('mouseleave',function(){
		var timer = setTimeout(function(){
			$('#sd_objectList').hide();
			$('#bt_displayObjectList').find('i').show();
			$('#div_graphiqueDisplay').removeClass('col-xs-10').addClass('col-xs-12');
			setTimeout(function(){
				$(window).resize();
			},100);
			setTimeout(function(){
				$(window).resize();
			},300);
			setTimeout(function(){
				$(window).resize();
			},500);
		}, 300);
		$(this).data('timerMouseleave', timer);
	}).on("mouseenter", function(){
		clearTimeout($(this).data('timerMouseleave'));
	});
}
HtmlWidget($('.li_eqLogic').first().attr('data-eqlogic_id'));
var logement='';
$('.FicheVinDisplay').load('index.php?v=d&modal=FicheVin.CaveVin&plugin=CaveVin&type=CaveVin', function() {
	$('.selecVin').hide();
});
$('.li_eqLogic').on('click', function(){
	HtmlWidget($(this).attr('data-eqLogic_id'));
});
$('.FiltreVinDisplay').load('index.php?v=d&modal=SelectVin.CaveVin&plugin=CaveVin&type=CaveVin');	
$('.mesVinAction[data-action=exporter]').on('click', function () {
	$.ajax({
		type: 'POST',            
		async: false,
		url: 'plugins/CaveVin/core/ajax/CaveVin.ajax.php',
		data:
			{
			action: 'ExportVins'
			},
		dataType: 'json',
		global: false,
		error: function(request, status, error) {},
		success: function(data) {
			
   			 window.location.href = 'core/php/downloadFile.php?pathfile='+ encodeURIComponent(data.result);
			/*$.ajax({
				type: 'GET',            
				url: 'core/php/downloadFile.php',
				data:{pathfile: encodeURIComponent(data.result)},
			});*/
		}
	});

});
function HtmlWidget(idCasier){
	$.ajax({
		type: 'POST',            
		async: false,
		url: 'plugins/CaveVin/core/ajax/CaveVin.ajax.php',
		data:
			{
			action: 'getWidget',
			id:idCasier,
			},
		dataType: 'json',
		global: false,
		error: function(request, status, error) {},
		success: function(data) {	
			$('.widgetDisplay').html(data.result);
		}
	});
}
