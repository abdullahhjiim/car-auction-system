export const checkNumberOrFloat = (
  text,
  checkType = "number",
  ifCheckOrCast = false
) => {
  if (text.length == 0) return "";

  const myPattern = {
    number: /^[0-9]+$/,
    float: /^([0-9]*[.])?[0-9]+$/,
  };

  if (ifCheckOrCast) {
    return myPattern[checkType].test(text);
  } else {
    let value = text.replace(/[a-zA-Z]+/, "");
    if (value.length === 0) return "";
    value = 'number' ? parseInt(value) : parseFloat(value);
		return Object.is(value, NaN) ? '' : value;
  }
};
