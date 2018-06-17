import React, { Component } from 'react'

class Menu extends Component {
  style = {
    color: 'red'
  }
  render() {
    return (
      <header>
        <div className="header-logo">
          <img src="https://image.ibb.co/knkWrT/logo.png" />
          <span>QuestWorld</span>
        </div>
        <div className="header-menu">
          <span
            className={this.props.page === 'Quests' ? 'active' : ''}
            onClick={() => this.props.setPage('Quests')}
          >
            Quests
          </span>
          <span
            className={this.props.page === 'About' ? 'active' : ''}
            onClick={() => this.props.setPage('About')}
          >
            About</span>
          <span
            style={this.props.questsInCart ? this.style : null}
            className={this.props.page === 'Cart' ? 'active' : ''}
            onClick={() => this.props.setPage('Cart')}
          >
            Cart ({this.props.questsInCart})</span>
          <span
            className={this.props.page === 'Profile' ? 'active' : ''}
            onClick={() => this.props.setPage('Profile')}
          >
            {this.props.logedIn ? 'Profile' : "Sign in"}</span>
        </div>
      </header>
    )
  }
}

export default Menu