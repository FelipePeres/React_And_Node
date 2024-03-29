import React from 'react';
import AuthService from './AuthService';

export default function withAuth(AuthComponent){

    const Auth = new AuthService('http://localhost:3000');
    return class AuthWrapped extends React.Component{
        constructor(){
            super();
            this.state = {
                user:null,
            }
        }

        componentWillMount(){

            if(!Auth.loggedIn())
            this.props.history.replace('/login')
            else{

                try{

                    const profile = Auth.getProfile();
                    this.setState({
                        user:profile
                    })
                }catch(err){
                    Auth.logout();
                    this.props.history.replace('/login')
                }
            }
        }


        render(){

            if(this.state.user){

                return (
                    //<AuthComponent {...this.props}{...this.state} />
                    <AuthComponent history={this.props.history} match={this.props.match} user={this.state.user} /> 
                );
            }else{

                return null;
            }
        }
    }
}