import React, { useState } from "react";
import "./styles/styles.scss";
import Header from "./components/header/Header";
import Content from "./components/content/Content";
import Menu from "./components/aside-menu/Menu";
import Dialog from "./components/dialog/Dialog";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { BrowserRouter } from "react-router-dom";
import FormDialog from "./components/dialog/FormDialog";
import ResidentForm from "./components/form/ResidentForm";
import FooterComponent from "./components/footer/FooterComponent";
import AuthForm from "./components/form/AuthForm";

function App({ setLocale }) {
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [isResidentFormOpen, setResidentFormOpen] = useState(false);
  const [isLoginFormOpen, setLoginFormOpen] = useState(false);
  const [scrollToSection, setScrollToSection] = useState(null);

  const handleOpenDialog = () => {
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const handleOpenResidentForm = () => {
    setResidentFormOpen(true);
  };

  const handleCloseResidentForm = () => {
    setResidentFormOpen(false);
  };

  const handleOpenLoginForm = () => {
    setLoginFormOpen(true);
  };

  const handleCloseLoginForm = () => {
    setLoginFormOpen(false);
  };

  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className="App app-container">
          <Header
            onOpenDialog={handleOpenDialog}
            onOpenResidentForm={handleOpenResidentForm}
            onOpenLoginForm={handleOpenLoginForm}
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
              onOpenResidentForm={handleOpenResidentForm}
            />
          </Dialog>
          <FormDialog
            isOpen={isResidentFormOpen}
            onClose={handleCloseResidentForm}
          >
            <ResidentForm
              isOpen={isResidentFormOpen}
              onClose={handleCloseResidentForm}
            />
          </FormDialog>
          <FormDialog isOpen={isLoginFormOpen} onClose={handleCloseLoginForm}>
            <AuthForm isOpen={isLoginFormOpen} onClose={handleCloseLoginForm} />
          </FormDialog>
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
