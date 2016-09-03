/**
 * 彩灯
 * @author Guoxing.Han(hancoson#163.com)
 * @time 2016-8-11.
 */

const BorderLight = React.createClass({
    getInitialState(){
        return {
            _isStart: this.props._isStart,
            l1     : this.props.l1,
            l2     : this.props.l2
        }
    },
    componentWillReceiveProps(nextProps){
        this.setState({
            _isStart: nextProps._isStart
        });
    },
    render(){
        this._light();
        var _f1 = this.state.l1,
            _f2 = this.state.l2;
        return (
            <div>
                <div className="border-light top">
                    <i className="odd across">
                        <img src={_f1}/>
                    </i>
                    <i className="even across">
                        <img src={_f2}/>
                    </i>
                    <i className="odd across">
                        <img src={_f1}/>
                    </i>
                    <i className="even across">
                        <img src={_f2}/>
                    </i>
                    <i className="odd across last">
                        <img src={_f1}/>
                    </i>
                </div>
                <div className="border-light right">
                    <i className="even vertical">
                        <img src={_f2}/>
                    </i>
                    <i className="odd vertical">
                        <img src={_f1}/>
                    </i>
                </div>
                <div className="border-light bottom">
                    <i className="even across">
                        <img src={_f2}/>
                    </i>
                    <i className="odd across">
                        <img src={_f1}/>
                    </i>
                    <i className="even across">
                        <img src={_f2}/>
                    </i>
                    <i className="odd across">
                        <img src={_f1}/>
                    </i>
                    <i className="even across last">
                        <img src={_f2}/>
                    </i>
                </div>
                <div className="border-light left">
                    <i className="even vertical">
                        <img src={_f2}/>
                    </i>
                    <i className="odd vertical">
                        <img src={_f1}/>
                    </i>
                </div>
            </div>
        )
    },
    _light(){

        var that = this;
        setTimeout(function () {
            that.setState({
                l1: that.state.l2,
                l2: that.state.l1
            })
        }, that.state._isStart ? 250 : 1000);

    }
});
module.exports    = BorderLight;
