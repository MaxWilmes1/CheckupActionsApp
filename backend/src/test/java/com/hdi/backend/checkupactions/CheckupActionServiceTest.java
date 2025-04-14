package com.hdi.backend.checkupactions;

import com.hdi.backend.checkupactions.models.*;
import com.hdi.backend.exception.ActionNotFoundException;
import com.hdi.backend.utils.IdService;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentCaptor;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class CheckupActionServiceTest {

    private final CheckupActionRepository mockCheckupActionRepository = mock(CheckupActionRepository.class);
    private final IdService mockIdService = mock(IdService.class);
    private final CheckupActionService checkupActionService = new CheckupActionService(mockCheckupActionRepository, mockIdService);

    @Test
    void shouldReturnAllCheckupActions_whenRepositoryContainsActions() {
        // GIVEN
        CheckupAction action = CheckupAction.builder()
                .id("1")
                .title("test")
                .build();
        List<CheckupAction> expectedActions = List.of(action);

        when(mockCheckupActionRepository.findAll()).thenReturn(expectedActions);

        // WHEN
        List<CheckupAction> actualActions = checkupActionService.getAllActions();

        // THEN
        verify(mockCheckupActionRepository).findAll();
        assertNotNull(actualActions);
        assertEquals(expectedActions, actualActions);
    }

    @Test
    void shouldReturnEmptyList_whenRepositoryIsEmpty() {
        // GIVEN
        when(mockCheckupActionRepository.findAll()).thenReturn(List.of());

        // WHEN
        List<CheckupAction> actualActions = checkupActionService.getAllActions();

        // THEN
        verify(mockCheckupActionRepository).findAll();
        assertNotNull(actualActions);
        assertTrue(actualActions.isEmpty());
    }

    @Test
    void shouldReturnAllCheckupActions_whenRepositoryContainsMultipleActions() {
        // GIVEN
        CheckupAction action1 = CheckupAction.builder()
                .id("1")
                .title("test1")
                .build();
        CheckupAction action2 = CheckupAction.builder()
                .id("2")
                .title("test2")
                .build();
        List<CheckupAction> expectedActions = List.of(action1, action2);

        when(mockCheckupActionRepository.findAll()).thenReturn(expectedActions);

        // WHEN
        List<CheckupAction> actualActions = checkupActionService.getAllActions();

        // THEN
        verify(mockCheckupActionRepository).findAll();
        assertNotNull(actualActions);
        assertEquals(expectedActions, actualActions);
    }


    @Test
    void shouldReturnCheckupActionById_whenActionExists() {
        //GIVEN
        String id = "1";
        CheckupAction action1 = CheckupAction.builder()
                .id(id)
                .title("test")
                .build();
        when(mockCheckupActionRepository.findById(id)).thenReturn(Optional.of(action1));
        //WHEN
        CheckupAction actual = checkupActionService.getActionById(id);
        //THEN
        verify(mockCheckupActionRepository).findById(id);
        assertEquals(action1, actual);
    }

    @Test
    void shouldThrowException_whenActionNotFound() {
        //GIVEN
        String notExistentId = "9999";
        when(mockCheckupActionRepository.findById(notExistentId)).thenReturn(Optional.empty());
        String expected = "Checkup action with ID 9999 not found";
        //WHEN & THEN
        Exception actual = assertThrows(ActionNotFoundException.class, () -> checkupActionService.getActionById(notExistentId));
        verify(mockCheckupActionRepository).findById(notExistentId);
        assertEquals(expected, actual.getMessage());
    }

    @Test
    void shouldSaveAndReturnCheckupActionWithGeneratedId() {
        // GIVEN
        CheckupActionDTO actionWithoutId = CheckupActionDTO.builder()
                .title("test")
                .build();

        CheckupAction savedAction = new CheckupAction(
                "generatedMongoId123",
                actionWithoutId.title(),
                null, null, null, null, null, null, null, null,
                Status.OPEN,
                List.of(),
                LocalDateTime.now(),
                LocalDateTime.now()
        );

        when(mockCheckupActionRepository.save(any())).thenReturn(savedAction);

        // WHEN
        CheckupAction actual = checkupActionService.addAction(actionWithoutId);

        // THEN
        ArgumentCaptor<CheckupAction> captor = ArgumentCaptor.forClass(CheckupAction.class);
        verify(mockCheckupActionRepository).save(captor.capture());
        CheckupAction saved = captor.getValue();

        assertNotNull(saved.dateCreated());
        assertNotNull(saved.dateLastEdit());
        assertEquals("test", saved.title());
        assertEquals("test", actual.title());
        assertEquals("generatedMongoId123", actual.id());
    }


    @Test
    void shouldReturnNothing_whenDeleteExistingAction() {
        // GIVEN
        CheckupAction action = CheckupAction.builder()
                .id("1")
                .title("test")
                .build();
        doNothing().when(mockCheckupActionRepository).deleteById(action.id());
        // WHEN
        checkupActionService.deleteAction(action.id());
        // THEN
        verify(mockCheckupActionRepository).deleteById(action.id());
    }

    @Test
    void shouldUpdateAction_whenIdExists() {
        // GIVEN
        String idToUpdate = "1";
        CheckupAction existingAction = CheckupAction.builder()
                .id("1")
                .title("test")
                .dateCreated(LocalDateTime.now().minusDays(1))
                .build();

        CheckupActionDTO updateActionData = CheckupActionDTO.builder()
                .title("testSuccessfull")
                .build();

        CheckupAction savedAction = CheckupAction.builder()
                .id("1")
                .title("testSuccessfull")
                .dateCreated(LocalDateTime.now().minusDays(1))
                .dateLastEdit(LocalDateTime.now())
                .build();

        when(mockCheckupActionRepository.findById(idToUpdate)).thenReturn(Optional.of(existingAction));
        when(mockCheckupActionRepository.save(any())).thenReturn(savedAction);

        // WHEN
        CheckupAction actual = checkupActionService.updateAction(idToUpdate, updateActionData);

        // THEN
        ArgumentCaptor<CheckupAction> captor = ArgumentCaptor.forClass(CheckupAction.class);
        verify(mockCheckupActionRepository).save(captor.capture());
        CheckupAction saved = captor.getValue();

        assertEquals("testSuccessfull", saved.title());
        assertNotNull(saved.dateCreated());
        assertNotNull(saved.dateLastEdit());

        assertEquals("testSuccessfull", actual.title());
    }

    @Test
    void addComment_shouldReturnActionWithComment_WhenFirstCommentAdded() {
        // GIVEN
        String commentID = "generatedMongoId123";
        LocalDateTime fixedTime = LocalDateTime.of(2025, 4, 10, 11, 42, 3, 0);
        CheckupAction actionWithoutComment = CheckupAction.builder()
                .id("1")
                .title("test")
                .comments(List.of())
                .build();

        NewCommentDTO newComment = NewCommentDTO.builder()
                .author("testAuthor")
                .comment("testComment")
                .build();

        Comment expectedComment = Comment.builder()
                .id(commentID)
                .author(newComment.author())
                .comment(newComment.comment())
                .dateCreated(fixedTime)
                .dateLastEdit(fixedTime)
                .build();

        CheckupAction expected = CheckupAction.builder()
                .id("1")
                .title("test")
                .comments(List.of(expectedComment))
                .dateCreated(fixedTime)
                .dateLastEdit(fixedTime)
                .build();

        when(mockCheckupActionRepository.findById(actionWithoutComment.id())).thenReturn(Optional.of(actionWithoutComment));
        when(mockIdService.generate()).thenReturn("generatedMongoId123");
        when(mockCheckupActionRepository.save(any())).thenReturn(expected);

        // WHEN
        CheckupAction actual = checkupActionService.addComment(actionWithoutComment.id(), newComment);

        // THEN
        verify(mockCheckupActionRepository).findById(actionWithoutComment.id());
        verify(mockCheckupActionRepository).save(any());

        assertEquals(expected.id(), actual.id());
        assertEquals(expected.title(), actual.title());
        assertEquals(expected.comments(), actual.comments());

        assertNotNull(actual.dateCreated());
        assertNotNull(actual.dateLastEdit());
    }


    @Test
    void updateComment_shouldReturnUpdatedComment_WhenActionWithCommentExists() {
        // GIVEN
        String commentID = "generatedMongoId123";
        LocalDateTime fixedTime = LocalDateTime.of(2025, 4, 10, 11, 42, 3, 0);

        Comment existingComment = Comment.builder()
                .id(commentID)
                .author("testAuthor")
                .comment("testComment")
                .dateCreated(fixedTime)
                .dateLastEdit(fixedTime)
                .build();

        CheckupAction actionWithComment = CheckupAction.builder()
                .id("1")
                .title("test")
                .comments(List.of(existingComment))
                .build();

        UpdateCommentDTO updateComment = UpdateCommentDTO.builder()
                .comment("testSuccessfull")
                .build();

        Comment expectedComment = Comment.builder()
                .id(commentID)
                .author("testAuthor")
                .comment(updateComment.comment())
                .dateCreated(fixedTime)
                .dateLastEdit(fixedTime)
                .build();

        CheckupAction expected = CheckupAction.builder()
                .id("1")
                .title("test")
                .comments(List.of(expectedComment))
                .dateCreated(fixedTime)
                .dateLastEdit(fixedTime)
                .build();

        when(mockCheckupActionRepository.findById(actionWithComment.id())).thenReturn(Optional.of(actionWithComment));
        when(mockCheckupActionRepository.save(any())).thenReturn(expected);

        // WHEN
        CheckupAction actual = checkupActionService.updateComment(actionWithComment.id(),existingComment.id(), updateComment);

        // THEN
        verify(mockCheckupActionRepository).findById(actionWithComment.id());
        verify(mockCheckupActionRepository).save(any());

        assertEquals(expected.id(), actual.id());
        assertEquals(expected.title(), actual.title());
        assertEquals(expected.comments(), actual.comments());

        assertNotNull(actual.dateCreated());
        assertNotNull(actual.dateLastEdit());
    }

    @Test
    void deleteComment_shouldReturnEmptyList_WhenOneCommentExisted() {
        // GIVEN
        String commentID = "generatedMongoId123";
        LocalDateTime fixedTime = LocalDateTime.of(2025, 4, 10, 11, 42, 3, 0);

        Comment existingComment = Comment.builder()
                .id(commentID)
                .author("testAuthor")
                .comment("testComment")
                .dateCreated(fixedTime)
                .dateLastEdit(fixedTime)
                .build();

        CheckupAction actionWithComment = CheckupAction.builder()
                .id("1")
                .title("test")
                .comments(List.of(existingComment))
                .build();

        CheckupAction expected = CheckupAction.builder()
                .id("1")
                .title("test")
                .comments(List.of())
                .dateCreated(fixedTime)
                .dateLastEdit(fixedTime)
                .build();

        when(mockCheckupActionRepository.findById(actionWithComment.id())).thenReturn(Optional.of(actionWithComment));
        when(mockCheckupActionRepository.save(any())).thenReturn(expected);

        // WHEN
        CheckupAction actual = checkupActionService.deleteComment(actionWithComment.id(),existingComment.id());

        // THEN
        verify(mockCheckupActionRepository).findById(actionWithComment.id());
        verify(mockCheckupActionRepository).save(any());

        assertEquals(expected.id(), actual.id());
        assertEquals(expected.title(), actual.title());
        assertEquals(expected.comments(), actual.comments());

        assertNotNull(actual.dateCreated());
        assertNotNull(actual.dateLastEdit());
    }
}