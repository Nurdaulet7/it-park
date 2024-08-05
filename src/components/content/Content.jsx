import React from "react";
import cn from "classnames";
import styles from "../content/Content.module.scss";
import Menu from "../aside-menu/Menu";
import Carousel from "./swiper/Carousel";
import ThemeToggle from "../toggle/ThemeToggle";

const Content = () => {
  return (
    <main className={cn("layout", styles["main"])}>
      <ThemeToggle />
      <aside className={cn(styles["menu"])}>
        <Menu />
      </aside>
      <div className={cn(styles["content"])}>
        <section className="section container">
          <Carousel />
        </section>
        <section className="section container">
          <header className="section__header">
            <h2 className="section__title">Residents</h2>
          </header>
          <div className="section__body">
            <div className="residents">
              <ul className="residents__list grid grid--3">
                <li className="residents__item">
                  <article className="resident-card">
                    <img
                      className="resident-card__image"
                      src="https://it-park.kz/uploads/resident/normal/8.webp"
                      alt="resident"
                      loading="lazy"
                    />
                    <h3 className="resident-card__title">EPAM</h3>
                  </article>
                </li>
                <li className="residents__item">
                  <article className="resident-card">
                    <img
                      className="resident-card__image"
                      src="https://it-park.kz/uploads/resident/normal/8.webp"
                      alt="resident"
                      loading="lazy"
                    />
                    <h3 className="resident-card__title">EPAM</h3>
                  </article>
                </li>
                <li className="residents__item">
                  <article className="resident-card">
                    <img
                      className="resident-card__image"
                      src="https://it-park.kz/uploads/resident/normal/8.webp"
                      alt="resident"
                      loading="lazy"
                    />
                    <h3 className="resident-card__title">EPAM</h3>
                  </article>
                </li>
                <li className="residents__item">
                  <article className="resident-card">
                    <img
                      className="resident-card__image"
                      src="https://it-park.kz/uploads/resident/normal/8.webp"
                      alt="resident"
                      loading="lazy"
                    />
                    <h3 className="resident-card__title">EPAM</h3>
                  </article>
                </li>
                <li className="residents__item">
                  <article className="resident-card">
                    <img
                      className="resident-card__image"
                      src="https://it-park.kz/uploads/resident/normal/8.webp"
                      alt="resident"
                      loading="lazy"
                    />
                    <h3 className="resident-card__title">EPAM</h3>
                  </article>
                </li>
                <li className="residents__item">
                  <article className="resident-card">
                    <img
                      className="resident-card__image"
                      src="https://it-park.kz/uploads/resident/normal/8.webp"
                      alt="resident"
                      loading="lazy"
                    />
                    <h3 className="resident-card__title">EPAM</h3>
                  </article>
                </li>
                <li className="residents__item">
                  <article className="resident-card">
                    <img
                      className="resident-card__image"
                      src="https://it-park.kz/uploads/resident/normal/8.webp"
                      alt="resident"
                      loading="lazy"
                    />
                    <h3 className="resident-card__title">EPAM</h3>
                  </article>
                </li>
                <li className="residents__item">
                  <article className="resident-card">
                    <img
                      className="resident-card__image"
                      src="https://it-park.kz/uploads/resident/normal/8.webp"
                      alt="resident"
                      loading="lazy"
                    />
                    <h3 className="resident-card__title">EPAM</h3>
                  </article>
                </li>
                <li className="residents__item">
                  <article className="resident-card">
                    <img
                      className="resident-card__image"
                      src="https://it-park.kz/uploads/resident/normal/8.webp"
                      alt="resident"
                      loading="lazy"
                    />
                    <h3 className="resident-card__title">EPAM</h3>
                  </article>
                </li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default Content;
