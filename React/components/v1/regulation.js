/**
 *  规则
 * @author Guoxing.Han(hancoson#163.com)
 * @time 2016-8-21.
 */
const React    = require('react');
const ReactDom = require('react-dom');

const HdDialog = require('../../../../lib/components/dialog/dialog');
const RegulationView = React.createClass({
    getInitialState(){
        return {
            main      : this.props.mainData
        }
    },
    createMarkup() {
        const _fonts = this.state.main.regulation.text;
        return {__html: _fonts};
    },
    render() {
        return (
            <div className="hd-drawDialogBig">
                <div className="title">
                    <span>抽奖规则</span>
                </div>
                <div className="dialog-con">
                    <div className="t-body regulation" dangerouslySetInnerHTML={this.createMarkup()}></div>
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
        ReactDom.render(<HdDialog onClose={this._onClose} sOpen={false}><RegulationView/></HdDialog>,
            document.getElementById('J_drawdialogView')
        )
    }
});
const DrawRegulation   = React.createClass({
    getInitialState(){
        return {
            main      : this.props.mainData,
            loginInfo: MeiCookie.cookie("MZ_ALAD_USER_INFO") || false
        }
    },
    render() {
        return (
            <button onClick={this._onOpen}>抽奖规则</button>
        )
    },
    _onOpen(){
        document.body.className = 'no-scroll';
        ReactDom.render(<HdDialog onClose={this._onClose} isOpen={true} width="700" marginTop="-240"
                                  marginLeft="-350"><RegulationView mainData={this.state.main}/></HdDialog>,
            document.getElementById('J_drawdialogView')
        )
    },
    _onClose(){
        document.body.className = '';
        ReactDom.render(<HdDialog onClose={this._onClose} isOpen={false} width="700" marginTop="-180" marginLeft="-350"><RegulationView/></HdDialog>,
            document.getElementById('J_drawdialogView')
        )
    }
});
module.exports = DrawRegulation;