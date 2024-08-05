import React, { useState } from "react";
import "./styles/styles.scss";
import Header from "./components/header/Header";
import Content from "./components/content/Content";
import Menu from "./components/aside-menu/Menu";
import Dialog from "./components/dialog-menu/Dialog";

function App() {
  const [isDialogOpen, setDialogOpen] = useState(false);

  const handleOpenDialog = () => {
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  return (
    <div className="App">
      <Header onOpenDialog={handleOpenDialog} />
      <Content />
      <Dialog isOpen={isDialogOpen} onClose={handleCloseDialog}>
        <Menu />
      </Dialog>
    </div>
  );
}

export default App;
