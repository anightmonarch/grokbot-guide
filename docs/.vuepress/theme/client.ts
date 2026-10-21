import { defineClientConfig } from 'vuepress/client'

import BotCard from './components/BotCard.vue'
import BotDetail from './components/BotDetail.vue'
import BotGallery from './components/BotGallery.vue'
import HomeClosing from './components/HomeClosing.vue'
import ImportButton from './components/ImportButton.vue'
import Layout from './components/Layout.vue'
import NotFound from './components/NotFound.vue'
import PathsPage from './components/PathsPage.vue'
import ScenariosPage from './components/ScenariosPage.vue'
import './styles/index.scss'

export default defineClientConfig({
  layouts: {
    Layout,
    NotFound,
  },
  enhance({ app }) {
    app.component('BotCard', BotCard)
    app.component('BotDetail', BotDetail)
    app.component('BotGallery', BotGallery)
    app.component('HomeClosing', HomeClosing)
    app.component('ImportButton', ImportButton)
    app.component('PathsPage', PathsPage)
    app.component('ScenariosPage', ScenariosPage)
  },
})
