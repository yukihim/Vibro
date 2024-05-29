import React from "react";
import HeadPhone from '../assets/img/Login/headphones.svg';
import './css/Login.scss';
import { withRouter } from "react-router-dom";
//import {Link, useHistory} from "react-router-dom";

class Login extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            showMessage: this.props.location.state?.loggedOut || false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        // Hide the message after 1 seconds
        setTimeout(() => {
            this.setState({ showMessage: false });

            // Clear the message from the history
            this.props.history.replace({
                pathname: this.props.location.pathname,
                state: {}
            });
        }, 1000);
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        // usr = "admin" and psw = "123"
        if (this.state.username === 'admin' && this.state.password === '123')
            //this.props.history.push('/home', { loginSuccess: true });
            this.props.history.replace('/home', { loginSuccess: true }); // Use replace instead of push
        else
            alert('Login failed: Wrong username or password. Please try again.');
    }

    render() {
        // Get the logout message from the location state
        const message = this.props.location.state?.message;

        return(
            <section id="main">
                <div className="nav-item">
                    <a className="navbar-brand" href="/">Vibro</a>
                </div>
                <div className="main-row">
                    <div className="main-row-img">
                        <img className="head-phone-img" src={HeadPhone} alt=""/>
                    </div>
                    <div className="main-row-text">
                        <h1>Music companion{<br />}for everyone</h1>
                        <p>Wherever you go, whenever you need!</p>
                        
                        {/* Display the logout message */}
                        {/*message && <p>{message}</p>*/}
                        {/*message && this.state.showMessage && <p>{message}</p>*/}
                        {message && this.state.showMessage && 
                            <p style={{ 
                                /*
                                position: 'absolute', 
                                top: '0', 
                                right: '0', 
                                padding: '10px', 
                                backgroundColor: '#f8d7da', 
                                color: '#721c24', 
                                border: '1px solid #f5c6cb', 
                                borderRadius: '5px'
                                */
                                position: 'fixed',
                                top: '20px',
                                right: '20px',
                                backgroundColor: 'green',
                                color: 'white',
                                padding: '10px',
                                borderRadius: '5px',
                                zIndex: '1000',
                                transition: 'transform 0.3s ease-in-out, opacity 0.3s ease-in-out',
                                transform: 'translateY(0)',
                                opacity: 1
                            }}>
                                {message}
                            </p>
                        }

                        <br/>

                        <form onSubmit={this.handleSubmit}>
                            <div className="container" style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                <label htmlFor="username" style={{ fontWeight: 'bold', textAlign: 'left' }}>Username</label>
                                <input type="text" placeholder="Enter Username" name="username" required style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }} onChange={this.handleChange} />

                                <label htmlFor="password" style={{ fontWeight: 'bold', textAlign: 'left' }}>Password</label>
                                <input type="password" placeholder="Enter Password" name="password" required style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }} onChange={this.handleChange} />

                                {/*<button type="submit" style={{ padding: '10px', borderRadius: '5px', border: 'none', backgroundColor: '#007BFF', color: 'white', cursor: 'pointer' }}>Login</button>*/}
                                <style>
                                    {`
                                        .importantButton {
                                            padding: 10px;
                                            border-radius: 5px;
                                            border: none;
                                            background-color: #007BFF;
                                            color: white !important;
                                            cursor: pointer;
                                        }
                                    `}
                                </style>
                                <button type="submit" className="importantButton">Login</button>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        );
    }
}

export default withRouter(Login);