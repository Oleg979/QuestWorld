import React, { Component } from 'react'
import QuestCard from "./QuestCard"
import { UpArrow, Loader } from './Others'
import { ALL_QUESTS_URL } from './constants'
import Foot from "./Foot"
import QuestPage from './QuestPage'

class Main extends Component {

  state = {
    quests: [],
    bufQuests: [],
    questsLoaded: false,
    showModal: false,
    modalCard: null
  }

  componentDidMount() {
    window.scrollTo(0, 0)
    fetch(ALL_QUESTS_URL)
      .then(res => res.json())
      .then(res => {
        this.props.getQuests(res)
        console.log(res)
        this.setState({
          quests: res,
          bufQuests: res,
          questsLoaded: true
        })
      })
  }

  filterByName = name => {
    if (name === '')
      this.setState({
        quests: this.state.bufQuests
      })
    else
      this.setState({
        quests: this.state.bufQuests.filter
          (q => q.title.toLowerCase().indexOf(name.toLowerCase().trim()) != -1)
      })
  }

  addToCart = id => {
    this.props.addToCart(this.state.quests.find(q => q.id === id))
  }

  filterOnlyHorrors = flag => {
    if (!flag)
      this.setState({
        quests: this.state.bufQuests
      })
    else
      this.setState({
        quests: this.state.bufQuests.filter
          (q => q.genre === 'Horror')
      })
  }

  filterOnlyLogic = flag => {
    if (!flag)
      this.setState({
        quests: this.state.bufQuests
      })
    else
      this.setState({
        quests: this.state.bufQuests.filter
          (q => q.genre === 'Logic')
      })
  }

  disableFilters = () => this.setState({
    quests: this.state.bufQuests
  })


  showModal = card => {
    this.setState({
      modalCard: card
    })
    const modal = document.querySelector(`[data-modal=trigger-2]`);
    const contentWrapper = modal.querySelector('.content-wrapper');
    const close = modal.querySelector('.close');

    close.addEventListener('click', () => modal.classList.remove('open'));
    modal.addEventListener('click', () => modal.classList.remove('open'));
    contentWrapper.addEventListener('click', (e) => {
       if (e.target == document.getElementById("add2")) {
        
          this.addToCart(this.state.modalCard.id)
          e.stopPropagation()
          return
        }
        if (e.target == document.getElementById("drop2")) {
          this.props.deleteFromCart(this.state.modalCard.id)
          e.stopPropagation()
          return
        }
        
      e.stopPropagation()
    });

    modal.classList.toggle('open');
  }

  render() {
    return (
      <main>

        <div className="card-container">
          {!this.state.questsLoaded && <Loader />}

          <ul className="cards">

            {this.state.quests && this.state.quests.map(card => (
              <QuestCard
                showModal={() => this.showModal(card)}
                key={card.id}
                id={card.id}
                name={card.title}
                img={card.img}
                price={card.price}
                desc={`${card.desc.trim().substr(0, 300)}...`}
                addToCart={(id) => this.addToCart(id)}
                deleteFromCart={(id) => this.props.deleteFromCart(id)}
                booked={this.props.booked.map(q => q.id)}
              />
            ))}

          </ul>

        </div>

        <UpArrow />

        <Foot
          onSearch={name => this.filterByName(name)}
          filterOnlyHorrors={flag => this.filterOnlyHorrors(flag)}
          filterOnlyLogic={flag => this.filterOnlyLogic(flag)}
          disableFilters={() => this.disableFilters()}
        />

        <QuestPage
          card={this.state.modalCard || {}}
          addToCart={(id) => this.addToCart(id)}
          deleteFromCart={(id) => this.props.deleteFromCart(id)}
          booked={this.props.booked.map(q => q.id)}
        />

      </main>
    )
  }
}

export default Main