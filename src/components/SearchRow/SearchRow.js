import React from "react";
import '../../App.css';
import { Button, Modal } from 'antd';

class SearchRow extends React.Component{

    constructor(props){
        super(props);
        this.state = { visible: false}
    }

    showModal = () => {
        this.setState({ visible: true})
    }

    handleOk = (e) => {
        console.log(e);
        this.setState({
          visible: false,
        });
    }

    handleCancel = (e) => {
        console.log(e);
        this.setState({
          visible: false,
        });
    }

    viewDetails(){
        // console.log("viewing an item");
        console.log(this.props.searchResult.title)
    }



    render(){
        
        return(
            <div>
                
                <table key={this.props.searchResult.id} className="result-table">

                    <tbody>

                        <tr> 
                        
                            <td className="img-container">
                            
                                <img src={this.props.searchResult.thumb} alt={this.props.searchResult.title} />
                            
                            </td>

                            <td className="detail-container">
                            
                                <p className="result-header">{this.props.searchResult.title}</p>
                            
                                <p className="result-details">{this.props.searchResult.track} {this.props.searchResult.year} - {this.props.searchResult.genre} - {this.props.searchResult.country}</p>

                                <Button className="result-btn" value="View" onClick={this.showModal}>Details</Button>

                            </td>

                        </tr>

                    </tbody>

                </table>
            
                <Modal
                
                    title={this.props.searchResult.title} 
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    cancelButtonProps={{ hidden: true }}
                    centered>

                    <table key={this.props.searchResult.id} className="modal-result-table">

                        <tbody>

                            <tr> 
                            
                                <td className="modal-img-container">
                                    <img src={this.props.searchResult.cover_image} alt={this.props.searchResult.title} />
                                </td>

                                <td className="modal-detail-container">
                                
                                    <p className="modal-result-header">{this.props.searchResult.title}</p>
                                
                                    <p className="modal-result-details">
                                        Year - {this.props.searchResult.year}
                                        <br />
                                        Genre - {this.props.searchResult.genre}
                                        <br />
                                        Country - {this.props.searchResult.country}
                                        <br />
                                        Rest - {this.props.searchResult.contributor}
                                        <br />
                                        {this.props.searchResult.release_title}
                                        <br />
                                        {this.props.searchResult.type}
                                        <br />
                                        {this.props.searchResult.credit}
                                        <br />
                                        {this.props.searchResult.artist}
                                        <br />
                                        {this.props.searchResult.anv}
                                        <br />
                                        {this.props.searchResult.label}
                                        <br />
                                        {this.props.searchResult.catno}
                                        <br />
                                        {this.props.searchResult.format}
                                        <br />
                                        {this.props.searchResult.style}
                                        <br />
                                        {this.props.searchResult.submitter}
                                        <br />
                                        {this.props.searchResult.track}
                                        <br />
                                        {this.props.searchResult.barcode}
                                


                                    </p>

                                </td>

                            </tr>

                        </tbody>

                    </table>
                    
                </Modal>

            </div>

        )}

    }

export default SearchRow;