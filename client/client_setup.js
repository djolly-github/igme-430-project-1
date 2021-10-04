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

      // update the left panel selections
      updateLeftPanelSelections(caller);

      // update the right panel tilesheet positions
      setRightPanelImages(getCurrentValues());
    });
  }
};
