const fs = require('fs')

/** @type {import('esbuild').BuildOptions} */
const commoonOptions = {
  bundle: true,
  target: ['esnext'],
  plugins: [
    require('esbuild-plugin-less').lessLoader(),
    require('@yarnpkg/esbuild-plugin-pnp').pnpPlugin()
  ],
  loader: {
    '.png': 'dataurl',
    '.svg': 'dataurl'
  }
}

/** @type {import('esbuild').BuildOptions} */
const indexOptions = {
  entryPoints: ['./src/index.tsx'],
  ...commoonOptions
}

const pluginDir = './src/plugins'

const pluginDirs = fs.readdirSync(pluginDir)
  .filter(dir => {
    return dir !== 'datasources' && fs.statSync(`${pluginDir}/${dir}`).isDirectory()
  })
  .map(dir => `${pluginDir}/${dir}`)
  .concat(
    fs.readdirSync(`${pluginDir}/datasources`)
      .map(dir => `${pluginDir}/datasources/${dir}`)
  )

/** @type {import('esbuild').BuildOptions} */
const pluginsOptions = {
  entryPoints: pluginDirs,
  outdir: './lib/plugins',
  ...commoonOptions
}

const esbuild = require('esbuild')

Promise
  .all([
    esbuild.build({
      ...pluginsOptions,
      format: 'esm'
    }),
    esbuild.build({
      ...indexOptions,
      outfile: './lib/index.iife.js',
      format: 'iife'
    }),
    esbuild.build({
      ...indexOptions,
      outfile: './lib/index.iife.min.js',
      minify: true,
      format: 'iife'
    }),
    esbuild.build({
      ...indexOptions,
      outfile: './lib/index.mjs',
      format: 'esm'
    }),
  ])
  .catch(e => console.error(e))
