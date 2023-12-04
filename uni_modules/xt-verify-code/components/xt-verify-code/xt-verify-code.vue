<template>
	<!-- #ifdef VUE2 -->
	<view class="xt__verify-code">
		<!-- 输入框 -->
		<input id="xt__input" :value="code" class="xt__input" :focus="isFocus" :type="inputType" :maxlength="itemSize" @input="onInput" @focus="inputFocus" @blur="inputBlur" />

		<!-- 光标 -->
		<view
			id="xt__cursor"
			v-if="cursorVisible && type !== 'middle'"
			class="xt__cursor"
			:style="{ left: codeCursorLeft[code.length] + 'px', height: cursorHeight + 'px', backgroundColor: cursorColor }"
		></view>

		<!-- 输入框 - 组 -->
		<view id="xt__input-ground" class="xt__input-ground">
			<view
				v-for="(item, index) in itemSize"
				:key="index"
				:style="{ borderColor: code.length === index && cursorVisible ? boxActiveColor : boxNormalColor }"
				:class="['xt__box', `xt__box-${type + ''}`, `xt__box::after`]"
			>
				<view :style="{ borderColor: boxActiveColor }" class="xt__middle-line" v-if="type === 'middle' && !code[index]"></view>

				<text :style="{ color: color }" class="xt__code-text">{{ code[index] | codeFormat(isPassword) }}</text>
			</view>
		</view>
	</view>
	<!-- #endif -->

	<!-- #ifdef VUE3 -->
	<view class="xt__verify-code">
		<!-- 输入框 -->
		<input
			id="xt__input"
			:value="code"
			class="xt__input"
			:focus="props.isFocus"
			:type="props.inputType"
			:maxlength="itemSize"
			@input="onInput"
			@focus="inputFocus"
			@blur="inputBlur"
		/>

		<!-- 光标 -->
		<view
			id="xt__cursor"
			v-if="cursorVisible && props.type !== 'middle'"
			class="xt__cursor"
			:style="{ left: codeCursorLeft[code.length] + 'px', height: cursorHeight + 'px', backgroundColor: props.cursorColor }"
		></view>

		<!-- 输入框 - 组 -->
		<view id="xt__input-ground" class="xt__input-ground">
			<view
				v-for="(item, index) in itemSize"
				:key="index"
				:style="{ borderColor: code.length === index && cursorVisible ? props.boxActiveColor : props.boxNormalColor }"
				:class="['xt__box', `xt__box-${props.type + ''}`, `xt__box::after`]"
			>
				<view :style="{ borderColor: props.boxActiveColor }" class="xt__middle-line" v-if="props.type === 'middle' && !code[index]"></view>
				<text :style="{ color: props.color }" class="xt__code-text">{{ codeFormat(code[index], props.isPassword) }}</text>
			</view>
		</view>
	</view>
	<!-- #endif -->
</template>

<!-- #ifdef VUE3 -->
<script setup>
/**
 * @description 输入验证码组件
 * @property {string} type = [box|middle|bottom] - 显示类型 默认：box -eg:bottom
 * @property {string} inputType = [text|number] - 输入框类型 默认：number -eg:number
 * @property {number} size - 验证码输入框数量 默认：6 -eg:6
 * @property {boolean} isFocus - 是否立即聚焦 默认：true
 * @property {boolean} isPassword - 是否以密码形式显示 默认false -eg: false
 * @property {string} cursorColor - 光标颜色 默认：#cccccc
 * @property {string} boxNormalColor - 光标未聚焦到的框的颜色 默认：#cccccc
 * @property {string} boxActiveColor - 光标聚焦到的框的颜色 默认：#000000
 * @property {string} color - 光标聚焦到的框的颜色 默认：#333333
 * @event {Function(data)} confirm - 输入完成回调函数
 */
import { defineProps, onMounted, ref, getCurrentInstance, watch } from 'vue';
import { propsMap } from './config.js';
import { getElementRect } from './util.js';

