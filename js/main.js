$(document).ready(function(){
	if (localStorage.getItem('data') != null) {
		var data = JSON.parse(localStorage['data']);
		console.log(data);
		for (var i = 0; i < data.length; i++) {
			$('.list__items').prepend('<div class="panel panel-default list__item"> <div class="panel-body"> <div class="col-xs-12 col-sm-10"> <p class="list__content">' + data[i] + '</p> </div> <div class="btn-group item__opts js-item__opts" role="group" aria-label="..."> <button type="button" class="btn btn-default js-btn--check btn--check"> <i class="fa fa-check" aria-hidden="true"></i> </button> <button type="button" class="btn btn-default js-btn--delete btn--delete"> <i class="fa fa-trash-o" aria-hidden="true"></i> </button> </div> </div> </div>');
		} 
	} else {
		var data = new Array();
	}

	//preventing the enter button submitting the form and reloading
	$(document).on('submit', '#input', function(e){
		e.preventDefault();
	});

	//ading new Item
	$(document).on('click', '.js-btn--add', function(){
		function strip(html){
		   var tmp = document.createElement("DIV");
		   tmp.innerHTML = html;
		   return tmp.textContent || tmp.innerText || "";
		}

		var $input = $('input[name = list-input]').val();
			if ($input) {
				$('.list__items').prepend('<div class="panel panel-default list__item"> <div class="panel-body"> <div class="col-xs-12 col-sm-10"> <p class="list__content">' + $input + '</p> </div> <div class="btn-group item__opts js-item__opts" role="group" aria-label="..."> <button type="button" class="btn btn-default js-btn--check btn--check"> <i class="fa fa-check" aria-hidden="true"></i> </button> <button type="button" class="btn btn-default js-btn--delete btn--delete"> <i class="fa fa-trash-o" aria-hidden="true"></i> </button> </div> </div> </div>');
				data.push($input);	
				JSONdata = JSON.stringify(data);	
				localStorage.setItem('data', JSONdata);		
			}

		var $input = $('input[name = list-input]').val('');
	});

	//Checking the Item
	$(document).on('click', '.js-btn--check', function(){
		$(this).closest('.panel-body').find('.list__content').toggleClass('list__content--check');
	});

	//Deleting the Item
	$(document).on('click', '.js-btn--delete', function(){
		$(this).closest('.list__item').toggleClass('list__item--delete').remove();
		var del = $(this).closest('.list__item').find('.list__content').text();
		var index = data.indexOf(del);
		data.splice(index, 1);
		JSONdata = JSON.stringify(data);	
		localStorage.setItem('data', JSONdata);	
	});

	//Displaying the Item menu
	$(document).on('mouseenter mouseleave', '.list__item', function(){
		$(this).find('.item__opts').toggleClass('item__opts--hover');
	});
});