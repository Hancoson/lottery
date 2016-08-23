/**
 * 中奖纪录
 * @author Guoxing.Han(hancoson#163.com)
 * @time 2016-8-16.
 */
const React      = require('react');
const AJAXCONGIG = require('../../../../lib/outil/ajax');

const Winners  = React.createClass({
    getInitialState(){
        return {
            data: [],
            main:this.props.main
        }
    },
    componentWillReceiveProps(nextProps){
        this.setState({
            data: nextProps.data
        });
    },
    shouldComponentUpdate(nextProps, nextState) {
        return nextState.data ? true : false;
    },
    render(){
        const _list = this.state.data||[];
        console.log(_list);
        return (
            <div>
                {
                    _list.length > 0 ?
                        <ul id="J_drawListBox">
                            {
                                _list.map(function (v, i) {
                                    return (
                                        <li key={i}>
                                            <span className="n">{v.nickName}</span>
                                            <span className="p">{v.prizeName}</span>
                                        </li>
                                    )
                                })
                            }
                        </ul> :
                        <ul>
                            <li className="null">{CONFIG.PROMPT.noOneDraw}</li>
                        </ul>
                }
            </div>
        )
    },
    componentDidMount(){
        this._getData();
    },
    _getData: function () {
        const that = this,
              _main=this.state.main,
              _url = CONFIG.urlPc.getDrawList+'?appId='+CONFIG.POSTDATA.appId+'&activityId='+_main.id.disabled;

        AJAXCONGIG.AjaxJsonp(_url).done(function (data) {
            if(data.data){
                that.setState({
                    data: data.data
                });
                if (data.data.length > 0) that._drawList(41, 20, 2000);
            }

        }).fail(function () {
            console.log('获取抽奖次数接口服务异常')
        });
    },

    /**
     * 中奖纪录
     * @param lh 行高
     * @param speed 速度
     * @param delay 间隔时间
     */
    _drawList: function (lh, speed, delay) {
        var p             = false,
            t,
            o             = document.getElementById("J_drawListBox");
        o.innerHTML += o.innerHTML;
        o.style.marginTop = 0;
        o.onmouseover     = function () {
            p = true;
        }
        o.onmouseout      = function () {
            p = false;
        }
        function start() {
            t = setInterval(scrolling, speed);
            if (!p) o.style.marginTop = parseInt(o.style.marginTop) - 1 + "px";
        }

        function scrolling() {
            if (parseInt(o.style.marginTop) % lh != 0) {
                o.style.marginTop = parseInt(o.style.marginTop) - 1 + "px";
                if (Math.abs(parseInt(o.style.marginTop)) >= o.scrollHeight / 2) o.style.marginTop = 0;
            } else {
                clearInterval(t);
                setTimeout(start, delay);
            }
        }

        setTimeout(start, delay);
    }
});
module.exports = Winners;