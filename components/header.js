import { Component } from 'react';
import Link from 'next/link';
import Head from 'next/head'
import Box from '@material-ui/core/Box';

class WebHeader extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Box component="span">
                <Head>
                    <title>Example App</title>
                    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
                </Head>
                <div className="topnav">
                    <Link href="/">
                        <a>Home</a>
                    </Link>
                    <a> | </a>
                    <Link href="/companies">
                        <a>Companies</a>
                    </Link>
                </div>
                <p className="header">IOT In A Box</p>
                <style jsx>{`
                    .topnav {
                        position: relative;
                        background-color: #6d778c;
                        overflow: hidden;
                    }
                    .topnav a {
                        float: left;
                        color: white;
                        text-align: center;
                        padding: 0.6em 0.3em;
                        text-decoration: none;
                        font-size: 1.5em;
                    }
                    .header {
                        display: block;
                        margin-left: auto;
                        margin-right: auto;
                        text-align: center;
                        font-size: 3em;
                    }
                `}</style>
            </Box>
        );
    }
}

export default WebHeader;