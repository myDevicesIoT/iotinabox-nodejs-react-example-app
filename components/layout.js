import WebHeader from './header';
import { Component } from 'react';

class Layout extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div className="layout">
                <WebHeader/>
                {this.props.children}
                <style jsx>{`
                    .layout {
                        display: box;
                        background-color: #2b2f3e;
                        color: #6785c9;
                        font-family: 'Roboto';
                        margin: 0px;
                        padding: 0px;
                        height: 100vh;
                        width: auto;
                    }
                `}</style>
            </div>
        );
    }
}

export default Layout;