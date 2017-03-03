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
			element.bind('keydown', function (event) {
				if (event.which === 17) {
					// 表示按下 Ctrl 键
					ctrlDown = true;
					setTimeout(function () {
						ctrlDown = false;
						// 一秒以后恢复
					}, 1000);
				}

				if (event.which === 13) {
					// 按下回车键
					if (ctrlDown) {
						// 同时按下的 Ctrl + Enter : 换行
						element.val(element.val() + '\n');
					} else {
						// 发送消息
						scope.$apply(function () {
							// 调用 $apply
							// 方法，监视作用域，一旦该作用域中的属性发生变化，执行 createMessage() 方法
							scope.$eval(attrs.ctrlEnterBreakLine);
						});
						event.preventDefault();
					}
				}
			});
		}
	}

});
