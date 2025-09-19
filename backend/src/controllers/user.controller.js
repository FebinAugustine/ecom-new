import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import {
  registerUserService,
  loginUserService,
  googleOAuthService,
  logoutUserService,
  refreshAccessTokenService,
  getAllUsersService,
  getUserByIdService,
  getUserByEmailService,
  updateUserPasswordService,
  updateUserByIdService,
  updateUserAvatarService,
  forgotPasswordService,
  forgotPasswordVerifyCodeService,
  resendVerificationEmailService,
  verifyEmailService,
  deleteUserByIdService,
} from "../services/user.service.js";

const registerUser = asyncHandler(async (req, res) => {
  console.log(req.body);
  const user = await registerUserService(req.body);
  console.log(user);
  return res
    .status(201)
    .json(new ApiResponse(201, user, "User registered successfully"));
});

const loginUser = asyncHandler(async (req, res) => {
  const { user, accessToken, refreshToken } = await loginUserService(req.body);

  const options = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", // Use secure cookies in production
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        { user, accessToken, refreshToken },
        "User logged in successfully"
      )
    );
});

const googleLogin = (req, res) => {
  // This will be handled by the Passport middleware, so no specific logic is needed here.
  // The route will trigger the Google authentication screen.
};

const googleCallback = asyncHandler(async (req, res) => {
  const { user, accessToken, refreshToken } = await googleOAuthService(
    req.user
  );

  const options = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  };

  res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .redirect(`${process.env.FRONTEND_URL}/`); // Redirect to frontend
});

const logoutUser = asyncHandler(async (req, res) => {
  await logoutUserService(req.user._id);
  console.log("User logged out successfully");

  const options = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  };

  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "User logged out successfully"));
});

const postRefreshToken = asyncHandler(async (req, res) => {
  const incomingRefreshToken =
    req.cookies.refreshToken || req.body.refreshToken;

  // The service now returns the user object as well
  const {
    user,
    accessToken,
    refreshToken: newRefreshToken,
  } = await refreshAccessTokenService(incomingRefreshToken);

  const options = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  };

  // The data object now matches the Android LoginData class
  const responseData = {
    user: {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      role: user.role,
      // Add any other fields your UserDto on Android expects
    },
    token: accessToken, // Use "token" to match Android
    refreshToken: newRefreshToken,
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", newRefreshToken, options)
    .json(
      new ApiResponse(200, responseData, "Access token refreshed successfully")
    );
});

const getAllUsers = asyncHandler(async (req, res) => {
  const users = await getAllUsersService();
  return res
    .status(200)
    .json(new ApiResponse(200, users, "All users retrieved successfully"));
});

const getUserById = asyncHandler(async (req, res) => {
  const user = await getUserByIdService(req.params.id);
  return res
    .status(200)
    .json(new ApiResponse(200, user, "User retrieved successfully"));
});

export const getUserProfile = asyncHandler(async (req, res) => {
  // We use req.user._id from the token, which is secure.
  const user = await getUserByIdService(req.user._id);
  return res
    .status(200)
    .json(new ApiResponse(200, user, "User profile retrieved successfully"));
});

const getUserByEmail = asyncHandler(async (req, res) => {
  const user = await getUserByEmailService(req.params.email);
  return res
    .status(200)
    .json(new ApiResponse(200, user, "User retrieved successfully"));
});

const updateUserPassword = asyncHandler(async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  const result = await updateUserPasswordService(
    req.user._id,
    oldPassword,
    newPassword
  );
  return res
    .status(200)
    .json(new ApiResponse(200, result, "Password updated successfully"));
});

const updateUserById = asyncHandler(async (req, res) => {
  const updatedUser = await updateUserByIdService(req.params.id, req.body);
  return res
    .status(200)
    .json(
      new ApiResponse(200, updatedUser, "User details updated successfully")
    );
});

const updateUserAvatar = asyncHandler(async (req, res) => {
  const avatarLocalPath = req.file?.path;
  const updatedUser = await updateUserAvatarService(
    req.user._id,
    avatarLocalPath
  );
  return res
    .status(200)
    .json(new ApiResponse(200, updatedUser, "Avatar updated successfully"));
});

const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const result = await forgotPasswordService(email);
  return res
    .status(200)
    .json(
      new ApiResponse(200, result, "Password reset code sent successfully")
    );
});

const forgotPasswordVerifyCode = asyncHandler(async (req, res) => {
  const { email, code, newPassword } = req.body;
  const result = await forgotPasswordVerifyCodeService(
    email,
    code,
    newPassword
  );
  return res
    .status(200)
    .json(
      new ApiResponse(200, result, "Password has been reset successfully.")
    );
});

const resendVerificationEmail = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const result = await resendVerificationEmailService(email);
  return res
    .status(200)
    .json(new ApiResponse(200, result, "Verification email sent successfully"));
});

const verifyEmail = asyncHandler(async (req, res) => {
  const { email, code } = req.body;
  const result = await verifyEmailService(email, code);
  return res
    .status(200)
    .json(new ApiResponse(200, result, "Email verified successfully"));
});

const deleteUserById = asyncHandler(async (req, res) => {
  const result = await deleteUserByIdService(req.params.id);
  return res
    .status(200)
    .json(new ApiResponse(200, result, "User deleted successfully"));
});

export {
  registerUser,
  loginUser,
  googleLogin,
  googleCallback,
  logoutUser,
  postRefreshToken,
  getAllUsers,
  getUserById,
  getUserByEmail,
  updateUserPassword,
  updateUserById,
  updateUserAvatar,
  forgotPassword,
  forgotPasswordVerifyCode,
  resendVerificationEmail,
  verifyEmail,
  deleteUserById,
};
