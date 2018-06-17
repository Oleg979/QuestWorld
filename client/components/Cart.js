import React, { Component } from 'react'
import CartItem from './CartItem'

class Cart extends Component {

  state = {
    total: 0
  }

  componentDidMount() {
    if (this.props.quests.length >= 7)
      window.scrollTo(0, document.body.scrollHeight)
    this.setState({
      total: this.props.quests.reduce((acc, q) => acc + (+q.price), 0)
    })
  }

  style = {
    borderBottom: 'none'
  }

  changeTotal = sum => this.setState({ total: this.state.total + sum })

  render() {
    return (
      <main>
        <div className="cart-container">
          <div className="shopping-cart">
            <div className="title" style={!this.props.quests.length ? this.style : null}>
              {this.props.quests.length > 0 &&
                <span>Quests in your cart: {this.props.quests.length}</span>
              }
              {!this.props.quests.length && <span>Your cart is empty</span>}
            </div>
            {this.props.quests.map(q => (
              <CartItem
                name={q.title}
                genre={q.genre}
                price={q.price}
                rate={q.rate}
                img={q.img}
                key={q.id}
                id={q.id}
                deleteFromCart={(id) => this.props.deleteFromCart(id)}
                changeTotal={(sum) => this.changeTotal(sum)}
              />
            ))}
          </div>
          <h1 className="total">Total price: {this.state.total}Р</h1>
          {this.props.quests.length > 0 && <button
            className="btn btn--block card__btn button"
            onClick={() => {
              this.props.checkout()
              this.setState({ total: 0 })
              alert('Your order is received!')
            }}
          >
            Checkout
          </button>}
        </div>
      </main>
    )
  }
}

export default Cart