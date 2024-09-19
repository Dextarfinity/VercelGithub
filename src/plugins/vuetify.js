// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

// Vuetify
import { createVuetify } from 'vuetify'

// Custom theme
const myTheme = {
  light: {
    primary: '#6200ea',
    secondary: '#03dac6',
    accent: '#82b1ff',
    error: '#ff5252',
    info: '#2196f3',
    success: '#4caf50',
    warning: '#ffc107',
  },
  dark: {
    primary: '#bb86fc',
    secondary: '#03dac6',
    accent: '#3700b3',
    error: '#cf6679',
    info: '#03a9f4',
    success: '#00c853',
    warning: '#ffb300',
  },
  teal: {
    primary: '#009688',
    teall5: '#E0F2F1',
    teall4: '#B2DFDB',
    teall3: '#80CBC4',
    teall2: '#4DB6AC',
    teall1: '#26A69A',
    teald1: '#00897B',
    teald2: '#00796B',
    teald3: '#00695C',
    teald4: '#004D40',
    teala1: '#A7FFEB',
    teala2: '#64FFDA',
    teala3: '#1DE9B6',
    teala4: '#00BFA5',
    error: '#cf6679',
    info: '#03a9f4',
    success: '#00c853',
    warning: '#ffb300',
  },
}

export default createVuetify({
  theme: {
    defaultTheme: 'teal', // Use the 'teal' theme as default
    themes: {
      light: myTheme.light,
      dark: myTheme.dark,
      teal: myTheme.teal,
    },
  },
})
