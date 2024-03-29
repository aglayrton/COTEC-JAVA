import { TextField } from "@mui/material";
import React from "react";


interface Props {
  valor: string;
  tipo: string;
  placeholder: string;
  onChange: (value: string) => void;
  label: string;
}

const CampoCPF: React.FC<Props> = ({
  valor,
  tipo,
  placeholder,
  onChange,
  label,
}: Props) => {
  return (
    <div>
      <TextField
       label={label}
        type={tipo}
        value={valor}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        required
      />
    </div>
  );
};

export default CampoCPF;