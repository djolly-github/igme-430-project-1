// converts numerical code to status message
// code: status number code
const getStatus = (code, method) => {
  switch (code) {
    case 200:
      return 'Completed Successfully';
    case 201:
      return 'Created Successfully';
    case 204:
      return (method || '') === 'POST' ? 'Character Updated' : 'Character Exists';
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

// validates the right panel inputs
const validate = () => {
  if ((document.querySelectorAll('input:invalid') || []).length > 0) {
    return false;
  }
  return true;
};

// gets the currently selected indices from the left panel as array [species,pattern,outfit,weapon] e.g. [3,2,0,1]
const getCurrentValues = () => [
  controls.selectorSpecies.dataset.selected,
  controls.selectorPattern.dataset.selected,
  controls.selectorOutfit.dataset.selected,
  controls.selectorWeapon.dataset.selected,
];

// gets the current stat values in the right panel as a key-value object
const getCurrentStats = () => {
  return {
    per: controls.characterStats.per.control.value,
    wit: controls.characterStats.wit.control.value,
    wil: controls.characterStats.wil.control.value,
    end: controls.characterStats.end.control.value,
    str: controls.characterStats.str.control.value,
    agi: controls.characterStats.agi.control.value,
  }
};

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

// updates a group in the left panel based on the button caller that called this method
const updateLeftPanelSelections = (caller) => {
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
}

// updates a provided group in the left panel with the index of the selection
const updateLeftPanelByIndex = (group, index) => {
  updateLeftPanelSelections(group.children[index]);
}

// sets the background image positions for the right panel images (should run on left panel changes)
// currentValues: array returned by getCurrentValues
const setRightPanelImages = (currentValues) => {
  for (let i = 0; i < controls.selectorImages.length; i++) {
    controls.selectorImages[i].style.backgroundPosition = `${25 * currentValues[i]}% ${25 * i}%`;
  }
};

// sets the values of the right panel stats and name
const setRightPanelFormValues = (name, stats) => {
  controls.characterName.control.value = name;
  controls.characterStats.per.control.value = stats.per;
  controls.characterStats.wit.control.value = stats.wit;
  controls.characterStats.wil.control.value = stats.wil;
  controls.characterStats.end.control.value = stats.end;
  controls.characterStats.str.control.value = stats.str;
  controls.characterStats.agi.control.value = stats.agi;
};
