import React from 'react';
import Form from './form/Form';
import styled from 'styled-components'

const EmployeeForm: React.FC = () => {
  
  const FormText = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    // font-size: 50px;
    height: 70vh;
`

  return (
    <div>
     <FormText><Form/></FormText>

    </div>
    
  );
};

export default EmployeeForm;
