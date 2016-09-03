/**
 * 全屏
 * @author Guoxing.Han(hancoson#163.com)
 * @time 2016-8-11.
 */
const HdFullDialog = React.createClass({
    getDefaultProps(){
        return {
            conBackground : '#eee',
            height:document.documentElement.clientHeight
        }
    },
    componentWillReceiveProps(nextProps) {
        this.setState({
            isOpne: nextProps.isOpen
        });
    },
    handleClose(){
        this.props.onClose();
    },
    render(){

        return (
            <div>
                {
                    this.props.isOpen ?
                        <div>
                            <div className="hd-fullDialog" style={{height:this.props.height,}}>
                                <div className="hd-dialog-con clearfix" style={{ backgroundColor : this.props.conBackground }}>
                                    <div className="full-head">
                                        <a href="javascript:void(0)" className="close" onClick={this.handleClose}></a>
                                        {this.props.title}
                                    </div>
                                    {this.props.children}
                                </div>
                            </div>
                            <div className="hd-cover"></div>
                        </div>
                        : ''
                }
            </div>
        )
    }
})
module.exports = HdFullDialog;