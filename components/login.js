import { Component } from 'react';
import '../secrets.json';
import MyButton from './button';

class Login extends Component {
    constructor(props) {
        super(props);
        this.handleLogin = this.handleLogin.bind(this);
        var secrets = require('../secrets.json');
        this.state = {
            client_id: secrets["client_id"]
        };
    }

    handleLogin(event) {
        window.location.href = "https://auth.mydevices.com/auth/realms/iotinabox/protocol/openid-connect/auth?client_id=api-example-app&redirect_uri=" + window.location.href + "auth/cb&state=1232&response_type=code";
    }

    render() {
        return (
            <div className="button-login">
                <MyButton
                    onClick={this.handleLogin}>
                    Login
                </MyButton>
                <style jsx>{`
                    .button-login {
                        display: block;
                        margin-top: 4em;
                        margin-left: auto;
                        margin-right: auto;
                        width: 5%;
                    }
                `}</style>
            </div>
        );
    }
}

export default Login;