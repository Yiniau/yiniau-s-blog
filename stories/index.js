import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import { Button, Welcome } from '@storybook/react/demo';

import {
  Logo,
  NavButton
} from '../src/components'

storiesOf('Welcome', module).add('to Storybook', () => <Welcome showApp={linkTo('Button')} />);

storiesOf('Button', module)
  .add('Logo', () => <Logo imgSrc={require('../src/avatar@0,3x.jpg')}/>)
  .add('NavButton', () => <NavButton />)
