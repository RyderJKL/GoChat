/**
 * Created by onejustone on 2017/3/2.
 */


angular.module('goChat')
.directive('ctrlEnterBreakLine', function () {
	// 自定义指令，使用 ctrl+Enter 换行，Enter 发送消息(即调用
	// createMessage 方法)
	return {
		link: function (scope, element, attrs) {
			let ctrlDown = false;
			console.log("fuck")
			element.bind('keydown', function (event) {
				if (event.which === 17) {
					ctrlDown = true;
					setTimeout(function () {
						ctrlDown = false;
					}, 1000);
				}

				if (event.which === 13) {
					if (ctrlDown) {
						element.val(element.val() + '\n');
					} else {
						scope.$apply(function () {
							scope.$eval(attrs.ctrlEnterBreakLine);
						});
						event.preventDefault();
					}
				}
			});
		}
	}

});
