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
import FooterComponent from "./components/footer/FooterComponent";
import AuthForm from "./components/form/AuthForm";
import ToastNotification from "./components/Error/ToastNotification";

function App({ setLocale }) {
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [isLoginFormOpen, setLoginFormOpen] = useState(false);
  const [scrollToSection, setScrollToSection] = useState(null);

  const handleOpenDialog = () => {
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
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
          <ToastNotification />
          <Header
            onOpenDialog={handleOpenDialog}
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
            />
          </Dialog>
          <FormDialog isOpen={isLoginFormOpen} onClose={handleCloseLoginForm}>
            <AuthForm isOpen={isLoginFormOpen} onClose={handleCloseLoginForm} />
          </FormDialog>
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
