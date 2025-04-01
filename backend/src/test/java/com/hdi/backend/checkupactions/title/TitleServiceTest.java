package com.hdi.backend.checkupactions.title;

import org.junit.jupiter.api.Test;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class TitleServiceTest {

    private final TitleRepository mockTitleRepository = mock(TitleRepository.class);
    private final TitleService titleService = new TitleService(mockTitleRepository);

    @Test
    void getAllTitles() {
        // GIVEN
        Title t1 = Title.builder()
                .id("1")
                .title("test")
                .build();
        when(mockTitleRepository.findAll()).thenReturn(List.of(t1));
        // WHEN
        List<Title> actual = titleService.getTitles();
        // THEN
        verify(mockTitleRepository).findAll();
        assertEquals(List.of(t1), actual);
    }

    @Test
    void getTitleById() {
        // GIVEN
        Title t1 = Title.builder()
                .id("1")
                .title("test")
                .build();
        when(mockTitleRepository.findById(t1.id())).thenReturn(Optional.of(t1));
        // WHEN
        Title actual = titleService.getTitleById(t1.id());
        // THEN
        verify(mockTitleRepository).findById(t1.id());
        assertEquals(t1, actual);
    }

    @Test
    void addTitle() {
        // GIVEN
        Title titleToSave = Title.builder()
                .id("1")
                .title("test")
                .build();
        when(mockTitleRepository.save(titleToSave)).thenReturn(titleToSave);
        // WHEN
        Title actual = titleService.addTitle(titleToSave);
        // THEN
        verify(mockTitleRepository).save(titleToSave);
        assertEquals(titleToSave, actual);
    }

    @Test
    void updateTitle() {
        // GIVEN
        Title t1 = Title.builder()
                .id("1")
                .title("test")
                .build();
        Title updateTitleData = Title.builder()
                .id("1")
                .title("testPassed")
                .build();
        when(mockTitleRepository.findById(t1.id())).thenReturn(Optional.of(t1));
        when(mockTitleRepository.save(updateTitleData)).thenReturn(updateTitleData);
        // WHEN
        Title actual = titleService.updateTitle(t1.id(), updateTitleData);
        // THEN
        verify(mockTitleRepository).findById(t1.id());
        verify(mockTitleRepository).save(updateTitleData);
        assertEquals(updateTitleData, actual);
    }

    @Test
    void deleteTitle() {
        // GIVEN
        Title titleToDelete = Title.builder()
                .id("1")
                .title("test")
                .build();
        doNothing().when(mockTitleRepository).deleteById(titleToDelete.id());
        // WHEN
        titleService.deleteTitle(titleToDelete.id());
        // THEN
        verify(mockTitleRepository).deleteById(titleToDelete.id());
    }
}