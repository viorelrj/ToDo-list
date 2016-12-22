$(document).ready(function(){
	function ItemObj (content, state) {
		this.content = content;
		this.check = state;
	}
	if (localStorage.getItem('data') != null) {
		var data = JSON.parse(localStorage['data']);
		for (var i = data.length - 1; i >= 0 ; i--) {
			var checked = (data[i].check) ? 'list__item--check' : null;
			$('.list__items').prepend('<div class="panel panel-default list__item '+ checked +'"> <div class="panel-body"> <div class="col-xs-12 col-sm-10"> <p class="list__content">' + data[i].content + '</p> </div> <div class="btn-group item__opts js-item__opts" role="group" aria-label="..."> <button type="button" class="btn btn-default js-btn--check btn--check"> <i class="fa fa-check" aria-hidden="true"></i> </button> <button type="button" class="btn btn-default js-btn--delete btn--delete"> <i class="fa fa-trash-o" aria-hidden="true"></i> </button> </div> </div> </div>');
		} 
	}

	$('.list__items').sortable();

	function saveState () {
		var data = new Array();
		$('.list__item').each(function(){
			var itemData = new ItemObj();
			itemData.content = $(this).find('.list__content').text();
			itemData.check = ($(this).hasClass('list__item--check')) ? true : false;
			data.push(itemData);
			itemData = {};	
			JSONdata = JSON.stringify(data);	
			localStorage.setItem('data', JSONdata);	
		});		
	}
	//preventing the enter button submitting the form and reloading
	$(document).on('submit', '#input', function(e){
		e.preventDefault();
	});

	//Making the Items sortable

	//ading new Item
	$(document).on('click', '.js-btn--add', function(){
		function strip(html){
		   var tmp = document.createElement("DIV");
		   tmp.innerHTML = html;
		   return tmp.textContent || tmp.innerText || "";
		}

		var $input = $('input[name = list-input]').val();
			if ($input) {
				$('.list__items').prepend('<div class="panel panel-default list__item"> <div class="panel-body"> <div class="col-xs-12 col-sm-10"> <p class="list__content">' + $input + '</p> </div> <div class="btn-group item__opts js-item__opts" role="group" aria-label="..."> <button type="button" class="btn btn-default js-btn--check btn--check"> <i class="fa fa-check" aria-hidden="true"></i> </button> <button type="button" class="btn btn-default js-btn--delete btn--delete"> <i class="fa fa-trash-o" aria-hidden="true"></i> </button> </div> </div> </div>').sortable();	
				//item.content = $input;
			}
			saveState();
		var $input = $('input[name = list-input]').val('');
	});

	//Checking the Item
	$(document).on('click', '.js-btn--check', function(){
		$(this).closest('.list__item').toggleClass('list__item--check');
		saveState();
	});

	//Deleting the Item
	$(document).on('click', '.js-btn--delete', function(){
		$(this).closest('.list__item').toggleClass('list__item--delete').remove();
		saveState();
	});

	//Displaying the Item menu
	$(document).on('mouseenter mouseleave', '.list__item', function(){
		$(this).find('.item__opts').toggleClass('item__opts--hover');
		saveState();
	});
});