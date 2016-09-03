/**
 * 是否为pc端或移动端
 * @author guoxing.Han
 * @time 2016/06/07
 */

const IsPc    = {
	init: () => {
		if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
			return false
		} else if (/(Android)/i.test(navigator.userAgent)) {
			return false
		} else {
			return true
		}
		;
	}
}
module.exports = IsPc