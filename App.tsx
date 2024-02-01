import { Provider } from "react-redux";
import Application from "./src/Application";
import { store, persistor } from "./src/redux/store";
import { PersistGate } from "redux-persist/integration/react";
import CustomStatusBar from "./src/components/CustomStatusBar";
import { NativeBaseProvider } from "native-base";

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NativeBaseProvider>
          <CustomStatusBar />
          <Application />
        </NativeBaseProvider>
      </PersistGate>
    </Provider>
  );
}
