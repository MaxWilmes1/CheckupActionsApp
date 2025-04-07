package com.hdi.backend.admin_data;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/data")
@RequiredArgsConstructor
public class DataController {

    private final DataService dataService;

    @GetMapping
    public List<Data> getAllData(){
        return dataService.getData();
    }

    @GetMapping("/{id}")
    public Data getDataById(@PathVariable String id){
        return dataService.getDataById(id);
    }

    @PostMapping
    public Data addData(@RequestBody Data data){
        return dataService.addData(data);
    }

    @PutMapping("/{id}")
    public Data updateData(@PathVariable String id, @RequestBody Data data){
        return dataService.updateData(id, data);
    }

    @DeleteMapping("/{id}")
    public void deleteData(@PathVariable String id){
        dataService.deleteData(id);
    }
}
