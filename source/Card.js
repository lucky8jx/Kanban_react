import React, { Component, PropTypes } from 'react';
import CheckList from './CheckList';
import marked from 'marked';

import { Link } from 'react-router';

let titlePropType = (props, propName, ComponentName) => {
  if (props[propName]) {
    let value = props[propName];
    if (typeof value !== 'string' || value.length > 80) {
      return new Error(
        `${propName} in ${ComponentName} is longer than 80 characters`
      );
    }
  }
}

class Card extends Component {
  constructor() {
    super(...arguments);
    this.state = {
      showDetails: false
    };
  }

  toggleDetails() {
    this.setState({showDetails: !this.state.showDetails});
  }
  render() {
    let cardDetails;
    if (this.state.showDetails) {
      cardDetails = (
        <div className="card_details">
          <span dangerouslySetInnerHTML={{__html:marked(this.props.description)}} />
          <CheckList cardId={this.props.id} tasks={this.props.tasks} taskCallbacks={this.props.taskCallbacks} />
        </div>
      );
    }
    let sideColor = {
      position: 'absolute',
      zIndex: -1,
      top: 0,
      bottom: 0,
      left: 0,
      width: 7,
      backgroundColor: this.props.color
    };
    return (
      <div className="card">
        <div style={sideColor} />
        <div className="card_edit"><Link to={'/edit/'+ this.props.id}>&#9998;</Link></div>
        <div className="card_title" onClick={this.toggleDetails.bind(this)}>{this.props.title}</div>
        {cardDetails}
      </div>
    );
  }
}

Card.propTypes = {
  id: PropTypes.number,
  title: titlePropType,
  description: PropTypes.string,
  color: PropTypes.string,
  tasks: PropTypes.arrayOf(PropTypes.object),
  taskCallbacks: PropTypes.object
};

export default Card;
