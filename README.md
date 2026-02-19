# What is this repository for?

The source code you find in this repository is meant to be compiled and injected inside **Webround drafts**, which you can create at [webround.com](https://webround.com/en).

# What is Webround?

Webround is an all-in-one platform for building websites and e-commerces, speeding up the development process with a **drag & drop editor** that supports the injection of **custom React code**. If you're interested in knowing more, please take a look at the [documentation](https://docs.webround.com/intro).

# How Webround handles React code

The editor allows any user to inject custom code into their draft, which is a private development copy of their website hosted via webround.com.

### Injection Steps:

1. **Register** at [webround.com](https://webround.com/en) and create a draft.
2. Access the **Draft Editor** and click on the folder component (top-left).
3. Create a `package.json` file and a `src/` directory. Insert your code in a file (e.g., `src/Component.jsx`) and save (**Ctrl + S**). Start the compilation using the specific command.
4. Go to the **Global Components** menu (or a specific section) and insert the path to your component (e.g., `src/Component.jsx`). You're ready to go.

## Benefits and Good-to-Know

Webround can integrate any **npm package** via `package.json`. As seen in this repository, packages like `react-icons` are installed in the runtime of custom components. It also integrates **Tailwind CSS v4** natively.

### Pro Tips:

* **React Import:** Always `import React from 'react'`, even if not used explicitly, to avoid **Error #31**.
* **Debugging:** Use `console.log()` normally; you can debug directly from the browser console.
* **The `wr` Prop:** You always have access to a `wr` prop. Log it to explore its content or check the [SDK documentation](https://docs.webround.com/editor/wr-sdk).
* **State Management:** Leverage `wr` to programmatically navigate, change languages, and access the app state. You read the data while the built-in contexts handle the heavy lifting.
* **Header Overrides:** If you override the **Site Header**, do not apply `fixed` or `sticky` classes. The component lives inside a managed container. Modify the **Header Movement** prop in the editor settings instead to avoid layout overlaps.
* **Contextual Props:** The `wr.product` prop is available specifically when rendering a **Product Card**.

### Injection Strategies:

1. **Dedicated Section:** Appears in the normal page flow.
2. **Global Injection:** Ideal for widgets, trackers, or fixed elements.
3. **Component Override:** Used to replace default Site Headers, Product Cards, or Sidebars.
4. **Section-specific Injections:** Insert small widgets into hard-coded components like the Checkout Container or Product Page.

# Conclusion

Webround allows you to build anything starting from a **100% ready-to-use React stack**. Stop worrying about the boilerplate of e-commerce infrastructure: focus on your brand's style and deliver a reliable, high-end experience without compromises.