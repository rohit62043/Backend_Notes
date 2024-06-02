import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiError.js"
import { User } from "../models/user.model.js"
import { uploadOnCloudinary } from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/ApiResponse.js"

const registerUser = asyncHandler(async (req, res) => {
    //take data from frontend
    const { fullName, email, username, password } = req.body;
    console.log("email: ", email);

    //check for data->validation-->not empty
    if (
        [fullName, email, username, password].some((feild) => feild?.trim() === "")
    ) {
        throw new ApiError(400, "All fields are required.")
    }
    //check if user already exist:username ,email
    const existedUser = User.findOne({
        $or: [{ username }, { email }]
    })

    if (existedUser) {
        throw new ApiError(409, "User with email or username already exists")
    }
    //check for image and avtar
    // console.log(req.files)
    const avatarLocalPath = req.files?.avatar[0]?.path;
    const coverImageLocalPath = req.files?.coverImage[0]?.path;

    if (!avatarLocalPath) {
        throw new ApiError(400, "Avatar file is required.")
    }

    //upload to cloudinary
    const avatar = await uploadOnCloudinary(avatarLocalPath);
    let coverImage;
    if (coverImageLocalPath) {
        coverImage = await uploadOnCloudinary(coverImageLocalPath)
    }
    if (!avatar) {
        throw new ApiError(400, "Avatar file is required.");
    }
    //create user object and save to db
    const user = await User.create({
        fullName,
        avatar: avatar.url,
        coverImage: coverImage?.url || "",
        email,
        password,
        username: username.toLowerCase()
    })
    //check for user creation
    //remove password and refresh token feild from respone
    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )

    if (!createdUser) {
        throw new ApiError(500, "Something went wrong while registering the user");
    }
    //send succes mussage if register sucessfully
    return res.status(201).json(
        new ApiResponse(200, createdUser, "User registered Siccessfully")
    )
})

export { registerUser }