/**
 *  规则
 * @author Guoxing.Han(hancoson#163.com)
 * @time 2016-8-21.
 */

const IsPc         = require('../../../../lib/outil/isPc');
const HdDialog     = require('../../../../lib/components/dialog/dialog');
const HdFullDialog = require('../../../../lib/components/dialog/full-dialog');

const RegulationView = React.createClass({
    getInitialState(){
        return {
            main: this.props.mainData
        }
    },
    createMarkup() {
        const _fonts = this.state.main.regulation.textarea;
        return {__html: _fonts};
    },
    render() {
        return (
            <div className="hd-drawDialogBig">
                {
                    IsPc.init() ?
                        <div className="title">
                            <span>抽奖规则</span>
                        </div> : ''
                }

                <div className="dialog-con">
                    <div className="myList regulation" dangerouslySetInnerHTML={this.createMarkup()}></div>
                </div>
            </div>
        )
    },
    /**
     * 关闭弹窗
     * @private
     */
    _onClose(){
        document.body.className = '';
        ReactDOM.render(<HdDialog onClose={this._onClose} sOpen={false}><RegulationView/></HdDialog>,
            document.getElementById('J_drawdialogView')
        )
    }
});
const DrawRegulation = React.createClass({
    getInitialState(){
        return {
            main     : this.props.mainData,
            loginInfo: MeiCookie.cookie(/MzmApp/.test(navigator.userAgent) ? "MZ_APP_USER_INFO" : "MZ_ALAD_USER_INFO") || false
        }
    },
    render() {
        return (
            <button onClick={this._onOpen}>抽奖规则</button>
        )
    },
    _onOpen(){
        document.body.className = 'no-scroll';
        !IsPc.init() ? document.getElementsByTagName('BODY')[0].scrollTop = 0 : '';

        ReactDOM.render(
            IsPc.init() ?
                <HdDialog
                    onClose={this._onClose}
                    isOpen={true}
                    width="700"
                    marginTop="-240"
                    marginLeft="-350">
                    <RegulationView mainData={this.state.main}/>
                </HdDialog> :
                <HdFullDialog
                    onClose={this._onClose}
                    isOpen={true}
                    title="抽奖规则">
                    <RegulationView mainData={this.state.main}/>
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
module.exports       = DrawRegulation;