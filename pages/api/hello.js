// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import Amplify, {Auth, AWSCloudWatchProvider, Logger, withSSRContext} from "aws-amplify";
import awsconfig from "../../aws-exports";

// Just following https://github.com/aws-amplify/amplify-js/pull/8309

Amplify.configure({
//   Logging: {
//     logGroupName: 'css-amplify-test',
//     logStreamName: 'just-one-stream'
//   },
  ...awsconfig,
  ssr: true
});
//
// const logger = new Logger('hello');
// Amplify.register(logger);
// logger.addPluggable(new AWSCloudWatchProvider());
//
Auth.configure(awsconfig);

export default async function handler(req, res) {
  console.log("You and me baby ain't nothing but mammals.");

  let data;
  let user;
  try {
    user = await Auth.currentAuthenticatedUser();
    console.log('user is authenticated');
    // fetch some data and assign it to the data variable
  } catch (err) {
    console.log('error: no authenticated user');
  }

  res.status(200).json({ name: 'John Doe', requestHeaders: JSON.stringify(req.headers), user: user, data: data, ok: "ok"});
}
