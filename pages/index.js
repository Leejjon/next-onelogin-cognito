import Amplify, {Auth, Hub} from 'aws-amplify';
import config from "../aws-exports.js";

Amplify.configure({ ...config, ssr: true });

export async function getServerSideProps({ params }) {
    console.log("Doing serverside rendering...");
    return { props: { ssrData: {name: "Some SSR data", timestamp: (new Date()).toUTCString()}} };
}

const App = ({ssrData}) => {
    return (
        <div>{ssrData.timestamp}</div>
    );
}

export default App;