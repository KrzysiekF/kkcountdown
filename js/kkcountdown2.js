if ( typeof Object.create !== 'function' ) {
	Object.create = function( obj ) {
		function F() {};
		F.prototype = obj;
		return new F();
	};
}

(function( $, window, document, undefined ) {

	var Countdown = {
		init: function( options , obj ){
			var _this = this;
			console.log('OK');
		}
	};

	$.fn.kkcountdown = function( options ){
		return this.each(function() {
			var countdown = Object.create( Countdown );
			
			countdown.init( options, this );

			$.data( this, 'kkcountdown', countdown );
		});
	};

	$.fn.kkcountdown.options = {
		dayText			: 	'day ',
        daysText		: 	'days ',
        hoursText		: 	':',
        minutesText		:	':',
        secondsText		:	'',
        textAfterCount	: 	'',
        oneDayClass		:	false,
        displayDays		: 	true,
        displayZeroDays	:	true,
        addClass		: 	false,
        callback		: 	false,
        warnSeconds		:	60,
        warnClass		:	false
	};

})( jQuery, window, document );