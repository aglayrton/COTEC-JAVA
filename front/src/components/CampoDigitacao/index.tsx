import { TextField } from "@mui/material";

interface Props {
  valor: string;
  tipo: string;
  placeholder: string;
  onChange: (value: string) => void;
  label: string;
}

export default function CampoDigitacao({
  valor,
  tipo,
  placeholder,
  onChange,
  label,
}: Props) {
  return (
    <div>
      {/* Campo de entrada estilizado do Material UI */}
      <TextField
        label={label}
        type={tipo}
        value={valor}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        variant='outlined'
        fullWidth
        margin='normal'
        required
      />
    </div>
  );
}
