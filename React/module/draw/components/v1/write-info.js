/**
 * 填写信息
 * @author Guoxing.Han(hancoson#163.com)
 * @time 2016-8-17.
 */
const IsPc         = require('../../../../lib/outil/isPc');
const AJAXCONGIG   = require('../../../../lib/outil/ajax');
const HdDialog     = require('../../../../lib/components/dialog/dialog');
const Message      = require('../../../../lib/components/popmsg/popmsg');
const HdFullDialog = require('../../../../lib/components/dialog/full-dialog');
const Result       = require('./result');

const popmsg    = new Message()
const PARAMETER = {
    p      : '',
    c      : '',
    a      : '',
    s      : '',
    name   : '',
    tel    : '',
    address: ''//地址
};
const WriteInfo = React.createClass({
    getInitialState(){
        return {
            isOpen    : this.props.isOpen,
            main      : this.props.mainData,
            drawData  : this.props.drawData,
            loginInfo : MeiCookie.cookie(/MzmApp/.test(navigator.userAgent) ? "MZ_APP_USER_INFO" : "MZ_ALAD_USER_INFO") || false,
            p_value   : [],//省
            c_value   : [],//市
            a_value   : [],//区
            s_value   : [],//街道
            nameErr   : false,
            telErr    : false,
            addressErr: false,
            _n        : 0,//name状态
            _t        : 0,//tel状态
            _a        : 0//address状态
        }
    },
    componentWillReceiveProps(nextProps){
        this.setState({
            main      : nextProps.main,
            drawData  : nextProps.drawData,
            p_value   : nextProps.p_value,
            c_value   : nextProps.c_value,
            a_value   : nextProps.a_value,
            s_value   : nextProps.s_value,
            nameErr   : nextProps.nameErr,
            telErr    : nextProps.telErr,
            addressErr: nextProps.addressErr
        });
    },
    render(){
        //type: 1,#奖品类型    0未中奖奖品、1实物奖品、2优惠券、3红包、4 M码
        const _draw   = this.state.drawData,
              _active = this.state._n == 1 && this.state._t == 1 && this.state._a == 1 ? true : false;
        console.log(_draw);
        return (
            <div className="hd-drawDialogBig">
                {

                }
                <div className="title">
                    <i className="d"></i>填写您的收货信息
                </div>
                <ul className="dialog-con address">
                    <li className="item">
                        <span className="name"><em>*</em>收件人姓名</span>
                        <input type="text" name="name" placeholder="请输入收件人姓名" maxLength="20" onChange={this._getInfo}
                               id="J_name"/>
                        <p style={{display: this.state.nameErr ? "block" : "none"}}><i></i>{CONFIG.PROMPT.errName}</p>
                    </li>
                    <li className="item">
                        <span className="name"><em>*</em>手机号码</span>
                        <input type="text" name="tel" placeholder="请输入手机号码" maxLength="11" onChange={this._getInfo}
                               id="J_tel"/>
                        <p style={{display: this.state.telErr ? "block" : "none"}}><i></i>{CONFIG.PROMPT.errTel}</p>
                    </li>
                    <li className="item last-i">
                        <span className="name"><em>*</em>收货地址</span>
                        <select accessKey={1} onChange={this._select}
                                style={{color: this.state.p_value.length > 0 ? '' : '#999'}}>
                            <option value={0}>省</option>
                            {
                                this.state.p_value.length > 0 ?
                                    this.state.p_value.map(function (v, i) {
                                        return (
                                            <option value={[v.id, v.name]} key={i}>{v.name}</option>
                                        )
                                    }) : <option value={0}>省</option>
                            }
                        </select>
                        <select accessKey={2} onChange={this._select}
                                style={{color: this.state.c_value.length > 0 ? '' : '#999'}}>
                            <option value={0}>城市</option>
                            {
                                this.state.c_value.length > 0 ?
                                    this.state.c_value.map(function (v, i) {
                                        return (
                                            <option value={[v.id, v.name]} key={i}>{v.name}</option>
                                        )
                                    }) : <option value={0}>城市</option>
                            }
                        </select>
                        <select accessKey={3} onChange={this._select}
                                style={{color: this.state.a_value.length > 0 ? '' : '#999'}}>
                            <option value={0}>区 / 县</option>
                            {
                                this.state.a_value.length > 0 ?
                                    this.state.a_value.map(function (v, i) {
                                        return (
                                            <option value={[v.id, v.name]} key={i}>{v.name}</option>
                                        )
                                    }) : <option value={0}>区 / 县</option>
                            }
                        </select>
                        <select accessKey={4} onChange={this._select} className="last"
                                style={{color: this.state.s_value.length > 0 ? '' : '#999'}}>
                            <option value={0}>乡镇 / 街道</option>
                            {
                                this.state.s_value.length > 0 ?
                                    this.state.s_value.map(function (v, i) {
                                        return (
                                            <option value={[v.id, v.name]} key={i}>{v.name}</option>
                                        )
                                    }) : <option value={0}>乡镇 / 街道</option>
                            }
                        </select>
                        <div className="all-addr">
                            <input type="hidden" id="J_address"/>
                            <div className="addr" id="J_addressTitle"></div>
                            <input type="text" id="J_addressDetail" name="address" maxLength="100"
                                   onChange={this._getInfo} placeholder="请输入详细地址"/>
                        </div>
                        <p style={{display: this.state.addressErr ? "block" : "none"}}><i></i>{CONFIG.PROMPT.errAddress}
                        </p>
                    </li>
                    {}
                    <li className="item last-i m-submit-btn">
                        <button type="button" className={classname("btn submit", {"active": _active})}
                                onClick={this._submit}>提 交
                        </button>
                    </li>

                </ul>
            </div>
        )
    },
    componentWillMount(){
    },
    componentDidMount(){
        //默认获取省
        this._area(0);
    },

    _area(code){
        const that = this,
              _url = CONFIG.urlPc.getArea + code;
        AJAXCONGIG.AjaxJsonp(_url).done(function (data) {
            if (data.success) {
                if (data.data[0].level == 1) {
                    PARAMETER.p = data.data.name;
                    that.setState({
                        p_value: data.data
                    })
                }
                else if (data.data[0].level == 2) {
                    that.setState({
                        c_value: data.data
                    })
                }
                else if (data.data[0].level == 3) {
                    that.setState({
                        a_value: data.data
                    })
                }
                else if (data.data[0].level == 4) {
                    that.setState({
                        s_value: data.data
                    })
                }
            }

        }).fail(function () {
            console.log(CONFIG.PROMPT.netErr)
        })
    },

    /**
     * 选择省、市、区、街道
     * @param e
     * @private
     */
    _select(e){
        const _arr  = e.target.value.split(","),
              _code = parseInt(_arr[0]),
              _val  = _arr[1];

        if (e.target.accessKey == 1) {//省
            if (_code != 0) {
                this._area(_code);
            }
            this.setState({
                c_value: [],
                a_value: [],
                s_value: []
            })
            PARAMETER.p = _val;
            PARAMETER.c = '';
            PARAMETER.a = '';
            PARAMETER.s = '';
        }
        else if (e.target.accessKey == 2) {//市
            if (_code != 0) {
                this._area(_code);
            }
            this.setState({
                a_value: [],
                s_value: []
            })
            PARAMETER.c = _val;
            PARAMETER.a = '';
            PARAMETER.s = '';
        }
        else if (e.target.accessKey == 3) {//区
            if (_code != 0) {
                this._area(_code);
            }
            this.setState({
                s_value: []
            })
            PARAMETER.a = _val;
            PARAMETER.s = '';
        }
        else if (e.target.accessKey == 4) {//街道
            PARAMETER.s = _val;
            if (IsPc.init()) {
                document.getElementById('J_addressTitle').innerHTML    = PARAMETER.p + PARAMETER.c + PARAMETER.a + PARAMETER.s;
                let _width                                             = document.getElementById("J_addressTitle").clientWidth + 5;
                document.getElementById('J_addressDetail').style.width = (542 - _width) + 'px';
                document.getElementById('J_address').value             = PARAMETER.p + PARAMETER.c + PARAMETER.a + PARAMETER.s + document.getElementById('J_addressDetail').value;
            }
            else {
                document.getElementById('J_address').value = PARAMETER.p + PARAMETER.c + PARAMETER.a + PARAMETER.s + document.getElementById('J_addressDetail').value;
            }

        }
    },
    /**
     * 提交数据
     * @private
     */
    _submit(){
        if (this.state._n != 1 || this.state._t != 1 || this.state._a != 1) {
            return;
        }
        const _name     = document.getElementById('J_name').value,
              _tel      = document.getElementById('J_tel').value,
              _addTitle = document.getElementById('J_address').value,
              _detail   = document.getElementById('J_addressDetail').value;
        if (!CONFIG.REP.name.test(_name) || _name == '') {
            !IsPc.init() ?
                popmsg.open(CONFIG.PROMPT.errName) :
                this.setState({
                    nameErr: true
                })
            return;
        }
        if (!CONFIG.REP.phone.test(_tel)) {
            !IsPc.init() ?
                popmsg.open(CONFIG.PROMPT.errTel) :
                this.setState({
                    telErr: true
                })
            return;
        }
        if (!CONFIG.REP.address.test(_addTitle) || !CONFIG.REP.address.test(_detail)) {
            !IsPc.init() ?
                popmsg.open(CONFIG.PROMPT.errAddress) :
                this.setState({
                    addressErr: true
                })
            return;
        }
        else {
            const that       = this,
                  _draw      = this.state.drawData,
                  _url       = IsPc.init() ? CONFIG.urlPc.pullInfo : CONFIG.urlM.pullInfo,
                  _loginInfo = JSON.parse(this.state.loginInfo),
                  _data      = {
                      "appId"       : CONFIG.POSTDATA.appId,
                      "token"       : _draw.token,
                      //"activityId"  : _draw.activityId,
                      "activityId"  : that.props.mainData.id.disabled,
                      "address"     : _addTitle + _detail,
                      "prizeNo"     : _draw.id,
                      "addressName" : _name,
                      "addressPhone": _tel,
                      "userId"      : _loginInfo.uid,
                      "id"          : _draw.uniqId
                  };
            AJAXCONGIG.AjaxData(_url, _data).done(function (data) {
                //信息提交成功
                document.body.className = 'no-scroll';

                !IsPc.init()?document.getElementsByTagName('BODY')[0].scrollTop=0:'';
                ReactDOM.render(
                    IsPc.init() ?
                        <HdDialog
                            onClose={that._onClose}
                            isOpen={true}
                            width="700"
                            marginTop="-250"
                            marginLeft="-350"
                            conBackground="#fff">
                            <Result mainData={that.props.mainData} drawData={_draw} result={data}/>
                        </HdDialog> :
                        <HdFullDialog
                            onClose={that._onClose}
                            isOpen={true}
                            title="填写您的收货信息">
                            <Result mainData={that.props.mainData} drawData={_draw} result={data}/>
                        </HdFullDialog>,
                    document.getElementById('J_drawdialogView')
                )

            }).fail(function () {
                popmsg.open('操作失败，请稍后再试试~');
            })
        }

    },
    /**
     * 获取提交数据
     * @param e
     * @private
     */
    _getInfo(e){
        if (e.target.name == 'name') {
            PARAMETER.name = e.target.value;
            this.setState({
                nameErr: false,
                _n     : e.target.value != '' ? 1 : 0
            })
        }
        else if (e.target.name == 'tel') {
            PARAMETER.tel = e.target.value;
            this.setState({
                telErr: false,
                _t    : e.target.value != '' ? 1 : 0
            })
        }
        else if (e.target.name == 'address') {
            PARAMETER.address = PARAMETER.p + PARAMETER.c + PARAMETER.a + PARAMETER.s + e.target.value;
            this.setState({
                addressErr: false,
                _a        : e.target.value != '' ? 1 : 0
            })
        }
    },
    /**
     * 关闭弹窗
     * @private
     */
    _onClose(){
        document.body.className = '';
        ReactDOM.render(<HdDialog onClose={this._onClose} isOpen={false}></HdDialog>,
            document.getElementById('J_drawdialogView')
        )
    }
});
module.exports  = WriteInfo;
