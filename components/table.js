import { Component } from 'react';
import Router from 'next/router';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const StyledTableCell = withStyles(theme => ({
    head: {
        backgroundColor: '#6785c9',
        color: "#FFFFFF"
    },
}))(TableCell);

const StyledTableRow = withStyles(theme => ({
    root: {
       backgroundColor: '#6d778c',
       '& .tablecell': {
           color: '#FFFFFF'
       },
       '&:hover': {
           backgroundColor: '#8b98b3'
       }
    }
}))(TableRow);

class MyTable extends Component {
    constructor(props)  {
        super(props);
        this.state = {
            rows: []
        }
        this.handleCellClick = this.handleCellClick.bind(this);
        this.displayList = this.displayList.bind(this);
        this.displayData = this.displayData.bind(this);
        if(this.props.rows.length > 0) {
            this.state.rows = this.props.rows;
        }
    }

    displayList(row, index) {
        return (
            <StyledTableRow onClick={() => {this.handleCellClick(row.id)}} key={this.props.path == 'sensors' ? row.thing_name : row.name}>
                <StyledTableCell className="tablecell" scope='row'>
                    {this.props.path == '/sensors' ? row.thing_name : row.name}
                </StyledTableCell>
                <StyledTableCell className="tablecell">
                    {this.props.path == '/sensors' ? row.sensor_type : row.id}
                </StyledTableCell>
                <StyledTableCell className="tablecell">
                    {this.props.path == '/sensors' ? row.sensor_use : index}
                </StyledTableCell>
            </StyledTableRow>
        );
    }

    displayData(row, index) {
        return (
            <StyledTableRow key={index}>
                <StyledTableCell className="tablecell" scope='row'>
                    {row.v}
                </StyledTableCell>
                <StyledTableCell className="tablecell" scope='row'>
                    {row.unit}
                </StyledTableCell>
                <StyledTableCell className="tablecell" scope='row'>
                    {row.ts}
                </StyledTableCell>
            </StyledTableRow>
        );
    }

    handleCellClick(rowId) {
        let nextPath = '';
        let nextQuery = {};
        if(this.props.path == '/companies'){
            nextPath = '/locations';
            nextQuery = { companyId: rowId };
        } else if(this.props.path == '/locations') {
            nextPath = '/sensors';
            nextQuery = {
                companyId: this.props.companyId,
                locationId: rowId
            };
        } else if(this.props.path == '/sensors') {
            nextPath = '/latest';
            nextQuery = {
                companyId: this.props.companyId,
                locationId: this.props.locationId,
                deviceId: rowId
            }
        } else {
            return;
        }

        Router.push({ pathname: nextPath, query: nextQuery });
    }

    render() {
        return (
            <Paper>
                <Table>
                    <TableHead>
                        <TableRow>
                           <StyledTableCell>{this.props.firstCol}</StyledTableCell> 
                           <StyledTableCell>{this.props.secondCol}</StyledTableCell>
                           <StyledTableCell>{this.props.thirdCol}</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            this.props.path == '/latest' ? 
                            this.state.rows.map((row, index) => {
                                return this.displayData(row, index);
                            })
                            :this.state.rows.map((row, index) => {
                                return this.displayList(row, index);
                            })
                        }
                    </TableBody>
                </Table>
            </Paper>
        );
    }
}

export default MyTable;