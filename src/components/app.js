import { h } from "preact";
import { Router } from "preact-router";
import { Match } from "preact-router/match";
import { css, Global } from "@filbert-js/macro";

import Header from "./header";
import Home from "../routes/home";
import SecondCategory from "../routes/second-category";
import ThirdCategory from "../routes/third-category";
import Animation from "../routes/animation";
import { AppStateProvider } from "../context/app-state";

const App = () => {
  return (
    <AppStateProvider>
      <div id="app">
        <Global
          styles={`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@500&display=swap');

        :root {
          --main-color: #0D3B66;
          --secondary-color: #F95738;
        }

        html,
        body {
          height: 100%;
          width: 100%;
          padding: 0;
          margin: 0;
          background: #fafafa;
          font-family: "Syne", sans-serif;
          font-weight: 400;
          color: #444;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }

        * {
          box-sizing: border-box;
        }

        #app {
          height: 100%;
        }

        main {
          --header-height: 56px;
          padding-top: var(--header-height);
          height: 100%;
          display: grid;
          grid-template-rows: 100px 100px auto;

          @media (min-width: 526px) {
            --header-height: 120px;
          }

          @media (min-width: 742px) {
            --header-height: 56px;
          }
        }
      `}
        />
        <Header />
        <main>
          <Router>
            <Home path="/" />
            <Match path="/:category/:secondCategory?/:thirdCategory?">
              {({ matches, path, url }) => {
                const pathParts = path.split("/");

                return (
                  <>
                    {pathParts.length > 1 && (
                      <SecondCategory path={path} category={pathParts[1]} />
                    )}
                    {pathParts.length > 2 && (
                      <ThirdCategory
                        path={path}
                        category={pathParts[1]}
                        secondCategory={pathParts[2]}
                      />
                    )}
                    {pathParts.length > 3 && <Animation key={path} />}
                  </>
                );
              }}
            </Match>
          </Router>
        </main>
      </div>
    </AppStateProvider>
  );
};

export default App;
