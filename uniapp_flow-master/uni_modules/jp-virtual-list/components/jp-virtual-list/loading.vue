<template>
	<div class="template">
		<view class="cartoon" >
			 <span class="char">拼</span>
			 <span class="char">命</span>
			 <span class="char">加</span>
			 <span class="char">载</span>
			 <span class="char">中</span>
			 <span class="char">.</span>
			 <span class="char">.</span>
			 <span class="char">.</span>
		</view>
	</div>
</template>

<style lang="scss" scoped>
	.cartoon{
		.char {
		  display: inline-block;
		   transform: translateY(8px);
		   width: 20px;
		   height: 20px;
		   border-radius: 3px;
		   animation: bounce 0.5s infinite alternate;
		}
		.char:nth-child(2) {
		  animation-delay: 0.1s;
		}
		
		.char:nth-child(3) {
		  animation-delay: 0.2s;
		}
		
		.char:nth-child(4) {
		  animation-delay: 0.3s;
		}
		
		.char:nth-child(5) {
		  animation-delay: 0.4s;
		}
		
		.char:nth-child(6) {
		  animation-delay: 0.5s;
		}
		
		.char:nth-child(7) {
		  animation-delay: 0.6s;
		}
		
		.char:nth-child(8) {
		  animation-delay: 0.7s;
		}
		
		@keyframes bounce {
		  0% {
		    transform: translateY(8px);
			border-radius: 5px;
		  }
		  100% {
		    transform: translateY(-8px);
			border-radius: 3px;
		  }
		}
	}
	
	
	.template {
		padding: 20px;
		text-align: center;

		.loader {
			margin: 25px;
		}
	}

</style>