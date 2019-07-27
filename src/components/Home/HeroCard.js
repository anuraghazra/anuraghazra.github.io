import React from 'react';
import { withTheme } from 'styled-components';

import {
  HeroCardWrapper,
  CodeCardWrapper,
  ColorPaletteWrapper,
  ColorBox,
} from './HeroCard.style'

export const CodeCard = () => {
  return (
    <CodeCardWrapper>
      <pre>1   class <b>Person</b> {'{'}</pre>
      <pre>2         constructor() {'{'}</pre>
      <pre>3             this.name = "<b>Anurag Hazra</b>";</pre>
      <pre>4             this.traits = ["<b>DESIGN</b>", "<b>DEV</b>"];</pre>
      <pre>5             this.age = new Date().getFullYear() - 2001;</pre>
      <pre>6         {"}"}</pre>
      <pre>7   {"}"}</pre>
      {/* <pre>
        1   class <b>Person</b> {'{'}<br />
        2         constructor() {'{'}<br />
        3             this.name = "<b>Anurag Hazra</b>";<br />
        4             this.traits = ["<b>DESIGN</b>", "<b>DEV</b>"];<br />
        5             this.age = new Date().getFullYear() - 2001;<br />
        6         {"}"}<br />
        7   {"}"}
      </pre> */}
    </CodeCardWrapper>
  )
}

export const ColorPalette = withTheme(({ theme }) => {
  return (
    <ColorPaletteWrapper>
      <ColorBox style={{background: theme.primaryColor}} />
      <ColorBox style={{background: theme.secondaryColor}} />
      <ColorBox style={{background: theme.gradient}} />
      <ColorBox style={{background: theme.primaryBlack}} />
      <ColorBox style={{background: theme.accentColor}} />
    </ColorPaletteWrapper>
  )
})

export const HeroCard = () => {
  return (
    <HeroCardWrapper>
      <CodeCard />
      <ColorPalette />
    </HeroCardWrapper>
  )
}