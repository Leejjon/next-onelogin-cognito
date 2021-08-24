import Amplify, {Auth, Hub} from 'aws-amplify';
import {Component} from "react";
import config from "../aws-exports.js";

Amplify.configure({ ...config, ssr: true });

class App extends Component {
    state = {user: null, customState: null, token: null};

    componentDidMount() {
        Hub.listen("auth", ({payload: {event, data}}) => {
            switch (event) {
                case "signIn":
                    console.log('Resonse from sign-in' + JSON.stringify(data));
                    this.setState({user: data});
                    break;
                case "signOut":
                    this.setState({user: null});
                    break;
                case "customOAuthState":
                    this.setState({customState: data});
            }
        });

        Auth.currentAuthenticatedUser()
            .then(user => {
                this.setState({user: user});
            })
            .catch((err) => console.log("Not signed in: " + err));
    }

    fetchBackend() {
        fetch('/api/hello', )
            .then(response => response.json())
            .then(data => console.log('Resonse from hello API: ' + JSON.stringify(data)));
    }

    render() {
        const {user} = this.state;

        return (
            <div className="App">
                <button onClick={() => Auth.federatedSignIn()}>Open Hosted UI</button>
                <button onClick={() => this.fetchBackend()}>Call backend</button>
                <SignOutButton user={user}/>

            </div>
        );
    }
}

const SignOutButton = (props) => {
    if (props.user) {
        return (<button onClick={() => Auth.signOut()}>Sign Out {props.user.getUsername()}</button>);
    } else {
        return (<div>Not logged in</div>);
    }
}

export default App;