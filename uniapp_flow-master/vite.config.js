import path from 'path';
import fs from 'fs-extra';
import { defineConfig } from 'vite';
import uni from '@dcloudio/vite-plugin-uni';

//'node_modules' 'static'
function copyFile(name) {
	return {
		enforce: 'post',
		async writeBundle() {
			await fs.copy(
				path.resolve(__dirname, name),
				path.join(
					__dirname,
					'unpackage/dist',
					process.env.NODE_ENV === 'production' ? 'build' : 'dev',
					process.env.UNI_PLATFORM,
					name
				)
			);
		},
	};
}

export default defineConfig({
	plugins: [uni(), copyFile('node_modules')],
});