// const validator = require("../validation/validate");

// const saveCars = (req, res, next) => {
//   const validationRule = {
//     model: "required|string|min:2|max:50",
//     make: "required|string|min:2|max:50",
//     miles: "required|numeric|min:0",
//     color: "required|string|min:2|max:50",
//     year: "required|numeric|min:1900|max:2100",
//     engine: "required|string",
//     price: "required|numeric|min:0",
//     registration: "required|string",
//   };

//   validator(req.body, validationRule, {}, (err, status) => {
//     if (!status) {
//       return res.status(400).json({
//         success: false,
//         message: "Validation failed",
//         errors: err,
//       });
//     }
//     next();
//   });
// };

// const saveOwner = (req, res, next) => {
//   const validationRule = {
//     firstname: "required|string|min:2|max:50",
//     lastname: "required|string|min:2|max:50",
//     email: "required|email",
//     color: "string",
//     birthday: "string",
//     city: "string",
//     phone: "string",
//   };

//   validator(req.body, validationRule, {}, (err, status) => {
//     if (!status) {
//       return res.status(400).json({
//         success: false,
//         message: "Validation failed",
//         errors: err,
//       });
//     }
//     next();
//   });
// };

// module.exports = {
//   saveCars,
//   saveOwner,
// };
