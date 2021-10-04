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

  initTippy();

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
