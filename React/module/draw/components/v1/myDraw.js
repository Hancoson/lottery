/**
 * 我的奖品
 * @author Guoxing.Han(hancoson#163.com)
 * @time 2016-8-16.
 */
const IsPc             = require('../../../../lib/outil/isPc');
const AJAXCONGIG       = require('../../../../lib/outil/ajax');
const HdDialog         = require('../../../../lib/components/dialog/dialog');
const WriteInfo        = require('./write-info');
const HdFullDialog     = require('../../../../lib/components/dialog/full-dialog');
const MyDrawDialogView = React.createClass({
    render() {
        var that  = this,
            _data = this.props.data;
        console.log(_data);
        return (
            <div className="hd-drawDialogBig">
                <div className="title">
                    <i></i><span>我的奖品</span>
                </div>
                <div className="dialog-con">
                    <ul className="myList">
                        {
                            _data.data.length > 0 ?
                                _data.data.map(function (v, i) {
                                    return (
                                        <li key={i}>
                                            <div className="img">
                                                <img src={v.img}/>
                                                {
                                                    IsPc.init() ?
                                                        <p>{v.name}</p> : ''
                                                }
                                            </div>
                                            <div className="dec">
                                                <p className="h">{v.name}</p>
                                                <p className="t">{v.createTime}</p>
                                                {
                                                    v.option == 1 ? <p className="f">已自动发奖</p> :
                                                        v.option == 3 ?
                                                            <p className="f">已提交收货地址</p> :
                                                            <a href="javascript:void(0)"
                                                               onClick={that._toWriteInfo.bind(that, v)}>提交收货信息 ></a>
                                                }
                                            </div>

                                        </li>
                                    )
                                }) :
                                <li className="null-draw">{CONFIG.PROMPT.noList}</li>
                        }

                    </ul>
                </div>
            </div>
        )
    },
    /**
     * 填写收货信息
     * @private
     */
    _toWriteInfo(e){
        this._onClose();
        document.body.className = 'no-scroll';
        !IsPc.init()?document.getElementsByTagName('BODY')[0].scrollTop=0:'';
        ReactDOM.render(
            IsPc.init() ?
                <HdDialog
                    onClose={this._onClose}
                    isOpen={true}
                    width="700"
                    marginTop="-250"
                    marginLeft="-350">
                    <WriteInfo
                        drawData={e}
                        mainData={this.props.mainData}/>
                </HdDialog> :
                <HdFullDialog
                    onClose={this._onClose}
                    isOpen={true}
                    title="填写您的收货信息">
                    <WriteInfo
                        drawData={e}
                        mainData={this.props.mainData}/>
                </HdFullDialog>,
            document.getElementById('J_drawdialogView')
        )
    },
    _onClose(){
        document.body.className = '';
        ReactDOM.render(<HdDialog onClose={this._onClose} isOpen={false} width="700" marginTop="-180"
                                  marginLeft="-350"></HdDialog>,
            document.getElementById('J_drawdialogView')
        )
    }
});

const MyDraw   = React.createClass({
    getInitialState(){
        return {
            main     : this.props.mainData,
            loginInfo: MeiCookie.cookie("MZ_ALAD_USER_INFO") || false
        }
    },
    render() {
        return (
            <button onClick={this._onOpen}>我的奖品</button>
        )
    },
    _onOpen(){
        if (!this.state.loginInfo) {
            window.location.href = IsPc.init() ? CONFIG.URL.login : CONFIG.URL.mLogin;
            return;
        }
        !IsPc.init()?document.getElementsByTagName('BODY')[0].scrollTop=0:'';
        //这边写请求
        var that  = this,
            _main = this.props.mainData,
            _url  = CONFIG.urlPc.getMyDraw + '?appId=' + CONFIG.POSTDATA.appId + '&activityId=' + _main.id.disabled;
        AJAXCONGIG.AjaxJsonp(_url).done(function (data) {
            document.body.className = 'no-scroll';
            ReactDOM.render(
                IsPc.init() ?
                    <HdDialog
                        onClose={that._onClose}
                        isOpen={true}
                        width="700"
                        marginTop="-240"
                        marginLeft="-350">
                        <MyDrawDialogView mainData={_main} data={data}/>
                    </HdDialog> :
                    <HdFullDialog
                        onClose={that._onClose}
                        isOpen={true}
                        title="我的奖品">
                        <MyDrawDialogView mainData={_main} data={data}/>
                    </HdFullDialog>,
                document.getElementById('J_drawdialogView')
            )

        }).fail(function () {
            console.log('接口服务异常')
        });
    },
    _onClose(){
        document.body.className = '';
        ReactDOM.render(<HdDialog onClose={this._onClose} isOpen={false} width="700" marginTop="-180"
                                  marginLeft="-350"></HdDialog>,
            document.getElementById('J_drawdialogView')
        )
    }
});
module.exports = MyDraw;