package com.hdi.backend.managed_data;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class DataService {

    private final DataRepository dataRepository;

    public List<Data> getData() {
        return dataRepository.findAll();
    }

    public Data getDataById(String id) {
        return dataRepository.findById(id)
                .orElseThrow();
    }

    public Data addData(Data data) {
        return dataRepository.save(data);
    }

    public Data updateData(String id, Data data) {
        Data dataToUpdate = getDataById(id);
        Data updatedData = dataToUpdate.withInfo(data.info());
        return dataRepository.save(updatedData);

    }

    public void deleteData(String id) {
        dataRepository.deleteById(id);
    }
}
