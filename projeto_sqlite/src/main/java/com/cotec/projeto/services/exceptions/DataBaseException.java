package com.cotec.projeto.services.exceptions;

public class DataBaseException extends RuntimeException {
    public DataBaseException(String falhaDeIntegridade) {
        super(falhaDeIntegridade);
    }
}
