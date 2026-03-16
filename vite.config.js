import { defineConfig, transformWithOxc, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

const transformJsxInJs = () => ({
  name: 'transform-jsx-in-js',
  enforce: 'pre',
  async transform(code, id) {
    if (!id.match(/.*\.js$/)) {
      return null;
    }

    return await transformWithOxc(code, id, {
      lang: 'jsx',
    });
  },
});

export default defineConfig((mode) => {
  const env = loadEnv(mode, process.cwd(), 'REACT_APP_');
  const envKeys = {};
  Object.entries(env).forEach(([key, value]) => {
    envKeys[`process.env.${key}`] = JSON.stringify(value);
  });

  return {
    plugins: [react(), transformJsxInJs()],
    define: envKeys,

    optimizeDeps: {
      rolldownOptions: {
        loader: {
          '.js': 'jsx',
        },
      },
    },
    server: {
      port: 3000,
      open: true,
    },
  };
});
