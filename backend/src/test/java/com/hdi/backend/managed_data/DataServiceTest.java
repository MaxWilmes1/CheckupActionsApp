package com.hdi.backend.managed_data;

import org.junit.jupiter.api.Test;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class DataServiceTest {

    private final DataRepository mockDataRepository = mock(DataRepository.class);
    private final DataService dataService = new DataService(mockDataRepository);

    @Test
    void getAllTitles() {
        // GIVEN
        Data d = Data.builder()
                .id("1")
                .info("test")
                .type(DataType.TITLE)
                .build();
        when(mockDataRepository.findAll()).thenReturn(List.of(d));
        // WHEN
        List<Data> actual = dataService.getData();
        // THEN
        verify(mockDataRepository).findAll();
        assertEquals(List.of(d), actual);
    }

    @Test
    void getTitleById() {
        // GIVEN
        Data d = Data.builder()
                .id("1")
                .info("test")
                .type(DataType.ADU)
                .build();
        when(mockDataRepository.findById(d.id())).thenReturn(Optional.of(d));
        // WHEN
        Data actual = dataService.getDataById(d.id());
        // THEN
        verify(mockDataRepository).findById(d.id());
        assertEquals(d, actual);
    }

    @Test
    void addTitle() {
        // GIVEN
        Data dataToSave = Data.builder()
                .id("1")
                .info("test")
                .type(DataType.TITLE)
                .build();
        when(mockDataRepository.save(dataToSave)).thenReturn(dataToSave);
        // WHEN
        Data actual = dataService.addData(dataToSave);
        // THEN
        verify(mockDataRepository).save(dataToSave);
        assertEquals(dataToSave, actual);
    }

    @Test
    void updateTitle() {
        // GIVEN
        Data d = Data.builder()
                .id("1")
                .info("test")
                .type(DataType.TITLE)
                .build();
        Data updatedData = Data.builder()
                .id("1")
                .info("testPassed")
                .type(DataType.TITLE)
                .build();
        when(mockDataRepository.findById(d.id())).thenReturn(Optional.of(d));
        when(mockDataRepository.save(updatedData)).thenReturn(updatedData);
        // WHEN
        Data actual = dataService.updateData(d.id(), updatedData);
        // THEN
        verify(mockDataRepository).findById(d.id());
        verify(mockDataRepository).save(updatedData);
        assertEquals(updatedData, actual);
    }

    @Test
    void deleteTitle() {
        // GIVEN
        Data dataToDelete = Data.builder()
                .id("1")
                .info("test")
                .type(DataType.TITLE)
                .build();
        doNothing().when(mockDataRepository).deleteById(dataToDelete.id());
        // WHEN
        dataService.deleteData(dataToDelete.id());
        // THEN
        verify(mockDataRepository).deleteById(dataToDelete.id());
    }
}