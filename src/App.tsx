import { Button, createTheme, ThemeProvider } from "flowbite-react";

const customTheme = createTheme({
  button: {
    color: {
      primary: "bg-red-500 hover:bg-red-600",
      secondary: "bg-blue-500 hover:bg-blue-600",
    },
    size: {
      lg: "px-6 py-3 text-lg",
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={customTheme} >
      <div className="flex flex-col gap-1 my-1">
        <Button color="primary">Red Button</Button>
        <Button color="secondary" size="lg">
          Large Blue Button
        </Button>
      </div>
    </ThemeProvider>
  );
}

export default App
