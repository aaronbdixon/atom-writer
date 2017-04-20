'use babel';

export default {
  fontFamily: {
    description: 'Default font-size for documents.',
    type: 'string',
    default: atom.config.get('editor.fontFamily') || "'Menlo, Consolas, 'DejaVu Sans Mono', Helvetica, monospace;",
    order: 1
  },
  fontSize: {
    description: 'Default font-size for paragraphs. Other elements proportional to this.',
    type: 'integer',
    default: atom.config.get('editor.fontSize') || 14,
    order: 2
  },
  medium: {
    description: 'Medium API Settings',
    type: 'object',
    properties: {
      integrationToken: {
        description: 'Integration Token used for connection to Medium API',
        type: 'string',
        default: '',
        order: 1
      }
    },
    order: 3
  }
}
