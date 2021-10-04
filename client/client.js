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

// converts numerical code to status message
// code: status number code
const getStatus = (code) => {
  switch (code) {
    case 200:
      return 'Completed Successfully';
    case 201:
      return 'Created Successfully';
    case 204:
      return 'Character Exists';
    case 400:
      return 'Invalid Data';
    case 404:
      return 'Does Not Exist';
    case 500:
      return 'Server Error';
    case 501:
      return 'Not Implemented';
    default:
      return 'Unknown Status';
  }
};

// gets the currently selected indices from the left panel as array [species,pattern,outfit,weapon] e.g. [3,2,0,1]
const getCurrentValues = () => [
  controls.selectorSpecies.dataset.selected,
  controls.selectorPattern.dataset.selected,
  controls.selectorOutfit.dataset.selected,
  controls.selectorWeapon.dataset.selected,
];

// updates the various background image urls to the selected species tilesheet (should run on species change)
// urlToUse: string of image url, i.e. <species>.png e.g. werewolf.png
const replaceUrl = (urlToUse) => {
  // until I remember how to concat NodeLists (thanks W3C(?)) this will have to be anti-DRY at the moment
  const patterns = controls.selectorPattern.querySelectorAll('.portrait > div');
  const outfits = controls.selectorOutfit.querySelectorAll('.portrait > div');
  const weapons = controls.selectorWeapon.querySelectorAll('.portrait > div');

  patterns.forEach((child) => {
    child.style.backgroundImage = `url(${urlToUse})`;
  });

  outfits.forEach((child) => {
    child.style.backgroundImage = `url(${urlToUse})`;
  });

  weapons.forEach((child) => {
    child.style.backgroundImage = `url(${urlToUse})`;
  });

  controls.selectorImages.forEach((child) => {
    child.style.backgroundImage = `url(${urlToUse})`;
  });
};

// sets the background image positions for the right panel images (should run on left panel changes)
// currentValues: array returned by getCurrentValues
const setRightPanelImages = (currentValues) => {
  for (let i = 0; i < controls.selectorImages.length; i++) {
    controls.selectorImages[i].style.backgroundPosition = `${25 * currentValues[i]}% ${25 * i}%`;
  }
};

// sets up the images on the left panel (should only run on init)
// group: the container div to attach child options
// optionsForGroup: array of strings representing available options for that group
// rowInSheet: the index representation of the group for tilesheet vertical positioning
const setupImages = (group, optionsForGroup, rowInSheet) => {
  for (let i = 0; i < optionsForGroup.length; i++) {
    // create element .portrait
    const el = document.createElement('div');
    el.classList.add('portrait');

    // embedded style options which depend on code and/or get updated often
    const pos = `background-position: ${25 * i}% ${25 * rowInSheet}%`;
    const size = `background-size: ${16*optionsForGroup.length}vh`;
    const url = `background-image: url(werewolf.png)`;

    // set the innerHTML as a div with the above style options and a p describing the option
    el.innerHTML = `
      <div
        style="${pos}; ${size}; ${url};"
      ></div>
      <p>${optionsForGroup[i]}</p>
    `;

    // add the new element to the group
    group.appendChild(el);
  }
};

// adds button-like functionality to each image group on the left panel (should only run on init)
// group: the container div with child options
// key: the name of the group in controls, i.e. controls[key]
const setupSelectors = (group, key) => {
  // set the default selection to 0 and ensure the first .portrait has the selected class
  group.dataset.selected = 0;
  const children = group.querySelectorAll('.portrait');
  children[0].classList.add('selected');

  // loop over each option
  for (let i = 0; i < children.length; i++) {
    // value is the current index of the child, used for options[group][dataset.value]
    children[i].dataset.value = i;
    // target is the group's key identifier, used for referencing back to it in onclick handler
    children[i].dataset.target = key;

    children[i].addEventListener('click', (e) => {
      // ensure the caller is the correct container
      // click often selects image/span rather than the containing div
      let caller = e.target;
      if (!caller.classList.contains('portrait')) {
        caller = caller.parentNode;
      }
      // set the controls parent group value
      // to the value of the event target
      // using event target's target as key
      controls[caller.dataset.target].dataset.selected = caller.dataset.value;

      // update selected class on all children
      for (const child of controls[caller.dataset.target].children) {
        child.classList.remove('selected');
      }
      caller.classList.add('selected');

      // if the caller was from the species group, update the background image urls to the new species
      if (caller.dataset.target === 'selectorSpecies') {
        replaceUrl(`${options.species[caller.dataset.value].replace(' ', '_')}.png`);
      }

      // update the right panel tilesheet positions
      setRightPanelImages(getCurrentValues());
    });
  }
};

// validates the right panel inputs
const validate = () => {
  if ((document.querySelectorAll('input:invalid') || []).length > 0) {
    return false;
  }
  return true;
};

