import React, { Component } from 'react'
import { AUTH_URL } from './constants'
import { FormLoader } from './Others'

class LoginForm extends Component {



  render() {
    return ( 
      <div data-modal="trigger-1" className="modal">
        <article className="content-wrapper">
          <button className="close"></button>
          <div className="content">
            <input
              type="text"
              className="search-name"
              placeholder="Login"
              value={this.props.authLogin}
              onChange={(e) => this.props.handleAuthLogin(e.target.value)}
            />
          </div>
          <br />
          <div className="content">
            <input
              type="password"
              className="search-name"
              placeholder="Password"
              value={this.props.authPass}
              onChange={(e) => this.props.handleAuthPass(e.target.value)}
            />
          </div>

          <h2 className="last" onClick={() => this.props.onAuth()} id="hauth">Sign In</h2>
          <div className="content">
            <input
              type="text"
              className="search-name"
              placeholder="Login"
              value={this.props.regLogin}
              onChange={(e) => this.props.handleRegLogin(e.target.value)}
            />
          </div>
          <br />
          <div className="content">
            <input
              type="password"
              className="search-name"
              placeholder="Password"
              value={this.props.regPass}
              onChange={(e) => this.props.handleRegPass(e.target.value)}
            />
          </div>
          <h2 onClick={() => this.reg()} id="hreg">Sign Up</h2>
          {this.props.authLoad && <FormLoader />}
          {this.props.authError && <h3>{this.props.authError.toUpperCase()}</h3>}
        </article>
      </div>
    )
  }
}

export default LoginForm