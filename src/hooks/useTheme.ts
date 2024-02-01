import { useSelector } from "react-redux";
import { ThemeState } from "src/redux/features/theme/themeSlice";

// Define the useTheme hook
const useTheme = (): ThemeState => {
  const { color, isDark } = useSelector(
    (state: { theme: ThemeState }) => state.theme
  );

  // Return the theme properties
  return {
    color,
    isDark,
  };
};

export default useTheme;
