import * as React from "react";
import { configure, addDecorator, addParameters } from "@storybook/react";
import { INITIAL_VIEWPORTS } from "@storybook/addon-viewport";
import { withKnobs } from "@storybook/addon-knobs";
import { jsxDecorator } from "storybook-addon-jsx";
import { withConsole } from "@storybook/addon-console";
import { ThemeProvider } from "styled-components";
import { everydayPlusTheme } from "@opr-finance/themes";

const req = require.context("../packages", true, /.story.tsx?$/);
function loadStories() {
    addParameters({
        viewport: {
            viewports: INITIAL_VIEWPORTS,
        },
    });
    addDecorator(withKnobs);
    addDecorator(jsxDecorator);
    addDecorator((storyFn, context) => withConsole()(storyFn)(context));
    addDecorator((storyFn, context) => {
        const { theme } = context.parameters;
        if (theme) {
            return <ThemeProvider theme={theme}>{storyFn()}</ThemeProvider>;
        }

        return storyFn();
    });
    req.keys().forEach((filename) => req(filename));
}

configure(loadStories, module);