window.onload = () => {
  // reference left/right hand selectors
  controls.selectorSpecies = document.querySelector('#selector-species');
  controls.selectorPattern = document.querySelector('#selector-pattern');
  controls.selectorOutfit = document.querySelector('#selector-outfit');
  controls.selectorWeapon = document.querySelector('#selector-weapon');
  controls.selectorImages = document.querySelectorAll('#panel-right .preview div');

  // setup images
  setupImages(controls.selectorSpecies, options.species, 0);
  setupImages(controls.selectorPattern, options.pattern, 1);
  setupImages(controls.selectorOutfit, options.outfit, 2);
  setupImages(controls.selectorWeapon, options.weapon, 3);
  controls.selectorImages.forEach((child) => {
    child.style.backgroundImage = 'url(werewolf.png)';
  });

  // setup selectors defined earlier now that images are set up
  setupSelectors(controls.selectorSpecies, 'selectorSpecies');
  setupSelectors(controls.selectorPattern, 'selectorPattern');
  setupSelectors(controls.selectorOutfit, 'selectorOutfit');
  setupSelectors(controls.selectorWeapon, 'selectorWeapon');

  setRightPanelImages(getCurrentValues());

  // default tippy.js options that apply to all tooltips
  const defaultTooltipOptions = {
    allowHTML: true,
    animateFill: true,
    animation: 'shift-away',
    appendTo: () => document.body,
    followCursor: 'horizontal',
    inertia: true,
    interactive: true,
    maxWidth: 300,
  };

  // init/reference header controls
  controls.headerCheck = {
    control: document.querySelector('#in-check'),
    tooltip: tippy('#in-check', {
      ...defaultTooltipOptions,
      content: 'Check whether the character with the inputted name exists<br/>DEV NOTE: Performs <code>HEAD</code> request',
    }),
  };
  controls.headerLoad = {
    control: document.querySelector('#in-load'),
    tooltip: tippy('#in-load', {
      ...defaultTooltipOptions,
      content: 'Loads a character into the creator (assuming the inputted name exists)<br/>DEV NOTE: Performs <code>GET</code> request',
    }),
  };
  controls.headerFind = {
    control: document.querySelector('#in-find'),
    tooltip: tippy('#in-find', {
      ...defaultTooltipOptions,
      content: 'The name of the character to search/load (case and space sensitive)',
    }),
  };
  controls.headerStatus = {
    control: document.querySelector('#out-header-status span'),
    tooltip: {},
  };

  // init/reference right panel controls
  controls.characterName = {
    control: document.querySelector('#in-name'),
    tooltip: tippy('#in-name', {
      ...defaultTooltipOptions,
      content: 'The name of the character (will be case/space sensitive when searching)',
    }),
  };
  controls.characterSave = {
    control: document.querySelector('#in-save'),
    tooltip: tippy('#in-save', {
      ...defaultTooltipOptions,
      content: 'Saves the character',
    }),
  };
  controls.characterReset = {
    control: document.querySelector('#in-reset'),
    tooltip: tippy('#in-reset', {
      ...defaultTooltipOptions,
      content: 'Resets all stat/name inputs back to default',
    }),
  };
  controls.characterStats = [
    {
      control: document.querySelector('#in-stat-per'),
      tooltip: tippy('#in-stat-per', {
        ...defaultTooltipOptions,
        content: 'Character\'s perception',
      }),
    },
    {
      control: document.querySelector('#in-stat-wit'),
      tooltip: tippy('#in-stat-wit', {
        ...defaultTooltipOptions,
        content: 'Character\'s wit',
      }),
    },
    {
      control: document.querySelector('#in-stat-wil'),
      tooltip: tippy('#in-stat-wil', {
        ...defaultTooltipOptions,
        content: 'Character\'s will',
      }),
    },
    {
      control: document.querySelector('#in-stat-end'),
      tooltip: tippy('#in-stat-end', {
        ...defaultTooltipOptions,
        content: 'Character\'s endurance',
      }),
    },
    {
      control: document.querySelector('#in-stat-str'),
      tooltip: tippy('#in-stat-str', {
        ...defaultTooltipOptions,
        content: 'Character\'s strength',
      }),
    },
    {
      control: document.querySelector('#in-stat-agi'),
      tooltip: tippy('#in-stat-agi', {
        ...defaultTooltipOptions,
        content: 'Character\'s agility',
      }),
    },
  ];

  // set right panel listeners
  controls.characterSave.control.addEventListener('click', (e) => {
    if (validate()) {
      controls.headerStatus.control.innerHTML = getStatus(501);
    } else {
      controls.headerStatus.control.innerHTML = getStatus(400);
    }
  });
  controls.characterReset.control.addEventListener('click', (e) => {
    controls.characterName.control.value = '';
    controls.characterStats.forEach((controlRef) => {
      controlRef.control.value = 0;
    });
  });
};