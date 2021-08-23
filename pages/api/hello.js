// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import Amplify, { withSSRContext } from "aws-amplify";

export default async function handler(req, res) {
  const { Auth } = withSSRContext({ req });

  let data;
  let user;
  try {
    user = await Auth.currentAuthenticatedUser();
    console.log('user is authenticated');
    // fetch some data and assign it to the data variable
  } catch (err) {
    console.log('error: no authenticated user');
  }

  res.statusCode = 200;
  res.json({
    data: data ? data : null,
    username: user ? user.username : null
  });
}