const props = defineProps(propsMap);
const emits = defineEmits(['update:modelValue', 'confirm']);

// 获取当前组件的实例
const currentInstance = getCurrentInstance();

const getElement = getElementRect(currentInstance);

const cursorVisible = ref(false);
const cursorHeight = ref(35);
const code = ref(''); // 输入的验证码
const codeCursorLeft = ref([]); // 向左移动的距离数组,
const itemSize = ref(6);
const isPatch = ref(false);

/**
 * 设置验证码框数量
 */
function validatorSize() {
	if (props.size > 0) {
		itemSize.value = Math.floor(props.size);
	} else {
		throw "methods of 'size' is integer";
	}
}
/**
 * @description 初始化
 */
function init() {
	getCodeCursorLeft();
	setCursorHeight();
}

/**
 * @description 计算光标的高度
 */
function setCursorHeight() {
	getElement('.xt__box', 'single', boxElm => {
		cursorHeight.value = boxElm.height * 0.6;
	});
}
/**
 * @description 获取光标在每一个box的left位置
 */
function getCodeCursorLeft() {
	// 获取父级框的位置信息
	getElement('#xt__input-ground', 'single', parentElm => {
		const parentLeft = parentElm.left;
		// 获取各个box信息
		getElement('.xt__box', 'array', elms => {
			codeCursorLeft.value = [];
			elms.forEach(elm => {
				codeCursorLeft.value.push(elm.left - parentLeft + elm.width / 2);
			});
		});
	});
}

// 输入框输入变化的回调
function onInput(e) {
	let { value, keyCode } = e.detail;
	cursorVisible.value = value.length < itemSize.value;
	code.value = value;
	emits('update:modelValue', value);
	inputSuccess(value);
}

// 输入完成回调
function inputSuccess(value) {
	if (value.length === itemSize.value && !isPatch.value) {
		isPatch.value = true;
		emits('confirm', value);
	} else {
		isPatch.value = false;
	}
}
// 输入聚焦
function inputFocus() {
	cursorVisible.value = code.value.length < itemSize.value;
}
// 输入失去焦点
function inputBlur() {
	cursorVisible.value = false;
}

// 判断文本如何显示
function codeFormat(val, isPassword) {
	return val ? (isPassword ? '*' : val) : '';
}

onMounted(() => {
	cursorVisible.value = props.isFocus;
	validatorSize();
	init();
});

watch(
	() => props.modelValue,
	val => {
		if (val !== code.value) {
			code.value = val;
		}
	}
);
</script>
<!-- #endif -->

<!-- #ifdef VUE2 -->
<script>
/**
 * @description 输入验证码组件
 * @property {string} type = [box|middle|bottom] - 显示类型 默认：box -eg:bottom
 * @property {string} inputType = [text|number] - 输入框类型 默认：number -eg:number
 * @property {number} size - 验证码输入框数量 默认：6 -eg:6
 * @property {boolean} isFocus - 是否立即聚焦 默认：true
 * @property {boolean} isPassword - 是否以密码形式显示 默认false -eg: false
 * @property {string} cursorColor - 光标颜色 默认：#cccccc
 * @property {string} boxNormalColor - 光标未聚焦到的框的颜色 默认：#cccccc
 * @property {string} boxActiveColor - 光标聚焦到的框的颜色 默认：#000000
 * @property {string} color - 光标聚焦到的框的颜色 默认：#333333
 * @event {Function(data)} confirm - 输入完成回调函数
 */
