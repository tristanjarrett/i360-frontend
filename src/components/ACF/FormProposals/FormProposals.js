import { useState } from 'react';
import ClassName from 'models/classname';
import { useMutation } from '@apollo/client';
import { getApolloClient } from 'lib/apollo-client';
import styles from './FormProposals.module.scss';
import { PROPOSALS } from 'data/forms';
import * as EmailValidator from 'email-validator';

const FormProposals = ({ className, data }) => {
  const sectionClassName = new ClassName(styles.section);
  sectionClassName.addIf(className, className);
  const mainStyles = sectionClassName.toString();

  const [date, setDate] = useState('');
  const [address, setAddress] = useState('');
  const [nameValue, setNameValue] = useState('');
  const [emailValue, setEmailValue] = useState('');
  const [requirements, setRequirements] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [contFError, setContFError] = useState('');

  const client = getApolloClient();
  const [proposals, { data: formData, loading: loading, error: error }] = useMutation(PROPOSALS, {
    client,
  });

  const handleForm = async (e) => {
    e.preventDefault();

    await proposals({
      variables: {
        date: date,
        address: address,
        name: nameValue,
        email: emailValue,
        requirements: requirements,
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
                    {(data.email || data.name) && (
                      <div className="row">
                        <div className="col field_group field_group_multi">
                          <div>
                            <label>{data.name}</label>
                            <input type="text" onBlur={(e) => setNameValue(e.target.value)} />
                          </div>
                          <div>
                            <label>{data.email}</label>
                            <input type="email" onBlur={(e) => setEmailValue(e.target.value)} />
                          </div>
                        </div>
                      </div>
                    )}

                    {(data.date || data.address) && (
                      <div className="row">
                        <div className="col field_group field_group_multi">
                          <div>
                            <label>{data.date}</label>
                            <input type="text" onBlur={(e) => setDate(e.target.value)} />
                          </div>
                          <div>
                            <label>{data.address}</label>
                            <input type="text" onBlur={(e) => setAddress(e.target.value)} />
                          </div>
                        </div>
                      </div>
                    )}

                    {data.requirements && (
                      <div className="row">
                        <div className="col field_group">
                          <div>
                            <label>
                              <div dangerouslySetInnerHTML={{ __html: data.requirements }} />
                            </label>
                            <textarea type="text" onChange={(e) => setRequirements(e.target.value)} />
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
                              if (!date || !address || !nameValue || !emailValue || !requirements) {
                                setErrorMessage('Please ensure all fields are filled in correctly');
                              } else {
                                handleForm(e);
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
                            Sending...
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

export default FormProposals;
