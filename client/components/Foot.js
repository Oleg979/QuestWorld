import React, { Component } from 'react'

export default class Foot extends Component {
  style = {
    backgroundColor: 'deepskyblue'
  }
  state = {
    onlyHorrors: false,
    onlyLogic: false
  }
  hadnleOnlyHorrors = () => {
    this.props.disableFilters()
    this.props.filterOnlyHorrors(!this.state.onlyHorrors)
    this.setState({
      onlyLogic: false,
      onlyHorrors: !this.state.onlyHorrors
    })
  }

  hadnleOnlyLogic = () => {
      this.props.disableFilters()
      this.props.filterOnlyLogic(!this.state.onlyLogic)
      this.setState({
      onlyHorrors: false,  
      onlyLogic: !this.state.onlyLogic
    })
  }
  render() {
    return (
      <footer>
        <input
          type="text"
          className="search-name"
          placeholder="Enter quest name..."
          onChange={e => this.props.onSearch(e.target.value)}
        />
        <div
          style={this.state.onlyHorrors ? this.style : null}
          className="genre"
          onClick={() => this.hadnleOnlyHorrors()}
        >
          Only Horrors</div>
        <div
          style={this.state.onlyLogic ? this.style : null}
          className="genre"
          onClick={() => this.hadnleOnlyLogic()}
        >
          Only Logic</div>  
      </footer>
    )
  }
}