import React from "react";
import { TextField, MenuItem } from "@mui/material";

interface Option {
  label: string;
  value: string;
}

interface Props {
  valor: string;
  onChange: (value: string) => void;
  label: string;
  options: Option[];
}

export default function CampoSelect({
  valor,
  onChange,
  label,
  options,
}: Props) {
  return (
    <div>
      <TextField
        select
        label={label}
        value={valor}
        onChange={(e) => onChange(e.target.value)}
        variant='outlined'
        sx={{ width: "200px" }}
        fullWidth
        required
        defaultValue="Selecione" // Definindo o valor padrão como vazio
      >
        {/* Mapeando as opções e criando os MenuItem */}
        {options.map((option, index) => (
          <MenuItem key={index} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>
    </div>
  );
}
