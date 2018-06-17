import React, { Component, Fragment } from 'react'
import { USER_URL, QUEST_URL, ALL_QUESTS_URL } from './constants'
import { UpArrow, Loader } from './Others'
import ProfileCard from './ProfileCard'
import ProfileFoot from './ProfileFoot'
import $ from 'jquery'
import ymaps from 'ymaps'


export default class Profile extends Component {
  state = {
    quests: null,
    questsLoaded: false,
    show: true
  }
  componentDidMount() {
    console.log(ymaps)
    fetch(`${USER_URL}${this.props.id}`)
      .then(res => res.json())
      .then(res => {
        if (res.quests == "") this.setState({ questsLoaded: true })
        else this.setState({
          quests: res.quests.split(',').map(card => this.props.quests.find(q => q.id == +card)
          ),
          nums: res.quests.split(','),
          questsLoaded: true
        })
      }
      )
  }

  addQuest = e => {
    e.preventDefault()
    const title = $('.formes-title')[0].value
    const descr = $('.formes-desc')[0].value
    const price = $('.formes-price')[0].value
    const genre = $('.formes-genre')[0].value
    const img = $('.formes-img')[0].value
    fetch(ALL_QUESTS_URL, {
      method: "POST",
      headers: {
        "Content-type": "application/x-www-form-urlencoded; charset=UTF-8",
      },
      body: `title=${title}&descr=${descr}&price=${price}&genre=${genre}&img=${img}`
    })
      .then(() => this.props.toMain())
  }

  render() {
    return (
      <main className="col">
        <div className="card-container column">
          <div className="avatar">
            <img src={!this.props.isAdmin ? "https://www.iconsdb.com/icons/preview/white/user-xxl.png" : "https://www.iconsdb.com/icons/preview/white/moderator-xxl.png"} className="user" />
            <h1 style={{ color: 'red' }}>You logged in as {this.props.login}</h1>
          </div>
          <div class="info">
            <img src="https://www.iconsdb.com/icons/preview/white/padlock-3-xxl.png" className="point" />
            <h2>Your access level: <span className="grey">{this.props.isAdmin ? "Admin" : "User"}
            </span></h2>
          </div>
          <div class="info">
            <img src="https://www.iconsdb.com/icons/preview/white/pin-8-xxl.png" className="point" />
            <h2>Your are from: <span className="grey">Saratov, Russia
            </span></h2>
          </div>
          <div class="info">
            <img src="https://www.iconsdb.com/icons/preview/white/cart-70-xxl.png" className="point" />
            <h2>Number of your quests: <span className="grey">
              {!this.state.questsLoaded ? "Loading..." : this.state.quests ? this.state.quests.length : 0}</span></h2>
          </div>
          <h1 onClick={() => {
            $('.cards').slideToggle(500)
            this.setState({ show: !this.state.show })
          }
          } style={{ cursor: 'pointer' }} className="show">{this.state.show ? "Hide your quests" : "Show your quests"}</h1>
          {!this.state.quests && this.state.questsLoaded && <h2>You haven't bought any quests</h2>}
          {!this.state.questsLoaded && <Loader />}
          {<ul className="cards">
            {this.state.quests && this.state.quests.map(card => (
              <ProfileCard
                key={card.id}
                id={card.id}
                name={card.title}
                img={card.img}
                desc={`${card.desc.trim().substr(0, 300)}...`}
              />
            ))}
          </ul>}
          <br /><br /><br /> <br /><br /><br />
        </div>
        {this.props.isAdmin && <form class="formes" onSubmit={e => this.addQuest(e)}>
          <h2>ADD A QUEST</h2>
          <p type="Name:"><input placeholder="Quest title" className="formes-title"></input></p>
          <p type="Description:"><input placeholder="Quest description" className="formes-desc"></input></p>
          <p type="Image:"><input placeholder="Quest image" className="formes-img"></input></p>
          <p type="Price:"><input type="number" className="formes-price" placeholder="Quest price"></input></p>
          <p type="Genre:"><input className="formes-genre" placeholder="Quest genre"></input></p>
          <button>Add quest</button>
        </form>}
        <ProfileFoot page="Profile" logout={() => this.props.logout()} />
        <UpArrow />
      </main>
    )
  }
}