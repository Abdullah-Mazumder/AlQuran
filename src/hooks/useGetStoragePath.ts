import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ApplicationState } from "src/types/types";
import * as RNFS from "react-native-fs";

const useGetStoragePath = () => {
  const { storage } = useSelector(
    (state: { app: ApplicationState }) => state.app
  );
  const [storagePath, setStoragePath] = useState("");

  useEffect(() => {
    const fn = async () => {
      const externalStorages = await RNFS.getAllExternalFilesDirs();

      if (storage === "external") {
        if (externalStorages.length === 2) setStoragePath(externalStorages[1]);
        else setStoragePath(null);
      } else {
        setStoragePath(externalStorages[0]);
      }
    };

    fn();
  }, [storage]);

  return { storagePath };
};

export default useGetStoragePath;
