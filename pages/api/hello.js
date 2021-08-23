// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import Amplify, {Auth, AWSCloudWatchProvider, Logger, withSSRContext} from "aws-amplify";
import awsconfig from "../../aws-exports";

// Just following https://github.com/aws-amplify/amplify-js/pull/8309

Amplify.configure({
  Logging: {
    logGroupName: 'css-amplify-test',
    logStreamName: 'just-one-stream'
  },
  ...awsconfig,
  ssr: true}
);
const logger = new Logger('hello');
Amplify.register(logger);
logger.addPluggable(new AWSCloudWatchProvider());

Auth.configure(awsconfig);

export default async function handler(req, res) {
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
