*Psst — looking for a shareable component template? Go here --> [sveltejs/component-template](https://github.com/sveltejs/component-template)*

---

# svelte app

This is a project template for [Svelte](https://svelte.dev) apps running inside cordova apps. It lives at https://github.com/syonip/svelte-cordova.

To create a new project based on this template using [degit](https://github.com/Rich-Harris/degit):

```bash
npx degit syonip/svelte-cordova svelte-cordova-app
cd svelte-cordova-app
```

*Note that you will need to have [Node.js](https://nodejs.org) installed.*


## Get started

Install the dependencies...

```bash
cd svelte-cordova-app
npm install
```

## Add your cordova platform

```bash
cd src-cordova
cordova platform add android/ios
```

## Serve the app in dev mode with hot reload

Back in the root folder:
```bash
npm run dev-android
```
or
```bash
npm run dev-ios
```

This will run the cordova project with a web view pointing to your workstation's IP.

* You need to have an emulator/device connected to adb 
* Your device has to be connected to the same wifi network as your workstation.

## To build a prod version:

```bash
npm run build-android
```
or
```bash
npm run build-ios
```

## IOS quirks

You need to add a `build.json` file in `src-cordova` folder with your developer id. More info at [cordova docs](https://cordova.apache.org/docs/en/latest/guide/platforms/ios/)