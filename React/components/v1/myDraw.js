/**
 * 我的奖品
 * @author Guoxing.Han(hancoson#163.com)
 * @time 2016-8-16.
 */
const React    = require('react');
const ReactDom = require('react-dom');

const AJAXCONGIG       = require('../../../../lib/outil/ajax');
const HdDialog         = require('../../../../lib/components/dialog/dialog');
const WriteInfo        = require('./write-info');
const MyDrawDialogView = React.createClass({
    getInitialState(){
        return {
            main: this.props.mainData,
            data: this.props.data
        }
    },
    render() {
        var _data=this.state.data;
        console.log(_data);
        return (
            <div className="hd-drawDialogBig">
                <div className="title">
                    <i></i><span>我的奖品</span>
                </div>
                <div className="dialog-con">
                    <div className="t-title">
                        <table>
                            <thead>
                            <tr>
                                <th width='30%'>奖品名称</th>
                                <th width='30%'>中奖时间</th>
                                <th>操作</th>
                            </tr>
                            </thead>
                        </table>
                    </div>
                    <div className="t-body">
                        <table>
                            <tbody>
                            {
                                _data.code==401?

                                    <tr>
                                        <td className="y">{CONFIG.PROMPT.loginErr}</td>
                                    </tr>:
                                _data.success?
                                _data.data.map(function (v, i) {
                                    return (
                                        <tr key={i}>
                                            <td width='30%'>{v.prizeName}</td>
                                            <td width='30%'>{v.createTime}</td>
                                            <td className="y">
                                                {
                                                    v.option==1?"已自动发奖":v.option==3?"已提交收货地址":<a href="javascript:void(0)" onClick={this._toWriteInfo.bind(this,v)}>提交收货信息 ></a>

                                                }
                                            </td>
                                        </tr>
                                    )
                                }):
                                <tr>
                                <td className="y">{_data.errorMsg}</td>
                                </tr>

                            }
                            </tbody>
                        </table>
                    </div>
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
        ReactDom.render(<HdDialog onClose={this._onClose} isOpen={true} width="700" marginTop="-250"
                                  marginLeft="-350"><WriteInfo drawData={e}
                                                               mainData={this.state.main}/></HdDialog>,
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
            window.location.href = CONFIG.URL.login;
            return;
        }
        //这边写请求
        var that=this,
            _main = this.state.main,
            _url  = CONFIG.urlPc.getMyDraw + '?appId=' + CONFIG.POSTDATA.appId + '&activityId=' + _main.id.disabled;
        AJAXCONGIG.AjaxJsonp(_url).done(function (data) {
            document.body.className = 'no-scroll';
            ReactDom.render(<HdDialog onClose={that._onClose} isOpen={true} width="700" marginTop="-240"
                                      marginLeft="-350"><MyDrawDialogView mainData={_main} data={data}/></HdDialog>,
                document.getElementById('J_drawdialogView')
            )

        }).fail(function () {
            console.log('接口服务异常')
        });
    },
    _onClose(){
        document.body.className = '';
        ReactDom.render(<HdDialog onClose={this._onClose} isOpen={false} width="700" marginTop="-180" marginLeft="-350"><MyDrawDialogView/></HdDialog>,
            document.getElementById('J_drawdialogView')
        )
    }
});
module.exports = MyDraw;