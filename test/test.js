// module('KKCountdown: Test');

// test( "hello test", function() {
//     var xxx = $(".kkcountdown-1").kkcountdown({
//         dayText     : 'day ',
//         daysText    : 'days ',
//         hoursText   : 'h ',
//         minutesText : 'm ',
//         secondsText : 's',
//         displayZeroDays : true,
//         callback    : cBack,
//         rusNumbers  :   false
//     });
    
//     ok( xxx, "Passed!" );
// });


$(document).ready(function(){
    $(".kkcountdown-1").kkcountdown({
        dayText     : 'day ',
        daysText    : 'days ',
        hoursText   : 'h ',
        minutesText : 'm ',
        secondsText : 's',
        displayZeroDays : true,
        callback    : cBack,
        rusNumbers  :   false
    });
    
    $("#go").on('click', function() {
        var secs = $("#secs").val();

        $("#secs").parent("span").html("<strong>"+secs+"</strong>");

        $("#go").hide();

        $(".kkcountdown-2")
            .attr('data-seconds', secs)
            .kkcountdown({
            hoursText   : ':',
            minutesText : ':',
            secondsText : '',
            displayZeroDays : true,
            textAfterCount: 'Hello! :-) ',
            warnSeconds : 10,
            warnClass   : 'alert',
            callback : test
        });
    });

});

function cBack(){
    console.log('THE END - Function callback!');
}