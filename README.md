# 🚀 Welcome to your new awesome project!

This project has been created using **webpack-cli**, you can now run

```
npm run build
```

or

```
yarn build
```

example of builder.config.js

```js
module.exports = {
  global_path: "/test/Components/",
  templates: {
    ["react-component"]: {
      path: "",
      temp: "other",
    },
    ["test"]: {
      path: "/test/test/",
      temp: "test",
    },
  },
};
```

example of templates/somefile.template.js

```js
module.exports["styles.css"] = `
import { React } from "react";

export const $[component]$ = () => {

return <Styled$[component]$></Styled$[component]$>

}
`;

module.exports["Styled$[component]$.scss"] = `
import { React } from "react";

export const $[component]$ = () => {

return <Styled$[component]$></Styled$[component]$>

}
`;
```

to bundle your application
