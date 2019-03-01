import React, {Component} from 'react'
import DustbinComponent from "./DustbinComponent";
import ReactPaginate from 'react-paginate'
import axios from 'axios'
import "./DustbinList.css"
class DustbinList extends Component{

    dustbinNodes = [];
    state={data:[],
        /*offset: 0,*/
        perPage : 10,
        pageCount:4
    };

    constructor(props)
    {
        console.log("initial Props"+props);
        super(props);
        this.state.data = this.props.dustbinNodes;
    }


    componentWillReceiveProps(nextProps){
        this.setState({
            data: nextProps.dustbinNodes
        }, () => {
            this.handlePageClick({selected:0});
        });
    }

    shouldComponentUpdate(nextProps, nextState) {
        return true;
    }

    mapStateDataToDustbinNodes(offset)
    {
        this.dustbinNodes = this.state.data.slice(offset,offset+this.state.perPage).map(function(dustbin, index) {
            return <div key={index} className={"row"}>
                <div className={"col s3 m3 l3"}>{dustbin.dustbinId+" "}</div>
                <div className={"col s3 m3 l3"}>{dustbin.latitude+" "}</div>
                <div className={"col s3 m3 l3"}>{dustbin.longitude+" "}</div>
                <div className={"col s3 m3 l3"}>{dustbin.fillAmount+" "}</div>
            </div>;
        })
    }

    handlePageClick = data => {

        console.log(data);
        let selected = data.selected;
        let offset = Math.ceil(selected * this.state.perPage);
        //console.log("Offset:"+offset);
        this.setState({ offset: offset });
        //console.log("List:"+this.state.data);

        this.dustbinNodes = []
        this.dustbinNodes = this.state.data.slice(offset,offset+this.state.perPage).map(function(dustbin, index) {
            return <div key={index} className={"row"}>
                <div className={"col s3 m3 l3"}>{dustbin.dustbinId+" "}</div>
                <div className={"col s3 m3 l3"}>{dustbin.latitude+" "}</div>
                <div className={"col s3 m3 l3"}>{dustbin.longitude+" "}</div>
                <div className={"col s3 m3 l3"}>{dustbin.fillAmount+" "}</div>
            </div>;
        })
        //console.log(this.dustbinNodes)
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
                    pageRangeDisplayed={3}
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
