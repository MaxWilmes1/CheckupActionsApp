package com.hdi.backend.CheckupActions;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;

@Service
@RequiredArgsConstructor
public class CheckupActionService {

    private final CheckupActionRepository checkupActionRepository;

    public List<CheckupAction> getAllActions() {
        return checkupActionRepository.findAll();
    }

    public CheckupAction getActionById(String id) {
        return checkupActionRepository.findById(id).orElseThrow(NoSuchElementException::new);
    }

    public CheckupAction addAction(CheckupAction checkupAction) {
        return checkupActionRepository.save(checkupAction);
    }

    public void deleteAction(String id) {
        checkupActionRepository.deleteById(id);
    }

    public CheckupAction updateAction(String id, CheckupAction checkupAction) {
        CheckupAction oldCheckupAction = getActionById(id);
        CheckupAction updatedCheckupAction = new CheckupAction(oldCheckupAction.id(), checkupAction.title());
        return checkupActionRepository.save(updatedCheckupAction);
    }
}
