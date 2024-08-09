# Wheel of fortune

## Description

Your task is to implement an single page application (SPA) for drawing lots using the wheel of fortune (hereafter `WoF`).

The application consists of two parts.

The first part of the application allows you to edit the list of lots (sections of `WoF`), as well as to save it to a file and load it from a file. There is also a button to go to `WoF` itself.

The second part of the application allows you to see the previously created list as `WoF` itself. There is also an element for displaying the selected lot, a button to start `WoF` rotation and a user-friendly option to return to the first part of the application (the list of lots).

## Demo

<https://er-wof-demo.netlify.app/>

## Task Objectives

- Acquire or refine skills in creating, modifying, and deleting HTML elements dynamically using code.
- Practice storing user input between sessions (e.g., via `Web Storage API`).
- Learn to collect and save user input data to a file.
- Learn to load and process data from a file (e.g., via `File API`).
- Familiarize yourself with Canvas API.
- Practice with animations. (e.g., via `Web API`'s `requestAnimationFrame`, `Animations API`, etc.)

## Functional requirements

### List of lots

#### General

1. Displays the app's name.
2. Displays the list of lots.
3. In the `initial state`, the list contains 1 empty lot (id === `#1`, empty `title` and `weight`). The `initial state` means the state of the application when the user first encounters it (this can be simulated by pre-closing all current incognito tabs, if any, and opening a new one).
4. Current lots must remain the same (not reset, not shuffled) when reloading the page.
5. Current lots must remain the same (not reset, not shuffled) when closing a tab/window and opening it in a new one.

#### Lot

##### `id`

1. Each lot's `id` must be displayed.
2. Each lot's `id` must be unique.
3. Each lot's `id` must be in `#n` format (`#1`, `#2`, `#3`, etc.).
4. Each lot's `id` must be generated programmatically at creation and the user has no possibility to change it manually.

##### `title`

1. Each lot's `title` must be displayed.
2. Each lot's `title` must be able to be edited by the user.

##### `weight`

1. Each lot's `weight` must be displayed.
2. Each lot's `weight` must be able to be edited by the user.
3. Each lot's `weight` must take only numbers.

##### `delete button`

1. Each lot's `delete button` must be displayed. The appearance of this button should clearly indicate its purpose (contain appropriate text and/or icon. e.g., "delete", "remove", etc.).
2. Lot's `delete button` click must delete the current lot from the list.
3. When the last lot is deleted (if the list has become completely empty), the id count must be reset.

##### Lot columns

1. The width of the "columns" ([`id`](#id), [`title`](#title), [`weight`](#weight), [`delete button`](#delete-button)) should match in "rows" ([lots](#lot)). (`flex`/`grid`/`table` can be useful here. How you do it is up to you.)

#### List Buttons

##### New lot

1. Displays a `add lot button` next to the list of lots for creating a "new lot". The appearance of this button should clearly indicate its purpose (contain appropriate text and/or icon. e.g., "add lot", "new lot", "+", etc.).
2. The `add lot button` click must create a "new lot".
3. "New lot" must have a unique `id`.
4. "New lot" must have an empty `title`.
5. "New lot" must have an empty `weight`.
6. "New lot" must have a `delete button`.
7. "New lot" must meet the [#Lot](#lot) requirements ([`id`](#id), [`title`](#title), [`weight`](#weight), [`delete button`](#delete-button) and [Lot columns](#lot-columns) requirements).

##### Clear list

1. Displays a `clear list button` next to the list of lots for removing all lots from the list. The appearance of this button should clearly indicate its purpose (contain appropriate text and/or icon. e.g., "clear list", "reset list", etc.).
2. The `clear list button` click must remove all current lots from the list.
3. In addition to clearing the list, an empty "new lot" with `id` `#1` should be added to the list (as at `initial state` or as if the `add lot button` was used when the list is completely empty).

##### Save list to file

1. Displays a `save list button` next to the list of lots for saving all current lots to the `.json` file. The appearance of this button should clearly indicate its purpose (contain appropriate text and/or icon. e.g., "save list to file", "save list as json", etc.).
2. The `save list button` click must collect the current lots data, convert it to a json object and save it to a `.json` file.
3. The `title` and `weight` values of lots must be saved.
4. The order of lots in the file must match the order of lots in the app.

##### Load list from file

1. Displays a `load list button` next to the list of lots for loading lots from the `.json` file. The appearance of this button should clearly indicate its purpose (contain appropriate text and/or icon. e.g., "load list from file", "load list from json", etc.).
2. The `save list button` click must open the interface to select the file.
3. The type of files to be selected must be limited to a single file of type `.json`.
4. The current list of lots must be completely replaced by the list from the `.json` file you uploaded (your app must be able to read and correctly parse the file created by your `save list button` click).
5. The order of lots in the app must match the order of lots in the file. The `id` of lots must be newly generated.
6. Each "loaded lot" must meet the [#Lot](#lot) requirements ([`id`](#id), [`title`](#title), [`weight`](#weight), [`delete button`](#delete-button) and [Lot columns](#lot-columns) requirements).

##### Start

1. Displays a `start button` next to the list of lots for displaying the `WoF` generated by the data from the list of current lots. The appearance of this button should clearly indicate its purpose (contain appropriate text and/or icon. e.g., "start", "play", "open wheel of fortune", etc.).
2. The `start button` click must open `WoF` modal window.
3. The list of current lots passed to the modal window must be filtered and contain only valid lots. A lot is considered valid if its [`title`](#title) is not empty and its [`weight`](#weight) is greater than `0`.

### WoF Modal

#### General

1. Displays the `WoF` modal window if the number of valid lots is two or more.
2. Displays a modal window asking to add at least 2 valid lots if the number of valid lots is less than two.

#### Wheel

1. TBD

#### Selected lot

1. Displays a `selected lot` element next to the wheel.
2. In the wheel initial state, `selected lot` must display the `title` of the lot currently pointed to by the wheel cursor.
3. In the wheel rotation state, `selected lot` must **dynamically** display the `title` of the lot currently pointed to by the wheel cursor.
4. In the wheel winning state, `selected lot` must display the `title` of the lot currently pointed to by the wheel cursor.
5. In the initial and rotation states, the `selected lot` must not be highlighted.
6. In the winning state, the `selected lot` must be highlighted.

#### Interactions

##### Close button

1. Displays a `close button` in the upper right corner of modal window for returning to the [list of lots](#list-of-lots). The appearance of this button should clearly indicate its purpose (contain appropriate text or icon. e.g., "⨉", "x", etc.).
2. The `close button` click must close `WoF` view and return the user to the [list of lots](#list-of-lots).
3. In the wheel rotation state, `close button` must be temporarily visually disabled or hidden and must not be functioning.
4. In the initial and winning states `close button` returns to its original state and functions as it should.

##### Outside click

1. The `outside click` must close `WoF` view and return the user to the [list of lots](#list-of-lots).
2. In the wheel rotation state, the `outside click` functionality must be temporarily disabled.
3. In the initial and winning states `outside click` functions as it should.

##### Spin

1. Displays a `spin button` next to the `wheel` for start rotation of the wheel. The appearance of this button should clearly indicate its purpose (contain appropriate text and/or icon. e.g., "spin", "play", etc.).
2. The `spin button` click must initiate rotation of the wheel.
3. In the wheel rotation state, `spin button` must be temporarily visually disabled and must not be functioning.
4. In the initial and winning states `spin button` returns to its original state and functions as it should.

## Useful links

- [Creating markup with JS](https://gist.github.com/TELEUZI/410d19772481d98b06e0b41ebf89fff1)
- [MDN: Canvas API](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API)
- [MDN: File API](https://developer.mozilla.org/en-US/docs/Web/API/File_API/Using_files_from_web_applications)
- [MDN: Web Animations API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Animations_API)
- [JavaScript animations](https://javascript.info/js-animation)
