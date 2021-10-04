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
