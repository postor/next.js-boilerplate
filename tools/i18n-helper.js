import I18nHelper from 'next-i18n-helper'
import getWrapper from 'next-i18n-helper/dist/wrapper'

const i18nHelper = new I18nHelper({
  supportLangs: ['en', 'zh'],
  defaultLang: 'en',
})

export default i18nHelper

export const i18nWrapper = getWrapper(i18nHelper)