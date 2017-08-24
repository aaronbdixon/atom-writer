'use babel';

class Config {
  constructor() {

  }
}

const Settings = {
  styles: {
    title: 'Editor Styling',
    description: 'Override default styling for the editor.',
    type: 'object',
    properties: {
      fontFamily: {
        title: 'Font',
        description: 'Default font family for documents.',
        type: 'string',
        default: atom.config.get('editor.fontFamily') || "'Menlo, Consolas, 'DejaVu Sans Mono', Helvetica, monospace;",
        order: 1
      },
      fontSize: {
        title: 'Font Size',
        description: 'Default font-size for paragraphs. Other elements size proportionally.',
        type: 'integer',
        default: atom.config.get('editor.fontSize') || 14,
        order: 2
      },
      wysiwygTheme: {
        title: 'WYSIWYG Theme',
        description: 'Theme for the WYSIWYG Markdown editor.',
        type: 'string',
        default: 'bootstrap',
        enum: [
          'beagle',
          'bootstrap',
          'default',
          'flat',
          'mani',
          'roman',
          'tim'
        ]
      }
    },
    order: 1
  },
  medium: {
    title: 'Medium API Settings',
    description: 'Settings for interactions with Medium platform.',
    type: 'object',
    properties: {
      integrationToken: {
        title: 'Integration Token',
        description: 'Integration Token used for connection to Medium API.',
        type: 'string',
        default: '',
        order: 1
      }
    },
    order: 2
  }
}

export { Config, Settings };
