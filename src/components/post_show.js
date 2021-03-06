import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchPost, deletePost } from '../actions';
class PostShow extends Component {
    componentDidMount() {
        // React router passes URL param information as the props to the component that is rendered on that route.
        const { id } = this.props.match.params;
        this.props.fetchPost(id);
    }
    onDeleteClick() {
        const { id } = this.props.match.params;
        this.props.deletePost(id, () =>{
            this.props.history.push('/');
        });
    }

    render() {
        const { post } = this.props;

        /* Initially when the component renders post will be undefined 
           since componentDidMount is executed after first render */
        if (!post) {
            return (
                <div>
                    Loading....
                </div>
            );
        }

        return (
            <div>
                <Link to="/">Back To Post</Link>
                <button className="btn btn-danger pull-xs-right" onClick={this.onDeleteClick.bind(this)}>Delete Post</button>
                <h3>{post.title}</h3>
                <h6>Categories: {post.categories}</h6>
                <p>{post.content}</p>
            </div>
        );
    }
}

// OwnProps points to components currently existing props
function mapStateToProps({ posts }, OwnProps) {
    return { post: posts[OwnProps.match.params.id] }
}

export default connect(mapStateToProps, { fetchPost, deletePost })(PostShow);