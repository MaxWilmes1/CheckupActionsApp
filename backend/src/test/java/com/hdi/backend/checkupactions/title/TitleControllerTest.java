package com.hdi.backend.checkupactions.title;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

@SpringBootTest
@AutoConfigureMockMvc
class TitleControllerTest {

    @Autowired
    private MockMvc mvc;

    @Autowired
    private TitleRepository titleRepository;

    @Test
    @WithMockUser(authorities = "ADMIN")
    void getAllTitles() throws Exception {
        // GIVEN
        Title t1 = Title.builder()
                .id("1")
                .title("test")
                .build();
        Title t2 = Title.builder()
                .id("2")
                .title("test2")
                .build();
        titleRepository.save(t1);
        titleRepository.save(t2);
        // WHEN & THEN
        mvc.perform(MockMvcRequestBuilders.get("/api/title"))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().json("""
                        [
                        {
                        id: "1",
                        title: "test"
                        },
                        {
                        id: "2",
                        title: "test2"
                        
                        }
                        ]
                        """));
    }

    @Test
    @WithMockUser(authorities = "ADMIN")
    void getTitleById() throws Exception {
        // GIVEN
        Title t1 = Title.builder()
                .id("1")
                .title("test")
                .build();
        titleRepository.save(t1);
        // WHEN & THEN
        mvc.perform(MockMvcRequestBuilders.get("/api/title/" + t1.id()))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().json("""
                        {
                        id: "1",
                        title: "test"
                        }
                        
                        """));
    }

    @Test
    @WithMockUser(authorities = "ADMIN")
    void addTitle() throws Exception {
        mvc.perform(MockMvcRequestBuilders.post("/api/title")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {
                                "id": "1",
                                "title": "test"
                                }
                                """)
                )
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().json("""
                        {
                        title: "test"
                        }
                        
                        """))
                .andExpect(MockMvcResultMatchers.jsonPath("$.id").exists());
    }
    @Test
    @WithMockUser(authorities = "ADMIN")
    void updateTitle() throws Exception {
        // GIVEN
        Title t = Title.builder()
                .id("1")
                .title("test")
                .build();
        titleRepository.save(t);
        // WHEN & THEN
        mvc.perform(MockMvcRequestBuilders.put("/api/title/" + t.id())
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
                .andExpect(MockMvcResultMatchers.content().json("""
                        {
                        id: "1",
                        title: "testPassed"
                        }
                        
                        """));
    }

    @Test
    @WithMockUser(authorities = "ADMIN")
    void deleteTitle() throws Exception {
        // GIVEN
        Title titleToDelete = Title.builder()
                .id("1")
                .title("test")
                .build();
        titleRepository.save(titleToDelete);
        // WHEN & THEN
        mvc.perform(MockMvcRequestBuilders.delete("/api/title/" + titleToDelete.id()))
                .andExpect(MockMvcResultMatchers.status().isOk());
    }
}