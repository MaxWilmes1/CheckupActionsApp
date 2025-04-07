package com.hdi.backend.admin_data;

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
class DataControllerTest {

    @Autowired
    private MockMvc mvc;

    @Autowired
    private DataRepository dataRepository;

    @Test
    @WithMockUser(authorities = "ADMIN")
    void getAllTitles() throws Exception {
        // GIVEN
        Data d1 = Data.builder()
                .id("1")
                .info("test")
                .type(DataType.TITLE)
                .build();
        Data d2 = Data.builder()
                .id("2")
                .info("test2")
                .type(DataType.TITLE)
                .build();
        dataRepository.save(d1);
        dataRepository.save(d2);
        // WHEN & THEN
        mvc.perform(MockMvcRequestBuilders.get("/api/data"))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().json("""
                        [
                        {
                        id: "1",
                        info: "test",
                        type: "TITLE"
                        },
                        {
                        id: "2",
                        info: "test2",
                        type: "TITLE"
                        
                        }
                        ]
                        """));
    }

    @Test
    @WithMockUser(authorities = "ADMIN")
    void getTitleById() throws Exception {
        // GIVEN
        Data d = Data.builder()
                .id("1")
                .info("test")
                .type(DataType.TITLE)
                .build();
        dataRepository.save(d);
        // WHEN & THEN
        mvc.perform(MockMvcRequestBuilders.get("/api/data/" + d.id()))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().json("""
                        {
                        id: "1",
                        info: "test",
                        type: "TITLE"
                        }
                        
                        """));
    }

    @Test
    @WithMockUser(authorities = "ADMIN")
    void addTitle() throws Exception {
        mvc.perform(MockMvcRequestBuilders.post("/api/data")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {
                                "id": "1",
                                "info": "test",
                                "type": "TITLE"
                                }
                                """)
                )
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().json("""
                        {
                        "info": "test",
                        "type": "TITLE"
                        }
                        
                        """))
                .andExpect(MockMvcResultMatchers.jsonPath("$.id").exists());
    }
    @Test
    @WithMockUser(authorities = "ADMIN")
    void updateTitle() throws Exception {
        // GIVEN
        Data d = Data.builder()
                .id("1")
                .info("test")
                .type(DataType.TITLE)
                .build();
        dataRepository.save(d);
        // WHEN & THEN
        mvc.perform(MockMvcRequestBuilders.put("/api/data/" + d.id())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(
                                """
                                        {
                                        "info": "testPassed",
                                        "type": "TITLE"
                                        }
                                        """
                        )
                )
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().json("""
                        {
                        id: "1",
                        info: "testPassed",
                        "type": "TITLE"
                        }
                        
                        """));
    }

    @Test
    @WithMockUser(authorities = "ADMIN")
    void deleteTitle() throws Exception {
        // GIVEN
        Data dataToDelete = Data.builder()
                .id("1")
                .info("test")
                .type(DataType.TITLE)
                .build();
        dataRepository.save(dataToDelete);
        // WHEN & THEN
        mvc.perform(MockMvcRequestBuilders.delete("/api/data/" + dataToDelete.id()))
                .andExpect(MockMvcResultMatchers.status().isOk());
    }
}