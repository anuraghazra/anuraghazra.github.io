import React, { useState, useEffect } from 'react';
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
  const [formData, setformData] = useState({ _replyto: '', name: '', message: '' })
  const [errors, setErrors] = useState({ _replyto: '', name: '', message: '' });

  let emailregex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  let nameregex = /^[a-zA-Z\s]*[^\s]$/img;
  let messageregex = /^[\w\d][^<>/\\&]*$/img;

  function check(value, field, regex, text) {
    if (!value) {
      setErrors({ ...errors, [field]: `Your ${text} is required` });
      return true;
    } else if (!regex.test(value)) {
      setErrors({ ...errors, [field]: `Your ${text} is not valid` });
      return true;
    } else {
      setErrors({ ...errors, [field]: '' });
      return false;
    }
  }

  const validateForm = (name, value) => {
    switch (name) {
      case '_replyto':
        return !check(value, '_replyto', emailregex, 'Email');
      case 'name':
        return !check(value, 'name', nameregex, 'Name');
      case 'message':
        return !check(value, 'message', messageregex, 'Message');
      default:
        break;
    }
  }

  const handleInput = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    validateForm(name, value);
    setformData({ ...formData, [name]: value });
  }

  return (
    <ContactWrapper id="contact">
      <PageHeader>Get In Touch</PageHeader>
      {JSON.stringify(errors)}
      <ContactBox>
        <LeftContent>
          <FontAwesomeIcon size={'5x'} icon="handshake" />
          <h3>Thank You</h3>
          <p>Do You Have Any Queries?</p>
        </LeftContent>
        <ContactForm noValidate onSubmit={(event) => {
          let isValid = true;
          for (let i in formData) {
            if (!validateForm(i, formData[i])) {
              isValid = false;
            };
          }
          !isValid && event.preventDefault();
        }}
          action="https://formspree.io/hazru.anurag@gmail.com"
          method="POST"
        >
          <Flex>
            <label htmlFor="email">
              <input
                className={errors._replyto && 'invalid'}
                onChange={handleInput}
                value={formData.email}
                id="email"
                name="_replyto"
                type="email"
                required
                placeholder="Your Email"
              />
            </label>

            <label htmlFor="name">
              <input
                className={errors.name && 'invalid'}
                onChange={handleInput}
                value={formData.name}
                id="name"
                name="name"
                type="text"
                required
                placeholder="Your Name"
              />
            </label>
          </Flex>
          <label htmlFor="message">
            <textarea
              className={errors.message && 'invalid'}
              onChange={handleInput}
              value={formData.message}
              id="message"
              name="message"
              required
              placeholder="Say Something!"
            />
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