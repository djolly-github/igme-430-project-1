// initializes elements that utilize tippy
const initTippy = () => {
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

}