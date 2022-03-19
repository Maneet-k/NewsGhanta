import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types';

export class News extends Component {
    static defaultProps = {
        country : 'in',
        pageSize : 8,
        category : 'general'
    };
    static propTypes = {
        country : PropTypes.string,
        pageSize : PropTypes.number,
        category : PropTypes.string
    }
    constructor() {
        super();
        this.state = {
            articles: [],
            loading: false,
            page: 1, 
        }
    };
    async componentDidMount(){
        try{
            const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=4d03b196b25c4f44b771824450ce53a0&page=${this.state.page}&pageSize=15`;
            this.setState({loading: true});
            const res = await fetch(url);
            const data = await res.json();
            this.setState({
                articles: data.articles,
                totalResults: data.totalResults,
                loading: false
            });
        }
        catch(e) {
            console.log("something is not working");
        }
    }
    handlePrevClick = async ()=> {
        this.setState({
            page : this.state.page-1,
        })
        try{
            const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=4d03b196b25c4f44b771824450ce53a0&page=${this.state.page-1}&pageSize=15`;
            this.setState({loading: true});
            const res = await fetch(url);
            const data = await res.json();
            this.setState({
                articles: data.articles,
                loading: false
            });
        }
        catch(e) {
            console.log("something is not working");
        }
    }
    handleNextClick = async ()=> {
        this.setState({
        page : this.state.page+1,
        })
        try{
            const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=4d03b196b25c4f44b771824450ce53a0&page=${this.state.page+1}&pageSize=15`;
            this.setState({loading: true});
            const res = await fetch(url);
            const data = await res.json();
            this.setState({
                articles: data.articles,
                loading: false
            });
        }
        catch(e) {
            console.log("something is not working");
        }
    };
    render() {
        return (
            <>
                <div className="container my-4" >
                    <h3 className='text-center'>News Ghanta - Top Headlines</h3>
                    {this.state.loading && <Spinner/>}
                    <div className='row my-3'>
                        {!this.state.loading && this.state.articles.map((element) => {
                            return <div className='col-md-4 my-3' key={element.url}>
                                <NewsItem title={element.title ? element.title : ""} description={element.description ? element.description : ""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} publishedAt={element.publishedAt} source={element.source.name}/>
                            </div>
                        })}
                    </div>
                </div>
                <div className='container d-flex justify-content-between my-4'>
                <button type="button" disabled={this.state.page<=1} onClick={this.handlePrevClick} className="btn btn-dark">&larr; Previous</button>
                <button type="button" disabled={this.state.page+1>Math.ceil(this.state.totalResults/9)} onClick={this.handleNextClick} className="btn btn-dark">Next &rarr;</button>
                </div>
            </>
        )
    }
}

export default News