import { build, defineConfig } from 'vite'
import { resolve } from 'path';
import vue from '@vitejs/plugin-vue2'
import VueSetupExtend from 'vite-plugin-vue-setup-extend'
// https://vitejs.dev/config/

export default ({ mode }) => {
  const isLib = mode === 'lib'

  let basic = {
    plugins: [vue(), VueSetupExtend()],
    test: {
      environment: 'happy-dom'
    },
    resolve: {
      alias: {
        '@': '/src'
      }
    },
    build: {
      rollupOptions: {
        external: ['vue', 'element-ui']
      }
    }
  }
  const libBuild = {
    outDir: 'lib',
    lib: {
      entry: resolve(__dirname, "src/index.js"),
      name: 'cascaderTreeSelect',
      fileName: (format) => `cascader-tree-select.${format}.js`
    }
  }
  const docsBuild = {
    outDir: 'docs'
    // lib: {
    //   entry: resolve(__dirname, "index.html"),
    //   name: 'cascaderTreeExamples',
    //   fileName: (format) => `cascader-tree-examples.${format}.js`
    // }
  }
  basic = isLib ? { ...basic, build: { ...libBuild, ...basic.build } } : { ...basic, build: { ...docsBuild, ...basic.build } }
  return defineConfig(basic)

}
