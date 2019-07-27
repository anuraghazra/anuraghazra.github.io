import React from 'react';
import PageHeader from '../common/PageHeader';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Flex from 'src/components/common/Flex';
import Button from 'src/components/common/Button';

import {
  ContactWrapper,
  LeftContent,
  ContactBox,
  ContactForm,
} from './Contact.style'

function Contact() {
  return (
    <ContactWrapper id="contact">
      <PageHeader>Get In Touch</PageHeader>

      <ContactBox>
        <LeftContent>
          <FontAwesomeIcon size={'5x'} icon="handshake" />
          <h3>Thank You</h3>
          <p>Do You Have Any Queries?</p>
        </LeftContent>
        <ContactForm action="https://formspree.io/hazru.anurag@gmail.com" method="POST" >
          <Flex>
            <label for="email">
              <input id="email" required name="_replyto" type="email" type="email" placeholder="Your Email" />
            </label>
            <label for="name">
              <input id="name" required name="name" type="text" placeholder="Your Name" />
            </label>
          </Flex>
          <label for="message">
            <textarea id="message" required name="message" placeholder="Say Something!" />
          </label>
          <Button as="button" type="submit" value="send" style={{ float: 'right' }}>
            <FontAwesomeIcon icon="paper-plane" /> Submit
          </Button>
        </ContactForm>
      </ContactBox>

    </ContactWrapper>
  );
}
export default Contact;