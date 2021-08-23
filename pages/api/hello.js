// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import Amplify, {Auth, Logger, withSSRContext} from "aws-amplify";
import awsconfig from "../../aws-exports";

Amplify.configure({
  ...awsconfig,
  ssr: true}
);

Auth.configure(awsconfig);

export default async function handler(req, res) {
  const logger = new Logger('hello');
  const { Auth } = withSSRContext({ req });

  let data;
  let user;
  try {
    user = await Auth.currentAuthenticatedUser();
    logger.info('user is authenticated');
    // fetch some data and assign it to the data variable
  } catch (err) {
    logger.info('error: no authenticated user');
  }

  res.statusCode = 200;
  res.json({
    data: data ? data : null,
    username: user ? user.username : null
  });
}