import { propsMap } from './config.js';
import { getElementRect } from './util.js';
export default {
	name: 'xt-verify-code',
	props: propsMap,
	model: {
		prop: 'value',
		event: 'input'
	},
	data() {
		return {
			cursorVisible: false,
			cursorHeight: 35,
			code: '', // 输入的验证码
			codeCursorLeft: [], // 向左移动的距离数组,
			itemSize: 6,
			getElement: getElementRect(this),
			isPatch: false
		};
	},
	created() {
		this.cursorVisible = this.isFocus;
		this.validatorSize();
	},
	mounted() {
		this.init();
	},
	methods: {
		/**
		 * 设置验证码框数量
		 */
		validatorSize() {
			if (this.size > 0) {
				this.itemSize = Math.floor(this.size);
			} else {
				throw "methods of 'size' is integer";
			}
		},
		/**
		 * @description 初始化
		 */
		init() {
			this.getCodeCursorLeft();
			this.setCursorHeight();
		},
		/**
		 * @description 计算光标的高度
		 */
		setCursorHeight() {
			this.getElement('.xt__box', 'single', boxElm => {
				this.cursorHeight = boxElm.height * 0.6;
			});
		},
		/**
		 * @description 获取光标在每一个box的left位置
		 */
		getCodeCursorLeft() {
			// 获取父级框的位置信息
			this.getElement('#xt__input-ground', 'single', parentElm => {
				const parentLeft = parentElm.left;
				// 获取各个box信息
				this.getElement('.xt__box', 'array', elms => {
					this.codeCursorLeft = [];
					elms.forEach(elm => {
						this.codeCursorLeft.push(elm.left - parentLeft + elm.width / 2);
					});
				});
			});
		},

		// 输入框输入变化的回调
		onInput(e) {
			let { value, keyCode } = e.detail;
			this.cursorVisible = value.length < this.itemSize;
			this.code = value;
			this.$emit('input', value);
			this.inputSuccess(value);
		},

		// 输入完成回调
		inputSuccess(value) {
			if (value.length === this.itemSize && !this.isPatch) {
				this.$emit('confirm', value);
			} else {
				this.isPatch = false;
			}
		},
		// 输入聚焦
		inputFocus() {
			this.cursorVisible = this.code.length < this.itemSize;
		},
		// 输入失去焦点
		inputBlur() {
			this.cursorVisible = false;
		}
	},
	watch: {
		value(val) {
			if (val !== this.code) {
				this.code = val;
			}
		}
	},
	filters: {
		codeFormat(val, isPassword) {
			return val ? (isPassword ? '*' : val) : '';
		}
	}
};
</script>
<!-- #endif -->

<style scoped>
.xt__verify-code {
	position: relative;
	width: 100%;
	box-sizing: border-box;
}

.xt__verify-code .xt__input {
	height: 100%;
	width: 200vw;
	position: absolute;
	left: -100vw;
	z-index: 1;
	color: transparent;
	caret-color: transparent;
	background-color: rgba(0, 0, 0, 0);
}
.xt__verify-code .xt__cursor {
	position: absolute;
	top: 50%;
	transform: translateY(-50%);
	display: inline-block;
	width: 2px;
	animation-name: xt__cursor;
	animation-duration: 0.8s;
	animation-iteration-count: infinite;
	z-index: 1;
}

.xt__verify-code .xt__input-ground {
	display: flex;
	justify-content: space-between;
	align-items: center;
	width: 100%;
	box-sizing: border-box;
}

.xt__verify-code .xt__input-ground .xt__box {
	position: relative;
	display: inline-block;
	width: 100rpx;
	height: 140rpx;
}

.xt__verify-code .xt__input-ground .xt__box-bottom {
	border-bottom-width: 2px;
	border-bottom-style: solid;
}

.xt__verify-code .xt__input-ground .xt__box-box {
	border-width: 2px;
	border-style: solid;
}

.xt__verify-code .xt__input-ground .xt__box-middle {
	border: none;
}

.xt__input-ground .xt__box .xt__middle-line {
	position: absolute;
	top: 50%;
	left: 50%;
	width: 50%;
	transform: translate(-50%, -50%);
	border-bottom-width: 2px;
	border-bottom-style: solid;
}

.xt__input-ground .xt__box .xt__code-text {
	position: absolute;
	top: 50%;
	left: 50%;
	font-size: 80rpx;
	transform: translate(-50%, -50%);
}

@keyframes xt__cursor {
	0% {
		opacity: 1;
	}

	100% {
		opacity: 0;
	}
}
</style>
