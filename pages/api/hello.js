// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import Amplify, { withSSRContext } from "aws-amplify";
import config from "../../aws-exports.js";

// Just following https://github.com/aws-amplify/amplify-js/pull/8309
// pages/api/profile.js

// Amplify SSR configuration needs to be done within each API route
Amplify.configure({ ...config, ssr: true });
export default async (req, res) => {
  const { Auth } = withSSRContext({ req });

  let data;
  let user;
  res.statusCode = 200;
  try {
    user = await Auth.currentAuthenticatedUser();
    console.log('user is authenticated');
    // fetch some data and assign it to the data variable
    res.json({
      data: data ? data : null,
      username: user ? user.username : null,
    });
  } catch (err) {
    console.log('error: no authenticated user');
    res.json({
      data: data ? data : null,
      username: user ? user.username : null,
      req: JSON.stringify(req.headers),
      err: err
    });
  }
}