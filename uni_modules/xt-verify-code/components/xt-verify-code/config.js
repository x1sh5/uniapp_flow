export const propsMap = {
	// #ifdef VUE2
	value: {
		type: String,
		default: () => ''
	},
	// #endif
	
	// #ifdef VUE3
	modelValue: {
		type: String,
		default: () => ''
	},
	// #endif
	type: {
		type: String,
		default: () => 'box'
	},
	inputType: {
		type: String,
		default: () => 'number'
	},
	size: {
		type: Number,
		default: () => 6
	},
	isFocus: {
		type: Boolean,
		default: () => true
	},
	isPassword: {
		type: Boolean,
		default: () => false
	},
	cursorColor: {
		type: String,
		default: () => '#cccccc'
	},
	boxNormalColor: {
		type: String,
		default: () => '#cccccc'
	},
	boxActiveColor: {
		type: String,
		default: () => '#000000'
	},
	color: {
		type: String,
		default: () => '#333333'
	}
}