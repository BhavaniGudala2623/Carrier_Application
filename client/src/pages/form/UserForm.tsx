import { FormWrapper } from "./FormWrapper"
import TextField from '@mui/material/TextField';

type UserData = {
  dealerName: string
  personName: string
  phoneNumber: string
}

type UserFormProps = UserData & {
  updateFields: (fields: Partial<UserData>) => void
}

export function UserForm({
  dealerName,
  personName,
  phoneNumber,
  updateFields,
}: UserFormProps) {
  return (
    <FormWrapper title="User Details">
      <label><b>Dealer Name</b></label>
      <TextField
        id="filled-start-adornment"
        variant="outlined"
        size="small"
        autoFocus
        required
        type="text"
        value={dealerName}
        onChange={e => updateFields({ dealerName: e.target.value })}
      />
      <label><b>Owner Name</b></label>
      <TextField
        id="filled-start-adornment"
        variant="outlined"
        size="small"
        required
        type="text"
        value={personName}
        onChange={e => updateFields({ personName: e.target.value })}
      />
      <label><b>Phone Number</b></label>
      <TextField
        id="filled-start-adornment"
        variant="outlined"
        size="small"
        required
        inputProps={{ inputMode: 'numeric', pattern: '[0-9]*', min: 1,
        max: 9999999999 }}
        type="number"
        value={phoneNumber}
        onChange={e => updateFields({ phoneNumber: e.target.value })}
      />
    </FormWrapper>
  )
}
