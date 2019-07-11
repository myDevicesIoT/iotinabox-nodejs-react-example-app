import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { Component } from 'react';
import Button from '@material-ui/core/Button';

const theme = createMuiTheme({
  palette: {
    primary: {
        main: '#6785c9',
    },
  },
});

class MyButton extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <MuiThemeProvider theme={theme}>
                    <Button
                        variant="contained"
                        color="primary"
                        size="large"
                        onClick={this.props.onClick}>
                        {this.props.children}
                    </Button>
                </MuiThemeProvider>
            </div>
        );
    }
}

export default MyButton;