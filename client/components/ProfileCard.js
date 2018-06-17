import React, { Component } from 'react'

 export default class ProfileCard extends Component {

  style = {
    backgroundImage: `url(${this.props.img})`
  }

  

  render() {

    return (
      <li className="cards__item">
        <div className="card">
          <div className="card__image" style={this.style}></div>
          <div className="card__content">
            <div className="card__title">{this.props.name}</div>
            <p className="card__text">{this.props.desc}</p>
          </div>
        </div>
      </li>
    )
  } 
}

