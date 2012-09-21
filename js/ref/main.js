
$(document).ready(function() {
	window.scrollTo(0, 1);
	$('input:not(:button)').val(null);
	$('#here').addClass('t1');
});

$('#getProfile').on('click', function() {    
	var phoneNumber = $('#phoneNumber').val();	
	$.get('/profile?phoneNumber=' + phoneNumber, function(data) {		
		var image = '<img id="profileImage" src="' + data.background + '" />';
		var displayName = '<p><b>' + data.display_name + '</b></p>';
		var bio = '<p>' + data.bio + '</p>';		
		// var image = '<img id="profileImage" src="' + data.thumbnail2 + '" />';		
		// var userName = '<p>' + data.user_name + '</p>';
		
		var result = image + displayName + bio;
		$('#result').empty().append(result);
	}, "json");
});

$('#signIn').on('click', function() {
	$('#signInResult').empty();
	
	var id = $('#signInID').val();
	var pw = $('#signInPW').val();
	
	var url = '/signIn?'
			+ 'userID=' + id
			+ '&pw=' + pw;
	
	$.get(url, function(data) {
		if (data.length) {
			$('#signInResult').css({'display': 'block'});
			$('#signInResult').append('<p><b>All Users</b></p>');
			
			var userID;
			var phoneNumber;
			var profileID;
			var result;
			var _delButton;
			
			for (var i = 0, len = data.length; i < len; i++) {				
				userID = '<p> ID : ' + data[i].userID + '</p>';
				phoneNumber = '<p> phone : ' + data[i].phoneNumber + '</p>';
				profileID = '<p>About.Me : ' + data[i].profileID + '</p>';				
				_delButton = $('<input>').attr({
					'type': 'button',
					'id': data[i].userID,
					'value': 'delete'
				});
				result = userID + phoneNumber + profileID;
				$('<div>').addClass('user').append(result).append(_delButton).appendTo('#signInResult');				
			}
		} else {
			var phoneNumber = '<p> phone : ' + data.phoneNumber + '</p>';
			var profileID = '<p>About.Me : ' + data.profileID + '</p>';
			var result = phoneNumber + profileID;
		
			$('#signInResult').append(result);
			$('#signInResult').css({'display': 'block'});	
		}				
	}, "json"); 
});

$(document).on('click', '.user input', function() {
	var $that = $(this);
	var url = '/delete?userID=' + $that.attr('id');	
	
	$.get(url, function(data) {
		if (data == "done") {			
			$that.parent().css({
				display: "none"
			});
		}
	});	
});

$('#signUp').on('click', function() {
	$('#signUpResult > input:not(:button)').val(null);
	
	var id = $('#signUpUserID').val();
	
	var url = '/signUp?userID=' + id;	
	$.get(url, function(data) {		
		if (data.responseCode == 200) {
			$('#signUpResult').css({'display': 'block'});	
			$('#signUpUserID').data('data-id', id);			
		} else if (data.responseCode == 400) {
			alert(data.responseText);				
		}		
	}, "json");	
});

$('#signUpSubmit').on('click', function() {
	var id = $('#signUpUserID').data('data-id');
	var pw = $('#signUpPW').val();
	var pwConfirm = $('#signUpPWConfirm').val();
	var phoneNumber = $('#signUpPhoneNumber').val();
	var aboutMeID = $('#signUpAboutMe').val();
	
	if (pw == pwConfirm) {
		var url = '/signUpSubmit?'
				+ 'userID=' + id
				+ '&pw=' + pw
				+ '&phoneNumber=' + phoneNumber
				+ '&aboutMeID=' + aboutMeID;
		$.get(url, function(data) {
			alert(data);
			$('#signUpResult').css({'display': 'none'});	
		});	
	} else {
		alert("Check your password");
	}	
});
