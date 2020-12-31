const routes = require("next-routes");

// Name   Page      Pattern
module.exports = routes() // ----   ----      -----

  .add("auth/password/resetPassword", "/auth/password/reset/:slug")
  .add("auth/account/activateAccount", "/auth/account/activate/:slug")
  