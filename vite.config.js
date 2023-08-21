import { defineConfig } from 'vite'
import { resolve } from 'path';
import vue from '@vitejs/plugin-vue2'
import VueSetupExtend from 'vite-plugin-vue-setup-extend'
// https://vitejs.dev/config/

export default ({ mode }) => {
  console.log(mode, 'mode')
  const isLib = mode === 'lib'

  const basic = {
    plugins: [vue(), VueSetupExtend()],
    test: {
      environment: 'happy-dom'
    },
    resolve: {
      alias: {
        '@': '/src'
      }
    },

  }

  if (isLib) Object.assign(basic, {
    build: {
      outDir: 'lib',
      lib: {
        entry: resolve(__dirname, "src/index.js"),
        name: 'cascaderTreeSelect',
        fileName: (format) => `cascader-tree-select.${format}.js`
      },
      rollupOptions: {
        external: ['vue', 'element-ui']
      }
    }
  })

  return defineConfig(basic)

}
