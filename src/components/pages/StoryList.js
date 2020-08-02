import React from 'react';
import { Link } from 'react-router-dom';
class StoryList extends React.Component {
  constructor() {
    super();
    this.state = {
      stories: [],
      storyDetails: [],
      isLoading: false
    };
  }

  componentDidMount = () => {
    this.fetchStories();
  };

  fetchStories = () => {
    this.setState({ isLoading: true });
    fetch('https://hacker-news.firebaseio.com/v0/topstories.json?orderBy="$key"&limitToFirst=30')
      .then((response) => response.json())
      .then((response) => {
        this.setState({ stories: response, isLoading: false });
        this.fetchStoryDetails();
      });
  };

  fetchStoryDetails = () => {
    this.state.stories.forEach((item) => {
      fetch(`https://hacker-news.firebaseio.com/v0/item/${item}.json`)
        .then((response) => response.json())
        .then((response) => this.setState({ storyDetails: [...this.state.storyDetails, response] }));
    });
  };

  render() {
    return (
      <ul>
        {this.state.isLoading && (
          <p className="loader-container">
            <span className="loader"></span>
          </p>
        )}
        {this.state.storyDetails.map((item) => (
          <li key={item.id}>
            <a href={item.url} className="story-title">
              {item.title}
            </a>
            <Link to={`/story/${item.id}`} className="comment-link">
              Comments
            </Link>
          </li>
        ))}
      </ul>
    );
  }
}

export default StoryList;
