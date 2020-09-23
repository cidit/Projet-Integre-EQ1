/*import { Formik, Field, Form, ErrorMessage, yupToFormErrors, Label } from "formik";
import React, { Component } from 'react';
import * as Yup from "yup";
import Stage from '../model/Stage'

class CreateStageFormikComponent extends Component {
    
   
    render() {
        
        return (
            <div>
                <h1>validation with formik</h1>
                <Formik initialValues = {{
                      id : "",
                      titre : "",
                      employeur : "",
                      description : "",
                      exigences : "",
                      dateDebut : "",
                      dateFin : "",
                      nbHeuresParSemaine : "",
                      salaire : "",
                      nbAdmis : "",
                      ouvert : "",
                      dateLimite : "",
                      programme : "",
                }}
                validationSchema={Yup.object().shape({
                    titre: Yup.string().min(2, "votre titre est tres court").required("Veuillez reesayer"),

            })}
            onSubmit ={(values,{setSubmitting})=>{
                const timeout = setTimeout(() =>{
                    console.log(values);
                    setSubmitting(false);
                    clearTimeout(timeout);
                },1000);
            }}
            >
                 {({
          values,
          errors,
          touched,
          handleSubmit,
          isSubmitting,
          validating,
          valid,
        }) => {
          return (
            <>
              <Form name="contact" method="post" onSubmit={handleSubmit}>
                <Label htmlFor="fullname">
                  Fullname
                  <Input
                    type="text"
                    name="fullname"
                    autoCorrect="off"
                    autoComplete="name"
                    placeholder="your fullname"
                    valid={touched.fullname && !errors.fullname}
                    error={touched.fullname && errors.fullname}
                  />
                </Label>
                {errors.fullname && touched.fullname && (
                  <StyledInlineErrorMessage>
                    {errors.fullname}
                  </StyledInlineErrorMessage>
                )}
                <Label htmlFor="email">
                  Email
                  <Input
                    type="email"
                    name="email"
                    autoCapitalize="off"
                    autoCorrect="off"
                    autoComplete="email"
                    placeholder="your email"
                    valid={touched.email && !errors.email}
                    error={touched.email && errors.email}
                  />
                </Label>
                <ErrorMessage name="email">
                  {(msg) => (
                    <StyledInlineErrorMessage>{msg}</StyledInlineErrorMessage>
                  )}
                </ErrorMessage>
                <Submit type="submit" disabled={!valid || isSubmitting}>
                  {isSubmitting ? `Submiting...` : `Submit`}
                </Submit>
              </Form>

              <hr />
              <CodeWrapper>
                <strong>Errors:</strong> {JSON.stringify(errors, null, 2)}
                <strong>Touched:</strong> {JSON.stringify(touched, null, 2)}
                {formValues && <strong>Submitted values:</strong>}
                {JSON.stringify(formValues, null, 2)}
              </CodeWrapper>
            </>
          );
        }}


                </Formik>
            </div>
        );
    }
}

export default CreateStageFormikComponent;*/