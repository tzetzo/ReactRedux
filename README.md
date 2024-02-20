# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

`https://vitejs.dev/`
In development, unlike Webpack, VITE is build on top of Esbuild which serves our files directly to the browser without bundling them;
In production, VITE uses module bundler called Rollup which does minification

1. CMD to project folder --> npm create vite@latest my-react-app
 * choose React
 * choose JavaScript or Typescript

2. `npm install`
3. `npm run dev`
    * localhost:3000

4. create folder `/src/components`
5. create env vars https://vitejs.dev/guide/env-and-mode.html#env-variables-and-modes
	* create `.env` in root project folder
	* VITE_API_URL=http://localhost:3000  // VITE_ is required!
	* access it `import.meta.env.VITE_API_URL`  // not process.env.VITE_API_URL !!!

6. package.json - change the lint script to  "lint": "eslint . --ext js,jsx --report-unused-disable-directives --fix --max-warnings 0"
	* `npm install --save-dev eslint-config-prettier eslint-plugin-prettier`
	* add to `.eslintrc.cjs` 
	{
  		"extends": ["prettier"],
  		"plugins": ["prettier"],
  		"rules": {
    			"prettier/prettier": ["error"]
  		},
	}

7. The `public` folder is for static assets like images, fonts, and icons
8. `@types/react` and `@types/react-dom` provide `code hinting` without using TS

9. deploy to Netlify https://vitejs.dev/guide/static-deploy.html#deploying-a-static-site
	* CMD to project folder --> `npm install -g netlify-cli`
	* `ntl init`
	* `ntl deploy` (URL will be provided, like https://vite-react-js.netlify.app)
	* now, every time we push our commits to github Netlify will auto deploy!

10. `npm run lint` will auto format the code
11. `vite.config.js` can be used to setup proxy