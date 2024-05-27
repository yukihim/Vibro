import React from 'react';
import { withRouter, Redirect } from 'react-router-dom';

class Logout extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            navigate: false
        };
    }

    componentDidMount() {
        // Clear user data here
        localStorage.clear();
        this.setState({ navigate: true });
    }

    render() {
        const { navigate } = this.state;

        // Redirect to the login page
        if (navigate)
            return <Redirect to={{ pathname: "/", state: { message: "Logout successful", loggedOut: true } }} push={true} />

        return null;
    }
}

export default withRouter(Logout);