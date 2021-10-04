// group of controls containers/selectors
const controls = {
  // .tooltip + .control for header Check button
  headerCheck: null,
  // .tooltip + .control for header Load button
  headerLoad: null,
  // .tooltip + .control for header Find text field
  headerFind: null,
  // .tooltip + .control for header Status span (tooltip unused for now)
  headerStatus: null,
  // reference to div for species container with .portrait class div children
  selectorSpecies: null,
  // reference to div for pattern container with .portrait class div children
  selectorPattern: null,
  // reference to div for outfit container with .portrait class div children
  selectorOutfit: null,
  // reference to div for weapon container with .portrait class div children
  selectorWeapon: null,
  // reference to div for right panel of empty div children with background-images
  selectorImages: null,
  // .tooltip + .control for right panel Save button
  characterSave: null,
  // .tooltip + .control for right panel Reset button
  characterReset: null,
  // array of .tooltip + .control for right panel Stats number inputs
  characterStats: null,
  // .tooltip + .control for right panel Name text field
  characterName: null,
};

// available options for the left panel
const options = {
  species: [
    'werewolf',
    'weremoth',
    'ahool',
    'chupacabra',
    'jersey devil',
  ],
  pattern: [
    'plain',
    'light',
    'dark',
    'gradient',
    'spotted',
  ],
  outfit: [
    'nothing',
    'light robes',
    'heavy robes',
    'light armor',
    'heavy armor',
  ],
  weapon: [
    'unarmed',
    'bow',
    'daggers',
    'staff',
    'sword and shield',
  ],
};
