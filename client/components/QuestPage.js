import React, { Component } from 'react'

class QuestPage extends Component {
buttonStyle = {
    backgroundColor: 'deepskyblue'
  }

  render() {
    const idx = this.props.booked.findIndex(q => q == this.props.card.id)
    return (
      <div data-modal="trigger-2" className="modal">
        <article className="content-wrapper">
          <button className="close"></button>
          {this.props.card && (
            <div className="content quest-content">
              <h1>{this.props.card.title}</h1>
              <img src={this.props.card.img} />
              <h4>{this.props.card.desc}</h4>
              {idx < 0 && <button
              id="add2"
              className="btn btn--block card__btn buy"
              onClick={(e) => {
              
                this.props.addToCart(this.props.card.id)
              }}
            >Buy for {this.props.card.price}Ð</button>
            }

            {idx >= 0 && <button
              style={this.buttonStyle}
              id="drop2"
              className="btn btn--block card__btn unbuy"
              onClick={(e) => {
                
                this.props.deleteFromCart(this.props.card.id)
              }}
            >Delete from cart</button>
            }
            </div>
          )}
        </article>
      </div>
    )
  }
}

export default QuestPage