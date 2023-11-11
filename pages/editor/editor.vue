<template>
	
	<view class="blank" style="width: 100%; height: 80rpx; border: 0px solid  #6c4ad1;  background-color: #ffffff; " ></view>
    <view class="text">内容编辑</view>
	
 	<view >
 		<uni-nav-bar left-icon="left" leftText="返回" rightText="确认"  backgroundColor="#f8f8f8"
 		 @clickLeft="backEvent" @clickRight="submitEvent" class="uni-navbar"></uni-nav-bar>
 	</view>
	
	
	<view class="container">
		<view class="page-body">
			<view class='wrapper'>
				<view class='toolbar' @tap="format" style="height: 120px;overflow-y: auto;">
					<view :class="formats.bold ? 'ql-active' : ''" class="iconfont icon-zitijiacu" data-name="bold"></view>
					<view :class="formats.italic ? 'ql-active' : ''" class="iconfont icon-zitixieti" data-name="italic"></view>
					<view :class="formats.underline ? 'ql-active' : ''" class="iconfont icon-zitixiahuaxian" data-name="underline"></view>
					<view :class="formats.strike ? 'ql-active' : ''" class="iconfont icon-zitishanchuxian" data-name="strike"></view>
					<!-- #ifndef MP-BAIDU -->
					<view :class="formats.align === 'left' ? 'ql-active' : ''" class="iconfont icon-zuoduiqi" data-name="align" data-value="left"></view>
					<!-- #endif -->
					<view :class="formats.align === 'center' ? 'ql-active' : ''" class="iconfont icon-juzhongduiqi" data-name="align" data-value="center"></view>
					<view :class="formats.align === 'right' ? 'ql-active' : ''" class="iconfont icon-youduiqi" data-name="align" data-value="right"></view>
					<view :class="formats.align === 'justify' ? 'ql-active' : ''" class="iconfont icon-zuoyouduiqi" data-name="align" data-value="justify"></view>
					<!-- #ifndef MP-BAIDU -->
					<view :class="formats.lineHeight ? 'ql-active' : ''" class="iconfont icon-line-height" data-name="lineHeight" data-value="2"></view>
					<view :class="formats.letterSpacing ? 'ql-active' : ''" class="iconfont icon-Character-Spacing" data-name="letterSpacing" data-value="2em"></view>
					<view :class="formats.marginTop ? 'ql-active' : ''" class="iconfont icon-722bianjiqi_duanqianju" data-name="marginTop" data-value="20px"></view>
					<view :class="formats.marginBottom ? 'ql-active' : ''" class="iconfont icon-723bianjiqi_duanhouju" data-name="marginBottom" data-value="20px"></view>
					<!-- #endif -->
					
					<view class="iconfont icon-clearedformat" @tap="removeFormat"></view>
					
					<!-- #ifndef MP-BAIDU -->
					<view :class="formats.fontFamily ? 'ql-active' : ''" class="iconfont icon-font" data-name="fontFamily" data-value="Pacifico"></view>
					<view :class="formats.fontSize === '24px' ? 'ql-active' : ''" class="iconfont icon-fontsize" data-name="fontSize" data-value="24px"></view>
					<!-- #endif -->
					<view :class="formats.color === '#0000ff' ? 'ql-active' : ''" class="iconfont icon-text_color" data-name="color" data-value="#0000ff"></view>
					<view :class="formats.backgroundColor === '#00ff00' ? 'ql-active' : ''" class="iconfont icon-fontbgcolor" data-name="backgroundColor" data-value="#00ff00"></view>
					<view class="iconfont icon-date" @tap="insertDate"></view>
					<view class="iconfont icon--checklist" data-name="list" data-value="check"></view>
					<view :class="formats.list === 'ordered' ? 'ql-active' : ''" class="iconfont icon-youxupailie" data-name="list" data-value="ordered"></view>
					<view :class="formats.list === 'bullet' ? 'ql-active' : ''" class="iconfont icon-wuxupailie" data-name="list" data-value="bullet"></view>
					
					<view class="iconfont icon-undo" @tap="undo"></view>
					<view class="iconfont icon-redo" @tap="redo"></view>
					
					<view class="iconfont icon-outdent" data-name="indent" data-value="-1"></view>
					<view class="iconfont icon-indent" data-name="indent" data-value="+1"></view>
					<view class="iconfont icon-fengexian" @tap="insertDivider"></view>
					<view class="iconfont icon-charutupian" @tap="insertImage"></view>
					<view :class="formats.header === 1 ? 'ql-active' : ''" class="iconfont icon-format-header-1" data-name="header" :data-value="1"></view>
					<view :class="formats.script === 'sub' ? 'ql-active' : ''" class="iconfont icon-zitixiabiao" data-name="script" data-value="sub"></view>
					<view :class="formats.script === 'super' ? 'ql-active' : ''" class="iconfont icon-zitishangbiao" data-name="script" data-value="super"></view>
					
					<view class="iconfont icon-shanchu" @tap="clear"></view>
					
					<view :class="formats.direction === 'rtl' ? 'ql-active' : ''" class="iconfont icon-direction-rtl" data-name="direction" data-value="rtl"></view>
				</view>
				
				<view class="editor-wrapper">
					<editor id="editor" class="ql-container" placeholder="*编写要求:任务需求、制作方法明确，步骤条理清晰。验收核对皆以任务说明与后续沟通为准..." show-img-size show-img-toolbar
						show-img-resize @statuschange="onStatusChange" :read-only="readOnly" @ready="onEditorReady" >
					</editor>
				</view>

			</view>
		</view>
	</view>
