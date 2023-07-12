import { FormWrapper } from "./FormWrapper"
import TextField from '@mui/material/TextField';

type AccountData = {
  email: string
  password: string
}

type AccountFormProps = AccountData & {
  updateFields: (fields: Partial<AccountData>) => void
}

export function AccountForm({
  email,
  password,
  updateFields,
}: AccountFormProps) {
  return (
    <FormWrapper title="Account Creation">
      <label><b>Email</b></label>
      <TextField
        id="filled-start-adornment"
        variant="outlined"
        size="small"
        autoFocus
        required
        type="email"
        value={email}
        onChange={e => updateFields({ email: e.target.value })}
      />
      <label><b>Password</b></label>
      <TextField
        id="filled-start-adornment"
        variant="outlined"
        size="small"
        required
        type="password"
        value={password}
        onChange={e => updateFields({ password: e.target.value })}
      />
    </FormWrapper>
  )
}
