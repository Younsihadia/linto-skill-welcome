const debug = require('debug')('linto:skill:v2:linto-skill:welcome')
const LintoSkillNode = require('@linto-ai/linto-components').nodes.lintoSkillNode
const { payloadAction, template, wireNode } = require('@linto-ai/linto-components').components

const PALETTE_NODE_NAME = 'Welcome'

module.exports = function (RED) {
  function Node(config) {
    RED.nodes.createNode(this, config)
    new LintoSkillWelcome(RED, this, config)
  }

  RED.nodes.registerType('linto-skill-welcome', Node,
    {
      settings: {
        lintoSkillWelcome: {
          value: {
            template: template.settupSkillTemplate(PALETTE_NODE_NAME),
            command: LintoSkillNode.loadFile(__dirname, 'data/command.md'),
          },
          exportable: true
        }
      }
    })
}

class LintoSkillWelcome extends LintoSkillNode {
  constructor(RED, node, config) {
    super(RED, node, config, __dirname)
    this.payloadAction = payloadAction
    this.init()
  }

  async init() {
    await this.configure() // Autoload controllers
  }
}