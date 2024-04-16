import { User } from "../models";
import {
  fetchDataByUsername,
  fetchFollowersByUsername,
  fetchFollowingByUsername,
} from "../api/fetchGitHubData";
import { ApiError } from "../utils/ApiError";
import httpStatus from "http-status";

/**
 * Save a user to the database if it doesn't already exist.
 * @param {string} userName - GitHub username
 * @returns {Promise<object>} Promise that resolves to the User object saved in the database
 */
const saveUser = async (userName: string): Promise<object> => {
  try {
    // Check if the user already exists in the database
    let isUserExist = await User.findOne({ username: userName });
    if (isUserExist) {
      return isUserExist;
    }

    // Fetch user data from GitHub API
    let fetchedUser: any = await fetchDataByUsername(userName); // Type assertion to 'any'
    let {
      login: username,
      node_id: _id,
      avatar_url,
      type,
      name,
      company,
      blog,
      location,
      email,
      bio,
      public_repos,
      followers,
      following,
      created_at,
      updated_at,
    } = fetchedUser as any; // Type assertion to 'any'

    // Create and save the user in the database
    let user = User.create({
      username,
      _id,
      avatar_url,
      type,
      name,
      company,
      bio,
      location,
      email,
      blog,
      public_repos,
      followers,
      following,
      created_at,
      updated_at,
    });

    return user;
  } catch (err) {
    throw new ApiError(
      "Failed to save user details",
      httpStatus.INTERNAL_SERVER_ERROR
    );
  }
};

// Define the type for GitHub user names
interface GitHubUserNames {
  login: string;
}

/**
 * Find mutual followers of a user.
 * @param {string} username - GitHub username of the user.
 * @returns {Promise<object | string>} Promise that resolves to mutual followers information or an error message.
 */
const mutualFollowers = async (username: string): Promise<object | string> => {
  try {
    // Check if the user exists in the database
    const isUserExist = await User.findOne({ username });
    if (!isUserExist) {
      throw new ApiError("User doesn't exist!", httpStatus.BAD_REQUEST);
    }

    // Fetch followers and following data from GitHub API
    const followersResponse = await fetchFollowersByUsername(username);
    const followingResponse = await fetchFollowingByUsername(username);

    // Ensure that the responses are arrays and map them to extract the usernames
    const followers: GitHubUserNames[] = Array.isArray(followersResponse)
      ? followersResponse.map((user) => user.login)
      : [];

    const following: GitHubUserNames[] = Array.isArray(followingResponse)
      ? followingResponse.map((user) => user.login)
      : [];

    const mutual = following.filter((user) => followers.includes(user));

    // Update the 'friends' field in the database with mutual followers
    const updatedUser = await User.findOneAndUpdate(
      { username },
      { friends: mutual },
      { new: true } // Return the updated document
    );

    return updatedUser ? updatedUser : { message: "Failed to update user" };
  } catch (error) {
    throw new ApiError(
      "Failed to find mutual followers",
      httpStatus.INTERNAL_SERVER_ERROR
    );
  }
};

export { saveUser, mutualFollowers };
