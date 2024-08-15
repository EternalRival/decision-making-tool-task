# Wheel of fortune

> The ToR is under development. The fulfillment scores contain placeholders, which will be changed later. Stage 2 requirements will be added later.

## Description

Your task is to implement an single page application (SPA) for drawing lots using the wheel of fortune (hereafter `WoF`).

The application consists of two parts.

The first part of the application allows you to edit the list of lots (sections of `WoF`), as well as to save it to a file and load it from a file. There is also a button to go to `WoF` itself.

The second part of the application allows you to see the previously created list as `WoF` itself. There is also an element for displaying the selected lot, a button to start `WoF` rotation and a user-friendly option to return to the first part of the application (the list of lots).

## Demo

<https://er-wof-demo.netlify.app/>

## Task Objectives

- Acquire or refine skills in creating, modifying, and deleting HTML elements dynamically using code.
- Practice storing user input between sessions *(e.g., via `Web Storage API`)*.
- Learn to collect and save user input data to a file.
- Learn to load and process data from a file *(e.g., via `File API`)*.
- Familiarize yourself with Canvas API.
- Practice with animations. *(e.g., via `Web API`'s `requestAnimationFrame`, `Animations API`, etc.)*

## Repository and Submission Requirements

- Use a [private school repository](https://docs.rs.school/#/private-repository) to develop this application.
- Use the `wheel-of-fortune` branch as your development branch.
- Your commits in the development branch should reflect the development history. Commits must follow the [guideline](https://docs.rs.school/#/git-convention).
- Use the `gh-pages` branch as the deploy branch *(e.g. via the [`gh-pages`](https://www.npmjs.com/package/gh-pages) package)*.
- Use the app **deploy link** to [submit](https://app.rs.school/course/student/cross-check-submit) the app to crosscheck in [app.rs](https://app.rs.school/course/student/cross-check-submit). **Make sure** your link is accessible to everyone by opening it in incognito mode
- Create a Pull Request from the development branch into the `main` branch and format it according to [PR requirements](https://docs.rs.school/#/pull-request-review-process?id=Требования-к-pull-request-pr). **Do not merge** the development branch into the `main` branch
- Use the **PR link** to [submit](https://app.rs.school/course/student/dashboard) the app to mentor in [app.rs](https://app.rs.school/course/student/dashboard).

## General Requirements

- `<body>` in the `index.html` must be empty (only `<script>` tag is allowed). *(You can check this with the `View page source` option in the context menu in google chrome.)*
- App must be supported at widths between `640px` and `1280px` at least *(DOM elements should not go out of bounds of parent elements, overlap, etc.)*.
- The use of `alert`, `prompt`, `confirm` is prohibited.
- App must not have unexpected errors in the console *(don't forget the favicon)*.
- The app must be supported by at least the latest version of the “google chrome” browser

## Technical Requirements

### General

- Language: Application written in TypeScript.
- Allowed: Bundlers (webpack, vite)
- Allowed: CSS modules, CSS Preprocessors (`Sass`, `Less`, `Stylus`, `PostCSS`), CSS in JS libraries (`tailwindcss`, `styled components`).
- Prohibited: Frameworks like Angular, React, Vue, etc.
- Prohibited: jQuery
- Prohibited: Third-party libraries not listed in the allowed libraries.

### Code Formatting and Linting

- TBD
- husky
- `strict: true` в конфиге ts
- `no-explicit-any` в конфиге eslint

### Code Quality

- TBD
- Код разбит на модули
- У ментора нет замечаний к качеству кода, либо все замечания ментора исправлены.

## Functional Requirements (+256)

### List of lots

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
3. (+2) When the last lot is deleted *(if the list has become completely empty)*, the id count must be reset.

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
3. (+2) In addition to clearing the list, an empty "new lot" with `id` `#1` should be added to the list *(as at `initial state` or as if the `add lot button` was used when the list is completely empty)*.

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

### WoF Modal

> Great place to get familiar with the `<dialog>` element, but the old-fashioned `div.modal>div.modal-content` pattern is ok too.
>
> Briefly, the states mentioned below are:
>
> 1. Modal window `WoF` opened - the wheel is in the `initial state`.
> 2. A successful start of rotation has been initiated - the wheel is in the `rotation state`.
> 3. The rotation has finished and the winning lot has been determined - the wheel is in the `winning state`.
> After that `rotation state` and `winning state` cyclically change each other according to points 2 and 3.
> If the modal window `WoF` was closed and reopened, the life cycle starts again with `initial state`

#### General

1. (+2) Displays the `WoF` modal window if the number of valid lots is two or more.
2. (+2) Displays a modal window asking to add at least 2 valid lots if the number of valid lots is less than two.

#### Wheel

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

1. (+1) Displays a `close button` in the upper right corner of modal window for returning to the [list of lots](#list-of-lots). The appearance of this button should clearly indicate its purpose *(contain appropriate text or icon. e.g., "⨉", "x", etc.)*.
2. (+4) The `close button` click must close `WoF` modal window and return the user to the [list of lots](#list-of-lots).
3. (+4) Closing `WoF` modal window must remove it from DOM.
4. (+4) In the wheel rotation state, `close button` must be temporarily visually disabled or hidden and must not be functioning.
5. (+4) In the initial and winning states `close button` returns to its original state and functions as it should.

##### Outside click

1. (+4) The `outside click` must close `WoF` view and return the user to the [list of lots](#list-of-lots).
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

## Crosscheck Penalties

- (-100%) Non-empty `<body>` in the `index.html` (only `<script>` tag is allowed).
- (-50) The app is not supported at widths between 640px and 1280px at least *(e.g., DOM elements go out of the bounds of parent elements, overlap, etc.)*.
- (-100%) Using `alert`, `prompt`, `confirm`.
- (-15?) App has unexpected errors in the console.

## Mentor review

- Submit app for mentor review according to [Submission Requirements](#repository-and-submission-requirements)
- TBD (менторские приколы)

## Mentor/Moderation Penalties

- TBD
- (-?) [Repository and Submission Requirements](#repository-and-submission-requirements) not met.
- (-?) [Technical Requirements](#technical-requirements) not met.

## Useful links

- [Creating markup with JS](https://gist.github.com/TELEUZI/410d19772481d98b06e0b41ebf89fff1)
- [MDN: \<dialog\>](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dialog)
- [MDN: Canvas API](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API)
- [MDN: File API](https://developer.mozilla.org/en-US/docs/Web/API/File_API/Using_files_from_web_applications)
- [MDN: Web Animations API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Animations_API)
- [JavaScript animations](https://javascript.info/js-animation)
- [Easings](https://easings.net/)
