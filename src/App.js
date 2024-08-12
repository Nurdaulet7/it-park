import React, { useState } from "react";
import "./styles/styles.scss";
import Header from "./components/header/Header";
import Content from "./components/content/Content";
import Menu from "./components/aside-menu/Menu";
import Dialog from "./components/dialog-menu/Dialog";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { BrowserRouter } from "react-router-dom";
import Footer from "./components/footer/FooterComponent";
import FooterComponent from "./components/footer/FooterComponent";

function App({ setLocale }) {
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [scrollToSection, setScrollToSection] = useState(null);

  const handleOpenDialog = () => {
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className="App">
          <Header onOpenDialog={handleOpenDialog} setLocale={setLocale} />
          <Content
            scrollToSection={scrollToSection}
            setScrollToSection={setScrollToSection}
          />
          <FooterComponent />
          <Dialog isOpen={isDialogOpen} onClose={handleCloseDialog}>
            <Menu setScrollToSection={setScrollToSection} />
          </Dialog>
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
