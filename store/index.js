import {
	createStore
} from "vuex";
import {
	toRaw,
	nextTick,
	markRaw
} from "vue";
import {
	StorageKeys
} from "../common/storageKeys.js";
//import { Publish } from "./publish.js"
import {
	Messages
} from "./messages.js";
import {
	References
} from "./reference.js";
import {ContentUrlCache} from './contentUrl.js';
import { FileCache } from './filecache.js'

import { baseUrl } from "../common/const.js";
import { error } from "console";

// #ifdef MP-WEIXIN
const signalR = require("../common/signalr.js");
// #endif


const store = createStore({
	state: {
		$hasLogin: false,
		$userName: "未登录",
		userid:undefined,
		introduce:"",
		useravatar: "/static/meactive.png",
		branchs: [],
		openid:"",
		currentTask: {},
		taskTypes: [],
		//未读信息
		unread: 0,
		apiBaseUrl: baseUrl, //"https://testsite:7221/api", 
		tasks: new Map(),
		workSocket: markRaw(new signalR.HubConnectionBuilder()
			.withUrl(baseUrl + "/chathub") //, { accessTokenFactory: () => this.loginToken }
			.withAutomaticReconnect()
			.configureLogging(signalR.LogLevel.Critical)
			.build()),
		messages: new Map(), //对话消息
		$currentContent: {}, //当前正在编辑的task.description
		$publishResults: [] //发布结果
	},
	mutations: {
		setCurrentTask(state, payload) {
			state.currentTask = payload;
		},
		updateBranchs(state, payload) {

			if (payload !== void 0) {
				state.branchs = toRaw(payload)
			}

		},
		updateTaskTypes(state, payload) {

			if (payload !== void 0) {
				state.taskTypes = toRaw(payload)
			}
			state.tasks.set("全部", []);
			if (typeof state.taskTypes[Symbol.iterator] === 'function') {
				for (let t of state.taskTypes) {
					state.tasks.set(t.name, []);
				}
			}

		},
		setTasks(state, payload) {

			if (payload !== void 0) {
				let t = payload.taskTypeName;
				state.tasks.set(t, payload.data);
			}

		},
		updateTasks(state, payload) {

			if (payload !== void 0) {
				let t = payload.taskTypeName;
				state.tasks.get(t).push(...payload.data);
			}
		},
		updateTaskById(state, payload) {
			let task = null;
			for (let [key, value] of state.tasks) {
				for (let item of value) {
					if (item.id === parseInt(id)) {
						task = item;
						break;
					}
				}
			}
			if (task != null) {
				let qurl = state.apiBaseUrl + "/api/Assignment/" + payload;
				uni.requestWithCookie({
					url: qurl,
					success: (res) => {
						if (res.statusCode === 200) {
							task = res.data
						}
					}
				})
			}

		},
		updateLocalTask(payload) {
			let task = null;

			for (let item of $publishs) {
				if (item.id === parseInt(payload.id)) {
					task = item;
					break;
				}
			}

			if (task != null) {
				task = payload;
			}

		},
		login(state) {

			uni.setStorageSync(StorageKeys.hasLogin, true);
			state.$hasLogin = true
		},
		loginOut(state) {
			uni.setStorageSync(StorageKeys.hasLogin, false);
			state.$hasLogin = false
		},
		setUserName(state, payload) {
			state.$userName = payload;
			uni.setStorageSync(StorageKeys.userName, payload);
		},
		setUserId(state,id){
			state.userid = parseInt(id);
		},
		setUserAvatar(state, payload) {
			state.useravatar = payload;
			uni.setStorageSync(StorageKeys.userAvatar, payload);
		},
		setIntroduce(state, payload){
			state.introduce = payload;
			uni.setStorageSync(StorageKeys.introduce, payload);
		},
		initUserInfo: (state) => {
			try {
				const userName = uni.getStorageSync(StorageKeys.userName);
				state.$userName = userName;
				const useravatar = uni.getStorageSync(StorageKeys.userAvatar);
				state.useravatar = useravatar;
			} catch (e) {
				console.error(e)
			}
		},
		//获取本地登录标记
		initHasLogin: (state) => {
			let hasLogin = false;
			try {
				hasLogin = uni.getStorageSync(StorageKeys.hasLogin);
			} catch (e) {
				hasLogin = false;
				console.error(e);
			}
			state.$hasLogin = hasLogin;
		},
		//设置正在编辑的任务中的description
		setEditContent(state, payload) {
			state.$currentContent = payload;
		},
		setPublishResults(state, payload) {
			if (payload !== void 0) {
				state.$publishResults = payload;
			}

		},
		updatePublishResults(state, payload) {

			if (typeof payload.func === 'function') {
				payload.func.call(state.$publishResults, payload.data);
			} else {
				console.error('Invalid input');
			}

		},
		clearStorageInfo(state) {
			uni.removeStorageSync(StorageKeys.hasLogin);
			uni.removeStorageSync(StorageKeys.userName);
			uni.removeStorageSync(StorageKeys.cookies);
			uni.removeStorageSync(StorageKeys.taskContent);
			uni.removeStorageSync(StorageKeys.isActive);
		},
		disconnect(state) {
			state.workSocket.stop();
		},

	},
	getters: {
		getTasks: (state) => (taskTypeName) => {
			return state.tasks.get(taskTypeName)

		},
		getTaskById: (state) => (id) => {
			let task = null;
			for (let [key, value] of state.tasks) {
				for (let item of value) {
					if (item.id === parseInt(id)) {
						task = item;
						break;
					}
				}
			}
			if (task != null) {
				return task;
			}

			return undefined;

		},
		getBranch: (state) => (branchid) => {
			let i = state.branchs.find(item => item.id === parseInt(branchid))

			if (i === undefined) {
				return "部门"
			}
			return i["name"]
		},
		//deprecated 弃用
		getTaskType: (state) => (typeId) => {
			let i = state.taskTypes.find(item => item.id === parseInt(typeId))

			if (i === undefined) {
				return {
					id: 0,
					name: "类型",
					"rewardType": "all"
				}
			}
			return i
		},
		getBranchIndex: (state) => (branchid) => {
			let i = state.branchs.findIndex(item => item.id === branchid)
			if (i === undefined) {
				return 0
			}
			return i
		},
		getMessages: (state) => (toUserId) => {
			return state.messages.get(parseInt(toUserId))
		},
		currentEditContent(state) {
			return state.$currentContent
		},
		publishResults(state) {
			return state.$publishResults
		},
		hasLogin: (state) => (p = 1) => {
			let Login;
			try {
				Login = uni.getStorageSync(StorageKeys.hasLogin);
			} catch (e) {
				Login = false;
				console.error(e);
			}
			return Login;
		},
		//是否已经通过验证
		IsActive: () => {
			let Login;
			try {
				Login = uni.getStorageSync(StorageKeys.isActive);
			} catch (e) {
				Login = false;
				console.error(e);
			}
			return Login;
		}
	},
	actions: {
		//获取部门信息
		async fetchBranchs({
			commit,
			state
		}) {
			try {
				const response = await uni.requestWithCookie({
					url: state.apiBaseUrl + "/api/Information/branchs",
					method: 'GET',
					complete() {

					},
					success: function(res) {

						let data = res.data
						commit('updateBranchs', data);

					},
					//  header:{
					// 'Access-Control-Allow-Origin': '*'
					//  }
				});

			} catch (error) {
				// uni.showModal({
				// 	content:err.errMsg
				// })
				console.error("fetch branchs error:", error);
			}

		},
		//获取任务类型信息
		async fetchTaskTypes({
			commit,
			state
		}) {
			return new Promise((resolve, reject) => {
				uni.requestWithCookie({
					url: state.apiBaseUrl + "/api/Information/customtypes",
					method: 'GET',
					complete() {

					},
					success: function(res) {

						let data = res.data;
						resolve(data);
					},
				});
			});

		},
		fetchTasks({
			commit,
			state
		}, {
			count,
			offset,
			branchid
		}) {
			return new Promise((resolve, reject) => {
				uni.requestWithCookie({
					url: state.apiBaseUrl + "/api/Assignment" + "?count=" + count + "&offset=" +
						offset + "&branchid=" + branchid,
					method: 'GET',
					success: (res) => {

						let data = res.data
						resolve(data);

					},
					fail: (err) => {
						reject(err);
					}
				});
			});
		},
		async fetchTaskById({
			commit
		}, id) {
			let qurl = state.apiBaseUrl + "/api/Assignment/" + id;
			try {
				const response = await uni.requestWithCookie({
					url: qurl,
					method: 'GET',
					success: function(res) {

						let data = res.data
						nextTick(() => {
							commit('setTasks', data);
						})

					},
				});
			} catch (error) {
				console.error("fetch tasks error:", error);
			}
		},
		async sendMsg({
			commit,
			state}, {user,message,contentType,fileName}) {
			//SendToUser为后端api处理消息的函数，位于ChatHub中
			//state.workSocket.invoke("SendMessage", [user, message]);
			await state.workSocket.invoke("SendToUser", user, message, contentType,fileName);

			let userId = parseInt(user);
			let chat = state.messages.get(userId)
			if (typeof(chat) === 'undefined') {
				state.messages.set(userId, new Array())
			}
			state.messages.get(userId).push({
				isLeft: false,
				content: message
			});

		},
		receiveMsg({commit,state,dispatch}, {user,message}) {

			state.unread += 1;
			uni.setTabBarBadge({
				index: 2,
				text: state.unread
			})


			let userId = parseInt(user);
			message.cid = userId;
			let chat = state.messages.get(userId)
			if (typeof(chat) === 'undefined') {
				state.messages.set(userId, new Array())
			}
			//接收的消息显示在左边 
			message.isLeft = true;
			state.messages.get(userId).push(message);
			dispatch('Msgs/updateAsync', message)

		},
		//对话消息
		async eachMsg({state},{message}){
			let cid = parseInt(message.to);
			if(cid==state.userid){
				cid = parseInt(message.from)
			}
			message.cid = cid;
			let chat = state.messages.get(cid)
			if (typeof(chat) === 'undefined') {
				state.messages.set(cid, new Array())
			}
			
			if(message.to==state.userId){
				message.isLeft = true;
			}
			else{
				message.isLeft = false;
			}
			state.messages.get(cid).push(message);
		},
		unreadChange({
			state
		}, count) {
			state.unread -= count;
			uni.setTabBarBadge({
				index: 2,
				text: state.unread
			})
		},
		async connect({
			state,
			actions
		}) {
			// try {
			//     await state.workSocket.start();
			//     console.log("SignalR Connected.");
			// } catch (err) {
			//     console.log(err);
			//     setTimeout(()=>{dispatch("connect");}, 5000);
			// }
			async function reconnect() {
				try {
					await state.workSocket.start();
					console.log("SignalR Connected.");
				} catch (err) {
					console.log(err);
					setTimeout(reconnect, 5000);
				}
			}

			await reconnect();
		},
		//判断是否登录
		loginTest({
			state
		}) {
			return new Promise((resolve, reject) => {
				uni.requestWithCookie({
					url: state.apiBaseUrl + "/api/Account/loginTest",
					method: "HEAD",
					success: (res) => {

						if (res.statusCode === 200) {
							resolve()
						} else {
							reject()
						}
					},
					fail: (err) => {
						reject()
					}
				});
			});
		},
		genHistory({
			state
		}, id) {
			let qurl = state.apiBaseUrl + "/api/History";
			uni.requestWithCookie({
				url: qurl,
				header:{
					"Content-Type":"application/x-www-form-urlencoded"
				},
				method:"POST",
				data: {
					asgid: id
				}, // 接口参数，json格式，底层自动转为FormData的格式数据  
				success: (res) => {
					console.log(res.statusCode);
				}
			});
		},
		getOpenid({state}){
			wx.login({
				success:(res)=>{
					if(res.code){
						uni.requestWithCookie({
							url:state.apiBaseUrl+"/api/Bill/openId?code="+res.code,
							success: (result) => {
								if(result.statusCode===200){
									state.openid = result.data
								}
							}
						})
					}

				}
			})
		},
		upload({
			state
		}, path = "upload") {
			return new Promise((resolve, reject) => {
				uni.showActionSheet({
					itemList: ["选择文件"],
					success: (e) => {

						if (e.tapIndex === 0) {
							// #ifdef H5
							uni.chooseImage({
								count: 1,
								crop: {
									with: 800,
									height: 800
								},
								success: (e) => {

									if (e.tempFiles[0].size > 5 * 1024 * 1024) {
										uni.showToast({
											title: "图片大小超过5M,请重新选择。"
										})
										return
									}
									uni.uploadFile({
										name: "user-avatar",
										filePath: e.tempFilePaths[0],
										url: state.apiBaseUrl +
											"/api/Image/" + path,
										success: (res) => {
											
											
										},
										fail: (err) => {

										},
										complete:(res)=> {
											res.filePath = e
												.tempFilePaths[0];
											resolve(res)
										}
									})
								},
								fail: (err) => {
									reject(err)
								}
							})
							// #endif
							
							// #ifdef MP-WEIXIN
							wx.chooseMessageFile({
								count:1,
								type:"image",
								success: (res) => {
									let fileinfo = res.tempFiles[0]; //文件
									if(fileinfo.size>2*1024*1024){
										uni.showToast({
											title: "图片大小超过2M,请重新选择。"
										})
										return
									}
									let fmana = wx.getFileSystemManager();
									fmana.readFile({filePath:fileinfo.path,success:(file)=>{
										fileinfo.data = file.data;
										uploadFile(fileinfo,"images/",(resl)=>{
											if(res.statusCode===200){
												let data = JSON.parse(res.data);
												let imgurl = this.$store.state.apiBaseUrl+data.url;
												this.$store.commit("setUserAvatar",imgurl);
												uni.requestWithCookie({
													url:this.$store.state.apiBaseUrl+"/api/AuthUser/setavatar?avatar="+encodeURIComponent(imgurl),
													method:"POST",
													success: () => {
														
													}
												})
											}
										});
										}});
									},
									fail:(err)=>{
										console.log(err)
									}
								});
						}
									
							// #endif

					}
				})
			})
		},

		activeValidate({
			state,
			getters
		}) {
			let isActive = getters.isActive;
			if (!isActive) {
				uni.requestWithCookie({
					url: state.apiBaseUrl + "/api/IdentityInfo/validate",
					success: (res) => {
						if (res.statusCode == 200) {
							uni.setStorage({
								key: StorageKeys.isActive,
								data: true
							});
						}
					}
				})
			}
		}

	},
	modules: {
		Msgs: Messages,
		Refer: References,
		UrlCache:ContentUrlCache,
		FileCache:FileCache
	}
})

export default store