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

/**
 * 国际化高阶组件
 *
 * @export
 * @param {string} key 组件名称
 * @returns
 */
export default function translate(key) {
  return (WrappedComponent) => {
    class TranslationComponent extends React.Component {
      render() {
        const currentLanguage = this.context.currentLanguage
        // 获取全局词条
        const globalMessages = languages[currentLanguage][global]
        // 获取组件词条
        const partialMessages = languages[currentLanguage][key]

        // 合并词条
        // 如有重复, 组件词条会覆盖全局词条
        const messages = {
          ...globalMessages,
          ...partialMessages
        }
        return <WrappedComponent {...this.props} {...this.state} messages={messages} />
      }
    }

    // 包装antd的Sider组件需要这样设置，否则样式不正确
    if (key === 'Sider') {
      TranslationComponent.__ANT_LAYOUT_SIDER = true
    }

    TranslationComponent.displayName = `Translated(${getDisplayName(WrappedComponent)})`

    TranslationComponent.contextTypes = {
      currentLanguage: PropTypes.string
    }

    return TranslationComponent
  }
}
