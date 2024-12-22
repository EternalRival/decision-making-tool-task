# Decision Making Tool

## Functional Requirements

### List of Options (85 points)

#### General (9/85)

1. (+1) Displays the app's name.
2. (+2) Displays the list of options.
3. (+2) In the `initial state`, the list of options contains 1 empty option *(`{"id": "#1", "title": "", "weight": ""}`)*. *The `initial state` here means the state of the application when the user first encounters it (this can be simulated by pre-closing all current incognito tabs, if any, and opening a new one.*
4. (+2) Current options must remain the same *(not reset, not shuffled)* when reloading the page.
5. (+2) Current options must remain the same *(not reset, not shuffled)* when closing a tab/window and opening it in a new one.

#### Option (22/85)

> Refers to any displayed options in the list, including all created and inserted options.

##### `id`

1. (+1) Each option's `id` must be displayed.
2. (+2) Each option's `id` must be unique.
3. (+2) Each option's `id` must be in `#n` format *(`#1`, `#2`, `#3`, and so on)*.
4. (+2) Each option's `id` must be generated programmatically at creation *(user cannot change it directly in this element)*.
5. (+2) When the list of options becomes completely empty, the `id` counter must be reset.

##### `title`

1. (+1) Each option's `title` must be displayed.
2. (+2) Each option's `title` must be able to be edited by the user.

##### `weight`

1. (+1) Each option's `weight` must be displayed.
2. (+2) Each option's `weight` must be able to be edited by the user.
3. (+2) Each option's `weight` must take only numbers.

##### `delete button`

1. (+1) Each option's `delete button` must be displayed. The appearance of this button should clearly indicate its purpose *(contain appropriate text and/or icon. e.g., "delete", "remove", etc.)*.
2. (+2) Option's `delete button` click must delete the current option from the list.

##### Option columns

1. (+2) The width of the "columns" ([`id`](#id), [`title`](#title), [`weight`](#weight), [`delete button`](#delete-button)) should match in "rows" ([`option`](#option-2285)). *(`flex`/`grid`/`table` can be useful here. How you do it is up to you.)*

#### List Buttons (30/85)

##### Add option

1. (+1) Displays an `add option button` for creating a "new option". The appearance of this button should clearly indicate its purpose *(contain appropriate text and/or icon. e.g., "add option", "new option", "+", etc.)*.
2. (+2) The `add option button` click must create a "new option" (empty `title`, empty `weight`) and add it to the bottom of the list.

##### Paste list

1. (+1) Displays a `paste list button` for displaying the `paste list` modal window. The appearance of this button should clearly indicate its purpose *(contain appropriate text and/or icon. e.g., "paste list", "load list from clipboard", etc.)*.
2. (+2) The `paste list button` click must open the `paste list` modal window.

##### Clear list

1. (+1) Displays a `clear list button` for removing all options from the list. The appearance of this button should clearly indicate its purpose *(contain appropriate text and/or icon. e.g., "clear list", "reset list", etc.)*.
2. (+2) The `clear list button` click must remove all current options from the list.

##### Save list to json

1. (+1) Displays a `save list button` for saving all current options to the `.json` file. The appearance of this button should clearly indicate its purpose *(contain appropriate text and/or icon. e.g., "save list to file", "save list as json", etc.)*.
2. (+2) The `save list button` click must collect the all current options data, convert it to a json object and save it to a `.json` file.
3. (+2) The `id`, `title` and `weight` values of options must be saved.
4. (+2) The order of options in the file must match the order of options in the app.

##### Load list from json

1. (+1) Displays a `load list button` for loading options from the `.json` file. The appearance of this button should clearly indicate its purpose *(contain appropriate text and/or icon. e.g., "load list from file", "load list from json", etc.)*.
2. (+2) The `load list button` click must open the interface to select the file.
3. (+2) The type of files to be selected must be limited to a single file of type `.json`.
4. (+2) The current list of options must be completely replaced by the list from the `.json` file you uploaded *(your app must be able to read and correctly parse the file created by your `save list button` click)*.
5. (+2) The order of options in the app must match the order of options in the file.

##### Start

1. (+1) Displays a `start button` for navigating to the [`Decision picker`](#decision-picker-105-points). The appearance of this button should clearly indicate its purpose *(contain appropriate text and/or icon. e.g., "start", "pick decision", "open decision picker", etc.)*.
2. (+2) The `start button` click must open the `Decision picker` page if there are at least two `valid options`. An option is considered valid if its [`title`](#title) is not empty and its [`weight`](#weight) is greater than `0`.
3. (+2) The `start button` click must open the `add valid options` modal window, instructing the user to add at least two `valid options` if there are less than two `valid options` in the list. An option is considered valid if its [`title`](#title) is not empty and its [`weight`](#weight) is greater than `0`.

#### Paste list modal (15/85)

> Great place to get familiar with the `<dialog>` element, but the old-fashioned `div.modal>div.modal-content` pattern is ok too as long as it meets the requirements

1. (+1) The `paste list` modal window must display a `paste field` element for inserting new options data as text in a CSV-like format
2. (+1) The `paste list` modal window should display its `confirm button`. The appearance of this button should clearly indicate its purpose *(contain appropriate text or icon. e.g., "Confirm", "Submit", "✔", etc.)*.
3. (+1) The `paste list` modal window should display its `cancel button`. The appearance of this button should clearly indicate its purpose *(contain appropriate text or icon. e.g., "Cancel", "Close", "⨉", "x", etc.)*.
4. (+2) The `paste field` element must be able to be edited by the user.
5. (+2) The `confirm button` click must parse the text from the `paste field`, create `new options` from that data and add those `new options` to the bottom of the list as well as close the `paste list` modal window.
6. (+2) The `cancel button` click must close the `paste list` modal window without affecting the list.
7. (+2) The `escape key press` must close the `paste list` modal window without affecting the list.
8. (+2) The `outside click` must close the `paste list` modal window without affecting the list.
9. (+2) An opened `paste list` modal window must block the page scrolling until the modal window is closed.
10. (+2) Closing `paste list` modal window must also remove it from the DOM.

#### Add valid options modal (9/85)

> Great place to get familiar with the `<dialog>` element, but the old-fashioned `div.modal>div.modal-content` pattern is ok too as long as it meets the requirements

1. (+1) The `add valid options` modal window should display its `close button`. The appearance of this button should clearly indicate its purpose *(contain appropriate text or icon. e.g., "Close", "Cancel", "⨉", "x", etc.)*.
2. (+2) The `close button` click must close the modal window.
3. (+2) The `escape key press` must close the modal window.
4. (+2) The `outside click` must close the modal window.
5. (+2) An opened `add valid options` modal window must block the page scrolling until the modal window is closed.
6. (+2) Closing `add valid options` modal window must also remove it from the DOM.

### Decision picker (105 points)

> Briefly, the states mentioned below are:
>
> 1. `Decision Picker` page opened - the decision picker is in the `initial state`.
>
> 2. A successful start of picking process has been initiated - the decision picker is in the `picking state`.
>
> 3. The picking process has finished and the picked option has been determined - the decision picker is in the `picked state`.
>
> After that `picking state` and `picked state` cyclically change each other according to points 2 and 3.
>
> If the `Decision Picker` page was closed and reopened, the life cycle starts again with `initial state`.

#### General (1/105)

1. (+1) Displays the app's name.

#### Interactions (40/105)

##### Back

1. (+1) Displays a `back button` for navigating to the [`List of Options`](#list-of-options-85-points). The appearance of this button should clearly indicate its purpose *(contain appropriate text or icon. e.g., "Back", "⬅", "↖" etc.)*.
2. (+2) The `back button` click must open the `List of Options` page.
3. (+2) In the `picking state` `back button` must be temporarily visually disabled and must not be functioning.
4. (+2) In the `initial and picked states` `back button` returns to its original state and functions as it should.

##### Sound

1. (+1) Displays a `sound button` for toggling sound on/off. The appearance of this button should clearly indicate its purpose *(contain appropriate text and/or icon. e.g., "sound: on", "sound: off", "🔊", "🔇", etc.)*.
2. (+2) The `sound button` click must toggle sound on/off.
3. (+2) The `sound button` appearance must correspond to the current `mute state` (dynamically). *This means that if the sound is muted, the button shows that it is muted and vice versa.*
4. (+2) The `mute state` must remain the same when reloading the page.
5. (+2) The `mute state` must remain the same when closing a tab/window and opening it in a new one.
6. (+2) In the `picking state` `sound button` must be temporarily visually disabled and must not be functioning.
7. (+2) In the `initial and picked states` `sound button` returns to its original state and functions as it should.

##### Duration

1. (+1) Displays a `duration` `<input>` element for setting the rotation duration in seconds. The appearance of this input should clearly indicate its purpose *(contain appropriate label and/or placeholder. e.g., "⏲", "duration", "time", "seconds", etc.)*
2. (+2) `duration` element must be able to be edited by the user.
3. (+2) `duration` element must take only numbers.
4. (+2) `duration` element must have a default value, which should be between 5 and 30 seconds.
5. (+2) In the `picking state`, `duration` element must be temporarily visually disabled and must not be functioning.
6. (+2) In the `initial and picked states` `duration` element returns to its original state and functions as it should.

##### Pick

1. (+1) Displays a `pick button` for start picking process. The appearance of this button should clearly indicate its purpose *(contain appropriate text and/or icon. e.g., "▶", "pick", "start", etc.)*.
2. (+2) The `pick button` click must initiate the picking process if the `duration` input value is greater than five seconds inclusive.
3. (+2) The `pick button` click must notify the user of an incorrect input. *(the default form validation is enough, but you can implement a custom one if you want.)*
4. (+2) In the `picking state`, `pick button` must be temporarily visually disabled and must not be functioning.
5. (+2) In the `initial and picked states` `pick button` returns to its original state and functions as it should.

#### Picked option (11/105)

1. (+1) Displays a `picked option` element.
2. (+2) In the `initial state`, `picked option` must display an appropriate message inviting the player to initiate the picking process.
3. (+2) In the `picking state`, `picked option` must **dynamically** display the `title` of the option currently pointed to by the wheel `cursor`.
4. (+2) In the `picked state`, `picked option` must display the `title` of the option currently pointed to by the wheel `cursor`.
5. (+2) In the `initial and picking states`, the `picked option` must not be highlighted.
6. (+2) In the `picked state`, the `picked option` must be highlighted.

#### Wheel (53/105)

##### General

1. (+1) Displays the `wheel` single `<canvas>` element.

##### Option section

1. (+2) The `wheel` element must display options as sections of a circle.
2. (+2) The order of `option sections` on the `wheel` element must be randomized when the page is opened and not change until it is closed.
3. (+2) The fill color of each `option section` must be randomly generated when the page is opened and not change until it is closed.
4. (+8) The width (angle) of each `option section` must depend on the `weight` field of the option. *The main idea of this feature is that by setting the weight value of the option we can adjust the chance of that particular option being picked. That is, the higher the weight of the option, the wider its section, and therefore the higher the chance of being picked.*
5. (+2) Each `option section` must have a visual boundary to distinguish it from other elements (e.g., adjacent sections, cursor, center element), even if their fill colors are similar. *(Additional stroke, shadow, fill can be useful here.)*

##### Option section title

1. (+2) Each `option section` must display the `title` value of the option as text (except in the case described in the next bullet point). The text should be placed in the section from the center of the wheel to the edge (or from the edge to the center).
2. (+2) Each `option section title` must not violate the boundaries of its section. If the width (angle) of the section is not wide enough to display the text, the text must not be displayed.
3. (+2) Each `option section title` must not violate the boundaries of wheel. If `title` is too long, it should be clipped and end with ellipsis *(e.g., `"some very very long title" -> "some very very long t…"`)*.
4. (+2) Each displayed `option section title` must have a visual boundary to distinguish it from the randomized `option section` fill color. *(Additional stroke, shadow, fill can be useful here.)*

##### Center element

1. (+2) In the center of the `wheel`, there must be a decorative element to hide the point of contact between all the option sections *(e.g., a small circle, star, image, etc.)*.
2. (+2) The `center element` must have a visual boundary to distinguish it from other elements (e.g., adjacent sections), even if their fill colors are similar. *(Additional stroke, shadow, fill can be useful here.)*

##### Cursor

1. (+2) The `wheel` element must display a `cursor` that points to the current option. It can be designed in the form of a triangle, arrow or any similar figure with a clearly defined pointer.
2. (+2) The `cursor` must be placed at any position on the edge of the `wheel` and not overlapped by other elements.
3. (+2) The `cursor` must have a visual boundary to distinguish it from other elements (e.g., adjacent sections, background), even if their fill colors are similar. *(Additional stroke, shadow, fill can be useful here.)*

##### Decision Picking

1. (+2) When decision picking is initiated, the wheel must start rotating and stop after a short duration.
2. (+2) The rotation duration must be specified by the `duration` element. That is, it should correspond to its value (in seconds) at the moment of rotation start. *Be loyal when crosschecking. A small inaccuracy is acceptable. There is no need to reduce points for a difference of a couple of seconds.*
3. (+2) The rotation should have a non-linear velocity. Use a suitable easing *(e.g. `ease-in-out` or `ease-in-out-back` with a tiny magnitude)*.
4. (+2) The wheel must perform several full turns (minimum 5) and stop at a randomly picked option.
5. (+2) A `finish sound` must be played when `picking state` is changed to `picked state` if `mute state` is toggled `on`.
6. (+2) A `finish sound` must not be played  if `mute state` is toggled `off`.
7. (+2) In the `picking state`, `option sections` must not change their order, shape, color. *It means that visually the `option sections` shall rotate as an indivisible whole wheel.*
8. (+2) In the `picking state`, each `option section title` shall not change its location relative to the boundaries of its `option section`. *It means that visually `option section title` and `option section` should rotate as an indivisible element.*
9. (+2) In the `picking state`, the `cursor` must stay in its place and not rotate.

### SPA Routing ( points)

#### TODO (/)
