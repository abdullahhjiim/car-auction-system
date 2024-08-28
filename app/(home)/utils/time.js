export function getTimezoneAbbreviation(date) {
  // Convert the date into human readable
  // An example: Fri Jul 09 2021 13:07:25 GMT+0200 (Central European Summer Time)
  // As you can see there is the timezone

  date = date.toString();

  // We get the timezone matching everything the is inside the brackets/parentheses
  var timezone = date.match(/\(.+\)/g)[0];

  // We remove the brackets/parentheses
  timezone = timezone.replace("(", "").replace(")", "");

  // A new variable for the abbreviation
  var abbreviation = "";

  // We run a forEach dividing the timezone in words with split
  timezone.split(" ").forEach((word) => {
    // We insert the first letter of every word in the abbreviation variable
    abbreviation += word.split("")[0];
  });

  // And finally we return the abbreviation
  return abbreviation;
}
