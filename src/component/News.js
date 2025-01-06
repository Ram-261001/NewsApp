import React, { Component } from 'react';
import NewsItem from './NewsItem';
import Spinner from './Spinner';

export class News extends Component {
    constructor(props) {
        super(props);
        this.state = {
            articles: [],
            loading: false,
            page: 1,
            totalResults: 0,
        };
    }

    async fetchNews() {
        const { category, pageSize } = this.props;
        const { page } = this.state;

        this.setState({ loading: true });
        const url = `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=cc51b7462f9d4a86af9856397b214956&page=${page}&pageSize=${pageSize}`;
        let data = await fetch(url);
        let parsedData = await data.json();

        this.setState({
            articles: parsedData.articles,
            totalResults: parsedData.totalResults,
            loading: false,
        });
    }

    async componentDidMount() {
        await this.fetchNews();
    }

    async componentDidUpdate(prevProps) {
        // Fetch news if the category prop changes
        if (prevProps.category !== this.props.category) {
            this.setState({ page: 1 }); // Reset to page 1 for a new category
            await this.fetchNews();
        }
    }

    handlePrevClick = async () => {
        this.setState(
            (prevState) => ({ page: prevState.page - 1 }),
            this.fetchNews // Callback to fetch news after updating the state
        );
    };

    handleNextClick = async () => {
        this.setState(
            (prevState) => ({ page: prevState.page + 1 }),
            this.fetchNews // Callback to fetch news after updating the state
        );
    };

    render() {
        return (
            <div className="container my-3">
                <h1 className="text-center">
                    NewsMonkey - Top {this.props.category.charAt(0).toUpperCase() + this.props.category.slice(1)} Headlines
                </h1>
                {this.state.loading && <Spinner />}
                <div className="row">
                    {!this.state.loading &&
                        this.state.articles.map((element, index) => {
                            return (
                                <div className="col-md-4" key={`${element.url}-${index}`}> {/* Unique key */}
                                    <NewsItem
                                        title={element.title ? element.title : ""}
                                        description={element.description ? element.description : ""}
                                        imageUrl={element.urlToImage}
                                        newsUrl={element.url}
                                        date={element.publishedAt} // Pass the published date
                                        source={element.source.name} // Pass the source name
                                    />
                                </div>
                            );
                        })}
                </div>
                <div className="container d-flex justify-content-between">
                    <button
                        disabled={this.state.page <= 1}
                        type="button"
                        className="btn btn-dark"
                        onClick={this.handlePrevClick}
                    >
                        &larr; Previous
                    </button>
                    <button
                        disabled={
                            this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)
                        }
                        type="button"
                        className="btn btn-dark"
                        onClick={this.handleNextClick}
                    >
                        Next &rarr;
                    </button>
                </div>
            </div>
        );
    }
}

export default News;
