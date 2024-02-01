### To clone the project:

```
git clone https://github.com/Abdullah-Mazumder/AlQuran.git
```

### Install dependencies:

```
yarn install
```

### Run the app

```
yarn start --dev-client
```

#### If you want to run the app with Expo GO, it will get error. Because there are some native modules in this app that doesn't support Expo GO. So you need a developement build to run the app.

```
https://docs.expo.dev/develop/development-builds/create-a-build/
```

#### There is a issue with expo-av in playing audio. In small surah it is working perfectly, also working perfectly in large surah. But when you interact with previous, next or repeat verse then it creates a little bit issue. Like if I want to play the audio from 33 seconds then sometimes it is starting playing from 30 seconds. I have tried to fix this. But I am not able to do this. So, anyone can try to fix this and you are welcome.
