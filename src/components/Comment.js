import React from 'react';

class Comment extends React.Component {
  constructor() {
    super();
    this.state = {
      commentDetails: {},
      comments: [],
      isLoading: false
    };
  }

  componentDidMount = () => {
    this.fetchCommentDetails(this.props.id);
  };

  fetchCommentDetails = (id) => {
    this.setState({ isLoading: true });
    fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`)
      .then((response) => response.json())
      .then((response) => this.setState({ commentDetails: response, isLoading: false }))
      .then(() => this.fetchSubComments());
  };

  fetchSubComments = () => {
    if (this.state.commentDetails.kids) {
      this.state.commentDetails.kids.forEach((id) => {
        fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`)
          .then((response) => response.json())
          .then((response) => this.setState({ comments: [...this.state.comments, response] }));
      });
    }
  };

  render() {
    return (
      <li key={this.props.id}>
        {this.state.isLoading && (
          <p className="loader-container">
            <span className="loader"></span>
          </p>
        )}
        {this.state.commentDetails.deleted && <span className="deleted">deleted</span>}
        <p className="comment-user">{this.state.commentDetails.by}</p>
        <span dangerouslySetInnerHTML={{ __html: this.state.commentDetails.text }}></span>
        <ul>
          {this.state.comments.map((item) => (
            <Comment key={item.id} id={item.id} />
          ))}
        </ul>
      </li>
    );
  }
}

export default Comment;
