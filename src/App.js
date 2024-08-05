import React, { useState } from "react";
import "./styles/styles.scss";
import Header from "./components/header/Header";
import Content from "./components/content/Content";
import Menu from "./components/aside-menu/Menu";
import Dialog from "./components/dialog-menu/Dialog";
import { Provider } from "react-redux";
import { store } from "./redux/store";

function App({ setLocale }) {
  const [isDialogOpen, setDialogOpen] = useState(false);

  const handleOpenDialog = () => {
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  return (
    <Provider store={store}>
      <div className="App">
        <Header onOpenDialog={handleOpenDialog} setLocale={setLocale} />
        <Content />
        <Dialog isOpen={isDialogOpen} onClose={handleCloseDialog}>
          <Menu />
        </Dialog>
      </div>
    </Provider>
  );
}

export default App;
