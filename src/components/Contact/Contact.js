import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Button from '@common/Button';
import PageHeader from '@common/PageHeader';
import useForm from '@src/hooks/useForm';

import {
  ContactWrapper,
  LeftContent,
  ContactBox,
  ContactForm,
} from './Contact.style';

function Contact() {
  const { formData, errors, handleInput, isFormValid } = useForm();

  return (
    <ContactWrapper id="contact">
      <PageHeader>Get In Touch</PageHeader>
      <ContactBox>
        <LeftContent>
          <FontAwesomeIcon size={'5x'} icon="handshake" />
          <h3>Thank You</h3>
          <p>Do You Have Any Queries?</p>
        </LeftContent>
        <ContactForm
          noValidate
          action="https://formspree.io/f/mgerrqan"
          method="POST"
        >
          <label className="label__email">
            <span>Email</span>
            <input
              className={errors._replyto && 'invalid'}
              onChange={handleInput}
              value={formData.email}
              id="email"
              name="_replyto"
              type="email"
              required
              placeholder="example@gmail.com"
            />
          </label>
          <label className="label__name">
            <span>Name</span>
            <input
              className={errors.name && 'invalid'}
              onChange={handleInput}
              value={formData.name}
              name="name"
              type="text"
              required
              placeholder="John Doe"
            />
          </label>
          <label className="label__message">
            <span>Message</span>
            <textarea
              className={errors.message && 'invalid'}
              onChange={handleInput}
              value={formData.message}
              name="message"
              required
              placeholder="Hey there!"
            />
          </label>

          <Button
            disabled={!isFormValid}
            className="submit__btn"
            as="button"
            type="submit"
            value="send"
          >
            <FontAwesomeIcon icon="paper-plane" /> Submit
          </Button>
        </ContactForm>
      </ContactBox>
    </ContactWrapper>
  );
}
export default Contact;
