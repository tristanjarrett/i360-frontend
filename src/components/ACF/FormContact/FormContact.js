import { useState } from 'react';
import ClassName from 'models/classname';
import { useMutation } from '@apollo/client';
import { getApolloClient } from 'lib/apollo-client';
import styles from './FormContact.module.scss';
import { CONTACT } from 'data/forms';
import * as EmailValidator from 'email-validator';

const FormContact = ({ className, data }) => {
  const sectionClassName = new ClassName(styles.section);
  sectionClassName.addIf(className, className);
  const mainStyles = sectionClassName.toString();

  const [nameValue, setNameValue] = useState('');
  const [emailValue, setEmailValue] = useState('');
  const [enquireValue, setEnquireValue] = useState('');
  const [messageValue, setMessageValue] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [contFError, setContFError] = useState('');

  const client = getApolloClient();
  const [contact, { data: formData, loading: loading, error: error }] = useMutation(CONTACT, {
    client,
  });

  const handleForm = async (e) => {
    e.preventDefault();

    await contact({
      variables: {
        name: nameValue,
        email: emailValue,
        enq: enquireValue,
        message: messageValue,
      },
    })
      .then((response) => handleFormSuccess(response))
      .catch((err) => handleFormFail(err.graphQLErrors[0].message));
  };
  const handleFormSuccess = () => {
    setErrorMessage('');
  };

  const handleFormFail = (err) => {
    const error = err.split('_').join(' ').toUpperCase();

    setErrorMessage(error);
  };

  return (
    <section className={mainStyles}>
      <div className={styles.wrapper}>
        <div className={styles.inner}>
          <div className="container">
            <div className="row">
              <div className="col">
                <h3 className="mb-3">{data.title}</h3>
              </div>
            </div>
            <div className="row">
              <div className="col">
                <div className="form-wrapper">
                  <form>
                    {data.enquiry && (
                      <div className="row">
                        <div className="col field_group">
                          <label>
                            What is your enquiry about? <span className="req_str">*</span>
                          </label>
                          <select
                            onChange={(e) => {
                              setEnquireValue(e.target.value);
                            }}
                          >
                            <option disabled selected>
                              Please select
                            </option>
                            {data.enquiry.map((op, i) => {
                              return (
                                <option key={i} value={op}>
                                  {op}
                                </option>
                              );
                            })}
                          </select>
                        </div>
                      </div>
                    )}

                    {(data.email || data.name) && (
                      <div className="row">
                        <div className="col field_group field_group_multi">
                          <div>
                            <label>
                              {data.name} <span className="req_str">*</span>
                            </label>
                            <input type="text" onBlur={(e) => setNameValue(e.target.value)} />
                          </div>
                          <div>
                            <label>
                              {data.email} <span className="req_str">*</span>
                            </label>
                            <input type="email" onBlur={(e) => setEmailValue(e.target.value)} />
                          </div>
                        </div>
                      </div>
                    )}

                    {data.message && (
                      <div className="row">
                        <div className="col field_group">
                          <div>
                            <label>
                              Your message <span className="req_str">*</span>
                            </label>
                            <textarea type="text" onChange={(e) => setMessageValue(e.target.value)} />
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="row">
                      <div className="col field_group">
                        <button
                          className="js-contact-form"
                          onClick={(e) => {
                            e.preventDefault();
                            if (EmailValidator.validate(emailValue)) {
                              if (!enquireValue || !nameValue || !emailValue || !messageValue) {
                                setErrorMessage('Please ensure all fields are filled in correctly');
                              } else {
                                handleForm(e);
                                setErrorMessage(null);
                                setContFError(null);
                              }
                            } else {
                              setErrorMessage('Please provide a valid email address');
                            }
                          }}
                        >
                          Send
                        </button>
                      </div>

                      <div
                        className="form_errors"
                        style={{
                          margin: '30px 0px 10px',
                          display: 'flex',
                          justifyContent: 'center',
                        }}
                      >
                        {loading && (
                          <p
                            style={{
                              margin: 10,
                              minWidth: '100%',
                              textAlign: 'center',
                              fontSize: '1em',
                              fontWeight: 500,
                            }}
                          >
                            Sending... {formData}
                          </p>
                        )}
                        {!loading && (error || errorMessage) && (
                          <div
                            style={{
                              padding: '20px',
                              minWidth: '100%',
                              fontSize: '1rem',
                              fontWeight: 500,
                              backgroundColor: '#d06464',
                              color: '#eae9e1',
                              display: 'flex',
                              justifyContent: 'center',
                              alignItems: 'center',
                            }}
                          >
                            <div>
                              {errorMessage || contFError
                                ? contFError
                                  ? contFError
                                  : errorMessage
                                : 'An unknown error has occured, please try again later or get in touch via email'}
                            </div>
                          </div>
                        )}
                        {formData && (
                          <div
                            style={{
                              padding: '20px',
                              minWidth: '100%',
                              fontSize: '1rem',
                              fontWeight: 500,
                              backgroundColor: '#98c2a4',
                              color: '#ffffff',
                              display: 'flex',
                              justifyContent: 'center',
                              alignItems: 'center',
                            }}
                          >
                            <div style={{ margin: 0 }}>Thank you for getting in touch!</div>
                          </div>
                        )}
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FormContact;
