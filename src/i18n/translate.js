import React from 'react'
import PropTypes from 'prop-types'
import zhCN from './zh-CN'
import enUS from './en-US'

const languages = {
  'zh-CN': zhCN,
  'en-US': enUS
}

const global = 'Global'

function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component'
}

export default function translate(key) {
  return (WrappedComponent) => {
    class TranslationComponent extends React.Component {
      render() {
        const { currentLanguage } = this.context
        const globalMessages = languages[currentLanguage][global]
        const partialMessages = key ? languages[currentLanguage][key] : {}

        const messages = {
          ...globalMessages,
          ...partialMessages
        }
        return <WrappedComponent {...this.props} {...this.state} messages={messages} />
      }
    }

    TranslationComponent.displayName = `Translated(${getDisplayName(WrappedComponent)})`

    TranslationComponent.contextTypes = {
      currentLanguage: PropTypes.string
    }

    return TranslationComponent
  }
}
