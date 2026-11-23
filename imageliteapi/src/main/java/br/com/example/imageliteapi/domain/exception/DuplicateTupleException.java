package br.com.example.imageliteapi.domain.exception;

public class DuplicateTupleException extends RuntimeException {
    public DuplicateTupleException(String message) {
        super(message);
    }
}
