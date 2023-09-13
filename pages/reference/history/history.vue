<template>
	<view>
		<view v-for="d in versions" :key="d.id" @click="detail(d)" class="title">
			{{d.title}} -- {{d.editTime}} 修改
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				versions: []
			}
		},
		methods: {
			detail(v){
				uni.navigateTo({
					url: "detail/detail?refer="+JSON.stringify(v)
				})
			}
		},
		onLoad(op) {
			this.id = op.id;
			let qurl = this.$store.state.apiBaseUrl+"/api/Reference/history/"+this.id;
			uni.requestWithCookie({
				url: qurl,
				success: (res) => {
					if(res.statusCode === 200){
						this.versions = res.data;
					}
				}
			});
			
		}
	}
</script>

<style>
  .title{
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
</style>
