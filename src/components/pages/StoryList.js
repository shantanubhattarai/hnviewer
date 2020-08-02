import React from 'react';
import { Link } from 'react-router-dom';
class StoryList extends React.Component {
  constructor() {
    super();
    this.state = {
      stories: [],
      storyDetails: [],
      isLoading: false,
      page: 0,
      itemsInPage: 30,
    };
  }

  componentDidMount = () => {
    this.fetchStories();
  };

  fetchStories = () => {
    this.setState({ isLoading: true });
    fetch(`https://hacker-news.firebaseio.com/v0/topstories.json`)
      .then((response) => response.json())
      .then((response) => {
        this.setState({ stories: response, isLoading: false });
        this.fetchStoryDetails();
      });
  };

  fetchStoryDetails = () => {
    let storyLoadCounter = 0;
    this.setState({isLoading:true});
    this.state.stories.slice(this.state.page * 30, (this.state.page+1) * 30).forEach((item) => {
      fetch(`https://hacker-news.firebaseio.com/v0/item/${item}.json`)
        .then((response) => response.json())
        .then((response) => this.setState(
          { storyDetails: [...this.state.storyDetails, response] },
          () => {
            storyLoadCounter++;
            if(storyLoadCounter >= 29) this.setState({isLoading: false})
          }))
      });
  };

  changePage(amount = 1){
    if(this.state.page === 0 && amount === -1) return;
    if(this.state.page === Math.floor(this.state.stories.length / 30) && amount === 1) return;
    this.setState({page: this.state.page + amount}, () => {this.fetchStoryDetails()});

  }

  render() {
    return (
      <div className="main">
        <div className="paginate">
          <div className="btn-container">
            <button className="page-btn" onClick={() => this.changePage(-1)}>Prev</button>
            <span className="page-display">{this.state.page + 1}</span>
            <button className="page-btn" onClick={() => this.changePage(1)}>Next</button>
          </div>
        </div>
        <ul>
          {this.state.storyDetails.slice(this.state.page * 30, (this.state.page+1) * 30).map((item) => (
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
        {this.state.isLoading && (
            <p className="loader-container">
              <span className="loader"></span>
            </p>
          )}
      </div>
    );
  }
}

export default StoryList;
