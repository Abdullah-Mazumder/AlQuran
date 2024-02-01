import { View } from "react-native";
import Loader from "./Loader";

const OverlayLoading = () => {
  return (
    <View className="absolute w-full h-full bg-[#00000069] flex items-center justify-center z-0">
      <View className="z-20">
        <Loader />
      </View>
    </View>
  );
};

export default OverlayLoading;
