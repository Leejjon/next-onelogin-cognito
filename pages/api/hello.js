// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import Amplify, {Auth, AWSCloudWatchProvider, Logger, withSSRContext} from "aws-amplify";
import awsconfig from "../../aws-exports";

// Just following https://github.com/aws-amplify/amplify-js/pull/8309

// Amplify.configure({
//   Logging: {
//     logGroupName: 'css-amplify-test',
//     logStreamName: 'just-one-stream'
//   },
//   ...awsconfig,
//   ssr: true}
// );
//
// const logger = new Logger('hello');
// Amplify.register(logger);
// logger.addPluggable(new AWSCloudWatchProvider());
//
// Auth.configure(awsconfig);

export default async function handler(req, res) {
  console.log("You and me baby ain't nothing but mammals.");
  res.status(200).json({ name: 'John Doe', requestHeaders: JSON.stringify(req.headers)});
}
