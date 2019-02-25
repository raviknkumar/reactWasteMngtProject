import React, {Component} from 'react'
import Dustbin from "./Dustbin";
import ReactPaginate from 'react-paginate'
import axios from 'axios'
import "./DustbinList.css"
class DustbinList extends Component{

    dustbinNodes = [];
    state={data:[],
        /*offset: 0,*/
        perPage : 3,
        pageCount:4
    };

    constructor(props)
    {
        super(props)
        this.getDataFromServer = this.getDataFromServer.bind(this);
    }

    componentDidMount() {
        this.getDataFromServer();
    }

    getDataFromServer()
    {
        /*axios.get(`http://144.76.45.213:8073/logistic-operation/driver/all`)
            .then(res => {
                const persons = res.data.data;
                this.setState({ data: persons });
            });*/
    }

    handlePageClick = data => {

        console.log(data);
        let selected = data.selected;
        let offset = Math.ceil(selected * this.state.perPage);
        console.log("Offset:"+offset);
        this.setState({ offset: offset });

        this.dustbinNodes = []
        this.dustbinNodes = this.state.data.slice(offset,offset+this.state.perPage).map(function(dustbin, index) {
            return <div key={index} className={"row"}>
                <div>{dustbin.id+" "}</div>
                <div>{dustbin.date+" "}</div>
                <div>{dustbin.content.name+" "}</div>
            </div>;
        })
        console.log(this.dustbinNodes)
    };


    render() {

        return(
            <div className="commentList">
                <ul>{this.dustbinNodes}</ul>
                <ReactPaginate
                    previousLabel="❮"
                    nextLabel="❯"
                    breakLabel={'...'}
                    breakClassName={'break-me'}
                    pageCount={this.state.pageCount}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    onPageChange={this.handlePageClick}
                    containerClassName={'pagination'}
                    subContainerClassName={'pages pagination'}
                    activeClassName={'active'}
                    initialPage={0}
                />
            </div>
        );
    }
}

export default DustbinList;
