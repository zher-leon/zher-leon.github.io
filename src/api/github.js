import { Octokit } from "@octokit/core";
import { createTokenAuth } from "@octokit/auth-token";

const octokit_ = new Octokit();
let token_ = "";

async function getUser_(userName) {
  /**
   * @see https://docs.github.com/cn/rest/reference/users#get-a-user
   */
  let response_data = { code: -1, data: "error userName" };
  if (userName) {
    try {
      const response = await octokit_.request("GET /users/{username}", {
        username: userName,
      });
      response_data.code = response.status;
      response_data.data = response.data;
    } catch (error) {
      const errorStr = error.toString();
      if (errorStr.toString().indexOf("Not Found") != -1) {
        response_data.code = 404;
        response_data.data = "Not Found";
      } else {
        response_data.code = 405;
        response_data.data = "error network";
      }
    }
  }
  return response_data;
}

async function getRepo_(login, repo, branch) {
  /**
   * @see https://docs.github.com/cn/rest/reference/repos#get-repository-content
   */
  let response_data = { code: -1, data: "error" };
  try {
    const response = await octokit_.request(
      "GET /repos/{owner}/{repo}/contents/{path}",
      {
        owner: login,
        repo: repo,
        path: "",
        ref: branch,
      }
    );
    response_data.code = response.status;
    response_data.data = response.data;
  } catch (error) {
    const errorStr = error.toString();
    if (
      errorStr.indexOf("Not Found") != -1 ||
      errorStr.indexOf("No commit found for the ref") != -1
    ) {
      response_data.code = 404;
      response_data.data = "Not Found";
    } else if (errorStr.indexOf("Found") != -1) {
      response_data.code = 302;
      response_data.data = "Found";
    } else if (errorStr.indexOf("Forbidden") != -1) {
      response_data.code = 403;
      response_data.data = "Found";
    } else {
      response_data.code = 405;
      response_data.data = "error network";
    }
  }
  return response_data;
}

async function getTree_(login, repo, branch, sha) {
  /**
   * @see https://docs.github.com/cn/rest/reference/git#get-a-tree
   */
  let response_data = { code: -1, data: "error" };
  try {
    const response = await octokit_.request(
      "GET /repos/{owner}/{repo}/git/trees/{tree_sha}",
      {
        owner: login,
        repo: repo,
        tree_sha: sha,
        ref: branch,
        recursive: true,
      }
    );
    response_data.code = response.status;
    response_data.data = response.data;
  } catch (error) {
    const errorStr = error.toString();
    if (
      errorStr.indexOf("Not Found") != -1 ||
      errorStr.indexOf("No commit found for the ref") != -1
    ) {
      response_data.code = 404;
      response_data.data = "Not Found";
    } else {
      response_data.code = 405;
      response_data.data = "error network";
    }
  }
  return response_data;
}

async function getContent_(login, repo, branch, sha) {
  /**
   * @see https://docs.github.com/cn/rest/reference/git#get-a-blob
   */
  let response_data = { code: -1, data: "error" };
  try {
    const response = await octokit_.request(
      "GET /repos/{owner}/{repo}/git/blobs/{file_sha}",
      {
        owner: login,
        repo: repo,
        file_sha: sha,
        ref: branch,
      }
    );
    response_data.code = response.status;
    response_data.data = response.data;
  } catch (error) {
    const errorStr = error.toString();
    if (
      errorStr.indexOf("Not Found") != -1 ||
      errorStr.indexOf("No commit found for the ref") != -1
    ) {
      response_data.code = 404;
      response_data.data = "Not Found";
    } else {
      response_data.code = 405;
      response_data.data = "error network";
    }
  }
  return response_data;
}
export default {
  setToken(token) {
    if (token_ === token) return;
    token_ = token;
    const auth = createTokenAuth(token_);
    octokit_.hook.wrap("request", auth.hook);
    octokit_.auth = auth;
  },

  async getUser(userName, callback) {
    return callback(await getUser_(userName));
  },

  async getRepo(login, repo, branch, callback) {
    return callback(await getRepo_(login, repo, branch));
  },

  async getTree(login, repo, branch, sha, callback) {
    return callback(await getTree_(login, repo, branch, sha));
  },

  async getContent(login, repo, branch, sha, callback) {
    return callback(await getContent_(login, repo, branch, sha));
  },
};
