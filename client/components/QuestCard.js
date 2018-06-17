import React, { Component } from 'react'

class QuestCard extends Component {

  style = {
    backgroundImage: `url(${this.props.img})`
  }

  buttonStyle = {
    backgroundColor: 'deepskyblue'
  }

  render() {
    const idx = this.props.booked.findIndex(q => q == this.props.id)
    return (
      <li className="cards__item" onClick={(e) => {
          if(e.target == document.getElementById('add') ||
          e.target == document.getElementById('drop')) return
         
          this.props.showModal()
      }}>
        <div className="card">
          <div className="card__image" style={this.style}></div>
          <div className="card__content">
            <div className="card__title">
              <span>{this.props.name}</span>
              <span>{this.props.price}Р</span>
            </div>
            <p className="card__text">{this.props.desc}</p>

            {idx < 0 && <button
              id="add"
              className="btn btn--block card__btn"
              onClick={(e) => {
                e.stopPropagation()
                this.props.addToCart(this.props.id)
              }}
            >Add to cart</button>
            }

            {idx >= 0 && <button
            id="drop"
              style={this.buttonStyle}
              className="btn btn--block card__btn"
              onClick={(e) => {
                e.stopPropagation()
                this.props.deleteFromCart(this.props.id)
              }}
            >Delete from cart</button>
            }

          </div>
        </div>
      </li>
    )
  }
}

export default QuestCard