import {useState } from "react"
import { AccountForm } from "./AccountForm"
import { AddressForm } from "./AddressForm"
import { useMultistepForm } from "./useMultistepForm"
import { UserForm } from "./UserForm"
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import {useMutation } from '@apollo/react-hooks';
import { ADD_USER } from "../../Queries/index";


type FormData = {

  dealerName: string
  personName: string
  phoneNumber: string
  street: string
  city: string
  state: string
  zip: string
  email: string
  password: string
}

const INITIAL_DATA: FormData = {
  dealerName: "",
  personName: "",
  phoneNumber: "",
  street: "",
  city: "",
  state: "",
  zip: "",
  email: "",
  password: "",
}

function Form() {

  const [createUser] = useMutation(ADD_USER);
  const [data1, setData1] = useState(INITIAL_DATA)
  function updateFields(fields: Partial<FormData>) {
    setData1(prev => {
      return { ...prev, ...fields }
    })
  }
  const { steps, currentStepIndex, step, isFirstStep, isLastStep, back, next } =
    useMultistepForm([
      <UserForm {...data1} updateFields={updateFields} />,
      <AddressForm {...data1} updateFields={updateFields} />,
      <AccountForm {...data1} updateFields={updateFields} />,
    ])

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLastStep) return next()
    try {
      const { data } = await createUser({
        variables: data1
        
      });
        // Handle the response data or perform any necessary actions
        // console.log(data.createUser);
        alert("Successful Dealer Creation")
      } catch (error) {
        // Handle the error
        console.error(error);
      }
    }
  

    // function onSubmit(e: FormEvent) {
    //   e.preventDefault()
    //   if (!isLastStep) return next()
    //   console.log(data);
    //   //post method 
    //   axios.post('http://localhost:8000/api/dealer', data)
    //     .then((response: AxiosResponse) => {
    //       console.log('Success:', response.data);
    //     })
    //     .catch((error: AxiosError) => {
    //       console.error('Error:', error.response?.data);
    //     });
    //   alert("Successful Account Creation")
    // }

    return (
      <Paper
        style={{
          position: "relative",
          background: "white",
          // border: "1px solid black",
          padding: "6rem",
          margin: "1rem",
          borderRadius: ".5rem",
          fontFamily: "Arial",
          maxWidth: "max-content",
        }}
      >

        <form onSubmit={onSubmit}>
          <div style={{ position: "absolute", top: ".5rem", right: ".5rem" }}>
            {currentStepIndex + 1} / {steps.length}
          </div>
          {step}
          <div
            style={{
              marginTop: "1rem",
              display: "flex",
              gap: ".5rem",
              justifyContent: "flex-end",
            }}
          >
            {!isFirstStep && (
              <Button variant="outlined" color="primary" onClick={back}>
                Back
              </Button>
            )}
            <Button type="submit" variant="outlined" color="primary">
              {isLastStep ? "Finish" : "Next"}
            </Button>
          </div>
        </form>
      </Paper>
      // </div >
    )
  }
  export default Form

