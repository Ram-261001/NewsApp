import React, { Component } from 'react';

export class NewsItem extends Component {
    render() {
        const { title, description, imageUrl, newsUrl, date, source } = this.props;

        return (
            <div className="card my-3">
                {/* Source Badge */}
                <span
                    className="position-absolute top-0 translate-middle badge rounded-pill bg-danger"
                    style={{ left: '90%', zIndex: 1 }}
                >
                    {source ? source : "Unknown"}
                </span>

                <img
                    src={imageUrl ? imageUrl : "https://via.placeholder.com/150"}
                    className="card-img-top"
                    alt="News"
                />
                <div className="card-body">
                    <h5 className="card-title">{title}</h5>
                    <p className="card-text">{description}</p>
                    <a
                        href={newsUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="btn btn-sm btn-primary"
                    >
                        Read More
                    </a>
                    <p className="card-text mt-2">
                        <small className="text-muted">
                            Published on {new Date(date).toUTCString()} {/* Format to GMT */}
                        </small>
                    </p>
                </div>
            </div>
        );
    }
}

export default NewsItem;
