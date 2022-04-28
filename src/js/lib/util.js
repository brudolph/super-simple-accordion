/*!
 * Deep merge two or more objects into the first.
 * (c) 2019 Chris Ferdinandi, MIT License, https://gomakethings.com
 * @param   {Object} objects  The objects to merge together
 * @returns {Object}          Merged values of defaults and options
 */
export const deepMerge = function() {
  // Make sure there are objects to merge
  var len = arguments.length;
  if (len < 1) return;
  if (len < 2) return arguments[0];

  // Merge all objects into first
  for (let i = 1; i < len; i++) {
    for (let key in arguments[i]) {
      // If it's an object, recursively merge
      // Otherwise, push to key
      if (Object.prototype.toString.call(arguments[i][key]) === "[object Object]") {
        arguments[0][key] = deepMerge(arguments[0][key] || {}, arguments[i][key]);
      } else {
        arguments[0][key] = arguments[i][key];
      }
    }
  }

  return arguments[0];
};
