<template>
	<view>
		{{sd}}
	</view>
	<view>{{ws}}</view>
</template>

<script>
	import { putObject } from '../../common/ossutil.js';
	import hmac from 'js-crypto-hmac'; 
	import encodeUtf8 from 'encode-utf8'
	
	(function(global){
		global = typeof globalThis !== 'undefined' ? globalThis : global || self;
		global.hmac=hmac;
	})();

	export default {
		data() {
			return {
				sd:putObject,
				ws:""
			}
		},
		methods: {
			
		},
		onLoad() {
			hmac.compute(encodeUtf8("ad"),encodeUtf8("dasfas"),"SHA-1").then((res)=>{
				const binString = String.fromCodePoint(...res);
				this.ws=btoa(binString);
			})
		}
	}
</script>

<style>

</style>
