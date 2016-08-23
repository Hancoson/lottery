/**
 * 抽奖相关弹窗
 * @author Guoxing.Han(hancoson#163.com)
 * @time 2016-8-17.
 */
const React     = require('react');
const ReactDom  = require('react-dom');
const HdDialog  = require('../../../../lib/components/dialog/dialog');
const WriteInfo = require('./write-info');

const DrawDialog = React.createClass({
    getInitialState(){
        return {
            main    : this.props.mainData,
            isOpen  : this.props.isOpen,
            drawData: this.props.drawData
        }
    },
    createMarkup() {
        return {__html: CONFIG.PROMPT.drawDialog};
    },
    render(){
        //type: 1,#奖品类型    0未中奖奖品、1实物奖品、2优惠券、3红包、4 M码
        const _draw = this.state.drawData,
              _data = _draw.data;
        console.log(_draw);
        return (
            <div className="hd-drawDialogS">
                {
                    _draw.success ?
                        <div>
                            <div className="title">
                                <p><i></i>恭喜获得{_data.name}！</p>
                            </div>
                            <div className="con">
                                <div className="bg">
                                    <img src={_data.img}/>
                                </div>
                                <div className="links">
                                    <a href="javascript:void(0)" className="btn" onClick={this._toWriteInfo}>填写收货信息</a>
                                </div>
                            </div>
                        </div> :
                        <div>
                            {
                                _draw.errorCode == 6201 ?
                                    <div>
                                        <div className="title">
                                            {CONFIG.PROMPT.noDraw}
                                        </div>
                                        <div className="con">
                                            <div className="bg no">
                                                {
                                                    _data.img == "" ?
                                                        <img
                                                            src="http://hd.res.meizu.com/hd/custom/hd/images/xiexie.png"/> :
                                                        <img src={_data.img}/>
                                                }
                                            </div>
                                            <div className="links">
                                                <a href="javascript:void(0)" className="btn"
                                                   onClick={this._onClose}>确定</a>
                                            </div>
                                        </div>
                                    </div> :
                                    <div className="error">
                                        <i></i><p>{_draw.errorMsg}</p>
                                    </div>
                            }

                        </div>
                }

                <div className="bottom" dangerouslySetInnerHTML={this.createMarkup()}></div>
            </div>
        )
    },
    /**
     * 关闭弹窗
     * @private
     */
    _onClose(){
        document.body.className = '';
        ReactDom.render(<HdDialog onClose={this._onClose} isOpen={false}><DrawDialog/></HdDialog>,
            document.getElementById('J_drawdialogView')
        )
    },
    /**
     * 填写收货信息
     * @private
     */
    _toWriteInfo(){
        this._onClose();
        document.body.className = 'no-scroll';
        ReactDom.render(
            <HdDialog onClose={this._onClose}
                      isOpen={true}
                      width="700"
                      marginTop="-250"
                      marginLeft="-350">
                <WriteInfo drawData={this.state.drawData.data}
                           mainData={this.state.main}/>
            </HdDialog>,
            document.getElementById('J_drawdialogView')
        )
    }
});
module.exports   = DrawDialog;
