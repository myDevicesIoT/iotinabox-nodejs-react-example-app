import { Component } from 'react';
import fetch from 'isomorphic-unfetch';
import MyTable from './table';
import {useRouter} from 'next/router';

class Display extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tokenUrl: 'http://localhost:3000/data',
            apiUrl: "https://api.iotinabox.com/companies",
            rows: [],
            firstCol: '',
            secondCol: '',
            thirdCol: '',
        };

        this.handleUpdate = this.handleUpdate.bind(this);
        this.getData = this.getData.bind(this);
    }

    handleUpdate() {
        this.state.path = window.location.pathname;
        this.state.dataObtained = false;

        if(this.state.path == '/locations') {
            this.state.firstCol = 'Location Name';
            this.state.secondCol = 'Location ID';
            this.state.thirdCol = 'Index';
        } else if(this.state.path == '/sensors') {
            this.state.firstCol = 'Sensor Name';
            this.state.secondCol = 'Sensor Type';
            this.state.thirdCol = 'Sensor Use';
        } else if(this.state.path == '/latest') {
            this.state.firstCol = 'Value';
            this.state.secondCol = 'Unit'
            this.state.thirdCol = 'Time Stamp'
        } else {
            this.state.path = '/companies'
            this.state.firstCol = 'Company Name';
            this.state.secondCol = 'Company ID';
            this.state.thirdCol = 'Index';
            this.state.apiUrl = "https://api.iotinabox.com/companies";
        }

        if(this.state.path == '/locations') {
            this.state.apiUrl = this.state.apiUrl + "/" + this.props.query.companyId + "/locations";
            this.state.companyId = this.props.query.companyId;
        } else if(this.state.path =='/sensors') {
            this.state.apiUrl = this.state.apiUrl + "/" + this.props.query.companyId + "/locations/"
            + this.props.query.locationId + "/things?type=sensor";
            this.state.companyId = this.props.query.companyId;
            this.state.locationId = this.props.query.locationId;
        } else if(this.state.path == '/latest') {
            this.state.apiUrl = this.state.apiUrl + "/" + this.props.query.companyId + "/locations/"
            + this.props.query.locationId + "/things/" + "latest";//this.props.query.deviceId + "/latest";
            this.state.companyId = this.props.query.companyId;
            this.state.locationId = this.props.query.locationId;
        }
        this.getData();
    }

    async componentDidMount() {
        this.handleUpdate();
    }

    async componentDidUpdate(prevProps, prevState) {
        if(prevState.path !== window.location.pathname) {
            if(window.location.pathname !== '/auth/cb') {
                this.handleUpdate();
            }
        }
    }

    async getData() {
        fetch( this.state.tokenUrl, {
            method: 'GET'})
        .then((res) => res.json())
        .then((token) => fetch(this.state.apiUrl, {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token['access_token']
                }
            })
        )
        .then((res) => res.json())
        .then((listData) => {
            this.setState({rows: listData});
            this.setState({dataObtained: true});
        });
     }

    render() {
        return (
            <div>
                {this.state.dataObtained ? 
                <div className="datatable">
                    <MyTable
                        path={this.state.path}
                        firstCol={this.state.firstCol}
                        secondCol={this.state.secondCol}
                        thirdCol={this.state.thirdCol}
                        rows={this.state.rows}
                        companyId={this.state.companyId}
                        locationId={this.state.locationId}
                    />
                </div>
                :<div>
                    <p className="loadtext">Loading...</p>
                </div>}
                <style jsx>{`
                    .button-token {
                        display: block;
                        margin-top: 4em;
                        margin-bottom: 4em;
                        margin-left: auto;
                        margin-right: auto;
                        width: 5%;
                    }
                    .datatable {
                        display: block;
                        margin-top: 4em;
                        margin-bottom: 4em;
                        margin-left: auto;
                        margin-right: auto;
                        width: 80%;
                    }
                    .loadtext {
                        display: block;
                        margin-top: 4em;
                        margin-bottom: 4em;
                        margin-left: auto;
                        margin-right: auto;
                        width: 5%;
                        font-size: 1em;
                        color: #FFFFFF;
                    }
                `}</style>
            </div>
        );
    }
}

export default Display;