/**
 * Created by onejustone on 2017/3/2.
 */


angular.module('goChat')
.directive('autoScrollToBottom', function () {
	// 自定义指令，当消息过多，出现滚动条时，该组件可以使得滚动条能随着消息的增加自动滑动到底部
	return {
		link: function (scope, element, attrs) {
			scope.$watch(function () {
				return element.children().length;
			}, function () {
				element.animate({
					scrollTop: element.prop('scrollHeight')
				}, 1000);
			})
		},
	}
});