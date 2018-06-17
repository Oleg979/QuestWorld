import React, { Component, Fragment } from 'react'
import Menu from "./Menu";
import Main from "./Main";
import LoginForm from './LoginForm'
import Cart from './Cart'
import Profile from './Profile'
import Gallery from './Gallery'
import { AUTH_URL, REG_URL, ORDER_URL } from './constants'

class App extends Component {

  state = {
    page: 'Quests',
    booked: [],
    logedIn: false,
    regLogin: '',
    regPass: '',
    authLogin: '',
    authPass: '',
    authLoad: false,
    authError: null,
    id: null
  }

  setPage = page => {
    document.title = page
    if (page === 'Profile' && !this.state.logedIn) {
      this.setState({
        authError: null,
        regLogin: '',
        regPass: '',
        authLogin: '',
        authPass: '',
      })
      const modal = document.querySelector(`[data-modal=trigger-1]`);
      const contentWrapper = modal.querySelector('.content-wrapper');
      const close = modal.querySelector('.close');

      close.addEventListener('click', () => modal.classList.remove('open'));
      modal.addEventListener('click', () => modal.classList.remove('open'));
      contentWrapper.addEventListener('click', (e) => {
        if (e.target == document.getElementById("hauth")) {
          this.auth()
          e.stopPropagation()
          return
        }
        if (e.target == document.getElementById("hreg")) {
          this.reg()
          e.stopPropagation()
          return
        }
        e.stopPropagation()
      });

      modal.classList.toggle('open');
    }

    else this.setState({ page })

  }

  addToCart = quest => {
    if (!this.state.logedIn) this.setPage('Profile')
    else this.setState({
      questsInCart: this.state.questsInCart + 1,
      booked: [...this.state.booked, quest]
    })
  }

  deleteFromCart = id => {
    this.setState({
      booked: this.state.booked.filter(q => q.id != id)
    })
  }

  handleRegLogin = regLogin => this.setState({ regLogin })
  handleRegPass = regPass => this.setState({ regPass })
  handleAuthLogin = authLogin => this.setState({ authLogin })
  handleAuthPass = authPass => this.setState({ authPass })

  auth = () => {
    const { authLogin, authPass } = this.state
    // if (authLogin === "" || authPass === "") return
    this.setState({
      authLoad: true,
      authError: null
    })

    fetch(AUTH_URL,
      {
        headers: {
          "Content-type": "application/x-www-form-urlencoded; charset=UTF-8",
        },
        method: 'post',
        body: `login=${authLogin}&pass=${authPass}`
      })
      .then(res => res.json())
      .then(res => {
        console.log(res)
        if (res.status === 'OK') {
          const modal = document.querySelector(`[data-modal=trigger-1]`)
          const contentWrapper = modal.querySelector('.content-wrapper')
          modal.classList.remove('open');
          this.setState({
            id: res.id,
            logedIn: true,
            page: 'Profile',
            authLoad: false,
            isAdmin: res.isAdmin
          })
        }
        else if (res.error)
          this.setState({
            authLoad: false,
            authError: res.error
          })
      })
  }

  reg = () => {
    const { regLogin, regPass } = this.state
    //if (regLogin === "" || regPass === "") return
    this.setState({
      authLoad: true,
      authError: null
    })

    fetch(REG_URL,
      {
        headers: {
          "Content-type": "application/x-www-form-urlencoded; charset=UTF-8",
        },
        method: 'post',
        body: `login=${regLogin}&pass=${regPass}`
      })
      .then(res => res.json())
      .then(res => {
        console.log(res)
        if (res.error)
          this.setState({
            authLoad: false,
            authError: res.error
          })
        else
          this.setState({
            authLogin: regLogin,
            authPass: regPass
          }, () => {
            this.auth()
          })
      })
  }

  getQuests = quests => this.setState({ quests })

  logout = () => this.setState({
    logedIn: false,
    page: 'Quests',
    authLogin: '',
    authPass: ''
  })

  checkout = () => {
    fetch(ORDER_URL,
      {
        headers: {
          "Content-type": "application/x-www-form-urlencoded; charset=UTF-8",
        },
        method: 'post',
        body: `id=${this.state.id}&quests=,${this.state.booked.map(q => q.id).join(',')}`
      })
      .then(res => this.setState({ booked: [] }))
  }

  render() {
    return (
      <div>
        <Menu
          page={this.state.page}
          setPage={(page) => this.setPage(page)}
          questsInCart={this.state.booked.length}
          logedIn={this.state.logedIn}
        />

        {this.state.page === 'Quests' && <Main
          addToCart={(id) => this.addToCart(id)}
          deleteFromCart={(id) => this.deleteFromCart(id)}
          booked={this.state.booked}
          getQuests={(res) => this.getQuests(res)}
        />}
        {this.state.page === 'Cart' && <Cart
          quests={this.state.booked}
          deleteFromCart={(id) => this.deleteFromCart(id)}
          checkout={() => this.checkout()}
        />}
        {this.state.page === 'Profile' && <Profile
          id={this.state.id}
          login={this.state.authLogin}
          quests={this.state.quests}
          logout={() => this.logout()}
          isAdmin={this.state.isAdmin}
          toMain={() => this.setPage('Quests')}
        />}
        {this.state.page === 'About' && <Gallery />}
        <LoginForm
          handleRegLogin={(e) => this.handleRegLogin(e)}
          handleRegPass={(e) => this.handleRegPass(e)}
          handleAuthLogin={(e) => this.handleAuthLogin(e)}
          handleAuthPass={(e) => this.handleAuthPass(e)}
          onAuth={() => this.auth()}
          onReg={() => this.reg()}
          authLoad={this.state.authLoad}
          authError={this.state.authError}
          regLogin={this.state.regLogin}
          regPass={this.state.regPass}
          authLogin={this.state.authLogin}
          authPass={this.state.authPass}
        />
      </div>
    )
  }
}

export default App
