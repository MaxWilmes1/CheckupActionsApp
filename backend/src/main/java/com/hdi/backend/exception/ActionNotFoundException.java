package com.hdi.backend.exception;

public class ActionNotFoundException extends RuntimeException {

    public final String errorType;

    public ActionNotFoundException(String message) {
        super(message);
        this.errorType = "ActionNotFoundException";
    }
}
