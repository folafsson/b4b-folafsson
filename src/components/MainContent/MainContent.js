import React from "react";

import { Input, Pagination  } from "antd";
import 'antd/dist/antd.css';
import '../../index.css';

import SearchRow from "../SearchRow/SearchRow.js";
import $ from "jquery";

export default class MainContent extends React.Component{

    // state = {
    //     page: 1,
    //     pages: null,
    //     per_page: 15,
    //     items: null
    // }
    
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

    // componentDidMount() {
    //     this.makeHttpRequestWithPage(1);
    // }

    constructor(props){
        super(props);
        
        this.state = {
            per_page: 15,
            page: 1,
            
        }
        
    }
    
    performSearch(searchTerm){
        console.log("Performing a search with discog...");
        const urlString = "https://api.discogs.com/database/search?key=GxFSvWbHdHcHrEELcDEq&secret=QeCrnmxvBiQmAFfGrXuthavenZIcHiuv&q=" + searchTerm + "&?genre&per_page=15&page=1"
        $.ajax({
            url: urlString,
            success: (queryResults) => {

            const results = queryResults.results
            const resultRows = []

            results.forEach((searchResult) => {
                const resultRow = <SearchRow key={searchResult.id} searchResult={searchResult} />
                console.log(queryResults.pagination)
                
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
        // const urlString = "https://api.discogs.com/database/search?key=GxFSvWbHdHcHrEELcDEq&secret=QeCrnmxvBiQmAFfGrXuthavenZIcHiuv&q=" + searchTerm + "&?genre&per_page=15&page=1"

        console.log()
    }

    searchChangeHandler(event){
        const searchTerm = event.target.value
        this.performSearch(searchTerm)
    }

    render(){
        
        return (
            <section>

                <div className="main-content">
                
                    <label>Search for music by Artist or Album</label>

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