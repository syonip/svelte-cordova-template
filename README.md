
# Svelte Cordova template

This is a project template for [Svelte](https://svelte.dev) apps running inside cordova apps. It lives at https://github.com/syonip/svelte-cordova-template.

To create a new project based on this template using [degit](https://github.com/Rich-Harris/degit):

```bash
npx degit syonip/svelte-cordova-template svelte-cordova-app
```

*Note that you will need to have [Node.js](https://nodejs.org) installed.*


## Get started

Install the dependencies...

```bash
cd svelte-cordova-app
npm install
```

## Run local dev server (no cordova)

```bash
npm run dev
```

## Add your cordova platform

```bash
cd src-cordova
cordova platform add android/ios
```

## Develop on your device with hot reload

Back in the root folder:
```bash
npm run dev-android
```
or
```bash
npm run dev-ios
```

This will run the cordova project with a web view pointing to your workstation's IP.

You should see the message `Cordova deviceready fired!` if cordova loaded correctly.

Try to change something in App.svelte, and you should see the content reload in your device.

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

## To build the svelte bundle into the src-cordova folder, without actually building the native project
```bash
npm run bundle-android
```
or
```bash
npm run bundle-ios
```

## IOS quirks

You need to add a `build.json` file in `src-cordova` folder with your developer id. More info at [cordova docs](https://cordova.apache.org/docs/en/latest/guide/platforms/ios/)