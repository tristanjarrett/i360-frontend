import { useState } from 'react';
import ClassName from 'models/classname';
import { useMutation } from '@apollo/client';
import { getApolloClient } from 'lib/apollo-client';
import styles from './FormEvents.module.scss';
import { EVENTS } from 'data/forms';
import * as EmailValidator from 'email-validator';

const FormEvents = ({ className, data }) => {
  const sectionClassName = new ClassName(styles.section);
  sectionClassName.addIf(className, className);
  const mainStyles = sectionClassName.toString();

  const [nameValue, setNameValue] = useState(' -- -- Blank --  -- ');
  const [compName, setCompName] = useState(' -- Blank -- ');
  const [agent, setAgent] = useState(' -- Blank -- ');
  const [agentTerms, setAgentTerms] = useState(' -- Blank -- ');
  const [contact, setcontact] = useState(' -- Blank -- ');
  const [postAddress, setPostAddress] = useState(' -- Blank -- ');
  const [emailValue, setEmailValue] = useState(' -- Blank -- ');
  const [eventType, setEventType] = useState(' -- Blank -- ');
  const [typeOther, setTypeOther] = useState(' -- Blank -- ');
  const [desc, setDesc] = useState(' -- Blank -- ');
  const [date, setDate] = useState(' -- Blank -- ');
  const [guests, setGuests] = useState(' -- Blank -- ');
  const [timings, setTimings] = useState(' -- Blank -- ');
  const [foodDrinks, setFoodDrinks] = useState(' -- Blank -- ');
  const [foodBevs, setFoodBevs] = useState(' -- Blank -- ');
  const [pod, setPod] = useState(' -- Blank -- ');
  const [publicFlight, setPublicFlight] = useState(' -- Blank -- ');
  const [suppliersReq, setSuppliersReq] = useState(' -- Blank -- ');
  const [specialReq, setSpecialReq] = useState(' -- Blank -- ');
  const [entReq, setEntReq] = useState(' -- -- Blank --  -- ');
  const [specialReqEnt, setSpecialReqEnt] = useState(' -- Blank -- ');

  const options = ['Yes', 'No'];
  const optionsFlight = ['Private', 'Public'];
  const optionDef = 'Please select';

  const [errorMessage, setErrorMessage] = useState('');
  const [contFError, setContFError] = useState('');

  const client = getApolloClient();
  const [events, { data: formData, loading: loading, error: error }] = useMutation(EVENTS, {
    client,
  });

  const handleForm = async (e) => {
    e.preventDefault();

    await events({
      variables: {
        name: nameValue,
        email: emailValue,
        compName,
        agent,
        agentTerms,
        contact,
        postAddress,
        eventType,
        typeOther,
        desc,
        date,
        guests,
        timings,
        foodDrinks,
        foodBevs,
        pod,
        publicFlight,
        suppliersReq,
        specialReq,
        entReq,
        specialReqEnt,
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
                    {(data.name || data.compName) && (
                      <div className="row">
                        <div className="col field_group field_group_multi">
                          <div>
                            <label>{data.name}</label>
                            <input
                              type="text"
                              onBlur={(e) => e.target.value && e.target.value && setNameValue(e.target.value)}
                            />
                          </div>
                          <div>
                            <label>{data.compName}</label>
                            <input type="text" onBlur={(e) => e.target.value && setCompName(e.target.value)} />
                          </div>
                        </div>
                      </div>
                    )}

                    {(data.agent || data.agentTerms) && (
                      <div className="row">
                        <div className="col field_group field_group_multi">
                          <div>
                            <label>Are you a Booking Agent?</label>
                            <select onChange={(e) => setAgent(e.target.value)}>
                              <option selected disabled>
                                {optionDef}
                              </option>
                              {options.map((e, i) => {
                                return <option key={i}>{e}</option>;
                              })}
                            </select>
                          </div>
                          <div>
                            <label>{data.agentTerms}</label>
                            <input type="text" onBlur={(e) => e.target.value && setAgentTerms(e.target.value)} />
                          </div>
                        </div>
                      </div>
                    )}

                    {(data.contact || data.email) && (
                      <div className="row">
                        <div className="col field_group field_group_multi">
                          <div>
                            <label>{data.contact}</label>
                            <input type="text" onBlur={(e) => e.target.value && setcontact(e.target.value)} />
                          </div>
                          <div>
                            <label>{data.email}</label>
                            <input type="email" onBlur={(e) => e.target.value && setEmailValue(e.target.value)} />
                          </div>
                        </div>
                      </div>
                    )}

                    {data.postAddress && (
                      <div className="row">
                        <div className="col field_group">
                          <div>
                            <label>{data.postAddress}</label>
                            <input type="text" onBlur={(e) => e.target.value && setPostAddress(e.target.value)} />
                          </div>
                        </div>
                      </div>
                    )}

                    {(data.eventType || data.typeOther) && (
                      <div className="row">
                        <div className="col field_group field_group_multi">
                          <div>
                            <label>Type of event</label>
                            <select onChange={(e) => setEventType(e.target.value)}>
                              <option selected disabled>
                                {optionDef}
                              </option>
                              {data.eventType.map((e, i) => {
                                return <option key={i}>{e}</option>;
                              })}
                            </select>
                          </div>
                          <div>
                            <label>{data.typeOther}</label>
                            <input type="text" onBlur={(e) => e.target.value && setTypeOther(e.target.value)} />
                          </div>
                        </div>
                      </div>
                    )}

                    {(data.yarn || data.date) && (
                      <div className="row">
                        <div className="col field_group field_group_multi">
                          <div>
                            <label>{data.desc}</label>
                            <input type="text" onBlur={(e) => e.target.value && setDesc(e.target.value)} />
                          </div>
                          <div>
                            <label>{data.date}</label>
                            <input type="text" onBlur={(e) => e.target.value && setDate(e.target.value)} />
                          </div>
                        </div>
                      </div>
                    )}

                    {(data.guests || data.timings) && (
                      <div className="row">
                        <div className="col field_group field_group_multi">
                          <div>
                            <label>{data.guests}</label>
                            <input type="text" onBlur={(e) => e.target.value && setGuests(e.target.value)} />
                          </div>
                          <div>
                            <label>{data.timings}</label>
                            <input type="text" onBlur={(e) => e.target.value && setTimings(e.target.value)} />
                          </div>
                        </div>
                      </div>
                    )}

                    {(data.foodDrinks || data.foodBevs) && (
                      <div className="row">
                        <div className="col field_group field_group_multi">
                          <div>
                            <label>Is food and beverage required?</label>
                            <select onChange={(e) => setFoodDrinks(e.target.value)}>
                              <option selected disabled>
                                {optionDef}
                              </option>
                              {options.map((e, i) => {
                                return <option key={i}>{e}</option>;
                              })}
                            </select>
                          </div>
                          <div>
                            <label>{data.foodBevs}</label>
                            <input type="text" onBlur={(e) => e.target.value && setFoodBevs(e.target.value)} />
                          </div>
                        </div>
                      </div>
                    )}

                    {(data.pod || data.publicFlight) && (
                      <div className="row">
                        <div className="col field_group field_group_multi">
                          <div>
                            <label>
                              Do you require use of The Pod? <br />
                              &nbsp;
                            </label>
                            <select onChange={(e) => setPod(e.target.value)}>
                              <option selected disabled>
                                {optionDef}
                              </option>
                              {options.map((e, i) => {
                                return <option key={i}>{e}</option>;
                              })}
                            </select>
                          </div>
                          <div>
                            <label>If yes, would you be looking to join a public flight or hire privately?</label>
                            <select onChange={(e) => setPublicFlight(e.target.value)}>
                              <option selected disabled>
                                {optionDef}
                              </option>
                              {optionsFlight.map((e, i) => {
                                return <option key={i}>{e}</option>;
                              })}
                            </select>
                          </div>
                        </div>
                      </div>
                    )}

                    {(data.suppliersReq || data.specialReq) && (
                      <div className="row">
                        <div className="col field_group field_group_multi">
                          <div>
                            <label>Are Suppliers Required? (Lighting, photography, florist etc.)</label>
                            <select onChange={(e) => setSuppliersReq(e.target.value)}>
                              <option selected disabled>
                                {optionDef}
                              </option>
                              {options.map((e, i) => {
                                return <option key={i}>{e}</option>;
                              })}
                            </select>
                          </div>
                          <div>
                            <label>
                              {data.specialReq}
                              <br />
                              &nbsp;
                            </label>
                            <input type="text" onBlur={(e) => e.target.value && setSpecialReq(e.target.value)} />
                          </div>
                        </div>
                      </div>
                    )}

                    {(data.entReq || data.specialReqEnt) && (
                      <div className="row">
                        <div className="col field_group field_group_multi">
                          <div>
                            <label>Entertainment Required?</label>
                            <select onChange={(e) => setEntReq(e.target.value)}>
                              <option selected disabled>
                                {optionDef}
                              </option>
                              {options.map((e, i) => {
                                return <option key={i}>{e}</option>;
                              })}
                            </select>
                          </div>
                          <div>
                            <label>{data.specialReqEnt}</label>
                            <input type="text" onBlur={(e) => e.target.value && setSpecialReqEnt(e.target.value)} />
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
                              if (!nameValue || !emailValue || !contact || !date || !guests || !timings) {
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

export default FormEvents;
