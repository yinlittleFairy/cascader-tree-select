import { defineConfig } from 'vite'
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
        "@": resolve(__dirname, "./src")
      }
    },
    build: {
      outDir: isLib ? 'lib' : 'docs',
      chunkSizeWarningLimit: 2000
    }
  }
  const libBuild = {
    lib: {
      entry: resolve(__dirname, "src/index.js"),
      name: 'cascaderTreeSelect',
      fileName: (format) => `cascader-tree-select.${format}.js`
    },
    rollupOptions: {
      external: ["vue", "element-ui"], // 指定外部依赖
      output: {
        // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
        globals: {
          vue: "Vue",
          "element-ui": "elementUi",
        },
      },
    }
  }
  basic = { ...basic, build: isLib ? { ...libBuild, ...basic.build } : { ...basic.build } }
  return defineConfig(basic)

}
