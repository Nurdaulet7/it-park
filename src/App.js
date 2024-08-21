import React, { useState } from "react";
import "./styles/styles.scss";
import Header from "./components/header/Header";
import Content from "./components/content/Content";
import Menu from "./components/aside-menu/Menu";
import Dialog from "./components/dialog/Dialog";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { BrowserRouter } from "react-router-dom";
import RegisterForm from "./components/form/RegisterForm";
import FooterComponent from "./components/footer/FooterComponent";
import FormDialog from "./components/dialog/FormDialog";

function App({ setLocale }) {
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [isRegisterFormOpen, setRegisterFormOpen] = useState(false);
  const [scrollToSection, setScrollToSection] = useState(null);

  const handleOpenDialog = () => {
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const handleOpenRegisterForm = () => {
    setRegisterFormOpen(true);
  };

  const handleCloseRegisterForm = () => {
    setRegisterFormOpen(false);
  };

  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className="App app-container">
          <Header
            onOpenDialog={handleOpenDialog}
            onOpenRegisterForm={handleOpenRegisterForm}
            setLocale={setLocale}
          />
          <Content
            scrollToSection={scrollToSection}
            setScrollToSection={setScrollToSection}
          />
          <FooterComponent />
          <Dialog isOpen={isDialogOpen} onClose={handleCloseDialog}>
            <Menu
              setScrollToSection={setScrollToSection}
              onMenuItemClick={handleCloseDialog} // Закрытие диалога при клике на пункт меню
              onOpenRegisterForm={handleOpenRegisterForm}
            />
          </Dialog>
          <FormDialog
            isOpen={isRegisterFormOpen}
            onClose={handleCloseRegisterForm}
          >
            <RegisterForm onClose={handleCloseRegisterForm} />
          </FormDialog>
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
