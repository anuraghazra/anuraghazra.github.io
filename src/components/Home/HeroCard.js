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
      <pre>4             this.traits = ["<b>DESIGN</b>", "<b>DEV</b>"]</pre>
      <pre>5             this.age = new Date().getFullYear() - 2001;</pre>
      <pre>6         {"}"}</pre>
      <pre>7   {"}"}</pre>
    </CodeCardWrapper>
  )
}

export const ColorPalette = withTheme(({ theme }) => {
  return (
    <ColorPaletteWrapper>
      <ColorBox color={theme.primaryColor} />
      <ColorBox color={theme.secondaryColor} />
      <ColorBox color={theme.gradient} />
      <ColorBox color={theme.primaryBlack} />
      <ColorBox color={theme.accentColor} />
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