import React from "react";

import { Input, Pagination  } from "antd";
import 'antd/dist/antd.css';
import '../../index.css';

import SearchRow from "../SearchRow/SearchRow.js";
import $ from "jquery";

export default class MainContent extends React.Component{

    constructor(props){
        super(props);
        
        this.state = {
            releases:[],
            start_index: 0,
            page: 1,
            per_page: 10
        }
        
    }

    
    // makeHttpRequestWithPage = async pageNumber => {
    //     let response = await fetch(`https://api.discogs.com/database/search?key=GxFSvWbHdHcHrEELcDEq&secret=QeCrnmxvBiQmAFfGrXuthavenZIcHiuv&q=${searchTerm}&per_page=10&page=1&pages=${pageNumber}`, {
    //       method: 'GET',
    //       headers: {
    //         'Accept': 'application/json',
    //         'Content-Type': 'application/json',
    //       },
    //     });
    
    //     const data = await response.json();
    
    //     this.setState({
    //       page: data.data,
    //       pages: data.pages,
    //       per_page: data.per_page,
    //       items: data.items,
    //     });
    // }

    componentDidMount(searchTerm) {
        
        this.mounted = true;
        fetch(`https://api.discogs.com/database/search?q=${searchTerm}&per_page=${this.state.per_page}&key=GxFSvWbHdHcHrEELcDEq&secret=QeCrnmxvBiQmAFfGrXuthavenZIcHiuv`)
            .then(res => res.json())
                .then(data => {
                    this.setState({
                        page: data.pagination.page,
                        per_page: data.pagination.per_page,
                        releases: data.releases,
                        id: data.releases.map(release => release.basic_information.id)
                    }, () => console.log(this.state));
                }).catch(error => console.log(error))
    }

    componentWillUnmount(){
        console.log("unmount async request");
        this.mounted = false;
    }

    handleLoad
   
    
    performSearch(searchTerm){
        console.log("Performing a search with discog...");
        const urlString = "https://api.discogs.com/database/search?key=GxFSvWbHdHcHrEELcDEq&secret=QeCrnmxvBiQmAFfGrXuthavenZIcHiuv&q=" + searchTerm + "&per_page=15&page=1"
        $.ajax({
            url: urlString,
            success: (queryResults) => {

            const results = queryResults.results
            const resultRows = []

            results.forEach((searchResult) => {
                const resultRow = <SearchRow key={searchResult.id} searchResult={searchResult} />
                //console.log(queryResults)
                
                resultRows.push(resultRow);
            })

            this.setState({rows: resultRows})

            },
            error: (xhr, status, err) => {
            console.error("Failed to fetch...")
            }
        })
    }

    onChange = () => {
        console.log("FIX THIS PAGINATION")
    }

    searchChangeHandler(event){
        const searchTerm = event.target.value
        this.performSearch(searchTerm);
        this.componentDidMount(searchTerm);
    }

    render(){
        
        return (
            <section>

                <div className="main-content">
                
                    <label>Search for music by Artist / Album / Genre</label>

                    <div className="search-box">

                        <Input placeholder="&#8981; Search... "  onChange={this.searchChangeHandler.bind(this)} />    
                        
                    </div> 

                </div>

                <div className="search-res">

                    {this.state.rows}

                </div>
                <Pagination 
                    size="small"
                    defaultCurrent={1} 
                    total={50}
                    onChange={this.onChange} />
                

            </section>
        )
    }
}