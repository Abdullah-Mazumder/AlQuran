import { useSelector } from "react-redux";
import { AppState } from "src/redux/features/app/appSlice";

const useLanguage = () => {
  const { language } = useSelector((state: { app: AppState }) => state.app);
  return language;
};

export default useLanguage;
