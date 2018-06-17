import React, { Component } from 'react'

export default class CartItem extends Component {
  state = {
    amount: 1
  }
  inc = () => { 
    this.setState({ amount: this.state.amount + 1 }) 
    this.props.changeTotal(+this.props.price)
  }
  dec = () => {
    if (this.state.amount - 1 < 1) return
    this.setState({
      amount: this.state.amount - 1
    })
    this.props.changeTotal(-this.props.price)
  }
  delete = () => {
    this.props.deleteFromCart(this.props.id)
    this.props.changeTotal((-this.props.price) * (this.state.amount))
  }
  render() {
    return (
      <div class="item">
        <div class="buttons">
          <h1 class="delete-btn" onClick={() => this.delete()}>X</h1>
        </div>
        <div class="image">
          <img src={this.props.img} alt="" />
        </div>
        <div class="description">
          <h1>{this.props.name}</h1>
          <h2>{this.props.genre} quest</h2>
          <span>{this.props.rate}/10</span>
        </div>
        <div class="quantity">
          <button class="plus-btn" type="button" name="button"
            onClick={() => this.inc()}
          >
            <b>+</b>
          </button>
          <h1>{this.state.amount}</h1>
          <button class="minus-btn" type="button" name="button"
            onClick={() => this.dec()}
          >
            <b>-</b>
          </button>
        </div>
        <div class="total-price"><h1>{this.props.price * this.state.amount}Р</h1></div>
      </div>
    )
  }
}