/**
 * Author: Bruno Germano
 * Date: 2012-09-26 19:45
 * URL: https://github.com/egermano/jquery.dateAgo
 */

 /**
  * Date Ago
  * @param  string input
  * @param  object options
  * @return string formated string
  */
angular.module('egermano.dateAgo', [])
  .fitler('dateAgo', function() {
    return function(input){
      if (!input) return input;

      var options = {};
      if (arguments[1]) options = arguments[1]; 

      // This is the easiest way to have default options.
      var settings = $.extend({
        texts: {
          now: 'just now',
          minutes: 'minutes ago',
          hour: 'hour ago',
          hours: 'hours ago',
          yesterday: 'yesterday',
          days: 'dasy ago'
        }
      }, options );


      var baseDate = input;

      //date from menssage
      var date = new Date(Date.parse(baseDate)).toLocaleDateString(),
          hour = new Date(Date.parse(baseDate)).toLocaleTimeString(),
          _agoDate = new Date(date + ' ' + hour),
          today = new Date(),

          diff = (today.getTime()-_agoDate.getTime()),
          dataText = '';

      if(diff<(1000*60*60*24)){
          if(diff<(1000*60*60)){
              var minutes = Math.floor(diff/(1000*60));
              if(minutes <= 1)
                  dataText = settings.texts.now;
              else
                  dataText = minutes.toString() + ' ' + settings.texts.minutes;
          }else{
              var hours = Math.floor(diff/(1000*60*60));
              dataText = hours.toString() + (hours==1?' ' + settings.texts.hour:' ' + settings.texts.hours);
          }
      }else{
          var days = Math.floor(diff/(1000*60*60*24));
          if(days==1)
              dataText = settings.texts.yesterday;
          else
              dataText = days.toString() + ' ' + settings.texts.days;
      }

      return dataText;
    }
  });
