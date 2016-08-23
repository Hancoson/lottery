/**
 * 彩灯
 * @author Guoxing.Han(hancoson#163.com)
 * @time 2016-8-11.
 */
const React = require('react');

const BorderLight = React.createClass({

    render(){
        return (
            <div>
                <div className="border-light top">
                    <i className="odd across"></i>
                    <i className="even across"></i>
                    <i className="odd across"></i>
                    <i className="even across"></i>
                    <i className="odd across last"></i>
                </div>
                <div className="border-light right">
                    <i className="even vertical"></i>
                    <i className="odd vertical"></i>
                </div>
                <div className="border-light bottom">
                    <i className="even across"></i>
                    <i className="odd across"></i>
                    <i className="even across"></i>
                    <i className="odd across"></i>
                    <i className="even across last"></i>
                </div>
                <div className="border-light left">
                    <i className="even vertical"></i>
                    <i className="odd vertical"></i>
                </div>
            </div>
        )
    }
});
module.exports    = BorderLight;
