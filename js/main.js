$(document).ready(function(){
	//Mustache
	var template = $('#item-template').html();

	function ItemObj (content, state) {
		this.content = content;
		this.check = state;
	}
	if (localStorage.getItem('data') != null) {
		var data = JSON.parse(localStorage['data']);
		for (var i = data.length - 1; i >= 0 ; i--) {
			data[i].check = (data[i].check) ? 'list__item--check' : null;
			$('.list__items').prepend(Mustache.to_html(template, data[i]));
		} 
	}

	//Making the Items sortabled
	$('.list__items').sortable();

	function saveState () {
		var data = new Array();
		$('.list__item').each(function(){
			var itemData = new ItemObj();
			itemData.content = $(this).find('.list__content').text();
			itemData.check = ($(this).hasClass('list__item--check')) ? true : false;
			data.push(itemData);	
		});
		JSONdata = JSON.stringify(data);	
		localStorage.setItem('data', JSONdata);	
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
				var inputData = new ItemObj($input, 'hello');
				$('.list__items').prepend(Mustache.to_html(template, inputData));
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
		saveState();
	});
});