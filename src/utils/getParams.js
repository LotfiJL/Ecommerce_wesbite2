// const Getquery = () => {
//   const query = window.location.search;
//   const queryString = query.split("?");
//   if (queryString.length > 0) {
//     const params = queryString.split("&");
//     let paramsObj = {};
//     params.forEach((param) => {
//       const keyValue = param.split("=");
//       paramsObj = [keyValue[0]] = keyValue[1];
//     });

//     return paramsObj;
//   }
// };

// export default Getquery;

const Getquery = () => {
  const searchParams = new URLSearchParams(window.location.search);
  const paramsObj = {};

  for (const [key, value] of searchParams) {
    // Remove extra characters such as double quotes and spaces from the value
    const cleanValue = value.replace(/["' ]/g, ""); // Remove double quotes, single quotes, and spaces
    paramsObj[key.trim()] = cleanValue;
  }

  return paramsObj;
};

export default Getquery;
