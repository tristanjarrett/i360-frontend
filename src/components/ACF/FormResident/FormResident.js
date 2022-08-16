import { useState, useRef } from 'react';
import ClassName from 'models/classname';
import { useMutation } from '@apollo/client';
import { getApolloClient } from 'lib/apollo-client';
import styles from './FormResident.module.scss';
import { RESIDENT } from 'data/forms';
import * as EmailValidator from 'email-validator';

const FormResident = ({ className, data }) => {
  const sectionClassName = new ClassName(styles.section);
  sectionClassName.addIf(className, className);
  const mainStyles = sectionClassName.toString();

  const [phone, setPhone] = useState('');
  const [postCode, setPostCode] = useState('');
  const [address, setAddress] = useState('');
  const [nameValue, setNameValue] = useState('');
  const [emailValue, setEmailValue] = useState('');
  const [type, setType] = useState('');
  const [headshot, setHeadshot] = useState('');
  const [proofAddress, setProofAddress] = useState('');
  const [proofId, setProofId] = useState('');
  const hsUpload = useRef(null);
  const paUpload = useRef(null);
  const piUpload = useRef(null);

  const [errorMessage, setErrorMessage] = useState('');
  const [contFError, setContFError] = useState('');

  const optionDef = 'Please select';

  const previewHs = () => {
    let oFReader = new FileReader();
    oFReader.readAsDataURL(hsUpload.current.files[0]);
    oFReader.onload = function (oFREvent) {
      setHeadshot(oFREvent.target.result);
    };
  };

  const previewPa = () => {
    let oFReader = new FileReader();
    oFReader.readAsDataURL(paUpload.current.files[0]);
    oFReader.onload = function (oFREvent) {
      setProofAddress(oFREvent.target.result);
    };
  };

  const previewPi = () => {
    let oFReader = new FileReader();
    oFReader.readAsDataURL(piUpload.current.files[0]);
    oFReader.onload = function (oFREvent) {
      setProofId(oFREvent.target.result);
    };
  };

  const client = getApolloClient();
  const [resident, { data: formData, loading: loading, error: error }] = useMutation(RESIDENT, {
    client,
  });

  const handleForm = async (e) => {
    e.preventDefault();

    await resident({
      variables: {
        phone: phone,
        postCode: postCode,
        address: address,
        name: nameValue,
        email: emailValue,
        type: type,
        headshot: headshot,
        proofAddress: proofAddress,
        proofId: proofId,
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
                    {(data.phone || data.postCode) && (
                      <div className="row">
                        <div className="col field_group field_group_multi">
                          <div>
                            <label>{data.phone}</label>
                            <input type="text" onBlur={(e) => setPhone(e.target.value)} />
                          </div>
                          <div>
                            <label>{data.postCode}</label>
                            <input type="email" onBlur={(e) => setPostCode(e.target.value)} />
                          </div>
                        </div>
                      </div>
                    )}

                    {data.address && (
                      <div className="row">
                        <div className="col field_group">
                          <div>
                            <label>{data.address}</label>
                            <input type="text" onBlur={(e) => setAddress(e.target.value)} />
                          </div>
                        </div>
                      </div>
                    )}

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

                    {data.type && (
                      <div className="row">
                        <div className="col field_group">
                          <div>
                            <label>Membership Type</label>
                            <select onChange={(e) => setType(e.target.value)}>
                              <option selected disabled>
                                {optionDef}
                              </option>
                              {data.type.map((e, i) => {
                                return <option key={i}>{e}</option>;
                              })}
                            </select>
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="field_group">
                      <div className="btn-file">
                        <span>Headshot</span>
                        <input id="cvUpload" ref={hsUpload} onChange={previewHs} type="file" accept=".jpg,.jpeg,.png" />
                      </div>
                    </div>

                    <div className="field_group">
                      <div className="btn-file">
                        <span>Proof of Address</span>
                        <input id="cvUpload" ref={paUpload} onChange={previewPa} type="file" accept=".jpg,.jpeg,.png" />
                      </div>
                    </div>

                    <div className="field_group">
                      <div className="btn-file">
                        <span>Photo ID</span>
                        <input id="cvUpload" ref={piUpload} onChange={previewPi} type="file" accept=".jpg,.jpeg,.png" />
                      </div>
                    </div>

                    <div className="row">
                      <div className="col field_group">
                        <button
                          className="js-contact-form"
                          onClick={(e) => {
                            e.preventDefault();
                            if (EmailValidator.validate(emailValue)) {
                              if (!nameValue || !emailValue) {
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
                        {loading && !contFError && (
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

export default FormResident;
