import React, { Component } from 'react'
import ProfileFoot from './ProfileFoot'
import { UpArrow} from './Others'

export default class Gallery extends Component {
  componentDidMount = () => {
    const current = document.querySelector("#current")
    const imgs = document.querySelectorAll('.imgs img')

    imgs[0].style.opacity = 0.6

    imgs.forEach(img => {
      img.addEventListener('click', () => {
        if (img.src === current.src) return

        imgs.forEach(img => img.style.opacity = 1)
        current.src = img.src

        current.classList.add('fade-in')
        setTimeout(() => current.classList.remove('fade-in'), 500)

        img.style.opacity = 0.6
      })
    })
  }
  send = (e) => {
    e.preventDefault()
    alert('thank you for your letter!')
  } 
  render = () => (
    <main>
      <div className="card-container column gal" style={{ alignItems: 'center' }}>
        <h2>The quests in Moscow are a great opportunity to relax with your family and friends. It's time to get out of the room! Quests in reality - one of the most popular entertainment in Saratov. With us you will find information about the best quest-rooms from different companies!</h2>
        <aside>
          <div class="gallery-container">
            <div class="main-img">
              <img src="https://cdn.escapeteams.ru/global/Images/134db3f7-88a5-40df-8b09-1b582c3852a9.1400x900.jpg" id="current" />
            </div>
            <div class="imgs">
              <img src="https://cdn.escapeteams.ru/global/Images/134db3f7-88a5-40df-8b09-1b582c3852a9.1400x900.jpg" />
              <img src="https://cdn.escapeteams.ru/global/Images/43407343-b816-4985-9c3b-c5c0203209bc.1400x900.jpg" />
              <img src="https://cdn.escapeteams.ru/global/Images/c3d9b4a1-d7d8-4393-9c67-6478aa7f19fe.1400x900.jpg" />
              <img src="https://cdn.escapeteams.ru/global/Images/dc61571c-cde2-4a66-8640-b162e93db3d2.1400x900.jpg" />
              <img src="https://cdn.escapeteams.ru/global/Images/f4ae53ce-e49d-44f7-bc4b-c0c258ebaf17.1400x900.jpg" />
              <img src="https://cdn.escapeteams.ru/global/Images/14960c42-9db5-448c-ab03-50e0ba2d8105.1400x900.jpg" />
              <img src="https://cdn.escapeteams.ru/global/Images/4d7387df-4fdc-4c7a-8cab-e38abea42bc6.1400x900.jpg" />
              <img src="https://cdn.escapeteams.ru/global/Images/a3d79e2a-61bc-442a-b2a7-86cced10d2b0.1400x900.JPG" />
            </div>
          </div>
         <form class="forms" onSubmit={(e)=>this.send(e)}>
  <h2>CONTACT US</h2>
  <p type="Name:"><input placeholder="Write your name here.."></input></p>
  <p type="Email:"><input placeholder="Let us know how to contact you back.."></input></p>
  <p type="Message:"><input placeholder="What would you like to tell us.."></input></p>
  <button>Send Message</button>
</form>
        </aside>
       <iframe src="https://yandex.ru/map-widget/v1/?um=constructor%3Ac3cfbd1d97650758e1be992374dd2c34ac538569c47b68924cefacf7b8ddeccc&amp;source=constructor" width="100%" height="400" frameborder="0"></iframe>
       <h1>Follow us!</h1>
       <div><a href="https://vk.com/siltstrider" target="_blank"><img alt="Vk" src="https://cdn3.iconfinder.com/data/icons/capsocial-round/500/vk-512.png"/></a>
      <a href="https://github.com/Oleg979" target="_blank"><img alt="Github" src="https://cdn2.iconfinder.com/data/icons/social-18/512/Instagram-512.png"/></a>
      <a href="https://github.com/Oleg979" target="_blank"><img alt="Github" src="https://cdn2.iconfinder.com/data/icons/social-icons-33/128/Viber-512.png"/></a>
       <a href="https://github.com/Oleg979" target="_blank"><img alt="Github" src="https://cdn4.iconfinder.com/data/icons/miu-flat-social/60/twitter-512.png"/></a>
       <a href="https://github.com/Oleg979" target="_blank"><img alt="Github" src="https://cdn3.iconfinder.com/data/icons/capsocial-round/500/youtube-512.png"/></a>
      </div>
      </div>
       <ProfileFoot page="About"/>
       <UpArrow />
    </main>

  )
} 