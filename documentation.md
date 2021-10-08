# Cryptid Keeper

## About

Cryptid Keeper is a web app for designing a cryptid based on a set amount of designs giving it stats and a name. Can have use for RPG purposes or just for fun for fans of cryptids.

## API

The server-side API handles the storing, retaining, and retrieval of cryptids.

## Right/Wrong

### What Went Right

- The tile sheets / positioning (other than some very hairline pixel issues because of browser limitations)
- Server-side POST/GET/HEAD for characters worked almost immediately without issue (meaning things were set up well initially)

### What Went Wrong

- Front end took way too long to create (about 70-80% of development time went into it, with several hours going into the tile sheets alone)
- Couldn't implement radar chart for stats in time (this was originally planned but there were time issues + issues related to this development environment and what it requires)
- Not mobile friendly (landscape somewhat works besides some text overflow portrait is completely broken)

## Further Improvements

- Convert numeric inputs to radar chart
- PixiJS for character output (to overcome browser limitations causing pixel issues)
- More things for the user to customize besides stats (items? loadouts? advantages and disadvantages?)
- Cleaner way of html/image responses

## Above and Beyond

- Custom tile sheets with positioning maths to make the designer flexible and optimized (i.e. without tons of variations or files)
- Use tippy.js for adding tooltips to various UI elements

## Misc Notes

- Validation is handled client-side *and* server-side. Server-side invalid data shouldn't occur because client-side already handles it, but server-side's check occurs at (and has been confirmed to work) at server.js:91-97 (client-side is client.js:73-78) (don't know if client-side validation counts as above and beyond especially since it's very basic, moreso noting since it might be harder to test the server API for ERR 400)
- Entering a non-existing character in search returns 404 (so does, well, going to a random URL)
- Using "Check" performs HEAD request (201 if exists, 404 if doesn't)
- Using "Load" performs GET request (200 if exists, 404 if doesn't)
- Using "Save" performs POST request (201 for new characters, 204 for updated characters, 400 if somehow the data wasn't valid)
- (reset just resets UI)
- Status messages are set from codes by client* and put in the top right (* in the case of 204, method is also used to determine if it's "Character Exists" or "Character Updated")
- There is always a Test Character for testing (can be used to test GET URL `127.0.0.1:3000/getCharacter?name=Test Character`)

## External Resources / References

- [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript) (for general things I may have had a brain fart for, e.g. https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/findIndex)
- [Tippy.js Docs](https://atomiks.github.io/tippyjs/) (which seems to have gotten a dark theme since I looked at it a week ago...) (for properties and such to make sure things look good and consistent)

## Directories

### /src

Contains server-side code

| File (all are .js) | Description |
| :----------------- | :---------- |
| characterUtils     | Contains utility code for managing characters |
| htmlResponses      | Contains response code for serving the client's html/css/js files |
| imageResponses     | Contains response code for serving the client's image files |
| jsonResponses      | Contains response code for responding with JSON |
| responseUtils      | Contains intermediate utility code related to server responses |
| server             | The main entry point for the server, handles onRequest and additionally handles parsing POST body streams |

### /client

Contains client-side code

| File             | Description |
| :--------------- | :---------- |
| *.png            | Character tilesheets |
| client.html      | Main client view |
| client.js        | (Serve Last) Main entry point for the client, handles window.onload and XHR |
| client_define.js | (Serve 1st) Defines globals for the client |
| client_setup.js  | (Serve 3rd) Provides methods for setting up the UI containers |
| client_tippy.js  | (Serve 4th) Provides setup for various UI elements which use Tippy and storing references into the UI container global |
| client_util.js   | (Serve 2nd) Provides various intermediate utility methods |
| style.css        | Client stylesheet |
