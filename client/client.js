const xhrOnLoad = (xhr, method) => {
  controls.headerStatus.control.innerHTML = getStatus(xhr.status, method);
  if (xhr.status === 200 && xhr.response) {
    const parsedResponse = JSON.parse(xhr.response);
    updateLeftPanelByIndex(controls.selectorSpecies, parsedResponse.appearance.species);
    updateLeftPanelByIndex(controls.selectorPattern, parsedResponse.appearance.pattern);
    updateLeftPanelByIndex(controls.selectorOutfit, parsedResponse.appearance.outfit);
    updateLeftPanelByIndex(controls.selectorWeapon, parsedResponse.appearance.weapon);
    setRightPanelFormValues(parsedResponse.name, parsedResponse.stats);
    setRightPanelImages(getCurrentValues());
  }
}

const getCharacter = (isCheck) => {
  const method = isCheck ? 'HEAD' : 'GET';
  const name = controls.headerFind.control.value;
  const data = `name=${name}`;

  const xhr = new XMLHttpRequest();
  xhr.open(method, `/getCharacter?${data}`);
  xhr.setRequestHeader('Accept', 'application/json');
  xhr.onload = () => xhrOnLoad(xhr, method);
  xhr.send();
}

const saveCharacter = () => {
  const method = 'POST';
  const name = controls.characterName.control.value;
  const design = getCurrentValues();
  const stats = getCurrentStats();
  const data = `name=${name}`
    + `&species=${design[0]}&pattern=${design[1]}&outfit=${design[2]}&weapon=${design[3]}`
    + `&per=${stats.per}&wit=${stats.wit}&wil=${stats.wil}`
    + `&str=${stats.str}&end=${stats.end}&agi=${stats.agi}`;

  const xhr = new XMLHttpRequest();
  xhr.open(method, '/saveCharacter');
  xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
  xhr.setRequestHeader('Accept', 'application/json');
  xhr.onload = () => xhrOnLoad(xhr, method);
  xhr.send(data);
}

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
      //controls.headerStatus.control.innerHTML = getStatus(501);
      saveCharacter();
    } else {
      controls.headerStatus.control.innerHTML = getStatus(400);
    }
  });
  controls.characterReset.control.addEventListener('click', (e) => {
    controls.characterName.control.value = '';
    Object.keys(controls.characterStats).forEach((key) => {
      controls.characterStats[key].control.value = 0;
    });
    updateLeftPanelByIndex(controls.selectorSpecies, 0);
    updateLeftPanelByIndex(controls.selectorPattern, 0);
    updateLeftPanelByIndex(controls.selectorOutfit, 0);
    updateLeftPanelByIndex(controls.selectorWeapon, 0);
    setRightPanelImages(getCurrentValues());
  });

  // set header listeners
  controls.headerCheck.control.addEventListener('click', (e) => {
    e.preventDefault();
    getCharacter(true);
  });
  controls.headerLoad.control.addEventListener('click', (e) => {
    e.preventDefault();
    getCharacter(false);
  });
};
