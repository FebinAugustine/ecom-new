# Utility Functions For Backend

- **Check if user is admin:**

  - Function: isAdmin
  - Parameters: user
  - Returns: boolean
  - Description: Checks if the user is an admin.

- **Check if user is seller:**

  - Function: isSeller
  - Parameters: user
  - Returns: boolean
  - Description: Checks if the user is a seller.

- **Check if user is customer:**

  - Function: isCustomer
  - Parameters: user
  - Returns: boolean
  - Description: Checks if the user is a customer.

- **API Error Handler:**

  - Function: apiErrorHandler
  - Parameters: err, req, res, next
  - Returns: void
  - Description: Handles API errors.

  - **API Response Handler:**
    - Function: apiResponseHandler
    - Parameters: data, message, res
    - Returns: void
    - Description: Handles API responses.

- **Async Handler:**

  - Function: asyncHandler
  - Parameters: fn
  - Returns: function
  - Description: Creates an async wrapper for a function.

- **Email Sender:**

  - Function: sendEmail
  - Parameters: to, subject, text
  - Returns: void
  - Description: Sends an email.

- **Request Body Validator:**

  - Function: validateRequestBody
  - Parameters: req.body, schema
  - Returns: if error else next()
  - Description: Validates request body against a schema.
