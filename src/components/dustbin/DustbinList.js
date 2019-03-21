import React, {Component} from 'react'
import ReactPaginate from 'react-paginate'
import "./DustbinList.css"
class DustbinList extends Component{

    dustbinNodes = [];
    state={data:[],
        /*offset: 0,*/
        perPage : 10,
        pageCount:1
    };

    constructor(props)
    {
        console.log("initial Props"+props);
        super(props);
        this.state.data = this.props.dustbinNodes;
    }

    componentWillReceiveProps(nextProps){
        this.setState({
            data: nextProps.dustbinNodes,
            pageCount:nextProps.dustbinNodes.length/this.state.perPage
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
            return <tr key={index}>
                <td>{dustbin.dustbinId}</td>
                <td>{dustbin.latitude}</td>
                <td>{dustbin.longitude}</td>
                <td>{dustbin.fillAmount}</td>
            </tr>
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
            return <tr>
                <td>{dustbin.dustbinId}</td>
                <td>{dustbin.latitude}</td>
                <td>{dustbin.longitude}</td>
                <td>{dustbin.fillAmount}</td>
            </tr>
                /*<div key={index} className={"row"}>
                <div className={"col s3 m3 l3"}>{dustbin.dustbinId+" "}</div>
        <div className={"col s3 m3 l3"}>{dustbin.latitude+" "}</div>
        <div className={"col s3 m3 l3"}>{dustbin.longitude+" "}</div>
        <div className={"col s3 m3 l3"}>{dustbin.fillAmount+" "}</div>
        </div>;*/
        })
        //console.log(this.dustbinNodes)
    };

    render() {
        return(
            <tbody>
                {this.dustbinNodes}
                <div style={{background:"#fff",marginTop:"10px"}}>
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
            </tbody>
        );
    }
}

export default DustbinList;
