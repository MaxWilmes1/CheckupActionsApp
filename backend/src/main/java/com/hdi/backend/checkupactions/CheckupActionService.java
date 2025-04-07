package com.hdi.backend.checkupactions;

import com.hdi.backend.exception.ActionNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CheckupActionService {

    private final CheckupActionRepository checkupActionRepository;

    public List<CheckupAction> getAllActions() {
        return checkupActionRepository.findAll();
    }

    public CheckupAction getActionById(String id) {
        return checkupActionRepository.findById(id).orElseThrow(() -> new ActionNotFoundException("Checkup action with ID " + id + " not found"));
    }

    public CheckupAction addAction(CheckupActionDTO checkupActionDTO) {
        CheckupAction checkupActionToSave = new CheckupAction(
                null,
                checkupActionDTO.title(),
                checkupActionDTO.subtitle(),
                checkupActionDTO.art(),
                checkupActionDTO.adu(),
                checkupActionDTO.application(),
                checkupActionDTO.cinum(),
                checkupActionDTO.pi()
        );
        return checkupActionRepository.save(checkupActionToSave);
    }

    public void deleteAction(String id) {
        checkupActionRepository.deleteById(id);
    }

    public CheckupAction updateAction(String id, CheckupActionDTO checkupActionDTO) {
        getActionById(id);
        CheckupAction updatedCheckupAction = new CheckupAction(
                id,
                checkupActionDTO.title(),
                checkupActionDTO.subtitle(),
                checkupActionDTO.art(),
                checkupActionDTO.adu(),
                checkupActionDTO.application(),
                checkupActionDTO.cinum(),
                checkupActionDTO.pi()
        );
        return checkupActionRepository.save(updatedCheckupAction);
    }
}
