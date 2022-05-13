import baseurl from './config.js';
// 全局请求封装
export default (url, method, params) => {
	const token = uni.getStorageSync('token');
	// 处理 token 不存在时的逻辑
	// ...

	// 显示加载
	uni.showLoading({
		title: "加载中"
	});
	uni.showNavigationBarLoading();

	return new Promise((resolve, reject) => {
		// 发起请求
		uni.request({
			url: baseurl + url,
			method: method,
			header: {
				'content-type': 'application/json',
				'Access-Token': token
			},
			data: {
				...params
			},
			success(res) {
				const { 解构出想要的数据 } = res.data;
				// 可以统一处理后端返回的错误码，例如 token 过期等
				// ...

				// 无错误码，resolve成功的数据
				resolve(res.data);
			},
			fail(err) {
				if (err.errMsg.indexOf('timeout') > -1) reject({ errMsg: '请求超时！' })
				else if (err.errMsg.indexOf('request:fail') > -1) reject({ errMsg: '网络异常！' })
				else reject(err)
			},
			complete() {
				// 加载状态 -- 隐藏
				uni.hideLoading();
				uni.hideNavigationBarLoading();
			}
		});
	});
};