import React, { Component } from 'react'

export default class ProfileFoot extends Component {
  render() {
    return (
    <footer>

          {this.props.page === "Profile" && <button
          className="btn btn--block card__btn button logout"
          onClick={() => this.props.logout()}
        >Logout</button>
        }
        {this.props.page === "About" && <h3 style={{margin: '9px', fontWeight: 'lighter'}}>©QuestWorld 2018 All rights reserved</h3>}
      </footer>
    )
  }
}