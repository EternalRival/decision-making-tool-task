# Wheel of fortune

## Description

Your task is to implement an single page application (SPA) for drawing lots using the wheel of fortune (hereafter `WoF`).

The application consists of two parts.

The first part of the application allows you to edit the list of lots (sections of `WoF`), as well as to save it to a file and load it from a file. There is also a button to go to `WoF` itself.

The second part of the application allows you to see the previously created list as `WoF` itself. There is also an element for displaying the selected lot, a button to start `WoF` rotation and a user-friendly option to return to the first part of the application (the list of lots).

## Demo

> This is a demo of the app's functionality.  
> The app design is up to you as long as it meets the requirements of the assignment.

<https://er-wof-demo.netlify.app/>

## Task Objectives

- Acquire or refine skills in creating, modifying, and deleting HTML elements dynamically using code.
- Practice storing user input between sessions *(e.g., via `Web Storage API`)*.
- Learn to collect and save user input data to a file.
- Learn to load and process data from a file *(e.g., via `File API`)*.
- Familiarize yourself with Canvas API.
- Practice with animations. *(e.g., via `Web API`'s `requestAnimationFrame`, `Animations API`, etc.)*
- Familiarize yourself with setting up project configurations.
- Familiarize yourself with writing clean code with strict rules.

## Repository and Submission Requirements

- Use a [private school repository](https://docs.rs.school/#/private-repository) to develop this application.
- Use the `wheel-of-fortune` branch as your development branch.
- Your commits in the development branch should reflect the development history. Commits must follow the [guideline](https://docs.rs.school/#/git-convention).
- Use the `gh-pages` branch as the deploy branch *(e.g. via the [`gh-pages`](https://www.npmjs.com/package/gh-pages) package)*.
- Use the app **deploy link** to [submit](https://app.rs.school/course/student/cross-check-submit) the app to crosscheck in [app.rs](https://app.rs.school/course/student/cross-check-submit). **Make sure** your link is accessible to everyone by opening it in incognito mode.
- Create a Pull Request from the development branch into the `main` branch and format it according to [PR requirements](https://docs.rs.school/#/pull-request-review-process?id=Требования-к-pull-request-pr). **Do not merge** the development branch into the `main` branch.
- Use the **PR link** to [submit](https://app.rs.school/course/student/dashboard) the app to mentor in [app.rs](https://app.rs.school/course/student/dashboard).

## General Requirements

- `<body>` in the `index.html` must be empty (only `<script>` tag is allowed). *(You can check this with the `View page source` option in the context menu in google chrome.)*
- App must be supported at `640px <= width <= 1280px` at least *(DOM elements should not go out of bounds of parent elements, overlap, etc.)*.
- The use of `alert`, `prompt`, `confirm` is prohibited.
- App must not have unexpected errors in the console.
- The app must be supported by at least the latest version of the “google chrome” browser.

## Technical Requirements (+160)

### General

- Language: Application written in TypeScript.
- Required: Prettier, ESLint, StyleLint and libraries for them.
- Required: Husky, lint-staged, commitlint.
- Required: Bundlers (webpack, vite). *(It is allowed to use bundler's plugins.)*
- Allowed: CSS modules, CSS Preprocessors (`Sass`, `Less`, `Stylus`, `PostCSS`), CSS in JS libraries (`tailwindcss`, `styled components`).
- Prohibited: Frameworks like Angular, React, Vue, etc.
- Prohibited: jQuery.
- Prohibited: eslint-plugin-prettier.
- Prohibited: Third-party libraries not listed in the allowed libraries.

### Code Formatting and Linting (+80)

#### TypeScript

> TypeScript helps us avoid unnecessary code errors at runtime and helps the IDE give us relevant hints during development.

1. (+2) [TypeScript](https://www.typescriptlang.org/) must be installed to developer dependencies.
2. (+2) TypeScript configuration file is added to the project and used.
3. (+8) TypeScript configuration file must include the `strict` options enabled.

#### Prettier

> The formatter allows us to be less distracted by manual indentation and comma spacing, allowing us to better focus on writing code.

1. (+2) [Prettier](https://prettier.io/) must be installed to developer dependencies.
2. (+2) Prettier configuration file is added to the project and used.
3. (+4) `package.json` must contain 2 scripts: `ci:format` for checking issues with CI and `format` for manually formatting project files. *The `prettier` command has many useful options, such as `--list-different` and `--ignore-unknown`.*

#### ESLint

> Linter allows us to keep our code clean. Clean code is more readable, maintainable, and reusable. And its auto-fixing of errors allows us to save time on refactoring.

1. (+2) [ESLint](https://eslint.org/) must be installed to developer dependencies.
2. (+2) ESLint configuration file is added to the project and used.
3. (+8) ESLint configuration file must include the `noInlineConfig` and `reportUnusedDisableDirectives` options enabled.
4. (+8) ESLint configuration file must include all of the following rules included:

   ```json
   {
     "@typescript-eslint/consistent-type-imports": "error",
     "@typescript-eslint/explicit-function-return-type": "error",
     "@typescript-eslint/consistent-type-assertions": ["error", { "assertionStyle": "never" }]
   }
   ```

5. (+16) ESLint configuration file must be configured with [`typescript-eslint`](https://typescript-eslint.io/) (with enabled [type checking rules](https://typescript-eslint.io/getting-started/typed-linting/)), [`eslint-config-airbnb-typescript`](https://www.npmjs.com/package/eslint-config-airbnb-typescript), [`eslint-config-prettier`](https://github.com/prettier/eslint-config-prettier) (do not confuse it with `eslint-plugin-prettier`. it is [not recommended](https://prettier.io/docs/en/integrating-with-linters.html#:~:text=generally%20not%20recommended) by the prettier documentation). and the necessary dependencies for them to work.
   - *With the mentor's permission, it is acceptable to disable or tweak some rules (e.g. `import/prefer-default-export`, `no-underscore-dangle`, etc.) as long as it does not conflict with penalties.*
   - *It is allowed to tweak the config to be stricter to make your code even cleaner (according to your or your mentor's preference).*
6. (+4) `package.json` must contain 2 scripts: `ci:lint` for checking issues with CI and `lint` for manually checking project files.

#### StyleLint

> Linter allows us to keep our code clean. Clean code is more readable, maintainable, and reusable. And its auto-fixing of errors allows us to save time on refactoring.

1. (+2) [StyleLint](https://stylelint.io/) must be installed to developer dependencies.
2. (+2) StyleLint configuration file is added to the project and used.
3. (+2) StyleLint configuration file must be configured with [`stylelint-config-standard`](https://github.com/stylelint/stylelint-config-standard) and [`stylelint-config-clean-order`](https://github.com/kutsan/stylelint-config-clean-order). *It is acceptable to disable or tweak some rules for better DX.*
4. (+4) `package.json` must contain 2 scripts: `ci:stylelint` for checking issues with CI and `stylelint` for manually checking project files.

#### Husky (with lint-staged and commitlint)

> `husky` allows us to run some code during various git events using git hooks.  
> `lint-staged` allows us to run linters/formatters only on code that is prepared for commit.  
> `commitlint` keeps track of commit names and allows us to avoid unnecessary `git rebase -i`.

1. (+2) [`husky`](https://typicode.github.io/husky/), [`lint-staged`](https://github.com/lint-staged/lint-staged) and [`commitlint`](https://commitlint.js.org/) must be installed to developer dependencies.
2. (+2) `husky` must be configured to run `lint-staged` on the `pre-commit` hook.
3. (+2) `husky` must be configured to run `commitlint` on the `commit-msg` hook.
4. (+2) `lint-staged` must be configured to run `ci:` scripts at least for javascript/typescript and css/scss/etc. files.
5. (+2) `commitlint` must be configured with [`@commitlint/config-conventional`](https://www.npmjs.com/package/@commitlint/config-conventional).

### Code Quality (+80)

> The use of innerHTML is prohibited. Use of DOM search methods is prohibited. ([there are good reasons for not using them](https://gist.github.com/TELEUZI/410d19772481d98b06e0b41ebf89fff1#naive-implementation-).)
>
> For creating elements that will need to be accessed by code, a great solution is to use `createElement` and variables. For clearing/replacing element content, `replaceChildren` may be useful. To add elements that will not need to be accessed by code, it is acceptable to use `insertAdjacentHTML`.
>
> This won't cause any pain if you at least just write a reusable function that takes in the necessary element settings (`tagName`, `className`, `textContent`, etc.) and returns a ready-to-use element.

#### Code Smells

1. (+2) The code does not contain magic values.
2. (+2) Code contains minimal or no code duplication at all.

#### Bundling and Modularity

1. (+4) HTML elements are generated using a utility function or class.
2. (+4) The code is logically divided into modules/layers. *(you can consult your mentor about architecture.)*.
3. (+4) The application is built by a bundler.

#### Clear and Reusable Functions

1. (+8) The code is divided into small functions (≤ 40 lines each) with clear names and purposes. The same applies to classes and their methods. *ESLint rule `max-lines-per-function` may be useful for this.
2. (+8) Arguments and return values of functions and methods are explicitly typed.

#### Care About Types

> [There is no point in using TypeScript if you don’t care about types](https://javascript.plainenglish.io/there-is-no-point-to-use-typescript-in-your-project-if-you-dont-care-about-types-68131deeb43a)

1. (+16) The code does not contain any type assertions.
2. (+16) The code does not contain any explicit or implicit `any`.
3. (+16) The code contains and uses [type guards](https://www.typescriptlang.org/docs/handbook/2/narrowing.html) *(e.g., type narrowing type predicates, assertion functions, etc.)*. *(small hint: functions to get data from a json file and/or localStorage are great places to apply type guards.)*

## Functional Requirements (+256)

### List of lots (+92)

#### General

1. (+1) Displays the app's name.
2. (+2) Displays the list of lots.
3. (+2) In the `initial state`, the list contains 1 empty lot *(id === `#1`, empty `title` and `weight`)*. *The `initial state` here means the state of the application when the user first encounters it (this can be simulated by pre-closing all current incognito tabs, if any, and opening a new one)*.
4. (+4) Current lots must remain the same *(not reset, not shuffled)* when reloading the page.
5. (+4) Current lots must remain the same *(not reset, not shuffled)* when closing a tab/window and opening it in a new one.

#### Lot

##### `id`

1. (+1) Each lot's `id` must be displayed.
2. (+2) Each lot's `id` must be unique.
3. (+2) Each lot's `id` must be in `#n` format *(`#1`, `#2`, `#3`, etc.)*.
4. (+4) Each lot's `id` must be generated programmatically at creation and the user has no possibility to change it manually.

##### `title`

1. (+1) Each lot's `title` must be displayed.
2. (+2) Each lot's `title` must be able to be edited by the user.

##### `weight`

1. (+1) Each lot's `weight` must be displayed.
2. (+2) Each lot's `weight` must be able to be edited by the user.
3. (+2) Each lot's `weight` must take only numbers.

##### `delete button`

1. (+1) Each lot's `delete button` must be displayed. The appearance of this button should clearly indicate its purpose *(contain appropriate text and/or icon. e.g., "delete", "remove", etc.)*.
2. (+4) Lot's `delete button` click must delete the current lot from the list.
3. (+2) When the last lot is deleted *(if the list has become completely empty)*, the id count must be reset and empty "new lot" with `id` `#1` should be added to the list *(as at `initial state`)*

##### Lot columns

1. (+4) The width of the "columns" ([`id`](#id), [`title`](#title), [`weight`](#weight), [`delete button`](#delete-button)) should match in "rows" ([lots](#lot)). *(`flex`/`grid`/`table` can be useful here. How you do it is up to you.)*

#### List Buttons

##### New lot

1. (+1) Displays a `add lot button` next to the list of lots for creating a "new lot". The appearance of this button should clearly indicate its purpose *(contain appropriate text and/or icon. e.g., "add lot", "new lot", "+", etc.)*.
2. (+4) The `add lot button` click must create a "new lot".
3. (+2) "New lot" must have a unique `id`.
4. (+2) "New lot" must have an empty `title`.
5. (+2) "New lot" must have an empty `weight`.
6. (+2) "New lot" must have a `delete button`.
7. (+2) "New lot" must meet the [#Lot](#lot) requirements *([`id`](#id), [`title`](#title), [`weight`](#weight), [`delete button`](#delete-button) and [Lot columns](#lot-columns) requirements)*.

##### Clear list

1. (+1) Displays a `clear list button` next to the list of lots for removing all lots from the list. The appearance of this button should clearly indicate its purpose *(contain appropriate text and/or icon. e.g., "clear list", "reset list", etc.)*.
2. (+4) The `clear list button` click must remove all current lots from the list.
3. (+2) In addition to clearing the list, an empty "new lot" with `id` `#1` should be added to the list *(as at `initial state`)*.

##### Save list to file

1. (+1) Displays a `save list button` next to the list of lots for saving all current lots to the `.json` file. The appearance of this button should clearly indicate its purpose *(contain appropriate text and/or icon. e.g., "save list to file", "save list as json", etc.)*.
2. (+4) The `save list button` click must collect the current lots data, convert it to a json object and save it to a `.json` file.
3. (+2) The `title` and `weight` values of lots must be saved.
4. (+2) The order of lots in the file must match the order of lots in the app.

##### Load list from file

1. (+1) Displays a `load list button` next to the list of lots for loading lots from the `.json` file. The appearance of this button should clearly indicate its purpose *(contain appropriate text and/or icon. e.g., "load list from file", "load list from json", etc.)*.
2. (+2) The `save list button` click must open the interface to select the file.
3. (+2) The type of files to be selected must be limited to a single file of type `.json`.
4. (+2) The current list of lots must be completely replaced by the list from the `.json` file you uploaded *(your app must be able to read and correctly parse the file created by your `save list button` click)*.
5. (+2) The order of lots in the app must match the order of lots in the file. The `id` of lots must be newly generated.
6. (+2) Each "loaded lot" must meet the [#Lot](#lot) requirements *([`id`](#id), [`title`](#title), [`weight`](#weight), [`delete button`](#delete-button) and [Lot columns](#lot-columns) requirements)*.

##### Start

1. (+1) Displays a `start button` next to the list of lots for displaying the `WoF` generated by the data from the list of current lots. The appearance of this button should clearly indicate its purpose *(contain appropriate text and/or icon. e.g., "start", "play", "open wheel of fortune", etc.)*.
2. (+4) The `start button` click must open `WoF` modal window.
3. (+4) The list of current lots passed to the modal window must be filtered and contain only valid lots. A lot is considered valid if its [`title`](#title) is not empty and its [`weight`](#weight) is greater than `0`.

### WoF Modal (+164)

> Great place to get familiar with the `<dialog>` element, but the old-fashioned `div.modal>div.modal-content` pattern is ok too.
>
> Briefly, the states mentioned below are:
>
> 1. Modal window `WoF` opened - the wheel is in the `initial state`.
>
> 2. A successful start of rotation has been initiated - the wheel is in the `rotation state`.
>
> 3. The rotation has finished and the winning lot has been determined - the wheel is in the `winning state`.
>
> After that `rotation state` and `winning state` cyclically change each other according to points 2 and 3.
>
> If the modal window `WoF` was closed and reopened, the life cycle starts again with `initial state`.

#### General

1. (+2) Displays the `WoF` modal window if the number of valid lots is two or more.
2. (+2) Displays a modal window asking to add at least 2 valid lots if the number of valid lots is less than two.

#### Wheel

> Canvas API and requestAnimationFrame are very good for this part of the assignment.

##### General

1. (+1) Displays the `wheel` element in the `WoF` modal window.

##### Lot slice

1. (+2) The `wheel` element must display lots as slices of a circle.
2. (+4) The order of `lot slices` on the `wheel` element must be randomized when the modal window is opened and not change until it is closed.
3. (+4) The fill color of each `lot slice` must be randomly generated when the modal window is opened and not change until it is closed.
4. (+8) The width (angle) of each `lot slice` must depend on the `weight` field of the lot. *The main idea of this feature is that by setting the values of lot weight we can adjust the chance of winning a particular lot. That is, the higher the weight of a particular lot, the wider its slice, and therefore the higher the chance of winning it.*
5. (+2) Each `lot slice` must be distinguishable from other elements. *This means that you need to handle the case where the fill color of a `lot slice` may happen to be very close to the fill color of an adjacent slice, cursor, or center element. *(Additional stroke, shadow, fill can be useful here.)**

##### Lot slice title

1. (+2) Each `lot slice` must display the `title` value of the lot as text (except in the case described in the next bullet point). The text should be placed on the slice from the center of the wheel to the edge (or from the edge to the center).
2. (+4) Each `lot slice title` must not violate the boundaries of its slice. If the width (angle) of the slice is not wide enough to display the text, the text must not be displayed.
3. (+4) Each `lot slice title` must not violate the boundaries of wheel. If `title` is too long, it should be clipped and end with ellipsis *(e.g., `"some very very long title" -> "some very very long t…"`)*.
4. (+2) Each displayed `lot slice title` must be distinguishable from the background. *This means that the background color of a `lot slice` may happen to be either light or dark. *(Additional stroke, shadow, fill can be useful here.)**

##### Center element

1. (+2) In the center of the `wheel`, there must be a decorative element to hide the point of contact between all the wheel slices *(e.g., a small circle, star, image, etc.)*.
2. (+2) The `center element` must be distinguishable from other elements. *This means that you need to handle the case where the `cursor` fill color may happen to be very close to the fill color of an adjacent slice. *(Additional stroke, shadow, fill can be useful here.)**

##### Cursor

1. (+4) The `wheel` element must display a `cursor` that points to the current lot. It can be designed in the form of a triangle, arrow or any similar figure with a clearly defined pointer.
2. (+4) The `cursor` must be placed at any position on the edge of the `wheel` and not overlapped by other elements.
3. (+2) The `cursor` must be distinguishable from other elements. *This means that you need to handle the case where the `cursor` fill color may happen to be very close to the fill color of an adjacent slice or background. *(Additional stroke, shadow, fill can be useful here.)**

##### Wheel rotating

1. (+2) When wheel rotation is initiated, the wheel must start rotating and stop after a short duration.
2. (+4) The rotation duration must be specified by the `duration` element. That is, it should correspond to its value (in seconds) at the moment of rotation start. *Be loyal when crosschecking. A small inaccuracy is acceptable. There is no need to reduce points for a difference of a couple of seconds.*
3. (+4) The rotation should have a non-linear velocity. Use a suitable easing *(e.g. `ease-in-out` or `ease-in-out-back' with a tiny magnitude)*.
4. (+4) The wheel must perform several full spins (minimum 5) and stop at a randomly selected lot.
5. (+2) A `winning sound` must be played when `wheel rotation state` is changed to `wheel winning state` if the app sound is not muted.
6. (+2) A `winning sound` must not be played if the app sound is muted.
7. (+4) In the wheel rotation state, `lot slices` must not change their order, shape, color. *It means that visually the `lot slices` shall rotate as an indivisible whole wheel.*
8. (+4) In the wheel rotation state, the `lot slice title` shall not change its location relative to the boundaries of its `lot slice`. *It means that visually `lot slice title` and `lot slice` should rotate as an indivisible element.*
9. (+2) In the wheel rotation state, the `cursor` must stay in its place and not rotate.

#### Selected lot

1. (+1) Displays a `selected lot` element within the `WoF` modal window.
2. (+2) In the wheel initial state, `selected lot` must display the `title` of the lot currently pointed to by the wheel `cursor`.
3. (+4) In the wheel rotation state, `selected lot` must **dynamically** display the `title` of the lot currently pointed to by the wheel cursor.
4. (+2) In the wheel winning state, `selected lot` must display the `title` of the lot currently pointed to by the wheel cursor.
5. (+2) In the initial and rotation states, the `selected lot` must not be highlighted.
6. (+2) In the winning state, the `selected lot` must be highlighted.

#### Interactions

##### Close button

1. (+1) Displays a `close button` in the upper right corner of modal window for returning to the [list of lots](#list-of-lots-92). The appearance of this button should clearly indicate its purpose *(contain appropriate text or icon. e.g., "⨉", "x", etc.)*.
2. (+4) The `close button` click must close `WoF` modal window and return the user to the [list of lots](#list-of-lots-92).
3. (+4) Closing `WoF` modal window must remove it from DOM.
4. (+4) In the wheel rotation state, `close button` must be temporarily visually disabled or hidden and must not be functioning.
5. (+4) In the initial and winning states `close button` returns to its original state and functions as it should.

##### Outside click

1. (+4) The `outside click` must close `WoF` modal window and return the user to the [list of lots](#list-of-lots-92).
2. (+4) In the wheel rotation state, the `outside click` functionality must be temporarily disabled.
3. (+4) In the initial and winning states `outside click` functions as it should.

##### Duration

1. (+1) Displays a `duration` `<input>` element within the `WoF` modal window for setting the rotation duration in seconds.
2. (+2) `duration` element must be able to be edited by the user.
3. (+2) `duration` element must take only numbers.
4. (+2) `duration` element must have a default value, which should be between 5 and 30 seconds.
5. (+4) In the wheel rotation state, `duration` element must be temporarily visually disabled and must not be functioning.
6. (+4) In the initial and winning states `duration` element returns to its original state and functions as it should.

##### Spin

1. (+1) Displays a `spin button` within the `WoF` modal window for start rotation of the wheel. The appearance of this button should clearly indicate its purpose *(contain appropriate text and/or icon. e.g., "spin", "play", etc.)*.
2. (+4) The `spin button` click must attempt to initiate rotation of the wheel.
   - If the `duration` input value is greater than five seconds inclusive, the wheel should successfully initiate rotation.
   - Otherwise, the user should be notified of incorrect input *(the default form validation is enough, but you can implement a custom one if you want)*.
3. (+4) In the wheel rotation state, `spin button` must be temporarily visually disabled and must not be functioning.
4. (+4) In the initial and winning states `spin button` returns to its original state and functions as it should.

##### Sound

> Keeping or not keeping mute state between sessions is at your choice and is not evaluated on crosscheck.

1. (+1) Displays a `sound button` within the `WoF` modal window for toggling sound on/off. The appearance of this button should clearly indicate its purpose *(contain appropriate text and/or icon. e.g., "sound: on", "sound: off", "🔊", "🔇", etc.)*.
2. (+4) The `sound button` click must toggle sound on/off.
3. (+2) The `sound button` appearance must correspond to the current mute state (dynamically). *This means that if the sound is muted, the button shows that it is muted and vice versa.*
4. (+4) In the wheel rotation state, `sound button` must be temporarily visually disabled or hidden and must not be functioning.
5. (+4) In the initial and winning states `sound button` returns to its original state and functions as it should.

## Crosscheck Evaluation

- Submit app for crosscheck according to [Submission Requirements](#repository-and-submission-requirements).
- Evaluation is based on [Functional Requirements](#functional-requirements-256).
- Check on the latest version of the “google chrome” browser.

## Crosscheck Penalties (Up to -100%)

- (-100%) Non-empty `<body>` in the `index.html` (only `<script>` tag is allowed).
- (-50) The app is not supported at `640px <= width <= 1280px` at least *(e.g., DOM elements go out of the bounds of parent elements, overlap, etc.)*.
- (-100%) Using `alert`, `prompt`, `confirm`.
- (-10 per error) For repeated app errors, the deduction is only allowed once for each distinct kind of error.

## Mentor review Evaluation

- Submit app for mentor review according to [Submission Requirements](#repository-and-submission-requirements).
- Evaluation is based on [Technical Requirements](#technical-requirements-160).

## Mentor/Moderation Penalties (Up to -100%)

- (up to -100%) [Repository and Submission Requirements](#repository-and-submission-requirements) not met.
- (-100%) The application is not written in TypeScript.
- (-100%) Prohibited libraries are used.
- (-70%) Use of innerHTML or DOM search methods (querySelector*, getElement*, etc.).
- (-5 per error) Every error related to linters, TypeScript, or Prettier results in a 5 point penalty.
- (-5 per instance) Each use of any in a project results in a 5 point penalty.
- (-5 per instance) Each use of type assertion in a project results in a 5 point penalty.
- (up to -50) There are unresolved mentor comments on the quality of the code or the content of the configs.

## Useful links

- [Creating markup with JS](https://gist.github.com/TELEUZI/410d19772481d98b06e0b41ebf89fff1)
- [Comparing Methods for Appending and Inserting With JavaScript](https://css-tricks.com/comparing-methods-for-appending-and-inserting-with-javascript/)
- [MDN: \<dialog\>](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dialog)
- [MDN: Canvas API](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API)
- [MDN: File API](https://developer.mozilla.org/en-US/docs/Web/API/File_API/Using_files_from_web_applications)
- [MDN: Web Animations API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Animations_API)
- [JavaScript animations](https://javascript.info/js-animation)
- [Easings](https://easings.net/)
- [TS: Type Guards](https://www.typescriptlang.org/docs/handbook/2/narrowing.html)
- [There is no point in using TypeScript if you don’t care about types](https://javascript.plainenglish.io/there-is-no-point-to-use-typescript-in-your-project-if-you-dont-care-about-types-68131deeb43a)
- [Prettier: Integrating with Linters](https://prettier.io/docs/en/integrating-with-linters.html)

## Assignment Feedback

[Feedback](https://forms.gle/LZ8jYqKueJpCrqSR7) | [Q&A (form)](https://forms.gle/GvhN7VPSCGPyb6ad8) | [Q&A (answers)](https://docs.google.com/spreadsheets/d/1MZMyL9h9zK6flH3QGuX_7FkrXnRkMOZtbQw5ITsBp-g/pubhtml?gid=1977116421&single=true)
