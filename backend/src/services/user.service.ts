import { User } from "../models";
import { fetchDataByUsername } from "../api/fetchGitHubData";

/**
 * Save a user to the database if not already exists.
 * @param {string} userName - GitHub username
 * @returns {Promise<object>} Promise that resolves to the User object saved in the database
 */
const saveUser = async (userName: string): Promise<object> => {
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
};

export { saveUser };
