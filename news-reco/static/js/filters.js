app.filter('capitalize', function() {
  return function(input) {
    if (input)
    return input[0].toUpperCase() + input.slice(1);
  };
});

app.filter('truncate', function(){
  return function (value, wordwise, max, tail) {
    if (!value) return '';
    max = parseInt(max, 10);
    if (!max) return value;
    if (value.length <= max) return value;

    value = value.substr(0, max);
    if (wordwise) {
      var lastspace = value.lastIndexOf(' ');
        if (lastspace != -1) {
          if (value.charAt(lastspace-1) == '.' || value.charAt(lastspace-1) == ',') {
            lastspace = lastspace - 1;
          }
          value = value.substr(0, lastspace);
        }
      }
      return value + (tail || ' ...');
    };
});

app.filter('slice', function() {
  return function(arr, start, end) {
    return (arr || []).slice(start, end);
  };
});