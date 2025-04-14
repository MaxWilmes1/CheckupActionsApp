package com.hdi.backend.checkupactions;

import com.hdi.backend.checkupactions.models.CheckupAction;
import com.hdi.backend.checkupactions.models.Comment;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import java.time.LocalDateTime;
import java.util.List;


@SpringBootTest
@AutoConfigureMockMvc
class CheckupActionControllerTest {

    @Autowired
    private MockMvc mvc;

    @Autowired
    private CheckupActionRepository checkupActionRepository;

    @Test
    @DirtiesContext
    @WithMockUser
    void shouldReturnAllActions_whenActionsExist() throws Exception {
        CheckupAction action = CheckupAction.builder()
                .id("1")
                .title("test")
                .build();
        checkupActionRepository.save(action);

        mvc.perform(MockMvcRequestBuilders.get("/api/checkup-actions"))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().json(
                        """
                                [
                                 {
                                  id: "1",
                                  title: "test"
                                 }
                                ]
                                """
                ));
    }

    @Test
    @DirtiesContext
    @WithMockUser
    void shouldReturnActionById_whenActionExist() throws Exception {
        String idToFind = "1";
        CheckupAction action = CheckupAction.builder()
                .id("1")
                .title("test")
                .build();
        checkupActionRepository.save(action);

        mvc.perform(MockMvcRequestBuilders.get("/api/checkup-actions/" + idToFind))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().json(
                        """
                                 {
                                  id: "1",
                                  title: "test"
                                 }
                                """
                ));
    }

    @Test
    @DirtiesContext
    @WithMockUser(authorities = "ADMIN")
    void addAction_shouldAddAction_WhenUserLoggedInAndAdmin() throws Exception {
        mvc.perform(MockMvcRequestBuilders.post("/api/checkup-actions")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(
                                """
                                        {
                                        "title": "testPassed"
                                        }
                                        """
                        ))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().json(
                                """
                                         {
                                          title: "testPassed"
                                         }
                                        """
                        )
                )
                .andExpect(MockMvcResultMatchers.jsonPath("$.id").exists());
    }

    @Test
    @DirtiesContext
    @WithMockUser (authorities = "ADMIN")
    void deleteAction() throws Exception {
        CheckupAction action = CheckupAction.builder()
                .id("1")
                .title("test")
                .build();
        checkupActionRepository.save(action);
        String idToDelete = "1";
        mvc.perform(MockMvcRequestBuilders.delete("/api/checkup-actions/" + idToDelete))
                .andExpect(MockMvcResultMatchers.status().isOk());

    }

    @Test
    @DirtiesContext
    @WithMockUser(authorities = "ADMIN")
    void shouldReturnUpdatedAction_whenUpdatingExistingAction() throws Exception {
        CheckupAction action = CheckupAction.builder()
                .id("1")
                .title("test")
                .build();
        checkupActionRepository.save(action);

        mvc.perform(MockMvcRequestBuilders.put("/api/checkup-actions/" + action.id())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(
                                """
                                        {
                                        "title": "testPassed"
                                        }
                                        """
                        )
                )
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().json(
                        """
                                 {
                                 id: "1",
                                  title: "testPassed"
                                 }
                                """
                ));
    }

    @Test
    @DirtiesContext
    void addComment() throws Exception {
        // GIVEN
        CheckupAction existingActionWithoutComment = CheckupAction.builder()
                .id("1")
                .title("test")
                .comments(List.of())
                .build();
        checkupActionRepository.save(existingActionWithoutComment);

        // WHEN & THEN
        mvc.perform(MockMvcRequestBuilders.post("/api/checkup-actions/1/comments")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(
                                """
                                {
                                    "comment": "testPassed",
                                    "author": "testAuthor"
                                }
                                """
                        ))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$.id").value("1"))
                .andExpect(MockMvcResultMatchers.jsonPath("$.title").value("test"))
                .andExpect(MockMvcResultMatchers.jsonPath("$.comments[0].author").value("testAuthor"))
                .andExpect(MockMvcResultMatchers.jsonPath("$.comments[0].comment").value("testPassed"))
                .andExpect(MockMvcResultMatchers.jsonPath("$.comments[0].id").exists())
                .andExpect(MockMvcResultMatchers.jsonPath("$.comments[0].dateCreated").exists())
                .andExpect(MockMvcResultMatchers.jsonPath("$.comments[0].dateLastEdit").exists());
    }

    @Test
    @DirtiesContext
    @WithMockUser(authorities = "ADMIN")
    void updateComment() throws Exception {
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

        CheckupAction existingActionWithComment = CheckupAction.builder()
                .id("1")
                .title("test")
                .comments(List.of(existingComment))
                .build();
        checkupActionRepository.save(existingActionWithComment);

        // WHEN & THEN
        mvc.perform(MockMvcRequestBuilders.put("/api/checkup-actions/1/comments/" + commentID)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(
                                """
                                {
                                    "comment": "testPassed",
                                    "author": "testAuthor"
                                }
                                """
                        ))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$.id").value("1"))
                .andExpect(MockMvcResultMatchers.jsonPath("$.title").value("test"))
                .andExpect(MockMvcResultMatchers.jsonPath("$.comments[0].author").value("testAuthor"))
                .andExpect(MockMvcResultMatchers.jsonPath("$.comments[0].comment").value("testPassed"))
                .andExpect(MockMvcResultMatchers.jsonPath("$.comments[0].id").exists())
                .andExpect(MockMvcResultMatchers.jsonPath("$.comments[0].dateCreated").exists())
                .andExpect(MockMvcResultMatchers.jsonPath("$.comments[0].dateLastEdit").exists());
    }

    @Test
    @DirtiesContext
    @WithMockUser(authorities = "ADMIN")
    void deleteComment() throws Exception {
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

        CheckupAction existingActionWithComment = CheckupAction.builder()
                .id("1")
                .title("test")
                .comments(List.of(existingComment))
                .build();
        checkupActionRepository.save(existingActionWithComment);

        // WHEN & THEN
        mvc.perform(MockMvcRequestBuilders.delete("/api/checkup-actions/1/comments/" + commentID))
                .andExpect(MockMvcResultMatchers.status().isOk());
    }
}