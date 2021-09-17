import Amplify, {Auth, Hub, Logger} from 'aws-amplify';
import config from "../aws-exports.js";

Amplify.configure({ ...config, ssr: true });

const logger = new Logger('Log to browser');
export async function getServerSideProps({ params }) {
    console.log("Doing serverside rendering...");
    return { props: { ssrData: {name: "Some SSR data", timestamp: (new Date()).toUTCString()}} };
}

const App = ({ssrData}) => {
    return (
        <div onClick={() => { logger.warn('Clicking??') }}>{ssrData.timestamp}</div>
    );
}

export default App;