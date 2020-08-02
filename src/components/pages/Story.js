import React from 'react';
import Comment from '../Comment';
class Story extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      storyDetails: {},
      comments: []
    };
  }

  componentDidMount = () => {
    this.fetchStoryDetails(this.props.match.params.id);
  };

  fetchStoryDetails = (id) => {
    fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`)
      .then((response) => response.json())
      .then((response) => this.setState({ storyDetails: response }))
      .then(() => this.fetchComments());
  };

  fetchComments = () => {
    if (this.state.storyDetails.kids) {
      this.state.storyDetails.kids.forEach((id) => {
        fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`)
          .then((response) => response.json())
          .then((response) => this.setState({ comments: [...this.state.comments, response] }));
      });
    }
  };

  render() {
    return (
      <div>
        <a href={this.state.storyDetails.url} className="story-title">
          {this.state.storyDetails.title}
        </a>
        <ul>
          {this.state.comments.map((item) => {
            return <Comment key={item.id} id={item.id} />;
          })}
        </ul>
      </div>
    );
  }
}

export default Story;
