/**
 *
 * @author Guoxing.Han(hancoson#163.com)
 * @time 2016-8-11.
 */
var className = require('classname');

const HdDialog = React.createClass({
    getDefaultProps(){
        return {
            className: '',
            conBackground : '#f8465b',
            marginTop : 0,
            marginLeft:'-235',
            width:470
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
                            <div className={className("hd-dialog",this.props.className)} style={{ marginTop : this.props.marginTop,marginLeft : this.props.marginLeft,width:this.props.width }}>
                                <div className="hd-dialog-con clearfix" style={{ backgroundColor : this.props.conBackground }}>
                                    <a href="javascript:void(0)" className="close" onClick={this.handleClose}>╳</a>
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
module.exports = HdDialog;