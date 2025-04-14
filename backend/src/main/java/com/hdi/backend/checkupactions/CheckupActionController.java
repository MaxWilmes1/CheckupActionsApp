package com.hdi.backend.checkupactions;

import com.hdi.backend.checkupactions.models.*;
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

    @PostMapping
    CheckupAction addCheckupAction(@RequestBody CheckupActionDTO checkupActionDTO) {
        return checkupActionService.addAction(checkupActionDTO);
    }

    @DeleteMapping("/{id}")
    void deleteAction(@PathVariable String id) {
        checkupActionService.deleteAction(id);
    }

    @PutMapping("/{id}")
    CheckupAction updateAction(@PathVariable String id, @RequestBody CheckupActionDTO checkupActionDTO) {
        return checkupActionService.updateAction(id, checkupActionDTO);
    }

    @PostMapping("/{id}/comments")
    public CheckupAction addComment(@PathVariable String id, @RequestBody NewCommentDTO newCommentDTO) {
        return checkupActionService.addComment(id, newCommentDTO);
    }

    @PutMapping("/{actionId}/comments/{commentId}")
    public CheckupAction updateComment(@PathVariable String actionId, @PathVariable String commentId,
                                       @RequestBody UpdateCommentDTO updateCommentDTO) {
        return checkupActionService.updateComment(actionId, commentId, updateCommentDTO);
    }

    @DeleteMapping("/{actionId}/comments/{commentId}")
    public CheckupAction deleteComment(@PathVariable String actionId, @PathVariable String commentId) {
        return checkupActionService.deleteComment(actionId, commentId);
    }
}