</template>

<script>
	import { StorageKeys } from "../../common/storageKeys.js";
	export default {
		data() {
			return {
				id:'',
				readOnly: false,
				formats: {},
				files:[],
			}
		},
		onLoad(options) {
			this.id = options.id;
			// console.log(this.editorCtx);
			// if(this.editorCtx){
			// 	this.editorCtx.content = this.$store.state.$currentContent;
			// }
			// #ifndef MP-BAIDU 
			uni.loadFontFace({
				family: 'Pacifico',
				source: 'url("../../static/Pacifico.ttf")'
			})
			// #endif
		},
		mounted() {
			// console.log(this.editorCtx);
			// if(this.editorCtx){
			// 	this.editorCtx.setContents(this.$store.state.$currentContent);
			// }
		},
		methods: {
			backEvent(){
				uni.navigateBack()
			},
			submitEvent(){
				this.editorCtx.getContents({
					success:(res)=>{
						console.log(res)
						//uni.setStorageSync(StorageKeys.taskContent,res.html)
						//res.dalta.ops[x].attributes.alt === "图像"
						let images = res.delta.ops.filter(item=>item.attributes&&item.attributes.alt === "图像")
						const lastFiles = this.files.filter(itemB => {
						  return images.some(itemA => itemA.attributes["data-local"] === itemB.path);
						});
						//if(file.path = res.dalta.ops[x].attributes.data-local)
						const pages = getCurrentPages();
						if (pages.length >= 2) {
							// #ifdef H5
							const newTask = pages[pages.length - 2]; // 获取页面A的实例
							// #endif
							
							// #ifdef MP-WEIXIN
							const newTask = pages[pages.length - 1]; // 获取页面A的实例
							// #endif
							newTask.$vm.updateTask(this.id, {ctx:res, files: lastFiles}); // 修改页面A的属性a1的值
						}
					}
				})
				uni.navigateBack()
			},
			readOnlyChange() {
				this.readOnly = !this.readOnly
			},
			onEditorReady() {
				// #ifdef MP-BAIDU
				this.editorCtx = requireDynamicLib('editorLib').createEditorContext('editor');
				// #endif

				// #ifdef APP-PLUS || MP-WEIXIN || H5
				uni.createSelectorQuery().select('#editor').context((res) => {
					this.editorCtx = res.context;
					this.editorCtx.setContents(this.$store.state.$currentContent);
				}).exec()
				// #endif
			},
			undo() {
				this.editorCtx.undo()
			},
			redo() {
				this.editorCtx.redo()
			},
			format(e) {
				let {
					name,
					value
				} = e.target.dataset
				if (!name) return
				// console.log('format', name, value)
				this.editorCtx.format(name, value)
			},
			onStatusChange(e) {
				const formats = e.detail
				this.formats = formats
			},
			insertDivider() {
				this.editorCtx.insertDivider({
					success: function() {
						console.log('insert divider success')
					}
				})
			},
			clear() {
				uni.showModal({
					title: '清空编辑器',
					content: '确定清空编辑器全部内容？',
					success: res => {
						if (res.confirm) {
							this.editorCtx.clear({
								success: function(res) {
									console.log("clear success")
								}
							})
						}
					}
				})
			},
			removeFormat() {
				this.editorCtx.removeFormat()
			},
			insertDate() {
				const date = new Date()
				const formatDate = `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`
				this.editorCtx.insertText({
					text: formatDate
				})
			},
			insertImage() {
				uni.chooseImage({
					count: 1,
					
					sizeType:['compressed'],
					success: (res) => {
						console.log(res)
						let file = res.tempFiles[0];//文件
						this.files.push(file)
						if(file.size>2097152){
							uni.showModal({
								content:"文件大于2Mb"
							})
						}else{
							this.editorCtx.insertImage({
								src: res.tempFilePaths[0],
								alt: '图像',
								success: function() {
									console.log('insert image success')
								}
							})
						}

					}
				})
			},
			setTaskContent() {
			  const pages = getCurrentPages();
			  if (pages.length >= 2) {
				const newTask = pages[pages.length - 2]; // 获取页面A的实例
				newTask.tasks[this.id].description = 'new value'; // 修改页面A的属性a1的值
			  }
			}
		}
	}
</script>

<style>
	@import url('./editor.css');
</style>
