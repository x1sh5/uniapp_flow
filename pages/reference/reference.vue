<template>
	<view>
		<view class="content">
			<uni-search-bar class="uni-mt-10" radius="5" placeholder="搜索审核区间" clearButton="auto" cancelButton="none"
				@confirm="search" />

		</view>
		<view v-for="d in datas" :key="d.id" @click="detail(d.id)" class="title">
			{{d.title}}
		</view>
		<view class="addcontainer" @click="newRefer">
			<text class="add-icon icon-jiahao"></text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		computed: {
			datas() {
				return this.$store.getters["Refer/refers"]
			}
		},
		methods: {
			detail(id) {

				uni.navigateTo({
					url: "detail/detail?id=" + id
				})
			},
			newRefer(e) {
				uni.navigateTo({
					url: "new/new"
				})
			},
			search(e){
				let searchWord = e.value;
				uni.navigateTo({
					url: "/pages/searchResult/searchResult"
				
				})
			}
		},
		searchByTpe(id, name) {
			if (id === '') {
				this.currentTab = 0
			} else {
				this.currentTab = id
			}
		
			this.curBranchid = id;
			this.taskTypeName = name;
			this.updateData();
		
		},
		onLoad() {
			let curl = this.$store.state.apiBaseUrl + "/api/Reference/count";

			let qurl = this.$store.state.apiBaseUrl + "/api/Reference/gets?count=10&offset=0";

			uni.request({
				url: curl,
				success: (res) => {
					uni.requestWithCookie({
						url: qurl,
						method: "GET",
						success: (res) => {
							this.$store.commit("Refer/updateRefers", res.data);
						}
					});
				}
			})



		}
	}
</script>

<style>
	@import url('../../common/myicon.css');

	.title {
		display: flex;
		height: 40px;
		width: 80%;
		background-color: rgb(218 175 178 / 10%);
		margin-left: auto;
		margin-right: auto;
		/* align-content: center; */
		justify-content: center;
		flex-wrap: nowrap;
		align-items: center;
		margin-bottom: 5px;
	}

	.addcontainer {
		width: 200rpx;
		height: 55rpx;
		position: fixed;
		display: flex;
		
		align-items: center;
		z-index: 10;
		border-width: 100rpx;
		border-radius: 0rpx;
		box-shadow: 5px 5px 5px rgba(116, 116, 116, 0.5);
		right: 00rpx;
		bottom: 100rpx;
		
		background-color:#5500ff;
		
		margin-right: -40rpx;
		
		padding-right:10rpx;
	
	}

	/* 联系 */
	.contact {
		



		

		color: rgb(255, 255, 255);
		background-color: #4d1ae4;
		font-size: 60rpx;
		text-align: center;
		/* top: calc(150vh - 350rpx);
	   */


		margin-left: -120px;
		margin-top: 0rpx;
		box-shadow: 0ch;
		padding-left: 300rpx;
		box-shadow: 0px 5px 2px rgba(116, 116, 116, 0.5);
		background-image: -webkit-linear-gradient(0deg, #4d1ae4 0%, #886cdb 100%);
	}
	.add-icon {
		color: rgb(255, 255, 255);
		font-size: 32px;
		font-weight: 200;
		font-family: myicon;
		text-decoration: none;
		text-align: center;
	}
</style>