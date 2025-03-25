package com.hdi.backend.CheckupActions;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/checkup-actions")
public class CheckupActionController {

    private final CheckupActionService checkupActionService;

    @GetMapping
    List<CheckupAction> getAllActions() {
        return checkupActionService.getAllActions();
    }

    @GetMapping("/{id}")
    CheckupAction getActionById(@PathVariable String id) {
        return checkupActionService.getActionById(id);
    }

    @PostMapping("/add")
    CheckupAction addCheckupAction(@RequestBody CheckupAction checkupAction) {
        return checkupActionService.addAction(checkupAction);
    }

    @DeleteMapping("/delete/{id}")
    void deleteAction(@PathVariable String id) {
        checkupActionService.deleteAction(id);
    }

    @PutMapping("/update/{id}")
    CheckupAction updateAction(@PathVariable String id, @RequestBody CheckupAction checkupAction){
        return checkupActionService.updateAction(id, checkupAction);
    }
}
