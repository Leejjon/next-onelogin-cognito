import '../styles/globals.css';
import Amplify, { Auth } from 'aws-amplify';
import awsconfig from '../aws-exports';

const environment = process.env.NODE_ENV || 'development';

const [
  productionRedirectSignIn,
  localRedirectSignIn,
] = awsconfig.oauth.redirectSignIn.split(",");

const [
  productionRedirectSignOut,
  localRedirectSignOut,
] = awsconfig.oauth.redirectSignOut.split(",");

// const updatedAwsConfig = awsconfig;
const updatedAwsConfig = {
  ...awsconfig,
  oauth: {
    ...awsconfig.oauth,
    redirectSignIn: environment !== "production" ? localRedirectSignIn : productionRedirectSignIn,
    redirectSignOut: environment !== "production" ? localRedirectSignOut : productionRedirectSignOut,
  }
}

Amplify.configure({
  ...updatedAwsConfig,
  ssr: true}
);

Auth.configure(updatedAwsConfig);

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

export default MyApp
