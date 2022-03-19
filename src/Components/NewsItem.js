import React, { Component } from 'react'

export class NewsItem extends Component {
  render() {
      let { title, description, imageUrl ,newsUrl ,author ,publishedAt ,source} = this.props;
    return (
        <div className="card">
        <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" style={{zIndex:1}}>{source}</span>
        <img src={imageUrl} className="card-img-top" alt="..."/>
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <p className="card-text">{description}</p>
          <p class="card-text"><small class="text-muted">By {author?author:"unknown"} on {Date(publishedAt)}</small></p>
          <a rel='noreferrer' href={newsUrl} target="_blank" className="btn btn-sm btn-dark">Read More</a>
        </div>
      </div>
    )
  }
}

export default NewsItem