package com.hdi.backend.checkupactions;

import com.hdi.backend.checkupactions.models.*;
import com.hdi.backend.exception.ActionNotFoundException;
import com.hdi.backend.utils.IdService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CheckupActionService {

    private final CheckupActionRepository checkupActionRepository;
    private final IdService idService;

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
                checkupActionDTO.pi(),
                checkupActionDTO.description(),
                checkupActionDTO.responsibility(),
                Status.OPEN,
                List.of(),
                LocalDateTime.now(),
                LocalDateTime.now()
        );
        return checkupActionRepository.save(checkupActionToSave);
    }

    public void deleteAction(String id) {
        checkupActionRepository.deleteById(id);
    }

    public CheckupAction updateAction(String id, CheckupActionDTO checkupActionDTO) {
        CheckupAction existingAction = getActionById(id);
        CheckupAction updatedCheckupAction = new CheckupAction(
                existingAction.id(),
                checkupActionDTO.title(),
                checkupActionDTO.subtitle(),
                checkupActionDTO.art(),
                checkupActionDTO.adu(),
                checkupActionDTO.application(),
                checkupActionDTO.cinum(),
                checkupActionDTO.pi(),
                checkupActionDTO.description(),
                checkupActionDTO.responsibility(),
                checkupActionDTO.status(),
                existingAction.comments(),
                existingAction.dateCreated(),
                LocalDateTime.now()
        );
        return checkupActionRepository.save(updatedCheckupAction);
    }

    public CheckupAction addComment(String actionId, NewCommentDTO newCommentDTO) {
        CheckupAction action = getActionById(actionId);

        Comment newComment = Comment.builder()
                .id(idService.generate())
                .author(newCommentDTO.author())
                .comment(newCommentDTO.comment())
                .dateCreated(LocalDateTime.now())
                .dateLastEdit(LocalDateTime.now())
                .build();

        List<Comment> updatedComments = new ArrayList<>(action.comments());
        updatedComments.add(newComment);

        CheckupAction updatedAction = action.withComments(updatedComments);
        return checkupActionRepository.save(updatedAction);
    }


    public CheckupAction updateComment(String actionId, String commentId, UpdateCommentDTO updatedComment) {
        CheckupAction action = getActionById(actionId);

        List<Comment> updatedComments = action.comments().stream()
                .map(c -> c.id().equals(commentId)
                        ? c.withComment(updatedComment.comment())
                        .withDateLastEdit(LocalDateTime.now())
                        : c)
                .toList();

        return checkupActionRepository.save(action.withComments(updatedComments));
    }

    public CheckupAction deleteComment(String actionId, String commentId) {
        CheckupAction action = getActionById(actionId);

        List<Comment> updatedComments = action.comments().stream()
                .filter(c -> !c.id().equals(commentId))
                .toList();

        return checkupActionRepository.save(action.withComments(updatedComments));
    }
}
