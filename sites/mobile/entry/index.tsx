import React, { useEffect } from 'react';
import { HashRouter, Switch, Route } from 'react-router-dom';
// import { createRoot } from 'react-dom/client'; // React 19
import setRootPixel from '../../../packages/arcodesign/tools/flexible';
import ContextProvider from '../../../packages/arcodesign/components/context-provider';
import { LanguageSupport } from '../../utils/language';
import docs from '../pages/components';
import compositeDocs from '../pages/composite-comp';
import enDocs from '../pages/components/index-en-US';
import enCompositeDocs from '../pages/composite-comp/index-en-US';
import Demo from '../widgets/demo';
import Home from '../widgets/home';
import TypicalDemo from '../widgets/typicalDemo';
import '../../../packages/arcodesign/components/style';
import '../../../packages/arcodesign/tools/touch2mouse';
import { render } from '../../../packages/arcodesign/components/_helpers';
import useLocale from './useLocale';
import { HistoryContext } from './context';
import useMode from '../../utils/useMode';
import './index.less';

setRootPixel();

const useRtl = false;

function App() {
    const { locale } = useLocale();
    const { mode, setMode } = useMode(true);

    useEffect(() => {
        useRtl && document.documentElement.setAttribute('dir', 'rtl');
    }, []);

    return (
        <ContextProvider
            locale={locale}
            useRtl={useRtl}
            useDarkMode
            isDarkMode={mode === 'dark'}
            onDarkModeChange={isDark => setMode(isDark ? 'dark' : 'light')}
        >
            <HashRouter>
                <Switch>
                    <Route
                        path="/"
                        render={props => (
                            <HistoryContext.Provider value={props.history}>
                                <Home language={LanguageSupport.CH} />
                            </HistoryContext.Provider>
                        )}
                        exact
                    />
                    <Route
                        path="/en-US"
                        render={props => (
                            <HistoryContext.Provider value={props.history}>
                                <Home language={LanguageSupport.EN} />
                            </HistoryContext.Provider>
                        )}
                        exact
                    />
                    <Route
                        path="/components/:name"
                        render={props => {
                            const { name } = props.match.params;
                            const Comp = docs[name];
                            return Comp ? <Demo name={name} doc={<Comp />} /> : null;
                        }}
                        exact
                    />
                    <Route
                        path="/en-US/components/:name"
                        render={props => {
                            const { name } = props.match.params;
                            const Comp = enDocs[name];
                            return Comp ? <Demo name={name} doc={<Comp />} /> : null;
                        }}
                        exact
                    />
                    <Route
                        path="/composite-components/:name"
                        render={props => {
                            const { name } = props.match.params;
                            const Comp = compositeDocs[name];
                            return Comp ? <Demo name={name} doc={<Comp />} /> : null;
                        }}
                        exact
                    />
                    <Route
                        path="/en-US/composite-components/:name"
                        render={props => {
                            const { name } = props.match.params;
                            const Comp = enCompositeDocs[name];
                            return Comp ? <Demo name={name} doc={<Comp />} /> : null;
                        }}
                        exact
                    />
                    <Route path="/typical-demo" render={() => <TypicalDemo />} exact />
                    <Route
                        path="/en-US/typical-demo"
                        render={() => <TypicalDemo language={LanguageSupport.EN} />}
                        exact
                    />
                    <Route
                        path="*"
                        render={props => (
                            <HistoryContext.Provider value={props.history}>
                                <Home />
                            </HistoryContext.Provider>
                        )}
                    />
                </Switch>
            </HashRouter>
        </ContextProvider>
    );
}

render(<App />, document.querySelector('#app')!);
// render(<App />, document.querySelector('#app')!, createRoot); // React 19
