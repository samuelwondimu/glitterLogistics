import * as React from "react";
import { ThemeProvider, createTheme } from "@mui/material";
import { createContext } from "react";

const DyanmicTheme = createContext({
  toggleColorMode: () => {},
});

export const ThemeContext = ({ children }) => {
  const [mode, setMode] = React.useState("light");

  const themeMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
    }),
    []
  );

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode]
  );

  return (
    <DyanmicTheme.Provider value={themeMode}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </DyanmicTheme.Provider>
  );
};

export const useToggleTheme = () => {
  return React.useContext(DyanmicTheme);
};
