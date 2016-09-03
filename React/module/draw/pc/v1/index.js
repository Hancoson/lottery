/**
 *
 * @author Guoxing.Han(hancoson#163.com)
 * @time 2016-8-10.
 */
require('../../../../lib/outil/lazyload');
const DrawView = require('../../components/v1/index');
const MyDraw=require('../../components/v1/myDraw')
const DrawRegulation=require('../../components/v1/regulation')

const PcDraw = React.createClass({

    getInitialState(){
        return {
            ValueData: this.props.data
        }
    },

    render() {
        let _data    = this.state.ValueData,
            _main    = _data.main,
            _details = _data.details,
            _bg      = _main.bg.text;
        return (
            <div className="main clearfix" style={{background:_bg}}>
                <div className="container">
                    <div className="hd-drawPc">
                        <div className="top-btns">
                            <MyDraw mainData={_main} />
                            <DrawRegulation mainData={_main} />
                        </div>
                        <DrawView mainData={_main} detailsData={_details}/>
                    </div>
                </div>
                <div id="J_drawdialogView"></div>
            </div>
        )
    }
});

const getJsondata = hdPcDrawv1;
getJsondata.map(function (val) {
    return (
        ReactDOM.render(<PcDraw data={val.content}/>,
            document.getElementById(val.id)
        )
    )

})