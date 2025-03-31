package com.hdi.backend.exception;

public class UserNotFoundException extends RuntimeException {

    public final String errorType;

    public UserNotFoundException(String message) {
        super(message);
        this.errorType = "UserNotFoundException";
    }
}
